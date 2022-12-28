import React,{useState,useRef, useEffect, useMemo}  from 'react';
import { GetAlluser } from '../../services/auth';
import Select from './../general/SelectBox/Select';
import SelectMulti from './../general/SelectBox/SelectMulti';
import InputField from './../general/Inputs/InputField';



const CreateGroup =()=>{
    const nameref = useRef()
    const userref = useRef();
    const adminref = useRef();
    const [listusers, setListusers] = useState([]); 
    const [admin, setAdmin] = useState();
    const [users,setUsers] = useState();
    const [name, setName] = useState();

    useEffect(()=>{
        const fetchData = async() =>{
            const users = await GetAlluser();
            if(users){setUsers(users.map(e=>{return e.email}));}
            console.log(users)
        };
        fetchData();
        
    },[]);
    function getButton(color,text,onclickvar){
        return <div><button className={`p-2 ${color} rounded-xl`} onClick={onclickvar}>{text}</button></div>
    }

    return (
        <div className='relative w-[300px] h-[500px] bg-gray-normal rounded-xl grid grid-rows-creategroup'>
            <div className='row-start-1'>
                <h1 className='text-3xl text-center mt-2'>Créer un groupe</h1>
            </div>
            <div className="row-start-2">
                <InputField inputRef={nameref} title={"Nom du groupe"} titleStyle={"title label-input text-base "} value={name} onChange={(e) => {setName(e.target.value);}} style={"mx-auto w-[250px] "}/>
            </div>
            {users && <><div className="row-start-3">
                <Select options={users} title={"Admin"} titleStyle={"ml-[22px]"} arrowStyle={"absolute top-[70%] right-4 pointer-events-none"} selectedValue={admin} setSelectedValue={setAdmin} className={"ml-[22px] w-[250px] h-[48px] p-1 px-4 border-solid border-green dark:bg-charcoal focus-visible:outline-0 border-2 rounded-xl appearance-none text-black"} />
                
            </div>
            <div className="row-start-4">
                 <SelectMulti options={users} title={"Users"} titleStyle={"ml-[22px]"} arrowStyle={"absolute top-[60%] right-10 pointer-events-none"} multiplevar={true} selectedValue={listusers} setSelectedValue={setListusers} margin={"ml-[22px]"} className={"bg-white2 ml-[22px] w-[250px] h-[48px] p-1 px-4 border-solid border-green dark:bg-charcoal focus-visible:outline-0 border-2 rounded-xl appearance-none text-black"} />
                
            </div></>}
        </div>
        )

}
export default CreateGroup;