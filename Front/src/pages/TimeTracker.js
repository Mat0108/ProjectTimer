import React, { useState, useEffect, Fragment }  from "react";
import { deleteTimeById } from "../services/time";
import { getAllProjects, getProjectById } from "../services/project";
import { useNavigate } from "react-router-dom";
import { Disclosure } from '@headlessui/react'
import InputField from "../componants/general/Inputs/InputField";

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

    const bin = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 25 25" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
    const play = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 23 23" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
    </svg>
    const star = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
        <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
    </svg>
    const add = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  
  
    function getButton(color, text, onclickvar){
        return <div><button className={`p-2 ${color} rounded-xl`} onClick={onclickvar}>{text}</button></div>
    }

    return (
        <div>
            <div className="mx-7 my-12 grid xl:grid-cols-9 xl:grid-rows-1 grid-cols-2 grid-rows-3 gap-y-7 gap-x-3 bg-white px-5 py-4 grid-rows-1">
                <div className="xl:col-span-4 col-span-2">
                    <input placeholder={"What are you working on at the moment ?"} className="border px-5 py-3 rounded-xl w-full"/>
                </div>
                <button className="text-green flex flex-row col-span-2 pt-3 ml-5">
                    {add} &nbsp; <span>Project</span>
                </button> 
                <div className="xl:col-span-1 col-span-1 xl:pt-3 font-bold text-right py-3 xl-py-0 mr-5 xl:mr-0">
                    00:00:00
                </div>
                <button className="bg-green rounded-xl text-white font-bold w-36 xl:col-span-2 col-span-1 mx-auto">Start</button>
                {/*<button className="bg-red rounded-xl text-white font-bold w-36 xl:col-span-2 col-span-1 mx-auto">Stop</button>*/}      
            </div>

            {projects.map((project, index) => {
                return(
                    <div className="w-full px-7 pt-2">
                        <div className="mx-auto w-full max-w-l bg-white">
                            {project.timer && project.timer.times.map((time, i) => {
                                return(
                                    <div>
                                        {/*project.timer.times[i].date !== project.timer.times[project.timer.times.length-1].date ?
                                            <div className="mx-auto w-full max-w-l bg-black bg-opacity-25 py-3 px-5">{project.timer.times[i].date}</div>
                                            :
                                            <div className="mx-auto w-full max-w-l bg-black bg-opacity-25 py-3 px-5">0</div>
                                        */}
                                        <div className="mx-auto w-full max-w-l bg-black bg-opacity-25 py-3 px-5">{time.date}</div>

                                        <Disclosure>
                                            {({ open }) => (
                                                <>
                                                    <div className="grid xl:grid-cols-12 xl:grid-rows-1 grid-cols-3 grid-rows-4 w-full px-5 py-3 pt-6 pb-6 text-center text-base border font-medium">
                                                        <Disclosure.Button className="col-span-1 order-1 hover:bg-black hover:bg-opacity-10 bg-blue bg-opacity-25 text-white text-center rounded-3xl w-7 h-8 ml-2 mt-1">
                                                            {time.history.length}
                                                        </Disclosure.Button>  
                                                        
                                                        <div className="col-span-1 pt-2 text-left order-2">{time.name}</div>    
                                                        <div className="text-pink col-span-6 pt-2 text-left xl:order-3 order-4 row-span-2 xl:my-0 my-4 flex flex-row">
                                                            {star} &nbsp; {project.name}
                                                        </div> 
                                                        <div className="text-black text-opacity-40 col-span-2 pt-2 xl:border-r xl:border-l xl:border-0 border border-black-100 border-dotted xl:order-4 order-5">{time.timestampTotal.slice(0, 5)} - {time.timestampTotal.slice(11, 16)}</div>
                                                        <div className="font-bold text-black text-opacity-40 col-span-1 pt-2 xl:border-r xl:border-dotted gap-2 xl:order-5 order-3">{time.timeTotal.slice(0, 8)}</div>

                                                        <div className="col-span-1 flex flex-row justify-evenly border-dotted order-6 border xl:border-0">
                                                            {getButton("text-green", play, () => {})}
                                                            {getButton("text-red", bin, () => {
                                                                deleteTimeById(project.timer._id)
                                                                window.location.reload();
                                                            })}
                                                        </div>
                                                    </div>
                                                    {time.history.map((history, i) => {
                                                        return(
                                                            <Disclosure.Panel as="ul" className="px-5 pt-6 pb-6 text-sm font-medium grid xl:grid-cols-12 xl:grid-rows-1 grid-cols-3 grid-rows-4 border text-base text-center bg-black bg-opacity-5 hover:bg-black hover:bg-opacity-20">
                                                                <li className="col-span-2 text-left pl-2 pt-2 pb-2">{time.name}</li>    
                                                                <li className="text-pink col-span-6 text-left pt-2 pb-2 flex flex-row xl:my-0 my-4 row-span-2">
                                                                    {star} &nbsp; {project.name}
                                                                </li> 
                                                                <li className="col-span-2 xl:border-r xl:border-l xl:border-0 border border-black-100 border-dotted pt-2 pb-2">{history.startTimestamp.slice(0, 5)} - {history.endTimestamp.slice(0, 5)}</li>
                                                                <li className="font-bold col-span-1 pt-2 pb-2 xl:border-r border-dotted xl:border-0 border">{history.end.slice(0, 8)}</li>
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
