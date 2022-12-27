import React,{useState,useEffect}  from 'react';
import { getGroups } from '../services/group';
import { useNavigate } from "react-router-dom";
const Groups =()=>{
    const [groups, setGroups] = useState([]);  
    let navigate = useNavigate(); 
    useEffect(()=>{
        const fetchData = async() =>{
            const groups = await getGroups();
            setGroups(groups);
        };
        fetchData();
        
    },[]);
    const link = <img src="/images/external-link.png" alt="image" width={20} height={20} ></img>
    const edit = <img src="/images/editer.png" alt="image" width={20} height={20} ></img>
    const view = <img src="/images/view.png" alt="image" width={20} height={20} ></img>
    const bin = <img src="/images/bin.png" alt="image" width={20} height={20} ></img>
    function getButton(color,text,onclickvar){
        return <div><button className={`p-2 ${color} rounded-xl`} onClick={onclickvar}>{text}</button></div>
    }
    return (
        <div >
            <h1 className='text-3xl text-center mt-2'>liste des groups</h1>
            <div className='h-[300px] w-full '>
                <table className="ml-[122px] table ">
                        <thead className="flex">
                            <tr className="flex">
                                <td className='w-[100px] p-3 text-center'>nb</td>
                                <td className='w-[200px] text-center'>Nom du group</td>
                                <td className='w-[300px] text-center'>Admin</td>
                                <td className='w-[300px] text-center'>Users</td>
                                <td className='w-[300px] text-center'>Project</td>
                                <td className='w-[200px] text-center'>Action</td>
                            </tr>
                        </thead>
                        <tbody className="max-h-[200px] flex flex-col overflow-hidden hover:overflow-auto bg-gray-silver rounded-2xl dark:bg-charleston-green divide-y" >
                        {groups && groups.map((item, index) => <tr key={`group-${index}`} >
                                <td className='w-[100px] p-3 text-center'>{index}</td>
                                <td className='w-[200px] text-center'>{item.name}</td>
                                <td className='w-[300px] text-center'><div className='flex flex-col'><div>{item.admin.firstname} {item.admin.lastname}</div><div>{item.admin.email}</div></div></td>
                                <td className='w-[300px] text-center'><div className='flex flex-row gap-2'><div className='w-[70%]'>nb de users associés : {Object.keys(item.users).length}</div>{getButton("bg-green",link)}</div></td>
                                <td className='w-[300px] text-center'><div className='flex flex-row gap-2'><div className='w-[70%]'>nb de project associés: {Object.keys(item.projects).length}</div>{getButton("bg-green",link)}</div></td>
                                <td className='w-[200px]'><div className='grid grid-cols-3 w-full'>
                                    <div className='col-start-1'>{getButton("bg-blue",view,()=>navigate(`/Groups/${item._id}`))}</div>
                                    <div className='col-start-2'>{getButton("bg-green",edit)}</div>
                                    <div className='col-start-3'>{getButton("bg-red",bin)}</div>
                                    </div></td>
                            </tr>)} 
                        </tbody>
                </table>    
            </div>
        </div>
        )

}
export default Groups;