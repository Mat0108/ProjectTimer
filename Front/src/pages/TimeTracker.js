import React, { useState, useEffect, Fragment }  from "react";
import { deleteTimeById } from "../services/time";
import { getAllProjects, getProjectById } from "../services/project";
import { useNavigate } from "react-router-dom";
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'

const TimeTracker = () => {
    const [projects, setProjects] = useState([]);  
    const [time, setTime] = useState(null);  

    let navigate = useNavigate(); 
    
    useEffect(()=>{
        const fetchData = async () => {
            const projects = await getAllProjects();
            setProjects(projects);
        };

        fetchData();
        
    }, []);

    console.log(getAllProjects())

    const bin = <img src="/images/bin.png" alt="image" width={20} height={20}></img>

    function getButton(color, text, onclickvar){
        return <div><button className={`p-2 ${color} rounded-xl`} onClick={onclickvar}>{text}</button></div>
    }

    return (
        <div>            
            {projects.map((project, index) => {
                return(
                    <div className="w-full px-4 pt-2">
                        <div className="mx-auto w-full max-w-l bg-white">
                            {project.timer.times.map((time, i) => {
                                return(
                                    <Disclosure>
                                        {({ open }) => (
                                            <>
                                                <Disclosure.Button as="ul" className="flex w-full justify-between px-5 py-3 pt-5 text-center text-base border font-medium hover:bg-black hover:bg-opacity-10">
                                                    <ChevronUpIcon
                                                        className={`${
                                                            open ? 'rotate-180 transform' : ''
                                                        } h-5 w-5 text-purple-500`}
                                                        />

                                                    <li className="">{time.name}</li>    
                                                    <li className="text-green">
                                                        <u>{project.name}</u>
                                                    </li> 
                                                    <li className="text-black text-opacity-40">{time.timestampTotal}</li>
                                                    <li className="font-bold text-black text-opacity-40">{time.timeTotal}</li>
                                                    <li>{getButton("bg-red", bin, () => {deleteTimeById(project.timer._id)})}</li>
                                                </Disclosure.Button>
                                                {time.history.map((history, i) => {
                                                    return(
                                                        <Disclosure.Panel as="ul" className="px-10 pt-5 pb-5 text-sm font-medium flex justify-between border text-base bg-black bg-opacity-10 hover:bg-black hover:bg-opacity-20">
                                                            <li className="">{time.name}</li>    
                                                            <li className="text-green">
                                                                <u>{project.name}</u>
                                                            </li> 
                                                            <li>{history.startTimestamp} - {history.endTimestamp}</li>
                                                            <li className="font-bold">{history.end}</li>
                                                        </Disclosure.Panel>
                                                    )
                                                })}
                                            </>
                                        )}
                                    </Disclosure>
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
