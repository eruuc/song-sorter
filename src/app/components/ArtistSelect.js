import React, { useEffect, useState } from "react"
import PairAdjuster from "./PairAdjuster";

export default function ArtistSelect({ songList, initAlbumList }) {
  let songs = new Map();

  const [albumList, setAlbumList] = useState([initAlbumList])

  // if (albumList === 0) {
  //   console.log(songList)
  //   console.log("gdi.")
  // } else {
  //   console.log(songList)
  //   console.log(albumList)
  //   console.log(albumList.at(0))
  // }

  const [albums, setAlbums] = useState([])

  const [songMap, setSongMap] = useState(new Map(songList.map(song => [song.name, 0])));
  const [albumMap, setAlbumMap] = useState(new Map(albumList.map(album => [album, 0])))
  const [pairs, setPairs] = useState([]);
  const [isUnique, setIsUnique] = useState(false);



  useEffect(() => {
    checkUniquenessAndGetPairs();
  }, [albumMap]);

  const checkUniquenessAndGetPairs = () => {
    if (checkUniqueValues(albumMap)) {
      setIsUnique(true);
    } else {
      const newPairs = getRandomPairs(albumMap);
      setPairs(newPairs);
    }
  };

  const checkUniqueValues = (map) => {
    const values = Array.from(map.values());
    return new Set(values).size === values.length;
  };

  const getRandomPairs = (map) => {
    const valueGroups = {};
    map.forEach((value, key) => {
      if (!valueGroups[value]) {
        valueGroups[value] = [];
      }
      valueGroups[value].push(key);
    });

    const pairs = [];
    for (const [value, keys] of Object.entries(valueGroups)) {
      if (keys.length > 1) {
        const randomIndex1 = Math.floor(Math.random() * keys.length);
        let randomIndex2 = Math.floor(Math.random() * (keys.length - 1));
        if (randomIndex2 >= randomIndex1) randomIndex2 += 1;
        pairs.push([keys[randomIndex1], keys[randomIndex2]]);
      }
    }
    return pairs;
  };

  const updateMap = (key1, key2, valueChange1, valueChange2) => {
    setSongMap(prevMap => {
      const newMap = new Map(prevMap);
      newMap.set(key1, newMap.get(key1) + valueChange1);
      newMap.set(key2, newMap.get(key2) + valueChange2);
      return newMap;
    });
  };






  return (
    // <div className="song-comparison">
    //   {albums.length >= 0 && albums.slice(0,2).map( (album) => (
    //     <div key={album.id} className="song" onClick={() => console.log(album)}>
    //       <img src={album.images.at(0).url} alt={album.name} />
    //       <p>{album.name}</p>
    //     </div>
    //   ))}
    // </div>


    <div className="ranking">
    <h2>Rank Your Songs</h2>
    {isUnique ? (
      <h3>All values are unique!</h3>
    ) : (
      pairs.map(([key1, key2]) => (
        <PairAdjuster
          key={`${key1}-${key2}`}
          key1={key1}
          key2={key2}
          value1={albumMap.get(key1)}
          value2={albumMap.get(key2)}
          updateMap={updateMap}
        />
      ))
    )}
    <div className="ranked-songs">
      <h3>Ranked Songs:</h3>
      <ul>
        {Array.from(albumMap.entries()).map(([key, value], index) => (
          <li key={index}>
            {key}: {value}
          </li>
        ))}
      </ul>
    </div>
  </div>
  );
}
