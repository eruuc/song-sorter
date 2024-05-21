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
    # main program to start
    print("Welcome to the Spotify Song Sorter!")
    print()

    artistCatalog = searchArtist()
    songCount = getSongCount(artistCatalog)

    removeSongs(artistCatalog, songCount)
    sort()


# Song Initialization Works, Need to Figure out Naming Convention


def initLists(albums, songCount):
    # dictionary of albums and their songs with respective info
    # format:
    #   artistCatalog key: album name
    #   artistCatalog[album name][0] = song name
    #   artistCatalog[album name][1] = score based on sorting
    #   artistCatalog[album name][2] = song URI
    #   artistCatalog[album name][3] = song art (based on album art)
    artistCatalog = dict()

    artistAlbums = []
    albumList = []
    albumCount = 1
    
    # grabs album names and info given the passed-in list of albums
    for album in albums:
        albumID = album['id']
        albumArt = album['images'][0]['url']

        songs = spotify.album_tracks(albumID)
        songs = songs['items']
        tempList = []

        # see artistCatalog initialization for meaning of each value in songInfo
        for song in songs:
            songInfo = []
            songInfo.append(song['name'])
            songInfo.append(0)
            songInfo.append(song['uri'])
            songInfo.append(albumArt)

            tempList.append(songInfo)
            songCount += 1
        
        if (album['name'] in albumList):
            tempName = album['name'] + " Duplicate " + str(albumCount)
            albumCount += 1
            artistCatalog.update({tempName: tempList})
        else:
            artistCatalog.update({album['name']: tempList})
        albumList.append(album['name'])
    
    return artistCatalog


def printSongs(artistCatalog):
    index = 0

    for album in artistCatalog:
        print("ALBUM: " + album)
        for songInfo in artistCatalog[album]:
            print(str(index) + ": " + songInfo[0])
            index += 1
        print()
    print()

def getSongCount(artistCatalog):
    songCount = 0
    for album in artistCatalog:
        songCount += len(artistCatalog[album])
    return songCount

def searchArtist():
    searchArtist = input("Search for an Artist: ")

    # searches name of artist given previous input using Spotipy
    searchResults = spotify.search(searchArtist,1,0,"artist")
    artist = searchResults['artists']['items'][0]
    print("Found: ", artist['name'])
    artistID = artist['id']

    # creates list of albums from the artist that was found
    albums = spotify.artist_albums(artistID)
    albums = albums['items']

    artistCatalog = initLists(albums, 0)

    printSongs(artistCatalog)

    return artistCatalog

            
def removeSongs(artistCatalog, songCount):
    while True:
        print("Input an Album Name (exactly) or a song number to remove it from the sorter! Press enter to continue with the sort.")
        print("Or, type '-1' to view the list of songs!")
        songRemove = input("Album Name or Song Number: ")
        print()
        if songRemove == "":
            break
        else:
            if songRemove.isdigit() or (songRemove.startswith('-') and songRemove[1:].isdigit()):
                if (int(songRemove) > songCount):
                    print("Error! Song number higher than number of songs listed.")
                elif (int(songRemove) < -1):
                    print("Error! Out of range of inputs.")
                elif (int(songRemove) == -1):
                    printSongs(artistCatalog)
                else:
                    for album in artistCatalog:
                        for songInfo in artistCatalog[album]:
                            if songInfo[0] == songRemove:
                                artistCatalog[album].remove(songInfo)
                                songCount-=1
                        
                    for album in artistCatalog:
                        print(artistCatalog[album])
                        if artistCatalog[album] == []:
                            del artistCatalog[album] 

                    print("Successfully Removed:", songRemove)
                    print()
            else:               
                if songRemove in artistCatalog:
                    songCount -= len(artistCatalog[songRemove])
                    del artistCatalog[songRemove]
                    print()
                    print("Successfully Removed:", songRemove)
                    print()
                else:
                    print()
                    print("Could not find:", songRemove)
                    print()
                

def sort():
    print()

main()