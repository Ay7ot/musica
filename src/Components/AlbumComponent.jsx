import React from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const AlbumComponent = ({ playlist, width, setSongs, currentSong, setCurrentSong, isPlaying, setisPlaying, token, spotifyApi }) => {

    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    
    function playSong(id){
        setSongs(tracks)
        setisPlaying(true)
        setCurrentSong(tracks.find(item=>{
            if(id === item.track.id){
                return item.track
            }
        }))
    }

    useEffect(() => {
        setLoading(true);
        spotifyApi.getPlaylistTracks(playlist.id)
          .then(response => {
            setTracks(response.items);
            setLoading(false);
          }).catch(error => {
            setError(error);
            setLoading(false);
          });
    }, [playlist.id]);

    if (loading) {
        return <p className='text-yellow text-lg'>Loading...</p>;
    }
    
    if (error) {
        return <p className='text-yellow text-lg'>Error: {error.message}</p>;
    }

    return (
        <div className='mt-9 lg:mt-0 lg:left-[10%] lg:-top-[400px] lg:w-[85vw] mb-[90px] lg:mb-0'>
              <div className='lg:flex'>
                <img src={playlist.images[0].url} className='rounded-xl h-[350px] w-full max-w-[350px]'/>
                <div className='lg:ml-7 lg:mt-[80px]'>
                    <div className='lg:w-[500px]'>
                        <h2 className='text-[#A4C7C6] text-[32px] font-bold mt-6'>{playlist.name}</h2>
                        <p className='text-gray-dark text-sm'>{playlist.description}</p>
                        <p className='text-gray-dark text-sm mt-3'>{tracks.length} Songs - 16 Hours</p>
                    </div>
                    <div className='flex justify-between mt-6 md:w-[500px] lg:w-[400px]'>
                        <div className='flex items-center cursor-pointer bg-[#424547] rounded-full px-[15px] py-[10px]'>
                            <img src='playActive.png' className='mr-2'/>
                            <p className='text-white text-xs'>Play all</p>
                        </div>
                        <div className='flex items-center cursor-pointer bg-[#424547] rounded-full px-[15px] py-[10px]'>
                            <img src='addCollection.png' className='mr-2'/>
                            <p className='text-white text-xs'>Add to Collection</p>
                        </div>
                        <div className='flex items-center cursor-pointer bg-[#424547] rounded-full px-[15px] py-[10px]'>
                            <img src='unlikedAlbum.png' className='mr-2'/>
                            <p className='text-white text-xs'>Like</p>
                        </div>
                    </div>
                </div>
              </div>
              {
                width >= 1024 ?
                <div className='mt-12'>
                    {tracks.map(item=>{
                        return (
                            <div className='flex items-center justify-between bg-[#2c2f31] p-2 rounded-xl mb-4' key={item.track.id} onClick={()=>playSong(item.track.id)}>
                                <div className='flex items-center'>
                                    <img src={item.track.album.images[0].url} className='w-[40px] h-[40px] rounded-lg'/>
                                    <img src='trackHeart.png' className='hidden lg:block ml-5'/>
                                </div>
                                <div className='w-[300px] 2xl:w-[500px] flex justify-between'>
                                    <p className='text-sm text-white font-thin tracking-wide mb-0'>{item.track.name}</p>
                                    <p className='text-xs lg:text-sm text-white font-thin tracking-wider'>{item.track.artists[0].name}</p>
                                </div>
                                <div className='flex items-center lg:flex-row-reverse lg:items-center'>
                                    <i className='text-yellow mb-[6px]'><FaEllipsisV /></i>
                                    <p className='text-sm font-thin text-white mr-20'>{(item.track.duration_ms / 1000 / 60).toFixed(2)}</p>
                                </div>
                            </div>
                        )
                    })}
                </div> : 
                <div className='mt-6'>
                    {tracks.map(item=>{
                        return (
                            <div className='flex items-center justify-between bg-[#2c2f31] p-2 rounded-xl mb-4' key={item.track.id} onClick={()=>playSong(item.track.id)}>
                                <div className='flex items-center'>
                                    <div className='flex items-center'>
                                        <img src={item.track.album.images[0].url} className='w-[40px] h-[40px] rounded-lg'/>
                                    </div>
                                    <div className='ml-3 flex flex-col'>
                                        <p className='text-sm text-white font-thin tracking-wide mb-[6px]'>{item.track.name}</p>
                                        <p className='text-xs text-white font-thin tracking-wider'>{item.track.artists[0].name}</p>
                                    </div>
                                </div>
                                <div className='flex-col flex items-center'>
                                    <i className='text-yellow mb-[6px]'><FaEllipsisV /></i>
                                    <p className='text-sm font-thin text-white'>{(item.track.duration_ms / 1000 / 60).toFixed(2)}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
              }
        </div>
    );
}

export default AlbumComponent;
