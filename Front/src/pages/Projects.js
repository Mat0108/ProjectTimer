import { useEffect, useState,useContext ,useMemo} from "react";
import { useNavigate } from "react-router-dom";
import { getAllProjects } from "../services/project";
import Modal from '../componants/Modal/Modal';
import { ModalContext } from './../containers/Modal';
import CreateProject from "../componants/Projects/CreateProject";

const Projects=()=>{

    const [projects,setProjects]=useState([]);
    const { displayModal, modalChange, displayModalChange } =useContext(ModalContext);
     let navigate =useNavigate();

     useEffect(()=>{
        const fetchData =async()=>{
            const projects= await getAllProjects();
            setProjects(projects);
            console.log(projects);
        };

        fetchData();
     },[]);

    
     const edit = <img src="/images/editer.png" alt="image" width={20} height={20} ></img>
     const view = <img src="/images/view.png" alt="image" width={20} height={20} ></img>
     const bin = <img src="/images/bin.png" alt="image" width={20} height={20} ></img>
     function getButton(color,text,onclickvar){
         return <div><button className={`p-2 ${color} rounded-xl`} onClick={onclickvar}>{text}</button></div>
     }

     const DriverModal = useMemo(() => {
        if (displayModal) {
          return (<Modal 
              modalWidth= "flex"
              modalHeight=""
              noAnimation={true}
            />
          );
        } else {
          return <Modal noAnimation={true} />;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [displayModal]);



    return (<div >
        
        <div className='relative text-white'>
        <h1 className='text-3xl text-center mt-2'>liste des projets</h1>
        <div className='h-[300px] w-full '>
            <table className="ml-[122px] table ">
                    <thead className="flex">
                        <tr className="flex">
                            
                            <td className='w-[200px] text-center'>Nom du projet</td>
                         
                            <td className='w-[300px] text-center'>Admin</td>
                            <td className='w-[300px] text-center'>Groupe</td>
                           
                            <td className='w-[200px] text-center'>Action</td>
                           
                        </tr>
                    </thead>
                    <tbody className="max-h-[200px] flex flex-col overflow-hidden hover:overflow-auto bg-gray-silver rounded-2xl dark:bg-charleston-green divide-y" >
                    {projects && projects.map((item, index) => <tr key={`project-${index}`} >
                            
                            <td className='w-[200px] text-center'>{item.name}</td>
                            <td className='w-[300px] text-center'><div className='flex flex-col'><div>{item.admin.firstname} {item.admin.lastname}</div><div>{item.admin.email}</div></div></td>
                            <td className='w-[200px] text-center'>{item.groups}</td>
                          
                           
                            <td className='w-[200px]'><div className='grid grid-cols-3 '>
                                <div className='col-start-1'>{getButton("bg-blue",view,()=>navigate(`/Projects/${item._id}`))}</div>
                                <div className='col-start-2'>{getButton("bg-green",edit)}</div>
                                <div className='col-start-3'>{getButton("bg-red",bin)}</div>
                                </div></td>
                        </tr>)} 
                    </tbody>
            </table> 

           
        </div>
        
    </div>
    </div>
    )
}

export default Projects;