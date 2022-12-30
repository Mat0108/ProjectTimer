
import React, { useState, useContext, useEffect } from "react";
import { GetAlluser } from '../../services/auth';
import { ModalContext } from '../../containers/Modal';
import Select from 'react-select';
import { saveProject } from "../../services/project";
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

    const [messages,setMessages]=useState();

    const { displayModal, modalChange, displayModalChange } = useContext(ModalContext);
    useEffect(() => {
        const fetchData = async () => {
            const users = await GetAlluser();
            if (users) { setUsers(users.map(e => { return { value: e.email, label: e.firstname + " " + e.lastname } })); }
            console.log(users)
        };
        fetchData();

    }, []);

    useEffect(() => { console.log(admin) }, [admin]);


//onclick

const onClick = async (event) =>{
    event.preventDefault();
    console.log(project);
    setMessages([])
    if(project.admin !== "" && project.name !== ""){
        try{
            await saveProject(project);
            setMessages([...messages,{type:"alert alert-success",msg:"Projet enregistrer !"}]);
        
            
            //navigate("/"); 
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

//

const onChangeHandler = (event) =>{
    const {id, value}= event.target
    setProject({...project, [id]:value})
}






    return (
        <><form onSubmit={onClick}>
            <div className='relative w-[500px] h-[500px] bg-gray-normal rounded-xl grid grid-rows-creategroup'>
                <div className='row-start-1'>
                    <h1 className='text-3xl text-center mt-2'>Créer un projet</h1>
                </div>
                <div className="row-start-2">
                    <label className='ml-[38px]'>Nom du projet</label>
                    <input className='ml-[38px] w-[420px] rounded-md text-black bg-white2 mt-2 p-2 ' type="text"  onChange={onChangeHandler} value={project.name} id="name" />

                </div>
                {users && <><div className="row-start-3">
                    <label className='ml-[40px]'>Admin</label>
                    <Select
                        defaultValue={""}
                        name="colors"
                        options={users}
                        className="basic-multi-select bg-gray-normal ml-[22px] w-[450px] text-black px-4 border-solid "
                        classNamePrefix="select text-white"
                        onChange={onChangeHandler} value={project.admin} id="project.admin" />
                </div>
                    <div className="row-start-4">
                        {/* <label className='ml-[40px]'>Timer</label> */}

                    </div></>}
                <div className='row-start-5'><div className="space-x-5 ml-[22%]">
                    <button onClick={() => { modalChange(<div></div>); displayModalChange(false); }} className="min-w-[30%] text-red bg-white2 border-2 border-red px-6 py-2 rounded-3xl" type="button">
                        <span className="font-[AvenirNextCyrDemi]">Annuler</span>
                    </button>
                    <button onClick={""} className="min-w-[30%] text-green bg-white2 border-2 border-green px-6 py-2 rounded-3xl " type="button">
                        <span className="font-[AvenirNextCyrDemi] " type="submit">Confirmer</span>
                    </button>
                </div></div>
            </div>

        </form>
            </>
    )

}

export default CreateProject