import { useEffect, useState, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProjects } from "../services/project";
import Modal from '../componants/Modal/Modal';
import { ModalContext } from './../containers/Modal';
import CreateProject from "../componants/Projects/CreateProject";

const Projects = () => {

    const [projects, setProjects] = useState([]);
    const [projet, setProjet] = useState([

    ])
    const { displayModal, modalChange, displayModalChange } = useContext(ModalContext);
    let navigate = useNavigate();
    const [time, setTime] = useState({ h: 0, m: 0, s: 0 });
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const projects = await getAllProjects();
            setProjects(projects);
            console.log(projects);
        };

        fetchData();
    }, []);


    const edit = <img src="/images/editer.png" alt="image" width={20} height={20} ></img>
    const view = <img src="/images/view.png" alt="image" width={20} height={20} ></img>
    const bin = <img src="/images/bin.png" alt="image" width={20} height={20} ></img>
    function getButton(color, text, onclickvar) {
        return <div><button className={`p-2 ${color} rounded-xl`} onClick={onclickvar}>{text}</button></div>
    }

    const DriverModal = useMemo(() => {
        if (displayModal) {
            return (<Modal
                modalWidth="flex"
                modalHeight=""
                noAnimation={true}
            />
            );
        } else {
            return <Modal noAnimation={true} />;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [displayModal]);



    function toggle() {
        setIsActive(!isActive);
    }

    function reset() {
        setTime({ h: 0, m: 0, s: 0 });
        setIsActive(false);
    }

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setTime(prevTime => {
                    let { h, m, s } = prevTime;
                    s++;
                    if (s === 60) {
                        m++;
                        s = 0;
                    }
                    if (m === 60) {
                        h++;
                        m = 0;
                    }
                    return { h, m, s };
                });
            }, 1000);
        } else if (!isActive && time.s !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, time]);

    function addLeadingZeros(time) {
        let h = time.h;
        let m = time.m;
        let s = time.s;
        if (h < 10) {
            h = `0${h}`;
        }
        if (m < 10) {
            m = `0${m}`;
        }
        if (s < 10) {
            s = `0${s}`;
        }
        return `${h}:${m}:${s}`;
    }








    return (<div >

        {displayModal && <div className={`fixed inset-0 z-[99999] justify-center h-full w-full `}>{DriverModal}</div>}


        <div className='relative text-white'>
            <h1 className='text-3xl text-center mt-2'>liste des projets</h1>



            <div className='h-[300px] w-full '>
                <table className="ml-[122px] table ">
                    <thead className="flex">
                        <tr className="flex">

                            <td className='w-[200px] text-center'>Nom du projet</td>

                            <td className='w-[300px] text-center'>Admin</td>


                            <td className='w-[200px] text-center'>Action</td>
                            <td className='w-[200px] text-center'>Timer</td>

                        </tr>
                    </thead>
                    <tbody className="max-h-[200px] flex flex-col overflow-hidden hover:overflow-auto bg-gray-silver rounded-2xl dark:bg-charleston-green divide-y" >
                        {projects && projects.map((item, index) => <tr key={`project-${index}`} >

                            <td className='w-[200px] text-center'>{item.name}</td>
                            <td className='w-[300px] text-center'><div className='flex flex-col'><div>{item.admin.firstname} {item.admin.lastname}</div><div>{item.admin.email}</div></div></td>



                            <td className='w-[200px]'><div className='grid grid-cols-3 '>
                                <div className='col-start-1'>{getButton("bg-blue", view, () => navigate(`/Projects/${item._id}`))}</div>
                                <div className='col-start-2'>{getButton("bg-green", edit)}</div>
                                <div className='col-start-3'>{getButton("bg-red", bin)}</div>
                            </div></td>

                            <td className='w-[200px]'><div className='grid grid-cols-3 '>

                                <div className="app">
                                    <div className="time">{addLeadingZeros(time)}</div>
                                    <div className="row">
                                        <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
                                            {isActive ? 'Pause' : 'Start'}
                                        </button>
                                        <button className="button" onClick={reset}>
                                            Reset
                                        </button>
                                    </div>
                                </div>


                            </div></td>
                        </tr>)}
                    </tbody>
                </table>


            </div>

            <div>{getButton("absolute top-5 left-[120px] bg-green", "créer un groupe",()=>{modalChange(<CreateProject />);displayModalChange(true);})}</div>

        </div>






    </div>
    )
}

export default Projects;


