'use client'

import "./globals.css";
import React, { useEffect } from "react"
import { useState } from 'react';
import Title from './components/Title'
import ArtistSelect from "./components/ArtistSelect";

require('dotenv').config()

const NEXT_PUBLIC_SPOTIFY_ID = process.env.NEXT_PUBLIC_SPOTIFY_ID
const NEXT_PUBLIC_SPOTIFY_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_SECRET

export default function Home() {

  const [artistID, setArtistID] = useState("")
  const [accessToken, setAccessToken] = useState("");
  const [artist, setArtist] = useState("")
  const [currentSongs, setCurrentSongs] = useState([]);
  const [albums, setAlbums] = useState([])
  const [startRanking, setStartRanking] = useState(false);
  
  const [songs, setSongs] = useState([]);
  const [rankedSongs, setRankedSongs] = useState([]);

  const [songList, setSongList] = useState([]);

  const albumIDs = albums.map(function getAlbumID(album) {
    return album.id
  })


  useEffect(() => {
    var authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + NEXT_PUBLIC_SPOTIFY_ID + '&client_secret=' + NEXT_PUBLIC_SPOTIFY_SECRET
    }

    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))
  }, [])

  async function gatherData() {
    await search();
    if (albums.length === 0) {
      setStartRanking(false);
    } else {
      setStartRanking(true);
    }
  }

  async function search() {
    var searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken,
      }
    }

    var artistID = await fetch('https://api.spotify.com/v1/search?q=' + artist + '&type=artist', searchParameters)
      .then(response => response.json())
      .then(data => {
        return data.artists.items[0].id 
      })

    var returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=US&limit=50', searchParameters)
      .then(response => response.json())
      .then(data => {
        return (data.items)
      })

    setAlbums(returnedAlbums)

    var albumValues = returnedAlbums.map(function getAlbumID(album) {
      return album.id
    })

    const songPromises = await albumValues.map(async (albumID) => {
      var songs = await fetch('https://api.spotify.com/v1/albums/' + albumID + '/?tracks?market=US&limit=50', searchParameters)
      .then(response => response.json())
      .then(data => {
        return data.tracks.items;
      })})

    const songValues = await Promise.all(songPromises);

    // await albumValues.forEach(async (albumID) => {
    //   var songs = await fetch('https://api.spotify.com/v1/albums/' + albumID + '/?tracks?market=US&limit=50', searchParameters)
    //   .then(response => response.json())
    //   .then(data => {
    //     return data.tracks.items;
    //   })

    //   songs.forEach((song) => {
    //     songValues.push(song)
    //   })

    //   console.log(songValues)

    // });

    console.log(songValues)
    setSongList(songValues)
    console.log(songs)
  }


  return (
    <>
      <Title />
      <div className="main-container">
        <div className="second-container">
          {songList.map((song) => {
            return (<p>{song.name}</p>)
          })}
          {startRanking && <ArtistSelect songList={songList} albums={albums} />}
          <div className="inputs">
            <input className="artist-input" id="artist-name" onChange={(e) => setArtist(e.target.value)}></input>
            <button className="submit-button" id="submit-button" onClick={gatherData}>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
}
