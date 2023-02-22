import React from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'
import {FaPause, FaPlay, FaForward, FaBackward} from 'react-icons/fa'

export default function NewPlayer({token, trackuri}) {
    if(!token) return null
    return (
      <div className="fixed bottom-0 w-[100vw] backdrop-blur-md">
        
        <SpotifyPlayer 
          token={token}
          showSaveIcon
          uris={trackuri ? trackuri[0] : []}
          styles={{
            bgColor: 'rgba(255, 255, 255, 0.1)',
            sliderColor: '#FACD66',
            sliderHandleColor: '#FACD66',
            color: '#FACD66',
            trackNameColor: '#EFEEE0'
          }}
          autoPlay={true}
          // offset={50000}
        />
    </div>
  )
}
