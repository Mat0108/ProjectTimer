import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import {register} from "../services/auth";

const Register = () => {
    let navigate = useNavigate();
    const [user,setUser] = useState({
        
        'firstname':'',
        'lastname':'',

        'email':'',
        'cf_email':'',

        'password':'',
        'cf_password':''
        
    })

    const onClick = async (event) =>{
        event.preventDefault();
        console.log(user);
        if(user.email === user.cf_email && 
            user.password === user.cf_password && 
            user.password.length >= 10 && user.email !== ""){
            const res = await register(user);
            if (res.status === 200)
            {
                //navigate("/category/2"); 
            }
            console.log(res);
        }else{
            console.log('Error');
        }
        
    }

    const onChangeHandler = (event) =>{
        const {id,value}= event.target
        setUser({...user,[id]:value})
    }

    return (
        <div>
            {/* { messages.map(message => <div class={message.type}>
                {message.msg}
            </div> )} */}
            <form onSubmit={onClick}>

                <div className='bg-gray-gainsboro grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
                    <div className='hidden sm:block'>
                        <img className='w-full h-full object-cover' src="/images/rabbit.png" alt="image" />
                    </div>
            
                    <div className='bg-gray flex flex-col justify-center'>
                        <form className='max-w-[400px] w-full mx-auto rounded-lg bg-black-900 p-8 px-8'>
                            <h2 className='text-4xl dark:text-white font-bold text-center'>REGISTER</h2>

                            <div className='flex flex-col text-gray-400 py-2 mb-2'>
                                <label>Firstname</label>
                                <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-black-800 focus:outline-none' type="text" onChange={onChangeHandler} value={user.firstname} class="form-control Cinput" placeholder="Enter your firstname "id="firstname"/>
                            </div>

                            <div className='flex flex-col text-gray-400 py-2 mb-2'>
                                <label>Lastname</label>
                                <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-black-800 focus:outline-none' type="text" onChange={onChangeHandler} value={user.lastname} class="form-control Cinput" placeholder="Enter your lastname "id="lastname"/>
                            </div>



                            <div className='flex flex-col text-gray-400 py-2 mb-2'>
                                <label>Email</label>
                                <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-black-800 focus:outline-none' type="text" onChange={onChangeHandler} value={user.email} class="form-control Cinput" placeholder="Enter your email "id="email"/>
                            </div>

                            <div className='flex flex-col text-gray-400 py-2 mb-2'>
                                <label>Confirm Email</label>
                                <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-black-800 focus:outline-none mb-2' type="text" onChange={onChangeHandler} value={user.cf_email} class="form-control Cinput" placeholder="Confirm email "id="cf_email"/>
                            </div>



                            <div className='flex flex-col text-gray-400 py-2'>
                                <label>Password</label>
                                <input className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="password" onChange={onChangeHandler} value = {user.password} class="form-control Cinput" placeholder="Enter your password" id="password" />
                            </div>

                            <div className='flex flex-col text-gray-400 py-2'>
                                <label>Confirm Password</label>
                                <input className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="password" onChange={onChangeHandler} value = {user.cf_password} class="form-control Cinput" placeholder="Confirm password" id="cf_password" />
                            </div>



                            <button className='w-full my-5 py-2 bg-blue shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>Sign Up</button>
                            <Link to='/Login' class="Clink">I already have an account !</Link>
                        </form>
                    </div>
                </div>
            </form>
        </div>
    )
                    
                    {/* <div class="col-2">
                        <label class="Rlabel" for="firstname">Firstname</label>
                    </div>
                    <div class="col-10">
                        <input type="text" onChange={onChangeHandler} value = {user.firstname} class="form-control Rinput" placeholder="Enter your firstname" id="firstname"></input>
                        </div>
                    

                        <div class="col-2">
                        <label class="Rlabel" for="lastname">Lastname</label>
                    </div>
                    <div class="col-10">
                        <input type="text" onChange={onChangeHandler} value = {user.lastname} class="form-control Rinput" placeholder="Enter your lastname"  id="lastname"></input>
                    </div>


                    <div class="col-2">
                        <label class="Rlabel" for="email">Email</label>
                        </div>
                    <div class="col-10">
                        <input type="text" onChange={onChangeHandler} value = {user.email} class="form-control Rinput" placeholder="Enter your email"  id="email"></input>
                    </div>


                    <div class="col-2">
                        <label class="Rlabel" for="cf_email">Confirm Email</label>
                        </div>
                    <div class="col-10">
                        <input type="text" onChange={onChangeHandler} value = {user.cf_email} class="form-control Rinput" placeholder="Confirm your email"  id="cf_email"></input>
                    </div>

                    
                    <div class="col-2">
                        <label class="Rlabel" for="password">Password</label>
                        </div>
                    <div class="col-10">
                        <input type="password" onChange={onChangeHandler} value = {user.password} class="form-control Rinput"  placeholder="Enter your password"  id="password"></input>
                    </div>


                    <div class="col-2">
                        <label class="Rlabel" for="cf_password">Confirm Password</label>
                    </div>
                    <div class="col-10">
                        <input type="password" onChange={onChangeHandler} value = {user.cf_password} class="form-control Rinput" placeholder="Confirm your password" id="cf_password"></input>
                    </div>


                    <button className='w-full my-5 py-2 bg-blue shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>Sign Up</button>

                    <Link to='/Login' class="Rlink">Login</Link> */}


                //</div>
            //</form>
//             </div>
//     )
    
}
   


export default Register;