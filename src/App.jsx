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
  const [newAlbum, setNewAlbum] = useState([])
  const [unChangedSongs, setUnChangedSongs] = useState()
  const [isPlaying, setisPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState('')
  const [isShuffled, setIsShuffled] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)
  const [myCollections, setMyCollections] = useState([])
  const [myLikes, setMyLikes] = useState([])

  useEffect(()=>{
      fetch('https://musica-api.onrender.com/popular')
          .then((res)=>res.json())
          .then((data)=>setSongs(data.map(data=>({...data, isLiked: false}))))
  },[])

  
  useEffect(()=>{
    fetch('https://musica-api.onrender.com/playlist')
        .then((res)=>res.json())
        .then((data)=>setNewAlbum(data.map(playlist=>{return {...playlist, isFavorite: false, playListLength: '2:10:00', heart1: 'Heart2.png', heart2: 'HeartFull.png', addedToCollection: false, files: playlist.files.map(item=>({...item, isLiked: false}))}})))
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
    if(!isRepeat){
      nextTrack()
    }else{
      audioElem.current.currentTime = 0
      setCurrentSong(currentSong)
    }
  } 

  function nextTrack(){
    const index = songs.findIndex(x=>x.title === currentSong.title)
    if (index===songs.length-1 && !isRepeat){
        setCurrentSong(songs[0])
    }else if(!isRepeat){
        setCurrentSong(songs[index+1])
    }else if(isRepeat){
      audioElem.current.currentTime= 0
      setCurrentSong(currentSong)
    }
    setisPlaying(true)
  }
  
  function prevTrack(){
    const index = songs.findIndex(x=>x.title === currentSong.title)
    if(index===0 && !isRepeat){
      setCurrentSong(songs[songs.length-1])
    }else if(index !== 0 && !isRepeat){
      setCurrentSong(songs[index-1])
    }else if(isRepeat){
      audioElem.current.currentTime= 0
      setCurrentSong(currentSong)
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
      const nowPlaying = unChangedSongs.find(song => song.id === currentSong.id)
      const index = unChangedSongs.indexOf(nowPlaying)
      const newSlicedArray1 = unChangedSongs.slice(index)
      const newSlicedArray2 = unChangedSongs.filter(item=>!newSlicedArray1.includes(item))
      setSongs([...newSlicedArray1, ...newSlicedArray2])
    }
  }

  function repeatOne(){
    setIsRepeat(!isRepeat)
    setCurrentSong(currentSong)
  }

  function changeCollection(id){

  }

  return (
    <>
    <audio src={songs.length > 1 ? currentSong.audio : ''} ref={audioElem} onEnded={songEnded} onTimeUpdate={onPlaying}/>
    <Routes>
      <Route path='/' 
        element={
        <>
          <Home width={width} isToggled={isToggled} handleToggle={handleToggle} myCollections={myCollections} setMyCollections={setMyCollections} myLikes={myLikes} newAlbum={newAlbum} setNewAlbum={setNewAlbum}/>
          <PlayerControl width={width} isToggled={isToggled} songs={songs} setisPlaying={setisPlaying} isPlaying={isPlaying} currentSong={currentSong} setCurrentSong={setCurrentSong} audioElem={audioElem} onPlaying={onPlaying} nextTrack={nextTrack} prevTrack={prevTrack} playPause={playPause} shuffle={shuffle} isShuffled={isShuffled} repeatOne={repeatOne} isRepeat={isRepeat}/>
        </>
        }
      />
      <Route path='/collection' element={
        <>
          <Collection width={width} height={height} isToggled={isToggled} handleToggle={handleToggle} myCollections={myCollections} setMyCollections={setMyCollections} myLikes={myLikes} setMyLikes={setMyLikes}/>
          <PlayerControl width={width} isToggled={isToggled} songs={songs} setisPlaying={setisPlaying} isPlaying={isPlaying} currentSong={currentSong} setCurrentSong={setCurrentSong} audioElem={audioElem} onPlaying={onPlaying} nextTrack={nextTrack} prevTrack={prevTrack} playPause={playPause} shuffle={shuffle} isShuffled={isShuffled} repeatOne={repeatOne} isRepeat={isRepeat}/>
        </>
        }
      />
      <Route path='/viewalbum' element={
        <>
          <ViewAlbum width={width} height={height} isToggled={isToggled} handleToggle={handleToggle} setCurrentSong={setCurrentSong} songs={songs} setSongs={setSongs} setisPlaying={setisPlaying} isPlaying={isPlaying} myCollections={myCollections} setMyCollections={setMyCollections} myLikes={myLikes} setMyLikes={setMyLikes} newAlbum={newAlbum} setNewAlbum={setNewAlbum}/>
          <PlayerControl width={width} isToggled={isToggled} songs={songs} setisPlaying={setisPlaying} isPlaying={isPlaying} currentSong={currentSong} setCurrentSong={setCurrentSong} audioElem={audioElem} onPlaying={onPlaying} nextTrack={nextTrack} prevTrack={prevTrack} playPause={playPause} shuffle={shuffle} isShuffled={isShuffled} repeatOne={repeatOne} isRepeat={isRepeat}/>
        </>
        }
      />
      <Route path = '/playerMobile' element= {<PlayerMobilePage height={height} songs={songs} myLikes={myLikes} setMyLikes={setMyLikes} setisPlaying={setisPlaying} isPlaying={isPlaying} currentSong={currentSong} setCurrentSong={setCurrentSong} audioElem={audioElem} onPlaying={onPlaying} nextTrack={nextTrack} prevTrack={prevTrack} playPause={playPause} shuffle={shuffle} isShuffled={isShuffled} repeatOne={repeatOne} isRepeat={isRepeat}/> }/>
    </Routes>
    </>
  )
}

export default App
