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
}
   


export default Register;