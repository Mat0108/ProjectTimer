import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProjectById, addGroupToProject, deleteGrouptoProject } from '../services/project';
import { getGroups } from '../services/group';
import Select from 'react-select';
import { Check } from '../componants/Image/Image';
import { View} from '../componants/Image/Image';


const Project = () => {
    let navigate = useNavigate();
    const { projectId } = useParams();
    const [project, setProject] = useState([]);
    const [addgroup, setAddGroup] = useState(false);
    const [groups, setGroups] = useState([]);
    const [listgroups, setListgroups] = useState([]);
    const [refreshData, setRefreshData] = useState(false);
    const check = <Check size={[30,30]} color={"green"}/>
    const view = <View size={[25,25]}/>
    const bin = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 25 25" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>

    useEffect(() => {
        const fetchData = async () => {
            const projectData = await getProjectById(projectId);
            setProject(projectData);

        };

        fetchData();

        if (refreshData) {
            fetchData();
        }

    }, [refreshData]);

    useEffect(() => {
        const fetchData = async () => {
            const groups = await getGroups();
            const userGroups = [];

            groups.map(group => {
                if (localStorage.getItem("userEmail") && group.admin.email === localStorage.getItem("userEmail")) {
                    userGroups.push(group)
                }
            })

            if(groups){ 
                setGroups(groups.map(e => { 
                    return { 
                        value: e._id, 
                        label: e.name 
                    } 
                })); 
            }
        };

        fetchData();

        if (refreshData) {
            fetchData();
        }

    }, [refreshData]);

    const addGroup = async () => {
        if(localStorage.getItem("userEmail") === project.admin.email){
            await addGroupToProject(projectId, localStorage.getItem("userEmail"), listgroups.map(e => { return e.value }));
            setRefreshData(true)
        }
        else{
            alert("You can't add groups to this project because you're not the admin of this project !")
        }
    }

    const removeGroup = async (id) => {
        if(localStorage.getItem("userEmail") === project.admin.email){
            const groups = [];
            groups.push(id)

            await deleteGrouptoProject(projectId, localStorage.getItem("userEmail"), groups)
            setRefreshData(true)
        }
        else{
            alert("You can't delete this group in this project because you're not the admin of this project !")
        }
    }

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
                <div className='text-3xl ml-20 font-bold'>PROJECT INFORMATION </div>
                <div>
                    <div className="my-7 overflow-auto rounded-lg shadow mx-20 bg-white">
                        {project.length !== 0 &&
                            <ul className="my-7 ml-4  overflow-auto rounded-lg mx-5 bg-white">
                                <li className='mb-2'>
                                    <span style={{ color: '#6c757d' }} className="text-lg font-bold">Project name : </span> 
                                    {project.name}
                                </li>
                                <li>
                                    <span style={{ color: '#6c757d' }} className="text-lg font-bold">Admin : </span> 
                                    {project.admin.email}
                                </li>
                            </ul>
                        }
                    </div>
                </div>

                <div className="my-16 mx-20">
                    <label className="text-2xl font-bold" htmlFor="username">LIST OF GROUPS</label>
                    <div className='mt-8'>
                        {!addgroup && getButtonBorder("hover:bg-white hover:text-green hover:border-green font-bold", "green", "Add a group", () => setAddGroup(!addgroup))}
                        {addgroup && 
                            <div className='flex flex-row'>
                                <Select
                                    defaultValue={""}
                                    isMulti
                                    name="colors"
                                    options={groups}
                                    className="basic-multi-select w-[300px] text-black border-solid"
                                    classNamePrefix="select text-white"
                                    onChange={e => setListgroups(e)}
                                />
                                {getButton("bg-green", check, () => { 
                                        setAddGroup(!addgroup); 
                                        addGroup() 
                                    }, "p-1 rounded-full ml-5")
                                }
                            </div>
                        }
                    </div>
                </div>

                <div className='overflow-auto rounded-lg shadow mx-20 overflow-y-scroll h-[24rem]'>
                    <table className="w-full text-lg text-center">
                        <thead className=" bg-gray-700 border-b-2 border-gray-700">
                            <tr>
                                <th className="p-3 front-semibold tracking-wide text-center">No.</th>
                                <th className="p-3 front-semibold tracking-wide text-center">Group name</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100"  >
                            <>{project.groups && project.groups.map((item, index) => 
                                <tr className="bg-white mb-2" key={`vehicule-${index}`} > 
                                    <td className="w-[300px] p-3" >{index+1}</td>
                                    <td className="w-[700px] " >{item.name}</td>
                                    <td className='px-4 py-2'>
                                        <div className="flex justify-center align-center" >
                                            <div className='mr-10'>{getButton("text-blue hover:bg-black hover:bg-opacity-25", view, () => navigate(`/Groups/${item._id}`))}</div>
                                            <div>
                                                {getButton("text-red hover:bg-black hover:bg-opacity-25", bin, () => {
                                                    removeGroup(item._id)
                                                    setRefreshData(!refreshData)
                                                })}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}</>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Project