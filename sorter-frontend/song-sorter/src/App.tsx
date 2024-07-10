import everythingikaboutlove from '/src/assets/imgs/everythingikaboutlove.jpg'
import bewitchedgoddessed from '/src/assets/imgs/bewitchedgoddessed.jpg'
import './App.css'

function App() {

  return (
    <>
      <div className = 'main-container'>
        <p className = 'title'>Spotify Song Sorter</p>
        <div className = 'song-choosing-box'>
          <div className = 'song-display-1'>
            <img className = 'image' src = {everythingikaboutlove}></img>
            <p className = 'song-name'>Song 1</p>      
          </div>

          <div className = 'song-display-2'>
            <img className = 'image' src = {bewitchedgoddessed}></img>
            <p className = 'song-name'>Song 2</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
