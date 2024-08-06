'use client'

import "./globals.css";
import React, { useEffect } from "react"
import { useState } from 'react';
import Title from './components/Title'
import ArtistSelect from "./components/ArtistSelect";

const CLIENT_ID = "2e3c92cfaab24eb695ec8408d4fc1497"
const CLIENT_SECRET = "c9cd257276934fb89421c7e171e75df7"

export default function Home() {

  const [accessToken, setAccessToken] = useState("");
  const [artist, setArtist] = useState("")
  const [currentSongs, setCurrentSongs] = useState([]);
  const [albums, setAlbums] = useState([])
  
  const [songs, setSongs] = useState([]);
  const [rankedSongs, setRankedSongs] = useState([]);

  useEffect(() => {
    var authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }

    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))
  }, [])

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
      .then(data => { return data.artists.items[0].id })

    var returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=US&limit=50', searchParameters)
      .then(response => response.json())
      .then(data => { setAlbums(data.items); })
  }

  
  return (
    <>
      <Title />
      <div className="main-container">
        <div className="second-container">
          {<ArtistSelect albums={albums} />}
          <div className="inputs">
            <input className="artist-input" id="artist-name" onChange={(e) => setArtist(e.target.value)}></input>
            <button className="submit-button" id="submit-button" onClick={search}>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
}
