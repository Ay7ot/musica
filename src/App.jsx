import { useState, useEffect, useRef } from 'react'
import Home from './Home'
import Collection from './Collection'
import ViewAlbum from './ViewAlbum'
import PlayerMobilePage from './playerMobilePage'
import {Routes, Route} from 'react-router-dom'
import useWindowDimensions from './windowDimensions'
import PlayerControl from './playerControl'


function App() {
  
  const audioElem = useRef()

  const { height, width } = useWindowDimensions()
  const [isToggled, setIsToggled] = useState(false);
      
  const [songs, setSongs] = useState([{audio: ''}])
  const [unChangedSongs, setUnChangedSongs] = useState()
  const [isPlaying, setisPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState('')
  const [isShuffled, setIsShuffled] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)

  useEffect(()=>{
      fetch('https://musica-api.onrender.com/popular')
          .then((res)=>res.json())
          .then((data)=>setSongs(data))
  },[])

  useEffect(()=>{
    setCurrentSong(songs[0])
  },[songs])

      
  useEffect(()=>{
    if(isPlaying){
        audioElem.current.play()
    }else{
        audioElem.current.pause()
    }
  },[isPlaying, currentSong])

  function handleToggle(){
    setIsToggled(prevToggle=>!prevToggle)
  }

  function onPlaying(){
    const duration = audioElem.current.duration
    const ct = audioElem.current.currentTime

    setCurrentSong({...currentSong, progress: ct / duration * 100, length: duration})
  }

  function playPause(){
    setisPlaying(!isPlaying)
  }

  function songEnded(){
    nextTrack()
  } 

  function nextTrack(){
    const index = songs.findIndex(x=>x.title === currentSong.title)
    if (index===songs.length-1){
        setCurrentSong(songs[0])
    }else{
        setCurrentSong(songs[index+1])
    }
    setisPlaying(true)
  }
  
  function prevTrack(){
    const index = songs.findIndex(x=>x.title === currentSong.title)
    if (index===0){
        setCurrentSong(songs[songs.length-1])
    }else{
        setCurrentSong(songs[index-1])
    }
    setisPlaying(true)
  }

  function shuffle(){ 
    setIsShuffled(!isShuffled) 
    setUnChangedSongs(songs)
    if(!isShuffled){
      const otherSongs = songs.filter(song => song.id !== currentSong.id)
      const shuffledSongs = otherSongs.sort(() => Math.random() - 0.5)
      setSongs([currentSong, ...shuffledSongs])  
    }else{
      const otherSongs = unChangedSongs.filter(song => song.id !== currentSong.id)
      setSongs([currentSong, ...otherSongs])
    }
  }

  console.log(songs)

  function repeatOne(){
    
  }

  return (
    <>
    <audio src={songs.length > 1 ? currentSong.audio : ''} ref={audioElem} onEnded={songEnded} onTimeUpdate={onPlaying}/>
    <Routes>
      <Route path='/' 
        element={
        <>
          <Home width={width} isToggled={isToggled} handleToggle={handleToggle}/>
          <PlayerControl width={width} songs={songs} setisPlaying={setisPlaying} isPlaying={isPlaying} currentSong={currentSong} setCurrentSong={setCurrentSong} audioElem={audioElem} onPlaying={onPlaying} nextTrack={nextTrack} prevTrack={prevTrack} playPause={playPause} shuffle={shuffle}/>
        </>
        }
      />
      <Route path='/collection' element={
        <>
          <Collection width={width} height={height} isToggled={isToggled} handleToggle={handleToggle}/>
          <PlayerControl width={width} songs={songs} setisPlaying={setisPlaying} isPlaying={isPlaying} currentSong={currentSong} setCurrentSong={setCurrentSong} audioElem={audioElem} onPlaying={onPlaying} nextTrack={nextTrack} prevTrack={prevTrack} playPause={playPause}/>
        </>
        }
      />
      <Route path='/viewalbum' element={
        <>
          <ViewAlbum width={width} height={height} isToggled={isToggled} handleToggle={handleToggle} setCurrentSong={setCurrentSong} setSongs={setSongs} setisPlaying={setisPlaying} isPlaying={isPlaying}/>
          <PlayerControl width={width} songs={songs} setisPlaying={setisPlaying} isPlaying={isPlaying} currentSong={currentSong} setCurrentSong={setCurrentSong} audioElem={audioElem} onPlaying={onPlaying} nextTrack={nextTrack} prevTrack={prevTrack} playPause={playPause}/>
        </>
        }
      />
      <Route path = '/playerMobile' element= {<PlayerMobilePage height={height} songs={songs} setisPlaying={setisPlaying} isPlaying={isPlaying} currentSong={currentSong} setCurrentSong={setCurrentSong} audioElem={audioElem} onPlaying={onPlaying} nextTrack={nextTrack} prevTrack={prevTrack} playPause={playPause} shuffle={shuffle} isShuffled={isShuffled}/> }/>
    </Routes>
    </>
  )
}

export default App
