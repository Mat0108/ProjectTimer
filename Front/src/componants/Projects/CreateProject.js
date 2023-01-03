
import React, { useState, useContext, useEffect } from "react";
import { getAllUsers } from '../../services/user';
import { ModalContext } from '../../containers/Modal';
import Select from 'react-select';

import { saveProject } from './../../services/project';

const CreateProject = () => {
    const [users, setUsers] = useState();
    const [name, setName] = useState([]);
    const { modalChange, displayModalChange } = useContext(ModalContext);

    useEffect(() => {
        const fetchData = async () => {
            const users = await getAllUsers();

            if(users){
                setUsers(users.map(e => { 
                    return { 
                        value: e.email, 
                        label: e.firstname + " " + e.lastname } 
                })); 
            }
        };
        fetchData();

    }, []);

    const CreateProject = async() =>{
        await  saveProject(localStorage.getItem("userEmail"),name);
        displayModalChange(false);
        window.location.reload()
    }
    
    return (
        <>
            <div className='relative w-[500px] h-[500px] bg-gray-normal rounded-xl grid grid-rows-creategroup text-white'>
                <div className='row-start-1'>
                    <h1 className='text-3xl text-center mt-7 font-bold'>CREATE A PROJECT</h1>
                </div>
                <div className="row-start-2 mt-14">
                    <label className='ml-[38px]'>Project name :</label>
                    <input className='ml-[38px] w-[420px] rounded-md text-black bg-white2 mt-2 p-2 ' type="text" name="name" value={name} onChange={e=>setName(e.target.value)} />

                </div>
                <div className='row-start-5'>
                    <div className="space-x-5 ml-[22%]">
                        <button onClick={() => { modalChange(<div></div>); displayModalChange(false); }} className="min-w-[30%] text-white font-bold bg-red hover:text-red hover:bg-white border-2 border-red px-6 py-2 rounded-3xl" type="button">
                            <span>Cancel</span>
                        </button>
                        <button onClick={()=>CreateProject()} className="min-w-[30%] text-white font-bold bg-green hover:text-green hover:bg-white border-2 border-green px-6 py-2 rounded-3xl" type="button">
                            <span>Confirm</span>
                        </button>
                    </div>
                </div>
            </div>

        
        </>
    )
}

export default CreateProject