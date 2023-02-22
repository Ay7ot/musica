import { FaBars, FaSearch } from 'react-icons/fa'

function NavMobile({ handleToggle }) {
    return (  
       <>
            <nav>
               <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                        <img src='menu 1.png' onClick={()=>handleToggle()} className='mr-5'/>
                        <img src='logo.svg'/>
                    </div>
                    <div>
                        <i className='text-[1.4rem] text-gray-dark'><FaSearch /></i>
                    </div>
               </div>
            </nav>
       </>
    );
}

export default NavMobile;