
import React, { useState, useContext, useEffect } from "react";
import { getAllUsers } from '../../services/user';
import { ModalContext } from '../../containers/Modal';
import Select from 'react-select';

import { saveProject } from './../../services/project';

const CreateProject = () => {

    const [admin, setAdmin] = useState();
    const [users, setUsers] = useState();
    const [name, setName] = useState();
    
    const [listusers, setListusers] = useState([]);
    const [project, setProject] = useState([
        {
            'name': '',
            'admin': ''

        }

    ]);

    const [messages, setMessages] = useState();

    const { displayModal, modalChange, displayModalChange } = useContext(ModalContext);
    useEffect(() => {
        const fetchData = async () => {
            const users = await getAllUsers();
            if (users) { setUsers(users.map(e => { return { value: e.email, label: e.firstname + " " + e.lastname } })); }
            console.log(users)
        };
        fetchData();

    }, []);

    useEffect(() => { console.log(admin) }, [admin]);


    //handleSubmit

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(project);
        // setMessages([])
        // if( project.name !== ""){
        //     try{
        //         await saveProject(project);
        //         setMessages([...messages,{type:"alert alert-success",msg:"Projet enregistrer !"}]);


        //         //navigate("/"); 
        //     }catch (error){
        //         if (error.response){
        //             setMessages([...messages,{type:"alert alert-danger",msg:error.response.data}]);
        //         }else{
        //             setMessages([...messages,{type:"alert alert-danger",msg:"erreur : "+error.message}]);
        //         }
        //     }
        // }else{
        //     setMessages([...messages,{type:"alert alert-info",msg:"merci de remplir les deux champs "}]);
        // }
    }

    //

    // const handleChange = (event) => {

    //     const { name, value } = event.target;
    //     setProject(prevState => ({ ...prevState, [name]: value }));

    //     console.log(event);
    //     console.log(event.target.name);



    // };

    const handleSelectedChange=(event)=>{
        setProject({
            ...project,
            admin:event.target.value,
        });
    }

    const handleNameChange=(event)=>{
        setProject({
            ...project,
            name:event.target.value,
        });
    }

    const CreateProject = async() =>{
        setProject({
            
            admin: admin.value,
            name:name

        });
        console.log('admin : ', admin.value)
        console.log('name : ', name)
        console.log(project)
        if(admin  && name){
            await  saveProject(project).then(e=>{console.log(e);}).catch(e=>console.log("err:",e))
        }

    }
    






    return (
        <>
            <div className='relative w-[500px] h-[500px] bg-gray-normal rounded-xl grid grid-rows-creategroup'>
                <div className='row-start-1'>
                    <h1 className='text-3xl text-center mt-2'>Créer un projet</h1>
                </div>
                <div className="row-start-2">
                    <label className='ml-[38px]'>Nom du projet</label>
                    <input className='ml-[38px] w-[420px] rounded-md text-black bg-white2 mt-2 p-2 ' type="text" name="name" value={name} onChange={e=>setName(e.target.value)} />

                </div>
                {users && <><div className="row-start-3">
                    <label className='ml-[40px]'>Admin</label>
                    {<Select

                    

                        options={users}
                        className="basic-multi-select bg-gray-normal ml-[22px] w-[450px] text-black px-4 border-solid "
                        classNamePrefix="select text-white"
                        name="admin"
                       
                        onChange={e=>setAdmin(e)}
                    />}
                </div>
                    <div className="row-start-4">
                        {/* <label className='ml-[40px]'>Timer</label> */}

                    </div></>}
                <div className='row-start-5'><div className="space-x-5 ml-[22%]">
                    <button onClick={() => { modalChange(<div></div>); displayModalChange(false); }} className="min-w-[30%] text-red bg-white2 border-2 border-red px-6 py-2 rounded-3xl" type="button">
                        <span className="font-[AvenirNextCyrDemi]">Annuler</span>
                    </button>
                    <button onClick={()=>CreateProject()} className="min-w-[30%] text-green bg-white2 border-2 border-green px-6 py-2 rounded-3xl " type="button">
                        <span className="font-[AvenirNextCyrDemi] ">Confirmer</span>
                    </button>
                </div></div>
            </div>

        
        </>
    )

}

export default CreateProject