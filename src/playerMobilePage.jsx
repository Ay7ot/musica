import React from 'react'
import PlayerLength from './Components/PlayerLength'
import VolumeSlider from './Components/Volume'
import { FaPause, FaPlay, FaForward, FaBackward, FaHeart, FaRandom } from 'react-icons/fa'
import { MdRepeat, MdShuffle, MdRepeatOne } from 'react-icons/md'

export default function PlayerMobilePage({ songs, height, setisPlaying, nextTrack, prevTrack, isPlaying, currentSong, shuffle, isShuffled, isRepeat, repeatOne, myLikes, setMyLikes, setCurrentSong, audioElem, onPlaying, playPause }) {
//  console.log(currentSong)
  function addToLikes(id){
    setCurrentSong(song=>{
      return {...song, isLiked: !song.isLiked}
    })
    if(!currentSong.isLiked){
      setMyLikes(likes=> [...likes, {...currentSong, isLiked: !currentSong.isLiked}])
    }else {
      setMyLikes(likes=>{
          const index = likes.indexOf(likes.title === name)
          const newArray = likes.splice(index, 1)
          return newArray
      })
    }
  }
  console.log(myLikes)
 
 return (
    <div className='bg-background min-h-screen py-10 px-8'>
        <img src={currentSong.cover} className={`${height > 690 ? 'mt-20' : 'mt-10'} w-full h-[350px]`}/>
        <div className='flex justify-between mt-10 mb-6 items-center'>
            <div>
                <p className='text-white font-bold text-xl tracking-wide'>{currentSong.title}</p>
                <p className='text-gray font-medium'>{currentSong.artist}</p>
            </div>
            <i className={`${currentSong.isLiked ? 'text-yellow' : 'text-gray-dark'} text-[2rem]`} onClick={()=>addToLikes(currentSong.id)}>
              <FaHeart />
            </i>
        </div>
        <PlayerLength currentSong={currentSong} isPlaying={isPlaying} onPlaying={onPlaying} audioElem={audioElem}/>
        <div className='my-10 flex justify-between items-center'>
          <i className={`${isShuffled ? 'text-yellow' : 'text-white'} text-[1.5rem]`} onClick={shuffle}><MdShuffle /></i>
          <i className='text-white text-[2rem]' onClick={prevTrack}><FaBackward /></i>
          <i className='text-white text-[2rem]' onClick={playPause}>{isPlaying ? <FaPause /> : <FaPlay />}</i>
          <i className='text-white text-[2rem]' onClick={nextTrack}><FaForward /></i>
          <i className={`${isRepeat ? 'text-yellow' : 'text-white'} text-[1.5rem]`} onClick={repeatOne}>{isRepeat ? <MdRepeatOne /> : <MdRepeat />}</i>
        </div>
        <div className='flex items-center'>
            <img src='volume-high.png' className='mr-5'/>
            <VolumeSlider audioElem={audioElem}/>
        </div>
    </div>
  )
}
