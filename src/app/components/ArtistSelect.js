import React from 'react';

export default function ArtistSelect({ albums }) {
  const handleSongSelection = (selectedSong) => {
    // Logic for ranking songs
  };


  return (
    <div className="song-comparison">
      {albums.map( (album) => (
        <div key={album.id} className="song" onClick={() => handleSongSelection(song)}>
          <img src={album.images.at(0).url} alt={album.name} />
          <p>{album.name}</p>
        </div>
      ))}
    </div>
  );
}
