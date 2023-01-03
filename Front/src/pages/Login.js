import React,{ useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Rabbit } from "../componants/Image/Image";
import {login, getAllUsers} from "../services/user";

const Login = () => {
    let navigate = useNavigate();
    const [user,setUser] = useState({
        'email':'',
        'password':''
    });

    const onClick = async (event) =>{
        event.preventDefault();

        if(user.password !== "" && user.email !== ""){
            const allUsers = await getAllUsers();

            if(allUsers.some(u => u.email === user.email)){
                const userData = await login(user);

                localStorage.setItem("userEmail", user.email)
                localStorage.setItem("userId", userData.user.id)
                localStorage.setItem("userFirstname", userData.user.firstname)
                localStorage.setItem("userLastname", userData.user.lastname)
                navigate("/TimeTracker");
            }
            else{
                alert("Account doesn't exist !")
            }
        }else{
            alert("Please fill all the fields !")
        }
    }

    const onChangeHandler = (event) =>{
        const {id, value}= event.target
        setUser({...user, [id]:value})
    }

    return (
        <div>
            <div className='bg-gray-gainsboro grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
                <div className='hidden sm:block'>
                    <Rabbit />
                </div>
        
                <div className='bg-gray flex flex-col justify-center'>
                    <form className='max-w-[400px] w-full mx-auto rounded-lg bg-black-900'>
                        <h2 className='text-4xl dark:text-white font-bold text-center pb-8'>LOGIN</h2>

                        <div className='flex flex-col text-black py-2 mb-2'>
                            <label className="py-1">Email :</label>
                            <input className='rounded-lg bg-gray-700 mt-2 py-2 px-4 focus:border-blue-500 focus:bg-black-800 focus:outline-none form-control Cinput' type="text" onChange={onChangeHandler} value={user.email} placeholder="Enter your email "id="email" required/>
                        </div>

                        <div className='flex flex-col text-black py-2 mb-2'>
                            <label className="py-1">Password :</label>
                            <input className='py-2 px-4 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none form-control Cinput' type="password" onChange={onChangeHandler} value = {user.password} placeholder="Enter your password" id="password" required />
                        </div>

                        <button className='w-full my-5 py-2 bg-blue shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg' onClick={onClick}>Sign In</button>
                        <Link to='/Register' className="Clink text-blue-yale"><p className="underline md:underline-offset-4">I don't have an account</p></Link>
                    </form>
                </div>
            </div>
        </div>
    )
  }

  export default Login;
