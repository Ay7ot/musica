import React from 'react';
import { FaEllipsisV, FaHeart } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const AlbumComponent = ({ playlist, width, songs, setSongs, setCurrentSong, isPlaying, setisPlaying, myCollections, setMyCollections, myLikes, setMyLikes, newAlbum, setNewAlbum }) => {

    const [newPlaylist, setNewPlaylist] = useState(playlist)

    function playSong(id){
        setSongs(newPlaylist.files)
        setisPlaying(true)
        setCurrentSong(newPlaylist.files.find(item=>{
            if(id === item.id){
                return item.audio
            }
        }))
    }

    function addtoCollection(id){
        if(id===newPlaylist.id){

            setNewPlaylist(prevPlaylist=>{
                return {
                    ...prevPlaylist,
                    addedToCollection: !prevPlaylist.addedToCollection
                }
            })
            setNewAlbum(prevAlbum=>{
                return prevAlbum.map(item=>{
                    if(id===item.id){
                        return {
                            ...item,
                            addedToCollection: !item.addedToCollection
                        }
                    } else return {...item}
                })
            })

            if(!newPlaylist.addedToCollection){
                setMyCollections(prevCollections=>{
                return [...prevCollections, {...newPlaylist, addedToCollection: true}]
                })  
            } else{
                setMyCollections(prevCollections=>{
                    const index = prevCollections.indexOf(newPlaylist)
                    const newArray = prevCollections.splice(index, 1)
                    return newArray
                })
            }
       }   
    }

    function likeSong(id, name){

        setNewPlaylist(prevPlaylist=>{
            return {
                ...prevPlaylist,
                files: prevPlaylist.files.map(item=>{
                    if(item.id === id){
                    return {
                        ...item,
                        isLiked: !item.isLiked
                    }
                    }else return {...item}
                })
            }
        })
       setNewAlbum(prevAlbum=>prevAlbum.map(item=>{
            if(item.id !== newPlaylist.id){
                return {...item}
            }else{
                return {
                    ...item,
                    files: item.files.map(song=>{
                        if(song.id === id){
                            return {...song, isLiked: !song.isLiked}
                        }else return {...item}
                    })
                }
            }
       }))
       const clickedSong = newPlaylist.files.find(item=>item.title === name)
       console.log(clickedSong)
       if(!clickedSong.isLiked){
            setMyLikes(likes=> [...likes, {...clickedSong, isLiked: !clickedSong.isLiked}])
       }else {
            setMyLikes(likes=>{
                const index = likes.indexOf(likes.title === name)
                const newArray = likes.splice(index, 1)
                return newArray
            })
       }
    }

    return (
        <div className='mt-9 lg:mt-0 lg:left-[10%] lg:-top-[400px] lg:w-[85vw] mb-[90px] lg:mb-0'>
              <div className='lg:flex'>
                <img src={newPlaylist.cover} className='rounded-xl h-[350px] w-full lg:max-w-[350px]'/>
                <div className='lg:ml-7 lg:mt-[80px]'>
                    <div className='lg:w-[500px]'>
                        <h2 className='text-[#A4C7C6] text-[32px] font-bold mt-6'>{newPlaylist.title}</h2>
                        <p className='text-gray-dark text-sm'>{newPlaylist.info}</p>
                        <p className='text-gray-dark text-sm mt-3'>{playlist.files.length} Songs - 16 Hours</p>
                    </div>
                    <div className='flex justify-between mt-6 md:w-[500px] lg:w-[400px]'>
                        <div className='flex items-center cursor-pointer bg-[#424547] rounded-full px-[10px] py-[10px]'>
                            <img src='playActive.png' className='mr-2'/>
                            <p className='text-white text-xs'>Play all</p>
                        </div>
                        <div className={`flex items-center cursor-pointer ${newPlaylist.addedToCollection ? 'bg-gray' : 'bg-[#424547]'} rounded-full px-[10px] py-[10px]`} onClick={()=>addtoCollection(newPlaylist.id)}>
                            <img src='addCollection.png' className='mr-2'/>
                            <p className='text-white text-xs'>{newPlaylist.addedToCollection ? 'Added to Collection' : 'Add to Collection'}</p>
                        </div>
                        <div className='flex items-center cursor-pointer bg-[#424547] rounded-full px-[10px] py-[10px]'>
                            <img src='unlikedAlbum.png' className='mr-2'/>
                            <p className='text-white text-xs'>Like</p>
                        </div>
                    </div>
                </div>
              </div>
              {
                width >= 1024 ?
                <div className='mt-12'>
                    {newPlaylist.files.map(item=>{
                        return (
                            <div className='flex items-center justify-between bg-[#2c2f31] p-2 rounded-xl mb-4' key={item.id}>
                                <div className='flex items-center'>
                                    <img src={item.cover} className='w-[40px] rounded-lg'/>
                                    <i onClick={()=>likeSong(item.id, item.title)} className={`hidden lg:block ml-5 ${item.isLiked ? 'text-yellow' : 'text-gray-dark'}`}><FaHeart /></i>
                                </div>
                                <div className='w-[300px] 2xl:w-[500px] flex justify-between' onClick={()=>playSong(item.id)}>
                                    <p className='text-sm text-white font-thin tracking-wide mb-0'>{item.title}</p>
                                    <p className='text-xs lg:text-sm text-white font-thin tracking-wider'>Single</p>
                                </div>
                                <div className='flex items-center lg:flex-row-reverse lg:items-center'>
                                    <i className='text-yellow mb-[6px]'><FaEllipsisV /></i>
                                    <p className='text-sm font-thin text-white mr-20'>{item.duration}</p>
                                </div>
                            </div>
                        )
                    })}
                </div> : 
                <div className='mt-6'>
                    {newPlaylist.files.map(item=>{
                        return (
                            <div className='flex items-center justify-between bg-[#2c2f31] p-2 rounded-xl mb-4' key={item.id}>
                                <div className='flex items-center'>
                                    <div className='flex items-center'>
                                        <img src={item.cover} className='w-[40px] rounded-lg'/>
                                    </div>
                                    <div className='ml-3 flex flex-col'  onClick={()=>playSong(item.id)}>
                                        <p className='text-sm text-white font-thin tracking-wide mb-[6px]'>{item.title}</p>
                                        <p className='text-xs text-white font-thin tracking-wider'>Single</p>
                                    </div>
                                </div>
                                <div className='flex-col flex items-center'>
                                    <i className='text-yellow mb-[6px]'><FaEllipsisV /></i>
                                    <p className='text-sm font-thin text-white'>{item.duration}</p>
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
