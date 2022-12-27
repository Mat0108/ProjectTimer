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
        <form onSubmit={onClick}>
            <div class="row Rfoam cardcolor">
                <h2 className="CH1">Register</h2>
                <div class="col-2">
                    <label class="Rlabel" for="firstname">Firstname</label>
                </div>
                <div class="col-10">
                    <input type="text" onChange={onChangeHandler} value = {user.firstname} class="form-control Rinput" placeholder="Enter your firstname" id="firstname"></input>
                    </div>
                

            </div>
        </form>

    )
    
}
   


export default Register;