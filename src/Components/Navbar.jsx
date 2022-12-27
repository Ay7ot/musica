import { Link } from 'react-router-dom';

function Navbar() {
    return (  
        <nav>
           <div className='flex justify-between items-center'>
                <img src="logo.svg" className='ml-4'/>
                <input 
                    type='text'
                    className="bg-background w-[90%] p-3 placeholder-gray-dark"
                    placeholder={`Search Artists`}
                />
           </div>
           <div>
                <div className='bg-charcoal w-16 rounded-full mt-10'>
                    <ul className='flex items-center flex-col py-6'>
                        <li className='mb-10'>
                            <Link to='/'>
                                <img src='HomeActive.png'/>
                            </Link>
                        </li>
                        <li className='mb-10'>
                            <Link to='/collection'>
                                <img src='playList.png'/>
                            </Link>
                        </li>
                        <li className='mb-10'>
                            <Link to='/'>
                                <img src='radio.png'/>
                            </Link>
                        </li>
                        <li>
                            <Link to='/'>
                                <img src='videos.png'/>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className='mt-5 bg-charcoal w-16 rounded-full'>
                    <ul className='flex items-center flex-col py-6'>
                        <li className='mb-10'>
                            <Link to='/'>
                                <img src='profile.png' />
                            </Link>
                        </li>
                        <li>
                            <Link to='/'>
                                <img src='logout.png' />
                            </Link>
                        </li>
                    </ul>
                </div>
           </div>
        </nav>
    );
}

export default Navbar;