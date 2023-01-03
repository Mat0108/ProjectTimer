import  React , { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {logout} from "../services/user";
import { Home } from './../componants/Image/Image';





const Nav = () =>{
    
    const [dropdown,setDropdown] = useState(false);

// Fonction LOGOUT
let navigate = useNavigate(); 
    const Logout = async () => {

        try {
            await logout(localStorage.getItem("userId"));
            localStorage.setItem("userEmail", '');
                localStorage.setItem("userId", '');
                localStorage.setItem("userFirstname", '');
                localStorage.setItem("userLastname", '');
            navigate("/Login");
        }catch (error) {
            console.log(error);
        }
    };

    return (
        <nav className="px-2 bg-gray-silver text-white w-full h-[50px]">
            <div className="grid grid-cols-5 items-center  w-full h-full">
                <div className='col-start-1 col-span-2 ml-5 flex flex-row gap-4'>
                    <div><Link className="" to="/"><Home size={[20,20]} /> </Link></div>
                </div>
                <div className='col-start-3 flex flex-row gap-4 font-bold ml-20'>
                    <div>TIMEROO</div>
                </div>
                <div className='col-start-5 relative flex justify-end mr-10'>
                   
                    {localStorage.getItem("userFirstname") !== '' ?
                        <div>
                            <button className="font-bold px-1" onClick={()=>setDropdown(!dropdown)}>{localStorage.getItem("userFirstname")} &nbsp; ▼ </button>
                            {dropdown && 
                                <div className='absolute top-8 right-0 flex flex-col bg-white z-[999] rounded-b-lg text-black'>
                                    <div onClick={Logout} className='hover:bg-black hover:bg-opacity-25 py-2 px-8 hover:text-white cursor-pointer'>Logout</div>
                                </div>}
                        </div>
                        :
                        <div>
                            <button className="font-bold" onClick={()=>setDropdown(!dropdown)}>Connection &nbsp; ▼ </button>
                            {dropdown && 
                                <div className='absolute top-8 rigth-0 flex flex-col bg-white z-[999] rounded-b-lg text-black'>
                                    <div className='hover:bg-black hover:bg-opacity-25 py-2 px-8 hover:text-white'><Link className="" to="/Login">Login</Link></div>
                                    <div className='hover:bg-black hover:bg-opacity-25 py-2 px-8 hover:text-white'><Link className="" to="/Register">Register </Link></div>
                                </div>}
                        </div>
                    }
                 
                </div>     
            </div>
        </nav>

    )
}

export default Nav;



