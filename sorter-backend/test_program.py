import os
import sys
import json
import spotipy
import webbrowser
import spotipy.util as util
from spotipy.oauth2 import SpotifyClientCredentials
from json.decoder import JSONDecodeError



spotify = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials())

def main():
    print("Type 0 to Search for an Artist")
    print("Type 1 to Exit")
    choice = input("Your choice: ")
    if choice == "0":
        program()
        

def program():
    songList = []
    songURIs = []
    songArt = []

    index = 0

    print()
    searchArtist = input("Search for an Artist: ")

    searchResults = spotify.search(searchArtist,1,0,"artist")
    artist = searchResults['artists']['items'][0]
    print("Found: ", artist['name'])
    artistID = artist['id']

    albums = spotify.artist_albums(artistID)
    albums = albums['items']
    for album in albums:
        print("ALBUM: " + album['name'])
        albumID = album['id']
        albumArt = album['images'][0]['url']
        
        songs = spotify.album_tracks(albumID)
        songs = songs['items']

        for song in songs:
            print(str(index) + ": " + song['name'])
            songList.append(song['name'])
            songURIs.append(song['uri'])
            songArt.append(albumArt)

            index+=1
        print()

    print(songList)
            

main()