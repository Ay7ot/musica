import React from 'react'
import { useEffect, useState } from 'react'
import Home from './Home'
import PlayerControl from './playerControl'
import NewPlayer from './NewPlayer'

export default function Login({width, logout, isToggled, handleToggle, CLIENT_ID, REDIRECT_URI, AUTH_ENDPOINT, RESPONSE_TYPE, token, spotifyApi, audioElem, songs, nextTrack, prevTrack, setisPlaying, isPlaying, currentSong, setCurrentSong, onPlaying, playPause }) {

    spotifyApi.setAccessToken(token)

    const [newTracks, setNewTracks] = useState([])
    const [playingTrack, setPlayingTrack] = useState()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const scope = 'streaming user-read-private user-read-email user-library-read user-library-modify user-modify-playback-state user-read-playback-state user-read-recently-played';

    useEffect(() => {
        setLoading(true);
        spotifyApi.getMyRecentlyPlayedTracks()
        .then(response => {
            // console.log(response.items[0])
            setNewTracks(response.items.map(item=>item.track.uri))
            setPlayingTrack(response.items[0].track.uri);
            setLoading(false);
        }).catch(error => {
            setError(error);
            setLoading(false);
        });
        
    }, [error]);

    // console.log(newTracks)
    
    return (
        
        <>
            {!token ?
                <div className='bg-background min-h-screen flex flex-col items-center justify-center'>
                    <h1 className='font-bold'>AYDOT MUSICA</h1> 
                    {/* added scope. might remove it */}
                    <a className='text-white text-lg bg-green px-5 py-3 rounded-lg mt-5' href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${scope}`}>Login With Spotify</a>
                </div>
                :
                <>
                    <Home  width={width} isToggled={isToggled} handleToggle={handleToggle} token={token} spotifyApi={spotifyApi} logout={logout}/>
                    {/* {!isToggled &&  <PlayerControl width={width} songs={songs} setisPlaying={setisPlaying} isPlaying={isPlaying} currentSong={currentSong} setCurrentSong={setCurrentSong} audioElem={audioElem} onPlaying={onPlaying} nextTrack={nextTrack} prevTrack={prevTrack} playPause={playPause}/>} */}
                    <NewPlayer token={token} trackuri={newTracks}/>
                </>
            }
        </>
        
    )
}
