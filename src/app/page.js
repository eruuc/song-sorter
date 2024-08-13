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

  var artist = ""
  const [artistID, setArtistID] = useState("")
  const [accessToken, setAccessToken] = useState("");

  //const [artist, setArtist] = useState("")
  const [currentSongs, setCurrentSongs] = useState([]);
  const [albums, setAlbums] = useState([])
  const [startRanking, setStartRanking] = useState(false);
  const [finishedRanking, setFinishedRanking] = useState(false)
  
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

  function gatherData() {
    search();
    if (albums.length === 0) {
      setStartRanking(false);
    } else {
      setStartRanking(true);
    }
  }

  async function search() {
    console.log(artist)

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
        console.log(data)
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
  }

  function FinishedSorting(){
    return(
      <div>
        <p>Sorting complete!</p>
      </div>
    )
  }

  function ArtistInput() {
    return (
      <input
        className="artist-input"
        id="artist-name"
        type="text"
        onKeyDown={event => {
          if (event.key === "Enter") {
            search()
            setStartRanking(true)
          } else if (event.key == "Backspace") {
            artist = artist.substring(0, artist.length - 1)
          } else if (event.key != "Shift" && event.key != "Control" && event.key != "Alt"){
            artist = artist + event.key
          }
        }}
      />
    )
  }

  function checkDuplicates(albumScores) {
    const albumScoreIterator = albumScores.values();
    const scores = []

    for (let index = 0; i < albumScores.size(); i++) {
      let value = albumScoreIterator.next().value
      if (!(albumScoreIterator.next().value in scores)) {
        setFinishedRanking(true)
      } else {
        scores.push(value)
      }
    }
  }


  function SelectArtist() {
    let albumScores = new Map()
    let showScores = true;

    albums.map((album) => {
      albumScores.set(album, 0)
    })

    while (!finishedRanking) {
      checkDuplicates(albumScores)

      const dictValues = albumScores.entries()
      for (let i = 0; i < albumScores.size(); i++) {

      }
      if (placeholder) {
      
      }
    }


    return (
      <div>
        <p>Sorting start!</p>
      </div>)
  }

  return (
    <>
      <Title />
      <div className="main-container">
        <div className="second-container">
          {startRanking && <SelectArtist/>}
          {finishedRanking && <FinishedSorting/>}
          <div className="inputs">
            <ArtistInput />
          </div>
        </div>
      </div>
    </>
  );
}
