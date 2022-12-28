import { useState, useEffect } from "react";
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

function HomeHeader({ width, newAlbum, setNewAlbum }) {    

    const settingsVertical = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 1000,
        autoplay: true, //modification
        autoplaySpeed: 4000,
        arrows: false,
        vertical: true,
        verticalSwiping: true
    }

    const settingsHorizontal = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 1000,
        autoplay: true, //modification
        autoplaySpeed: 4000,
        arrows: false, 
    }

    function setFavorite(id){
        setNewAlbum(prevAlbum=>prevAlbum.map(item=>{
           return item.id===id ? {...item, isFavorite: !item.isFavorite} : {...item}
        }))
    }

    return (  
        <section className={width >= 1024 ? 'relative flex' : ''}>
            <div className={width >= 1024 ? 
                "w-[55%] bg-blue absolute top-[-400px] overflow-hidden xl:h-[400px] left-[10%] xl:left-[8%] 2xl:left-[5%] flex justify-between rounded-3xl" : 
                " bg-blue h-[420px] rounded-2xl mt-7 w-full overflow-hidden"
            }>
                <div className={width>=1024 ? 'lg:p-[2rem]' : 'lg:p-[2rem] relative'}>
                    <img src={width>=1024 ? "Vector.svg" : "Vector2.svg"} className='absolute lg:-top-[4%] xl:-top-[10%] 2xl:-top-[20%] 2xl:-left-[10%] w-full'/>
                    <p className='text-white pt-5 ml-5'>Curated PlayList</p>
                    <h1 className='text-white text-[2rem] font-bold mt-[150px] lg:mt-[110px] xl:mt-[10%] ml-5'>R & B Hits</h1>
                    <p className='px-5 text-white xl:w-[80%] 2xl:w-[50%]'>
                        All mine, Lie again, Petty call me everyday,
                        Out of time, No love, Bad habit,
                        and so much more
                    </p>
                    <div className='flex items-center mt-10 px-5 xl:mt-[10%]'>
                        <img src='combineArtists.png'/>
                        <img src='Heart.png' className='ml-3'/>
                        <p className='text-[1.3rem] text-white ml-3'>33k Likes</p>
                    </div>
                </div>
                <img src='EricSama.png' className='hidden xl:block z-10'/>
            </div>
            <div className={width >= 1024 
                ? 'absolute left-[68%] xl:left-[65%] 2xl:left-[62%] top-[-440px] w-[32%]' 
                : ''
            }>
                <h2 className='text-gray-dark font-bold text-[1.2rem] mt-10 lg:text-[1.5rem]'>
                    Top Charts
                </h2>
                {width >= 1024 
                    ?
                    <div>
                        <Slider {...settingsVertical}>
                            {newAlbum.map(item=>{
                                return (
                                    <>
                                       <div className={`${item.isFavorite ? 'bg-gradient-to-l from-charcoal to-yellow' : 'bg-charcoal' } mt-4 rounded-2xl p-4 flex justify-between items-center`} key={item.id}>
                                            <Link to='/viewAlbum' state={item}>
                                                    <div className="flex">
                                                        <img src={item.cover} className="h-[70px] rounded-lg"/>
                                                        <div className="ml-2">
                                                            <p className="text-sm text-white tracking-wide font-thin">{item.title}</p>
                                                            <p className="text-[#808080] font-thin text-xs mt-2 tracking-wide">{item.title}</p>
                                                            <p className="text-white font-thin text-xs mt-2">{item.playListLength}</p>
                                                        </div>
                                                    </div>
                                            </Link>
                                            <div onClick={()=>{setFavorite(item.id)}} className='border-gray-dark border-2 p-2 rounded-full'>
                                                <img src={item.isFavorite ? item.heart2 : item.heart1}/>
                                            </div>
                                       </div>
                                    </>
                                )
                            })}
                        </Slider>
                    </div>
                    : 
                    <Slider {...settingsHorizontal}>
                        {newAlbum.map(item=>{
                            return (
                                <>
                                    <div className={`${item.isFavorite ? 'bg-gradient-to-l from-charcoal to-yellow' : 'bg-charcoal' } mt-4 rounded-2xl p-4 flex justify-between`} key={item.id}>
                                        <Link to='/viewAlbum' state={item}>
                                            <div>
                                                <img src={item.cover} className='w-28 h-28 rounded-xl'/>
                                                <p className="text-lg text-white tracking-wide font-thin mt-10">{item.title}</p>
                                                <p className="text-[#808080] font-thin text-xs tracking-wide mt-2">{item.title}</p>
                                                <p className="text-white mt-6 font-thin">{item.playListLength}</p>
                                            </div>
                                        </Link>
                                        <div onClick={()=>setFavorite(item.id)} className='h-9 border-gray-dark p-2 border-2 rounded-full'>
                                            <img src={item.isFavorite ? item.heart2 : item.heart1}/>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                    </Slider>
                }
            </div>
        </section>
    );
}

export default HomeHeader;