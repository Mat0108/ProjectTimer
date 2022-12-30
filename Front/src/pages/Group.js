import React,{useState,useEffect}  from 'react';
import { useParams, Link } from 'react-router-dom';
import { getGroupbyId } from '../services/group';

const Group = () =>{
    const {groupId} = useParams();
    const [group, setGroup] = useState();   
    useEffect(()=>{
        const fetchData = async() =>{
            const group = await getGroupbyId(groupId);
            setGroup(group);
            
        };
        if(groupId){fetchData();}
        
    },[]);
    const edit = <img src="/images/editer.png" alt="image" width={20} height={20} ></img>
    const view = <img src="/images/view.png" alt="image" width={20} height={20} ></img>
    const bin = <img src="/images/bin.png" alt="image" width={20} height={20} ></img>
    function getButton(color,text,onclickvar){
        return <div><button className={`p-2 ${color} rounded-xl`} onClick={onclickvar}>{text}</button></div>
    }
    return (<div className=''>
        <div className='grid grid-cols-3 grid-rows-group mt-5'>
            <div className='col-span-1 text-3xl ml-5'>Information du group</div>
            <div className="col-start-2 row-start-1 col-span-2 flex justify-end  ">
                    <div className="mr-[5%]">
                        <table className="text-lg">
                            <thead className="w-full ">
                            <tr className="border-b-2">
                                <th className="w-[150px] text-center text-sm">Nom du groupe</th>
                                <th className="w-[150px] text-sm">admin</th>
                                <th className="w-[150px] text-sm">Nb d'users</th>
                                <th className="w-[150px] text-sm">Nb de projects</th>
                            </tr>
                            </thead>
                            <tbody>
                            {group && <tr key={`info-00`}>
                                <td className="text-center text-sm">{group.name}</td>
                                <td className="text-center text-sm flex flex-col"><div className='text-center w-full'>{group.admin.firstname} {group.admin.lastname}</div><div className='text-center w-full'>{group.admin.email}</div></td>
                                <td className="text-center text-sm">{group.users ? Object.keys(group.users).length : 0}</td>
                                <td className="text-center text-sm">{group.projects ? Object.keys(group.projects).length : 0}</td>
                            </tr>}
                            </tbody>                
                        </table>
                    </div>
            </div>
         
            <div className="col-start-1 col-span-3 row-start-2 ml-[122px] grid grid-cols-2 grid-rows-group2 ">
                <label className=" col-start-1 text-3xl" htmlFor="username">Utilisateurs du groupe</label>
                <div className='col-start-2 row-start-1 mt-[2%] '>
                  <Link className=' text-lg bg-green p-2 rounded-2xl '>Rajouter un user</Link>
                  <Link className='ml-[5%] text-lg bg-green p-2 rounded-2xl'>Créer un user</Link>
                </div>
                <table className="col-start-1  table text-lg text-center mt-[1%]">
                    <thead className="flex">
                    <tr className="flex ">
                        <th className="w-[100px]">position</th>
                        <th className="w-[250px]">Prénom</th>
                        <th className="w-[150px]">Nom</th>
                        <th className="w-[250px]">Mail</th>
                        <th className="w-[200px]">Action</th>
            
                    </tr>
                    </thead>
                    <tbody className=" flex flex-col overflow-hidden hover:overflow-auto bg-gray-silver rounded-2xl divide-y" >
                    {group && group.users.map((item, index) => <tr key={`vehicule-${index}`} >
                        <td className="w-[100px] p-3" >{index}</td>
                        <td className="w-[250px] " >{item.firstname}</td>
                        <td className="w-[150px] " >{item.lastname}</td>
                        <td className="w-[250px] " >{item.email}</td>
                        <td className='w-[200px]'> <div className='grid grid-cols-3 w-full'>
                        <div className='col-start-1'>{getButton("bg-blue",view)}</div>
                        <div className='col-start-2'>{getButton("bg-green",edit)}</div>
                        <div className='col-start-3'>{getButton("bg-red",bin)}</div>
                        </div></td>
                        </tr>)}
                    </tbody>                
                </table>
            </div>
            <div className="col-start-1 col-span-3 row-start-3 ml-[122px] grid grid-cols-2 grid-rows-group2 ">
                <label className=" col-start-1 text-3xl" htmlFor="username">Projets du groupe</label>
                <div className='col-start-2 row-start-1 mt-[2%] '>
                  <Link className=' text-lg bg-green p-2 rounded-2xl '>Rajouter un project</Link>
                  <Link className='ml-[5%] text-lg bg-green p-2 rounded-2xl'>Créer un project</Link>
                </div>
                <table className="col-start-1  table text-lg text-center mt-[1%]">
                    <thead className="flex">
                    <tr className="flex ">
                        <th className="w-[100px]">position</th>
                        <th className="w-[250px]">Project</th>
                        <th className="w-[150px]"></th>
                        <th className="w-[250px]"></th>
                        <th className="w-[200px]">Action</th>
            
                    </tr>
                    </thead>
                    <tbody className=" flex flex-col overflow-hidden hover:overflow-auto bg-gray-silver rounded-2xl divide-y" >
                    <tr key={`vehicule-0`} >
                        <td className="w-[100px] p-3" >0</td>
                        <td className="w-[250px] " >test</td>
                        <td className="w-[150px] " ></td>
                        <td className="w-[250px] " ></td>
                        <td className='w-[200px]'> <div className='grid grid-cols-3 w-full'>
                        <div className='col-start-1'>{getButton("bg-blue",view)}</div>
                        <div className='col-start-2'>{getButton("bg-green",edit)}</div>
                        <div className='col-start-3'>{getButton("bg-red",bin)}</div>
                        </div></td>
                        </tr>
                    {group && group.projects && group.projects.map((item, index) => <tr key={`vehicule-${index}`} >
                        <td className="w-[100px] p-3" >{index}</td>
                        <td className="w-[250px] " >{item.name}</td>
                        <td className="w-[150px] " ></td>
                        <td className="w-[250px] " ></td>
                        <td className='w-[200px]'> <div className='grid grid-cols-3 w-full'>
                        <div className='col-start-1'>{getButton("bg-blue",view)}</div>
                        <div className='col-start-2'>{getButton("bg-green",edit)}</div>
                        <div className='col-start-3'>{getButton("bg-red",bin)}</div>
                        </div></td>
                        </tr>)}
                    </tbody>                
                </table>
            </div>
        </div>

    </div>)
}
export default Group