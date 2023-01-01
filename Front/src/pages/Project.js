import React,{useState,useEffect}  from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProjectById } from '../services/project';


const Project =()=>{
    const {projectId}=useParams();
    const [project,setProject]=useState();

    useEffect(()=>{
        const fetchData=async()=>{
            const project= await getProjectById(projectId);
            setProject(project);
            console.log({project})
        };
        if(projectId){fetchData();}

    },[]);


    const edit = <img src="/images/editer.png" alt="image" width={20} height={20} ></img>
    const view = <img src="/images/view.png" alt="image" width={20} height={20} ></img>
    const bin = <img src="/images/bin.png" alt="image" width={20} height={20} ></img>
    function getButton(color,text,onclickvar){
        return <div><button className={`p-2 ${color} rounded-xl`} onClick={onclickvar}>{text}</button></div>
    }


    return(
        <div className=''>
      
        <div className='grid grid-cols-3 grid-rows-group mt-5'>
            <div className='col-span-1 text-3xl ml-5'>Information du projet </div>
            <div className="col-start-2 row-start-1 col-span-2 flex justify-end  ">
                    <div className="mr-[5%]">
                        <table className="text-lg">
                            <thead className="w-full ">
                            <tr className="border-b-2">
                                <th className="w-[150px] text-center text-sm">Nom du projet</th>
                                <th className="w-[150px] text-sm">admin</th>
                                
                            </tr>
                            </thead>
                            <tbody>
                            {project && <tr key={`info-00`}>
                                <td className="text-center text-sm">{project.name}</td>
                                <td className="text-center text-sm flex flex-col"><div className='text-center w-full'>{project.admin.firstname} {project.admin.lastname}</div><div className='text-center w-full'>{project.admin.email}</div></td>
                                <td>{project.timer}helllo</td>
                             
                               
                            </tr>}
                            </tbody>                
                        </table>
                    </div>

                    
            </div>
         
            
        </div>

    </div>

   
    )

    




}
export default Project