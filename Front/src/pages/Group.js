import React,{ useState, useEffect, useMemo}  from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getGroupbyId, addUsertoGroup, deleteUserfromGroup } from '../services/group';
import { getAllUsers } from '../services/user';
import Select from 'react-select';
import { View, Check } from '../componants/Image/Image';

const Group = () => {
    let navigate = useNavigate();
    const {groupId} = useParams();
    const [group, setGroup] = useState();  
    const [adduser,setAdduser] = useState(false);
    const [users,setUsers] = useState();
    const [listusers, setListusers] = useState([]); 
    const [refreshData, setRefreshData] = useState(false);
    const check = <Check size={[30,30]} color={"green"}/>
    const view = <View size={[25,25]}/>
    const bin = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 25 25" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>

    useEffect(()=>{
        const fetchData = async() =>{
            const group = await getGroupbyId(groupId);
            setGroup(group);
        };

        if(groupId){
            fetchData();
        }

        const fetchDataUser = async() => {
            const users = await getAllUsers();
            if(users){
                setUsers(users.map(e => {
                    return {
                        value: e.email, label: e.firstname + " " + e.lastname
                    }
                }));
            }

        };

        fetchDataUser();

        if(refreshData){
            fetchDataUser()
        }
    },[refreshData]);

    const updateGroup = async () =>{
        const group = await getGroupbyId(groupId);
        setGroup(group);
    }

    const addUser = async () => {
        if(group.admin.email === localStorage.getItem("userEmail")){
            await addUsertoGroup(groupId, {admin: localStorage.getItem("userEmail"), users: listusers.map(e=>{return e.value})})
            await updateGroup();
            setRefreshData(!refreshData)
        }
        else{
            alert("You can't add users to this group because you're not the admin of this group !")
        }
         
    }

    const removeUser = async (email)=>{
        if(group.admin.email === localStorage.getItem("userEmail")){
            await deleteUserfromGroup(groupId, email, localStorage.getItem("userEmail"))
            await updateGroup();
            setRefreshData(!refreshData)
        }
        else{
            alert("You can't delete this user in this group because you're not the admin of this group !")
        }
    }
    
    const usergroup = useMemo(() => {
        return <> {group && group.users.map((item, index) => 
            <tr key={`vehicule-${index}`} className="bg-white mb-2">
                <td className="w-[100px] p-3" >{index+1}</td>
                <td className="w-[250px]" >{item.firstname}</td>
                <td className="w-[150px]" >{item.lastname}</td>
                <td className="w-[250px]" >{item.email}</td>
                <td className='w-[200px]'> 
                    {getButton("text-red", bin, () => {
                        removeUser(item.email)
                    })}
                </td>
            </tr>
        )}</>
    }, [group])

    const projectgroup = useMemo(() => {
        return <> {group && group.projects && group.projects.map((item, index) => 
            <tr key={`vehicule-${index}`} className="bg-white mb-2">
                <td className="w-[100px] p-3" >{index}</td>
                <td className="w-[250px]">{item.name}</td>
                <td className='w-[200px]'> 
                    {getButton("", view, () => navigate(`/Projects/${item._id}`))}
                </td>
            </tr>
        )}</>
    },[group])
    
    function getButton(color, text, onclickvar, className){
        return <div>
            <button className={` ${color} ${className ? className : "p-2 rounded-xl"}`} onClick={onclickvar}>
                {text}
            </button>
        </div>
    }

    function getButtonBorder(className, color, text, onclickvar){
        return <div>
            <button className={`${className} p-2 border-2 bg-${color} border-${color} text-white rounded-xl`} onClick={onclickvar}>
                {text}
            </button>
        </div>
    }

    return (
        <div className='mx-auto w-full'>
            <div className='mx-3 my-10' style={{zoom: "90%"}}>
                <div className='text-3xl ml-20 font-bold'>GROUP INFORMATION</div>
                <div className="my-7 overflow-auto rounded-lg shadow mx-20 bg-white">
                    {group &&
                        <ul className="my-7 ml-4 overflow-auto rounded-lg mx-5 bg-white">
                            <li className='mb-2' ><span style={{ color: '#6c757d' }} className="text-lg font-bold">Group name :</span> {group.name}</li>
                            <li ><span style={{ color: '#6c757d' }} className="text-lg font-bold">Admin :</span> {group.admin.email}</li>
                        </ul>
                    }
                </div>
            
                <div className="my-16 mx-20">
                    <label className="text-2xl font-bold" htmlFor="username">LIST OF USERS</label>
                    <div className='mt-8 mb-5'>
                        {!adduser && getButtonBorder("hover:bg-white hover:text-green hover:border-green font-bold", "green", "Add a user",()=>setAdduser(!adduser))}
                        {adduser && 
                            <div className='flex flex-row'>
                                <Select
                                    defaultValue={""}
                                    isMulti
                                    name="colors"
                                    options={users}
                                    className="basic-multi-select w-[300px] text-black border-solid"
                                    classNamePrefix="select text-white"
                                    onChange={e=>setListusers(e)}
                                />   
                            {getButton("bg-green", check, ()=>{setAdduser(!adduser);addUser()},"p-1 rounded-full ml-5")}                 
                            </div>
                        }
                    </div>

                    <div className='overflow-y-scroll h-[10rem] rounded-lg shadow mt-5'>
                        <table className="w-full text-lg text-center">
                            <thead className=" bg-gray-700 border-b-2 border-gray-700">
                                <tr>
                                    <th className="p-3 front-semibold tracking-wide text-center">No.</th>
                                    <th className="p-3 front-semibold tracking-wide text-center">First name</th>
                                    <th className="p-3 front-semibold tracking-wide text-center">Last name</th>
                                    <th className="p-3 front-semibold tracking-wide text-center">Email</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100" >
                                {usergroup}
                            </tbody>  
                        </table>
                    </div>
                </div>

                <div className=" my-16 mx-20">
                    <label className="text-2xl font-bold" htmlFor="username">LIST OF PROJECTS</label>
                    <div className='overflow-auto rounded-lg mt-5 overflow-y-scroll h-[10rem]'>
                        <table className="w-full text-center">
                            <thead className=" bg-gray-700 border-b-2 border-gray-700">
                                <tr className="">
                                    <th className="p-3 front-semibold tracking-wide text-center">No.</th>
                                    <th className="p-3 front-semibold tracking-wide text-center">Project name</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100" >
                                {projectgroup}
                            </tbody>  
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Group