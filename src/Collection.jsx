import NavMobile from "./Components/NavMobile";
import NavToggled from "./Components/NavToggled";
import Navbar from "./Components/Navbar";
import PlayerControl from "./playerControl";
import { useState } from "react";
import { nanoid } from "nanoid";
import MyCollections from "./Components/Collections/MyCollections";
import MyLikes from "./Components/Collections/MyLikes";

function Collection({ isToggled, handleToggle, width }) {
    

    //Remove the hard Coded Data for Collection and likes and consume an api to make it functional
    
    const [collections, setCollections] = useState([
        {
            name: "My Collections",
            isTrue: true,
            id: nanoid()
        },
        {
            name: "Likes",
            isTrue: false,
            id: nanoid()
        }
    ]);

    const collectionHeaders= collections.map(item=>{
        const styles = {
            backgroundColor: item.isTrue ? '#FACD66' : 'transparent',
            border: item.isTrue ? "1px solid #FACD66" : '1px solid #808080',
            color: item.isTrue ? '#EFEEE0' : '#808080',
            borderRadius: '2rem',
            padding: '0.5rem 1rem',
            fontWeight: '700',
            marginRight: '1rem'
        }

        return (
            <p style={styles} key={item.id} className='cursor-pointer' onClick={()=>handleCollections(item.id)}>{item.name}</p>
        )
    })

    function handleCollections(id){
        setCollections(prevArray=>prevArray.map(item=>{
           if(item.id===id){
                return {
                    ...item,
                    isTrue: true
                }
           } else return {
                ...item,
                isTrue: false
           }
        }))
    }


    return (  
        <>
            <div className={isToggled ? "h-screen bg-background font-serif" : "hidden"}>
                <NavToggled isToggled={isToggled} handleToggle={handleToggle}/>
            </div>
            <div className={isToggled ? 'hidden' : ''}>
                <div className={isToggled ? "hidden" : "bg-background font-serif w-screen relative pt-[1.5rem] px-[1rem] overflow-x-hidden h-full min-h-screen scroll-smooth"}>
                    {width < 1024 ? <NavMobile isToggled={isToggled} handleToggle={handleToggle}/> : <Navbar />}
                    <div className={width >= 1024 ? "absolute top-[115px] left-[10%] xl:left-[8%]" : 'mt-10'}>
                        <div className="text-white lg:flex items-center grid grid-cols-2 text-center">
                            {collectionHeaders}
                        </div>
                        <div className="lg:w-[85vw]">
                            {collections.map(item=>{
                                if(item.isTrue === true && item.name === "My Collections"){
                                    return <MyCollections key={'collections'}/>
                                }else if (item.isTrue === true && item.name === "Likes"){
                                    return <MyLikes key={'Likes'}/>
                                }else {
                                    return 
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Collection;