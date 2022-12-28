import { nanoid } from "nanoid";
import { useState } from "react";
import { Link } from "react-router-dom";

function MyCollections({myCollections, setMyCollections}) {

    return (  
        <div className="w-full mt-10 sm:px-[10%] md:px-0 mb-[25%] sm:mb-[15%] lg:mb-[35%] md:grid md:grid-cols-2 gap-10 lg:grid-cols-4 xl:grid-cols-5">
            {myCollections.length !== 0 ? myCollections.map(item=>{
                    const collectionStyle = {
                        backgroundImage: `url(${item.cover})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }
                    
                return (
                    <Link to='/viewAlbum' state={item}>
                        <div className="w-full h-[240px] mb-[10%] md:mb-0 rounded-[1rem]" style={collectionStyle} key={item.id}>
                            <div className="px-5 text-[#000000] font-bold pt-24 lg:pt-40">
                                <p className="text-[1.3rem] tracking-wide">{item.title}</p>
                                <p className="text-[0.7rem]">{item.title}</p>
                            </div>
                            <div className="flex items-center justify-between px-5 pt-6 lg:hidden">
                                <p className="text-[#000000] text-[0.9rem] tracking-wide">20 Likes</p>
                                <img src="Play.png"/>
                            </div>
                        </div>
                    </Link>
                    
                )
            }) : 
                <div>
                    <p className="text-white text-2xl tracking-wider">No playlist added ...</p>
                </div>
            }
        </div>
    );
}

export default MyCollections;