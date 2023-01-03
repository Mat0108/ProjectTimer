import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import { getProjectById, addGroupToProject, deleteGrouptoProject } from '../services/project';
import { getGroups, getGroupbyId, addUsertoGroup, deleteUsertoGroup, } from '../services/group';
import Select from 'react-select';
import { Check } from '../componants/Image/Image';


const Project = () => {
    const { projectId } = useParams();
    const [project, setProject] = useState([

    ]);
    const [addgroup, setAddGroup] = useState(false);
    const [groups, setGroups] = useState([]);
    const [listgroups, setListgroups] = useState([]);
    const [refreshData, setRefreshData] = useState(false);
    let update = 0;
    let navigate = useNavigate();

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
                if (localStorage.getItem("userEmail") && group.admin.email === localStorage.getItem("userEmail")) {
                    userGroups.push(group)
                }



            })

            if (groups) { setGroups(groups.map(e => { return { value: e._id, label: e.name } })); }

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

    const removeGroup = async (id) => {
        const groups = [];
        groups.push(id)
        await deleteGrouptoProject(projectId, localStorage.getItem("userEmail"), groups)
        setRefreshData(true)
    }




    //=====================


    const edit = <img src="/images/editer.png" alt="image" width={20} height={20} ></img>
    const view = <img src="/images/view.png" alt="image" width={20} height={20} ></img>
    const bin = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 25 25" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
    const check = <img src="/images/check.png" alt="image" width={30} height={30} color="green"></img>
    const getButton = (color, text, onclickvar) => {
        return <div><button className={`p-2 ${color} rounded-xl`} onClick={onclickvar}>{text}</button></div>
    }
    function getButtonBorder(color, text, onclickvar) {
        return <div><button className={`p-2 border-2 bg-white border-${color} text-${color} rounded-xl`} onClick={onclickvar}>{text}</button></div>
    }







    return (
        <div className='mx-auto w-full'>

            <div className='mx-3 my-7'>
                <div className='text-2xl '>PROJECT INFORMATION </div>
                <div className="  ">
                    <div className="my-7 ml-4  overflow-auto rounded-lg shadow mx-5 bg-white">



                        {project.length !== 0 &&


                            <ul className="my-7 ml-4  overflow-auto rounded-lg  mx-5 bg-white">

                                <li className='mb-2' ><span style={{ color: '#6c757d' }} className="text-lg font-bold">Project name :</span> {project.name}</li>
                                <li ><span style={{ color: '#6c757d' }} className="text-lg font-bold">Admin :</span> {project.admin.email}</li>

                            </ul>
                        }


                    </div>


                </div>


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

                <div className=' overflow-auto rounded-lg shadow mx-5 '>
                    <table className="w-full text-lg text-center">
                        <thead className=" bg-gray-700 border-b-2 border-gray-700">
                            <tr className="">
                                <th className="p-3 text-sm front-semibold tracking-wide  text-center ">No.</th>
                                <th className="p-3 text-sm front-semibold tracking-wide  text-center ">Group name</th>
                                <th className="p-3 text-sm front-semibold tracking-wide  text-center "></th>



                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100  "  >

                            <>{project.groups && project.groups.map((item, index) => <tr className="bg-white    mb-2" key={`vehicule-${index}`} > <td className="w-[100px] p-3" >{index}</td>
                                <td className="w-[250px] " >{item.name}</td>
                                <td className="w-[150px] " >


                                </td>

                                <td className='px-4 py-2'><div className="flex justify-center align-center" >

                                    <div>
                                        {getButton("text-red", bin, () => {
                                            removeGroup(item._id)
                                            setRefreshData(!refreshData)


                                        })}
                                    </div>


                                    <div className='col-start-1'>{getButton("text-blue", view, () => navigate(`/Groups/${item._id}`))}</div>




                                </div></td>


                            </tr>)}</>



                        </tbody>
                    </table>
                </div>


            </div>

        </div>


    )






}


export default Project