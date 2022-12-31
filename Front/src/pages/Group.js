import React,{useState,useEffect,useMemo}  from 'react';
import { useParams, Link } from 'react-router-dom';
import { getGroupbyId, addUsertoGroup, deleteUsertoGroup } from '../services/group';
import { getAllUsers } from '../services/user';

import Select from 'react-select';

const Group = () =>{
    const {groupId} = useParams();
    const [group, setGroup] = useState();  
    const [adduser,setAdduser] = useState(false);
    const [addproject,setAddproject] = useState();
    const [users,setUsers] = useState();
    const [listusers, setListusers] = useState([]); 
    let update = 0;
    useEffect(()=>{
        const fetchData = async() =>{
            const group = await getGroupbyId(groupId);
            setGroup(group);
            
        };
        if(groupId){fetchData();}
        
    },[]);
    useEffect(()=>{
        const fetchData = async() =>{
            const users = await getAllUsers();
            if(users){setUsers(users.map(e=>{return {value:e.email,label:e.firstname+" "+e.lastname}}));}

        };
        fetchData();
        
    },[update]);
    const updateGroup = async () =>{
        const group = await getGroupbyId(groupId);
        setGroup(group);
    }
    const addUser = async ()=>{
         await addUsertoGroup(groupId,{admin:"matthieubarnab@gmail.com",users:listusers.map(e=>{return e.value})}).then(e=>{updateGroup();}).catch(e=>console.log("err:",e))
    }
    const removeUser = async (email)=>{
        await deleteUsertoGroup(groupId,[email],"matthieubarnab@gmail.com").then(e=>{updateGroup();}).catch(e=>console.log("err:",e))
    }
    const edit = <img src="/images/editer.png" alt="image" width={20} height={20} ></img>
    const view = <img src="/images/view.png" alt="image" width={20} height={20} ></img>
    const bin = <img src="/images/bin.png" alt="image" width={20} height={20} ></img>
    const check = <img src="/images/check.png" alt="image" width={30} height={30} color="green"></img>

    const infogroup = useMemo(() => {return <>{group && <tr key={`info-00`} className="">
        <td className="text-center text-sm">{group.name}</td>
        <td className="text-center text-sm flex flex-col"><div className='text-center w-full'>{group.admin.firstname} {group.admin.lastname}</div><div className='text-center w-full'>{group.admin.email}</div></td>
        <td className="text-center text-sm">{group.users ? Object.keys(group.users).length : 0}</td>
        <td className="text-center text-sm">{group.projects ? Object.keys(group.projects).length : 0}</td>
    </tr>}</>}, [group])

    const usergroup = useMemo(() => {return <>{group && group.users.map((item, index) => <tr key={`vehicule-${index}`} >
        <td className="w-[100px] p-3" >{index}</td>
        <td className="w-[250px] " >{item.firstname}</td>
        <td className="w-[150px] " >{item.lastname}</td>
        <td className="w-[250px] " >{item.email}</td>
        <td className='w-[200px]'> <div className='grid grid-cols-3 w-full'>
        <div className='col-start-2'>{getButton("bg-red",bin,()=>removeUser(item.email))}</div>
        </div></td>
    </tr>)}</>}, [group])

    const projectgroup = useMemo(()=>{return <>{group && group.projects && group.projects.map((item, index) => <tr key={`vehicule-${index}`} >
        <td className="w-[100px] p-3" >{index}</td>
        <td className="w-[250px] " >{item.name}</td>
        <td className="w-[150px] " ></td>
        <td className="w-[250px] " ></td>
        <td className='w-[200px]'> <div className='grid grid-cols-3 w-full'>
        <div className='col-start-1'>{getButton("bg-blue",view)}</div>
        <div className='col-start-2'>{getButton("bg-green",edit)}</div>
        <div className='col-start-3'>{getButton("bg-red",bin)}</div>
        </div></td>
    </tr>)}</>},[group])
    
    function getButton(color,text,onclickvar,className){
        return <div><button className={` ${color} ${className ? className : "p-2 rounded-xl"}`} onClick={onclickvar}>{text}</button></div>
    }
    function getButtonBorder(color,text,onclickvar){
        return <div><button className={`p-2 border-2 bg-white border-${color} text-${color} rounded-xl`} onClick={onclickvar}>{text}</button></div>
    }
    return (<div className=''>
        <div className='grid grid-cols-3 grid-rows-group mt-5'>
            <div className='col-span-1 text-3xl ml-20'>GROUP INFORMATION</div>
            <div className="col-start-2 row-start-1 col-span-2 flex justify-end  ">
                    <div className="mr-[5%]">
                        <table className="text-lg">
                            <thead className="w-full ">
                            <tr className="border-b-2">
                                <th className="w-[150px] text-center text-sm">Group name</th>
                                <th className="w-[150px] text-sm">Admin</th>
                                <th className="w-[150px] text-sm">Number of users</th>
                                <th className="w-[150px] text-sm">Number of projects</th>
                            </tr>
                            </thead>
                            <tbody>
                             {infogroup}
                            </tbody>                
                        </table>
                    </div>
            </div>
         
            <div className="col-start-1 col-span-3 row-start-2 ml-[122px] grid grid-cols-2 grid-rows-group2 ">
                <label className=" col-start-1 text-2xl mt-3" htmlFor="username">LIST OF USERS</label>
                <div className='col-start-2 row-start-1 mt-[2%]'>
                    {!adduser && getButtonBorder("green","Add a user",()=>setAdduser(!adduser))}
                   {adduser && <div className='flex flex-row'>
                    <Select
                        defaultValue={""}
                        isMulti
                        name="colors"
                        options={users}
                        className="basic-multi-select ml-[22px] w-[300px] text-black px-4 border-solid "
                        classNamePrefix="select text-white"
                        onChange={e=>setListusers(e)}
                    />   
                    {getButton("bg-green",check,()=>{setAdduser(!adduser);addUser()},"p-1 rounded-full")}                 
                    </div>}
                </div>
                <table className="col-start-1 table text-lg text-center mt-[5%]">
                    <thead className="flex">
                    <tr className="flex ">
                        <th className="w-[100px]">No.</th>
                        <th className="w-[250px]">First name</th>
                        <th className="w-[150px]">Last name</th>
                        <th className="w-[250px]">Email</th>
                        <th className="w-[200px]">Action</th>
            
                    </tr>
                    </thead>
                    <tbody className=" flex flex-col overflow-hidden hover:overflow-auto bg-gray-silver rounded-2xl divide-y max-h-[150px]" >
                        {usergroup}
                    </tbody>                
                </table>
            </div>
            <div className="col-start-1 col-span-3 row-start-3 ml-[122px] grid grid-cols-2 grid-rows-group2 ">
                <label className=" col-start-1 text-2xl mt-3" htmlFor="username">LIST OF PROJECTS</label>
                <div className='col-start-2 row-start-1 mt-[2%] flex flex-row gap-8'>
                    {!addproject && getButtonBorder("green","Add a project",()=>setAddproject(!addproject))}
                    {addproject && <div className='flex flex-row'>
                    <Select
                        defaultValue={""}
                        isMulti
                        name="colors"
                        options={users}
                        className="basic-multi-select ml-[22px] w-[300px] text-black px-4 border-solid "
                        classNamePrefix="select text-white"
                        onChange={e=>setListusers(e)}
                    />   
                    {getButton("bg-green",check,()=>setAddproject(!addproject),"p-1 rounded-full")}                 
                    </div>}
                  {!addproject && getButtonBorder("green","Rajouter un project")}
                </div>
                <table className="col-start-1  table text-lg text-center mt-[7%]">
                    <thead className="flex">
                    <tr className="flex ">
                        <th className="w-[100px]">No.</th>
                        <th className="w-[250px]">Project</th>
                        <th className="w-[150px]"></th>
                        <th className="w-[250px]"></th>
                        <th className="w-[200px]">Action</th>
            
                    </tr>
                    </thead>
                    <tbody className=" flex flex-col overflow-hidden hover:overflow-auto bg-gray-silver rounded-2xl divide-y max-h-[150px]" >
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
                    {projectgroup}
                    </tbody>                
                </table>
            </div>
        </div>

    </div>)
}
export default Group