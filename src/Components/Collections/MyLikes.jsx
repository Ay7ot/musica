import { useState } from "react";
import { nanoid } from "nanoid";

function MyLikes({myLikes, setMyLikes}) {

    const  [likedItems, setLikedItems] = useState([
        {
            artist: 'John Watts',
            albumName: 'Limits',
            likes: '2.3m likes',
            albumCover: 'collection2.png',
            id: nanoid()
            
        },
        {
            artist: 'John Watts',
            albumName: 'Limits',
            likes: '2.3m likes',
            albumCover: 'collection1.png',
            id: nanoid()
        },
        {
            artist: 'John Watts',
            albumName: 'Limits',
            likes: '2.3m likes',
            albumCover: 'Lead-image.png',
            id: nanoid()
        },
        {
            artist: 'John Watts',
            albumName: 'Limits',
            likes: '2.3m likes',
            albumCover: 'Lead-image.png',
            id: nanoid()
        },
    ]);



    return (  
        <div className="w-full mt-10 sm:px-[10%] md:px-0 mb-[25%] sm:mb-[15%] lg:mb-[35%] md:grid md:grid-cols-2 gap-10 lg:grid-cols-4 xl:grid-cols-5">
            {myLikes.length!== 0 ? myLikes.map(item=>{
                    const likedStyles = {
                        backgroundImage: `url(${item.cover})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }
                return (
                    <div className="w-full h-[240px] mb-[10%] md:mb-0 rounded-[1rem]" style={likedStyles} key={item.id}>
                        <div className="px-5 text-gray pt-24 lg:pt-40">
                            <p className="text-[1.3rem] tracking-wider">{item.title}</p>
                            <p className="text-[0.7rem]">{item.artist}</p>
                        </div>
                        <div className="flex items-center justify-between px-5 pt-6 lg:hidden">
                            <p className="text-white text-[0.9rem] tracking-wide">20 likes</p>
                            <img src="Play.png"/>
                        </div>
                    </div>
                )
            })
            :
            <div>
                <p className="text-white text-2xl tracking-wider">No Liked Songs yet ...</p>
            </div>
        }
        </div>
    );
}

export default MyLikes;