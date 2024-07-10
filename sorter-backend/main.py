import spotipy
import pandas as pd
import spotipy.util as util
from spotipy.oauth2 import SpotifyClientCredentials

spotify = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials())

def main():
    # main program to start
    print("Welcome to the Spotify Song Sorter!")
    print()

    artistCatalog = searchArtist()

    artistCatalog = removeSongs(artistCatalog)
    
    sort(artistCatalog)


# Song Initialization Works, Need to Figure out Naming Convention


def initLists(albums):
    songNames = []
    songAlbum = []
    songScores = []
    songURIs = []
    songArt = []
    
    for album in albums:
        albumID = album['id']
        albumArt = album['images'][0]['url']

        songs = spotify.album_tracks(albumID)
        songs = songs['items']

        for song in songs:
            songNames.append(song['name'])
            songScores.append(0)
            songURIs.append(song['uri'])
            songArt.append(albumArt)
            songAlbum.append(album['name'])

    beginningWeight = 1/(len(songNames))
    weightList = []
    for x in range(0, len(songNames)):
        weightList.append(beginningWeight)

    songDict = {'name':songNames,
                     'album':songAlbum,
                     'score':songScores,
                     'uri':songURIs,
                     'art':songArt,
                     'weight':weightList}

    artistCatalog = pd.DataFrame(songDict)
    return artistCatalog

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

    artistCatalog = initLists(albums)

    print(artistCatalog.to_string())

    return artistCatalog

            
def removeSongs(artistCatalog):
    while True:
        print()
        print("Input an Album Name (exactly) or a song number to remove it from the sorter! Press enter to continue with the sort.")
        songRemove = input("Album Name or Song Number: ")
        print()
        if songRemove == "":
            break
        else:
            if songRemove.isdigit() or (songRemove.startswith('-') and songRemove[1:].isdigit()):
                if (int(songRemove) >= len(artistCatalog.index)):
                    print("Error! Song number higher than number of songs listed.")
                elif (int(songRemove) < 0):
                    print("Error! Out of range of inputs.")
                else:
                    artistCatalog.drop(index=int(songRemove), inplace=True)

                    print("Successfully Removed:", songRemove)
                    print()
                    artistCatalog.reset_index(drop=True, inplace=True)
                    print(artistCatalog.to_string())
            else:
                mask = artistCatalog['album'] == songRemove
                newCatalog = artistCatalog[~mask]
                if newCatalog.equals(artistCatalog):
                    print()
                    print("Could not find:", songRemove)
                    print()
                else:
                    print()
                    print("Successfully Removed:", songRemove)
                    print()
                    artistCatalog = newCatalog
                    artistCatalog.reset_index(drop=True, inplace=True)
                    print(artistCatalog.to_string())
    return artistCatalog

def sort(artistCatalog):
    artistCatalog.sort_values(by=['score'])
    #duplicatedList = artistCatalog.duplicated(subset=['score']).to_list()

    #scoreCounts = artistCatalog.value_counts("score")
    
    #while (len(scoreCounts) != len(artistCatalog.index)):

    #while (True in duplicatedList):
        #print()
    print()


main()