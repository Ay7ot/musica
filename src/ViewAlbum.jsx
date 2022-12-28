import NavMobile from "./Components/NavMobile";
import NavToggled from "./Components/NavToggled";
import Navbar from "./Components/Navbar";
import PlayerControl from "./playerControl";
// import { useState, useEffect} from "react";
import AlbumComponent from "./Components/AlbumComponent";
import { useLocation } from 'react-router-dom';

function ViewAlbum({ isToggled, handleToggle, width, setCurrentSong, setSongs, isPlaying, setisPlaying, myCollections, setMyCollections, myLikes, setMyLikes, newAlbum, setNewAlbum }) {

    const location = useLocation()
    
    return (  
        <>
        <div className={isToggled ? "h-screen bg-background font-serif" : "hidden"}>
            <NavToggled isToggled={isToggled} handleToggle={handleToggle}/>
        </div>
        <div className={isToggled ? 'hidden' : ''}>
            <div className={isToggled ? "hidden" : "bg-background font-serif w-screen relative pt-[1.5rem] px-[1rem] overflow-x-hidden h-full min-h-screen scroll-smooth"}>
                {width < 1024 ? <NavMobile isToggled={isToggled} handleToggle={handleToggle}/> : <Navbar />}
                <div className={width >= 1024 ? "absolute top-[115px] left-[10%] xl:left-[8%] lg:pb-[120px]" : 'mt-10'}>
                    <div className="lg:w-[85vw]">
                        <AlbumComponent playlist={location.state} width={width} setCurrentSong={setCurrentSong} setSongs={setSongs} isPlaying={isPlaying} setisPlaying={setisPlaying} myCollections={myCollections} setMyCollections={setMyCollections} myLikes={myLikes} setMyLikes={setMyLikes} newAlbum={newAlbum} setNewAlbum={setNewAlbum}/>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}

export default ViewAlbum;