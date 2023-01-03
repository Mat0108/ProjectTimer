import { useEffect, useState, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProjects, deleteProjectById } from "../services/project";
import Modal from '../componants/Modal/Modal';
import { ModalContext } from './../containers/Modal';
import CreateProject from "../componants/Projects/CreateProject";
import { Bin, View } from "../componants/Image/Image";

const Projects = () => {

    const [projects, setProjects] = useState([]);
    const [projet, setProjet] = useState([

    ])
    const { displayModal, modalChange, displayModalChange } = useContext(ModalContext);
    let navigate = useNavigate();
    const [time, setTime] = useState({ h: 0, m: 0, s: 0 });
    const [isActive, setIsActive] = useState(false);
    const [refreshData, setRefreshData] = useState(false);

    console.log(localStorage.getItem("userEmail"))

    useEffect(() => {

        const fetchData = async () => {

            const projects = await getAllProjects();

            setProjects([])

            console.log(projects);



            const userProjects = [];

        

            projects.map(project => {

                if(localStorage.getItem("userEmail") && project.admin.email === localStorage.getItem("userEmail")){

                    userProjects.push(project)

                }

                else{

                    project.groups.map(group => {

                        group.users.map(user => {

                            if(localStorage.getItem("userId") && user === localStorage.getItem("userId")){

                                userProjects.push(project)

                            }

                        })

                    })

                }

            })

            setProjects(userProjects)

           

        };

        



        fetchData();

        if (refreshData) {

            fetchData();

        }



    }, [refreshData]);


    const edit = <img src="/images/editer.png" alt="image" width={20} height={20} ></img>
    const view = <img src="/images/view.png" alt="image" width={20} height={20} ></img>
    const bin = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 25 25" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
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


    const deleteProject = async (idProject) => {

        console.log(localStorage.getItem("userEmail"))
        

        await deleteProjectById(idProject, localStorage.getItem("userEmail"));
        

        setRefreshData(true); //refresh data


    }

    const handleDelete = (id) => {
        // Call the delete function here
        deleteProject(id);
      };













    return (<div >


        {displayModal && <div className={`fixed inset-0 z-[99999] justify-center h-full w-full `}>{DriverModal}</div>}
        <div className='relative '>
            <h1 className=' mb-20  text-3xl text-center mt-8'>LIST OF PROJECTS</h1>
            <div className=' overflow-auto rounded-lg shadow mx-5 '>
                <table className=" w-full  ">
                    <thead className="bg-gray-700 border-b-2 border-gray-700  ">
                        <tr className="">
                            <td className='p-3 text-sm front-semibold tracking-wide  text-center'>Project name</td>
                            <td className='p-3 text-sm front-semibold tracking-wide  text-center'>Admin</td>
                            <td className='p-3 text-sm front-semibold tracking-wide text-center'>Action</td>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100  " >
                        {projects && projects.map((item, index) => <tr className="bg-white    mb-2" key={`project-${index}`} >

                            <td className=' px-4 py-2 text-center '>{item.name}</td>
                            <td className=' px-4 py-2 text-center'><div className='flex flex-col'><div>{item.admin.firstname} {item.admin.lastname}</div><div>{item.admin.email}</div></div></td>



                            <td className='px-4 py-2'><div className="flex justify-center align-center" >
                                <div >{getButton("text-blue", view, () => navigate(`/Projects/${item._id}`))}</div>
                               
                                <div >{getButton("text-red", bin,()=>deleteProject(item._id))}</div>
                            </div></td>


                        </tr>)}
                    </tbody>
                </table>


            </div>
            <div>{getButton("absolute text-white top-14 ml-16 bg-green hover:bg-white hover:text-green hover:border-green", "Create a project", () => { modalChange(<CreateProject />); displayModalChange(true); })}</div>



        </div>






    </div>
    )
}

export default Projects;


