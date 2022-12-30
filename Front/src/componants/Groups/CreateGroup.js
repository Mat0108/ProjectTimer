import React,{useState,useRef, useEffect, useContext}  from 'react';
import { getAllUsers } from '../../services/user';
import InputField from './../general/Inputs/InputField';
import Select from 'react-select';
import { ModalContext } from '../../containers/Modal';


const CreateGroup =()=>{
    const nameref = useRef()
    const userref = useRef();
    const adminref = useRef();
    const [listusers, setListusers] = useState([]); 
    const [admin, setAdmin] = useState();
    const [users,setUsers] = useState();
    const [name, setName] = useState();

    const { displayModal, modalChange, displayModalChange } =useContext(ModalContext);
    useEffect(()=>{
        const fetchData = async() =>{
            const users = await getAllUsers();
            if(users){setUsers(users.map(e=>{return {value:e.email,label:e.firstname+" "+e.lastname}}));}
            console.log(users)
        };
        fetchData();
        
    },[]);

    useEffect(()=>{console.log(admin)},[admin])

    return (
        <div className='relative w-[500px] h-[500px] bg-gray-normal rounded-xl grid grid-rows-creategroup'>
            <div className='row-start-1'>
                <h1 className='text-3xl text-center mt-2'>Créer un groupe</h1>
            </div>
            <div className="row-start-2">
                <label className='ml-[38px]'>Nom du groupe</label>
                <input className='ml-[38px] w-[420px] rounded-md text-black bg-white2 mt-2 p-2 ' type="text" value={name} onChange={e=>setName(e.target.value)} />
                            
            </div>
            {users && <><div className="row-start-3">
            <label className='ml-[40px]'>Admin</label>
            <Select
                    defaultValue={""}
                    name="colors"
                    options={users}
                    className="basic-multi-select bg-gray-normal ml-[22px] w-[450px] text-black px-4 border-solid "
                    classNamePrefix="select text-white"
                    onChange={e=>setAdmin(e)}
                /> 
            </div>
            <div className="row-start-4">
            <label className='ml-[40px]'>Users</label>
                 <Select
                    defaultValue={""}
                    isMulti
                    name="colors"
                    options={users}
                    className="basic-multi-select bg-gray-normal ml-[22px] w-[450px] text-black px-4 border-solid "
                    classNamePrefix="select text-white"
                    onChange={e=>setListusers(e)}
                />
            </div></>}
            <div className='row-start-5'><div className="space-x-5 ml-[22%]">
          <button onClick={()=>{modalChange(<div></div>);displayModalChange(false)}} className="min-w-[30%] text-red bg-white2 border-2 border-red px-6 py-2 rounded-3xl" type="button">
          <span className="font-[AvenirNextCyrDemi]">Annuler</span>
          </button>
          <button onClick={""} className="min-w-[30%] text-green bg-white2 border-2 border-green px-6 py-2 rounded-3xl " type="button">
            <span className="font-[AvenirNextCyrDemi] ">Confirmer</span>
          </button>
        </div></div>
        </div>
        )

}
export default CreateGroup;