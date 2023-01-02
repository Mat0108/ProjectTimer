import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProjectById, addGroupToProject } from '../services/project';
import { getGroups, getGroupbyId, addUsertoGroup, deleteUsertoGroup } from '../services/group';
import Select from 'react-select';
import { Check } from '../componants/Image/Image';


const Project = () => {
    const { projectId } = useParams();
    const [project, setProject] = useState([]);
    const [addgroup, setAddGroup] = useState(false);
    const [groups, setGroups] = useState([]);
    const [listgroups, setListgroups] = useState([]);
    const [refreshData, setRefreshData] = useState(false);
    let update = 0;

    console.log(projectId)

    useEffect(() => {
        const fetchData = async () => {
            const projectData = await getProjectById(projectId);
            setProject(projectData);
            console.log(projectData)

        };
        fetchData();
        if (refreshData) {
            fetchData();
        }

        console.log(project)
        console.log(projectId)

    }, [refreshData]);


    useEffect(() => {
        const fetchData = async () => {
            const groups = await getGroups();
           
            console.log(groups)

            const userGroups = [];
        
            groups.map(group => {
                console.log(group.name)
                if(localStorage.getItem("userEmail") && group.admin.email === localStorage.getItem("userEmail")){
                    userGroups.push(group)
                }
                
                
                
            })

            if(groups){setGroups(groups.map(e=>{return {value:e._id,label:e.name}}));}
            
            console.log(userGroups)

            
           
        };

      
        fetchData();
        if (refreshData) {
            fetchData();
        }

    }, [refreshData]);

    //=============

    const addGroup = async () => {
        console.log(listgroups)
        await addGroupToProject(projectId, localStorage.getItem("userEmail"), listgroups.map(e => { return e.value }));
        setRefreshData(true)

    }


    function getButton(color, text, onclickvar) {
        return <div><button className={`p-2 ${color} rounded-xl`} onClick={onclickvar}>{text}</button></div>
    }
    function getButtonBorder(color, text, onclickvar) {
        return <div><button className={`p-2 border-2 bg-white border-${color} text-${color} rounded-xl`} onClick={onclickvar}>{text}</button></div>
    }




    return (
        <div className='mx-auto w-full'>

            <div className='mx-3 my-7'>
                <div className='text-2xl'>PROJECT INFORMATION </div>
                <div className="  ">
                    <div className="my-7">
                        <table className="text-lg">
                            <thead className="w-full ">
                                <tr className="border-b-2">
                                    <th className="w-[150px] text-center text-sm">Project name</th>
                                    <th className="w-[150px] text-sm">admin</th>

                                </tr>
                            </thead>
                            <tbody>
                                {project.length!==0 && <tr key={`info-00`}>
                                    <td className="text-center text-sm">{project.name}</td>
                                    <td className="text-center text-sm flex flex-col"><div className='text-center w-full'>{project.admin.firstname} {project.admin.lastname}</div><div className='text-center w-full'>{project.admin.email}</div></td>



                                </tr>}
                            </tbody>
                        </table>
                    </div>


                </div>

                {/* <div></div> */}

                <div className="ml-2 my-7">
                    <label className=" col-start-1 text-2xl mt-3" htmlFor="username">LIST OF GROUPS</label>
                    <div className='col-start-2 row-start-1 mt-[2%]'>
                        {!addgroup && getButtonBorder("green", "Add a group", () => setAddGroup(!addgroup))}
                        
                        {addgroup && <div className='flex flex-row'>
                            <Select
                                defaultValue={""}
                                isMulti
                                name="colors"
                                
                                options={groups}
                                className="basic-multi-select ml-[22px] w-[300px] text-black px-4 border-solid "
                                classNamePrefix="select text-white"
                                onChange={e => setListgroups(e)}
                            />
                            {getButton("bg-green", <Check size={[30,30]}/>, () => { setAddGroup(!addgroup); addGroup() }, "p-1 rounded-full")}
                        </div>}
                    </div>

                </div>

                <table className="col-start-1  table text-lg text-center">
                    <thead className="flex">
                        <tr className="flex mx-4">
                            <th className="w-[100px]">No.</th>
                            <th className="w-[250px]">Group name</th>
                            <th className="w-[150px]"></th>
                            <th className="w-[250px]"></th>


                        </tr>
                    </thead>
                    <tbody className=" flex flex-col overflow-hidden hover:overflow-auto bg-gray-silver rounded-2xl divide-y max-h-[150px]" >
                        
                        <>{project.groups && project.groups.map((item, index) => <tr key={`vehicule-${index}`} > <td className="w-[100px] p-3" >{index}</td>
                            <td className="w-[250px] " >{item.name}</td>
                            <td className="w-[150px] " ></td>
                            <td className="w-[250px] " ></td>

                        </tr>)}</>

                        

                    </tbody>
                </table>


            </div>

        </div>


    )






}


export default Project