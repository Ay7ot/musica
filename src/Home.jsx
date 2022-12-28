import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar"
import NavMobile from './Components/NavMobile'
import NavToggled from './Components/NavToggled'
import HomeHeader from "./Components/HomeHeader/HomeHeader";
import HomeRelease from "./Components/HomeBody/HomeRelease";
import HomeCategories from "./Components/HomeBody/HomeCategories";
import PlayerControl from "./playerControl";

function Home({ isToggled, handleToggle, width, newAlbum, setNewAlbum }) {

    return (  
        <>
            <div className={isToggled ? "h-screen bg-background font-serif" : "hidden"}>
                <NavToggled isToggled={isToggled} handleToggle={handleToggle}/>
            </div>
            <div className={isToggled ? 'hidden' : ''}>
                <div className={isToggled ? "hidden" : "bg-background font-serif w-screen relative pt-[1.5rem] px-[1rem] min-h-screen scroll-smooth"}>
                    {width < 1024 ? <NavMobile isToggled={isToggled} handleToggle={handleToggle}/> : <Navbar />}
                    <HomeHeader width={width} newAlbum={newAlbum} setNewAlbum={setNewAlbum}/>
                    <div className="lg:pl-24 xl:pr-10 2xl:pr-[6%] pb-[25%] sm:pb-[15%] lg:pb-[10%] 2xl:pb-[5%]">
                        <HomeRelease />
                        <HomeCategories />
                    </div>
                </div>
                
            </div>
        </>
    );
}

export default Home;
