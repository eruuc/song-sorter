import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

kendrick_lamar_uri = 'spotify:artist:2YZyLoL8N0Wb9xBt1NhZWg'
spotify = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials())

results = spotify.artist_albums(kendrick_lamar_uri, album_type='album')
albums = results['items']
while results['next']:
    results = spotify.next(results)
    albums.extend(results['items'])

for album in albums:
    print(album['name'])
    album_id = album['id']
    album_songs = spotify.album_tracks(album_id)
    print(album_songs)