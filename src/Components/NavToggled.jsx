import { FaArrowLeft} from 'react-icons/fa'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { NavInfo } from './NavInfo';
import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';

function NavToggled({isToggled, handleToggle}) {
    
    const [icon, setIcon] = useState(NavInfo)
    // Icons don't update immediatley on click
    function switchPages(id){
        handleToggle()
        setIcon(prevIcons => prevIcons.map(iconItem=>{
            if(iconItem.id===id){
                return {
                    ...iconItem,
                    isActive: true
                }
            }else {
                return {
                    ...iconItem,
                    isActive: false
                }
            }
        }))
    }

    return (  
        <AnimationOnScroll className='animate__fadeInLeft'>
            <nav className={isToggled ? "h-screen box-border bg-background font-serif pt-[1.5em] px-[1rem]" : "hidden"}>
                <i onClick={()=>handleToggle()} className="text-gray-dark text-[1.5em]"><FaArrowLeft /></i>
                <ul className='mt-[3rem] pl-[2.5rem]'>
                    {icon.map((info)=>{
                        return (
                            <li key={info.id}>
                                <Link className='flex items-center text-gray-dark mb-10' to={`${info.link}`} onClick={()=>switchPages(info.id)}>
                                    <img src={info.isActive === true ? info.active : info.img}/>
                                    <p className='ml-[1.5rem] text-[1.1rem] font-bold'>{info.name}</p>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </AnimationOnScroll>
    );
}

export default NavToggled;