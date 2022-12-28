import  React , { useState } from 'react';
import { Link } from 'react-router-dom';

const Nav = () =>{
    
    const [dropdown,setDropdown] = useState(false);

    return (
        <nav className="px-2 bg-gray-silver text-white w-full h-[50px]">
            <div className="grid grid-cols-5 items-center  w-full h-full">
                <div className='col-start-1 col-span-2 ml-10 flex flex-row gap-4'>
                    <div><Link className="" to="/Groups">Group </Link></div>
                    <div><Link className="" to="/">Project </Link></div>
                    <div><Link className="" to="/TimeTracker">Time Tracker</Link></div>
                </div>
                <div className='col-start-3 flex flex-row gap-4'>
                    <div>logo</div>
                    <div>nom du site</div>
                </div>
                <div className='col-start-5 relative flex justify-end mr-4'>
                <div><button onClick={()=>setDropdown(!dropdown)}>▼ Connection</button></div>
                {dropdown && <div className='absolute top-8 rigth-0 flex flex-col bg-gray-silver gap-4 p-2 rounded-b-lg'>
                        <div><Link className="" to="/">Connection </Link></div>
                        <div><Link className="" to="/">Incription </Link></div>
                    </div>}
                </div>
            </div>
        </nav>

    )
}

export default Nav;