import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import {login} from "../services/user";

const Login = () => {
    let navigate = useNavigate();
    const [messages,setMessages] = useState([]);
    const [user,setUser] = useState({
        'email':'',
        'password':''
    });

    const onClick = async (event) =>{
        event.preventDefault();
        console.log(user);
        setMessages([])
        if(user.password !== "" && user.email !== ""){
            try{
                const userData = await login(user);
                setMessages([...messages,{type:"alert alert-success",msg:"vous êtes connecté !"}]);

                localStorage.setItem("userEmail", user.email)
                localStorage.setItem("userId", userData.user.id)
                navigate("/TimeTracker");
            }catch (error){
                if (error.response){
                    setMessages([...messages,{type:"alert alert-danger",msg:error.response.data}]);
                }else{
                    setMessages([...messages,{type:"alert alert-danger",msg:"erreur : "+error.message}]);
                }
            }
        }else{
            setMessages([...messages,{type:"alert alert-info",msg:"merci de remplir les deux champs "}]);
        }
    }

    const onChangeHandler = (event) =>{
        const {id, value}= event.target
        setUser({...user, [id]:value})
    }

    return (
        <div>
            { messages.map(message => 
                <div className={message.type}>
                    {message.msg}
                </div> 
            )}
            <div className='bg-gray-gainsboro grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
                <div className='hidden sm:block'>
                    <img className='w-full h-full object-cover' src="/images/rabbit.png" alt="image" />
                </div>
        
                <div className='bg-gray flex flex-col justify-center'>
                    <form className='max-w-[400px] w-full mx-auto rounded-lg bg-black-900 py-8 px-8'>
                        <h2 className='text-4xl dark:text-white font-bold text-center pb-8'>LOGIN</h2>

                        <div className='flex flex-col text-black py-2 mb-2'>
                            <label className="py-1">Email :</label>
                            <input className='rounded-lg bg-gray-700 mt-2 py-2 px-4 focus:border-blue-500 focus:bg-black-800 focus:outline-none form-control Cinput' type="text" onChange={onChangeHandler} value={user.email} placeholder="Enter your email "id="email"/>
                        </div>

                        <div className='flex flex-col text-black py-2 mb-2'>
                            <label className="py-1">Password :</label>
                            <input className='py-2 px-4 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none form-control Cinput' type="password" onChange={onChangeHandler} value = {user.password} placeholder="Enter your password" id="password" />
                        </div>

                        <div className='flex justify-between text-black py-2'>
                            <p className='flex items-center'><input className='mr-2' type="checkbox" />Remember Me</p>
                            <p>Forgot Password</p>
                        </div>

                        <button className='w-full my-5 py-2 bg-blue shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg' onClick={onClick}>Sign Up</button>
                        <Link to='/Register' className="Clink text-blue-yale"><p className="underline md:underline-offset-4">I don't have an account</p></Link>
                    </form>
                </div>
            </div>
        </div>
    )
  }

  export default Login;
