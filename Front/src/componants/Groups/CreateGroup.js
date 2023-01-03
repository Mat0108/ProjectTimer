import React,{useState,useRef, useEffect, useContext}  from 'react';
import { getAllUsers } from '../../services/user';
import Select from 'react-select';
import { ModalContext } from '../../containers/Modal';
import { createGroup } from './../../services/group';


const CreateGroup =()=>{
    const [listusers, setListusers] = useState([]); 
    const [users,setUsers] = useState();
    const [name, setName] = useState();
    const { modalChange, displayModalChange } = useContext(ModalContext);

    useEffect(()=>{
        const fetchData = async() =>{
            const users = await getAllUsers();
            if(users){
                setUsers(users.map(e => {
                    return {
                        value: e.email,
                        label: e.firstname + " " + e.lastname
                    }
                }));
            }
        };

        fetchData();
    },[]);

    const CreateGroup = async() =>{
        if(localStorage.getItem("userEmail") !== "" && users && name){
            await createGroup(name, localStorage.getItem("userEmail"), listusers.map(e=>{return e.value}))
            window.location.reload()
        }
        else{
            alert("Please fill all fields !")
        }
    }
    
    return (
        <div className='relative w-[500px] h-[500px] bg-gray-normal rounded-xl grid grid-rows-creategroup text-white'>
            <div className='row-start-1'>
                <h1 className='text-3xl text-center mt-7 font-bold'>CREATE A GROUP</h1>
            </div>
            <div className="row-start-2 mt-8">
                <label className='ml-[38px]'>Group name :</label>
                <input className='ml-[38px] w-[420px] rounded-md text-black bg-white2 mt-2 p-2 ' type="text" value={name} onChange={e=>setName(e.target.value)} />
                            
            </div>
            {users && 
                <>
                <div className="row-start-3 mt-10">
                <label className='ml-[40px]'>Users</label>
                    <Select
                        defaultValue={""}
                        isMulti
                        name="colors"
                        options={users}
                        className="basic-multi-select bg-gray-normal ml-[22px] w-[450px] text-black px-4 border-solid mt-2"
                        classNamePrefix="select text-white"
                        onChange={e=>setListusers(e)}
                    />
                </div></>
            }
            <div className='row-start-5 mt-12'><div className="space-x-5 ml-[22%]">
                <button onClick={()=>{modalChange(<div></div>);displayModalChange(false)}} className="min-w-[30%] text-white font-bold bg-red hover:text-red hover:bg-white border-2 border-red px-6 py-2 rounded-3xl" type="button">
                <span>Annuler</span>
                </button>
                <button onClick={()=>CreateGroup()} className="min-w-[30%] text-white font-bold bg-green hover:text-green hover:bg-white border-2 border-green px-6 py-2 rounded-3xl " type="button">
                    <span>Confirmer</span>
                </button>
            </div>
            </div>
        </div>
    )

}
export default CreateGroup;