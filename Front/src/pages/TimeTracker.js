import React, { useState, useEffect, Fragment }  from "react";
import { deleteTimeById } from "../services/time";
import { getAllProjects, getProjectById } from "../services/project";
import { useLocation, useNavigate } from "react-router-dom";
import { Disclosure, Menu } from '@headlessui/react'

const TimeTracker = () => {
    const [projects, setProjects] = useState([]);  
    const [selectedProject, setSelectedProject] = useState([]); 
    const location = useLocation();
    

    let navigate = useNavigate(); 
    
    useEffect(()=>{
        const fetchData = async () => {
            const projects = await getAllProjects();
            const userProjects = [];

            projects.map(project => {
                if(project.admin.email === location.state.userEmail){
                    userProjects.push(project)
                }
                
                project.groups.map(group => {
                    group.users.map(user => {
                        if(user === location.state.userId){
                            userProjects.push(project)
                        }
                    })
                })
                
            })

            setProjects(userProjects)
        };

        fetchData();
        
    }, []);

 

    const bin = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 25 25" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
    const play = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 23 23" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
    </svg>
    const star = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
    </svg>
    const add = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    const user = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
    </svg>
  
    function getButton(color, text, onclickvar){
        return <div><button className={`p-2 ${color} rounded-xl`} onClick={onclickvar}>{text}</button></div>
    }

    return (
        <div>
            <div className="mx-7 my-12 grid xl:grid-cols-9 xl:grid-rows-1 grid-cols-2 grid-rows-3 gap-y-7 gap-x-3 bg-white px-5 py-4 grid-rows-1">
                <div className="xl:col-span-3 col-span-2">
                    <input placeholder={"What are you working on at the moment ?"} className="border px-5 py-3 rounded-xl w-full"/>
                </div>
        
                <div className="flex flex-row col-span-3">
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button className="inline-flex w-full justify-center text-green rounded-md pt-3 ml-5 px-4 py-2 text-sm font-medium text-white hover:text-orange">
                                {add} &nbsp; <span>Project</span>
                            </Menu.Button>
                        </div>
                    
                        <Menu.Items className="absolute left-0 mt-2 ml-12 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="px-1 py-1 ">
                                {projects.map((project, index) => {
                                    return(
                                        <Menu.Item>
                                            <button className="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-lightgrey hover:text-white" onClick={() => { setSelectedProject(project)}}>
                                                {project.name}
                                            </button>
                                        </Menu.Item>
                                    )}
                                )}
                            </div>
                        </Menu.Items>
                    </Menu>
                    
                    {selectedProject.length !== 0 ?
                        <span className="ml-10 text-sm py-3 font-bold text-pink flex flex-row"> {star} &nbsp; {selectedProject.name}</span>
                        :
                        <span className="ml-10 text-sm py-3 font-bold text-pink flex flex-row"></span>
                    }
                </div>

                <div className="xl:col-span-1 col-span-1 xl:pt-3 font-bold text-right py-3 xl-py-0 mr-5 xl:mr-0">
                    00:00:00
                </div>

                <button className="bg-green rounded-xl text-white font-bold w-36 xl:col-span-2 col-span-1 mx-auto">Start</button>
                {/*<button className="bg-red rounded-xl text-white font-bold w-36 xl:col-span-2 col-span-1 mx-auto">Stop</button>*/}      
            </div>

            {projects.map((project, index) => {
                return(
                    <div className="w-full px-7 pt-2" key={`project-${index}`}>
                        <div className="mx-auto w-full max-w-l bg-white">

                            {project.timer && project.timer.times.map((time, i) => {
                                return(
                                    <div key={`time-${i}`}>
                                        <div className="mx-auto w-full max-w-l bg-black bg-opacity-25 py-3 px-5 font-bold">{time.date}</div>

                                        <Disclosure>
                                            {({ open }) => (
                                                <>
                                                    <div className="grid xl:grid-cols-12 xl:grid-rows-1 grid-cols-4 grid-rows-2 w-full px-5 py-3 pt-6 pb-6 text-center text-base border font-medium">
                                                        <Disclosure.Button className="col-span-1 order-1 hover:bg-black hover:bg-opacity-10 bg-blue bg-opacity-25 text-white text-center rounded-3xl w-7 h-8 ml-2 mt-1">
                                                            {time.history.length}
                                                        </Disclosure.Button>  
                                                        
                                                        <div className="col-span-1 pt-2 text-left order-2">{time.name}</div>    
                                                        <div className="text-pink xl:col-span-6 col-span-2 pt-2 text-left xl:order-3 order-4 row-span-1 xl:my-0 my-4 flex flex-row">
                                                            {star} &nbsp; {project.name}
                                                        </div> 
                                                        <div className="text-black text-opacity-40 col-span-2 xl:pt-2 xl:border-r xl:border-l border-l xl:border-0 border-t border-black-100 border-dotted xl:order-4 order-5 pt-7">{time.timestampTotal.slice(0, 5)} - {time.timestampTotal.slice(11, 16)}</div>
                                                        <div className="font-bold text-black text-opacity-40 col-span-2 pt-2 xl:border-r border-dotted border-l gap-2 xl:order-5 order-3">{time.timeTotal.slice(0, 8)}</div>
                                                    </div>
                                                    <div className="col-span-1 flex flex-row justify-evenly border-dotted order-6 border xl:border-0">
                                                        {getButton("text-green", play, () => {})}
                                                        {getButton("text-red", bin, () => {
                                                            deleteTimeById(project.timer._id, project._id)
                                                            window.location.reload();
                                                        })}
                                                    </div>

                                                    {time.history.map((history, i) => {
                                                        return(
                                                            <Disclosure.Panel as="ul" className="px-5 pt-6 pb-6 text-sm font-medium grid xl:grid-cols-12 xl:grid-rows-1 grid-cols-4 grid-rows-3 border text-base text-center bg-black bg-opacity-5 hover:bg-black hover:bg-opacity-20" key={`history-${i}`}>
                                                                <li className="col-span-2 text-left pl-2 pt-2 pb-2 order-1">{time.name}</li>    
                                                                <li className="text-pink xl:col-span-3 col-span-2 text-left pt-2 pb-2 flex flex-row xl:my-0 my-4 row-span-1 order-3 xl:order-2">
                                                                    {star} &nbsp; {project.name}
                                                                </li> 
                                                                <li className="text-orange xl:col-span-3 col-span-4 xl:text-left text-center xl:pt-2 xl:pb-2 pt-8 flex flex-row xl:my-0 my-4 row-span-1 order-5 xl:border-0 border-t border-dotted border-black-100 justify-center xl:order-3 xl:justify-start">
                                                                    {user} &nbsp; {history.user}
                                                                </li> 
                                                                <li className="col-span-2 xl:border-r xl:border-l xl:border-0 border-l border-black-100 border-dotted xl:pt-2 xl:pb-2 pt-8 order-4">{history.startTimestamp.slice(0, 5)} - {history.endTimestamp.slice(0, 5)}</li>
                                                                <li className="font-bold col-span-2 xl:pt-2 xl:pb-2 pt-7 xl:border-r border-dotted xl:border-0 border-l border-b order-2 xl:order-5">{history.end.slice(0, 8)}</li>
                                                            </Disclosure.Panel>
                                                        )
                                                    })}
                                                </>
                                            )}
                                        </Disclosure>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })} 
        </div>
    )
}

export default TimeTracker;
