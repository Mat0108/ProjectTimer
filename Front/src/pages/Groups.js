import React,{useState,useEffect, useContext, useMemo}  from 'react';
import { getGroups, deleteGroup} from '../services/group';
import { useNavigate } from "react-router-dom";
import Modal from '../componants/Modal/Modal';
import { ModalContext } from './../containers/Modal';
import CreateGroup from './../componants/Groups/CreateGroup';
import { Bin, View, Link} from '../componants/Image/Image';

const Groups =()=>{
    const [groups, setGroups] = useState([]);  
    
    const { displayModal, modalChange, displayModalChange } =useContext(ModalContext);
    let navigate = useNavigate(); 
    useEffect(()=>{
        const fetchData = async() =>{
            const groups = await getGroups();
            if(groups){setGroups(groups);}
        };
        fetchData();
        
    },[]);
    // const link = <img src="/images/Link.png" alt="image" width={20} height={20} ></img>
    // const edit = <img src="/images/editer.png" alt="image" width={20} height={20} ></img>
    // const view = <img src="/images/view.png" alt="image" width={20} height={20} ></img>
    // const bin = <img src="/images/bin.png" alt="image" width={20} height={20} ></img>
    
    const view = <View size={[20,20]}/>
    const bin = <Bin size={[20,20]} />
    const link = <Link size={[20,20]}/>
    function getButton(color,text,onclickvar){
        return <div><button className={`p-2 ${color} rounded-xl`} onClick={onclickvar}>{text}</button></div>
    }
    function getButtonBorder(className,color,text,onclickvar){
        return <div><button className={`${className} p-2 border-2 bg-${color} border-${color} text-white rounded-xl`} onClick={onclickvar}>{text}</button></div>
    }
    const DriverModal = useMemo(() => {
        if (displayModal) {
          return (<Modal 
              modalWidth= "flex"
              modalHeight=""
              noAnimation={true}
            />
          );
        } else {
          return <Modal noAnimation={true} />;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [displayModal]);

    const deleteProject = async (groupId)=>{
        await deleteGroup(groupId, localStorage.getItem("user.email")).then().catch(e=>console.log("err:",e))
    }
    return (<>       
        {displayModal && <div className={`fixed inset-0 z-[99999] justify-center h-full w-full `}>{DriverModal}</div>}
        <div className='relative text-white'>
            <h1 className='text-3xl text-center mt-8 text-black font-bold mb-20'>LIST OF GROUPS</h1>
            <div className='h-[300px] w-full text-black'>
                <table className="mx-auto mt-[30px] table ">
                        <thead className="flex">
                            <tr className="flex font-medium">
                                <td className='w-[100px] text-center'>No.</td>
                                <td className='w-[200px] text-center'>Group name</td>
                                <td className='w-[300px] text-center'>Admin</td>
                                <td className='w-[300px] text-center'>Users</td>
                                <td className='w-[300px] text-center'>Projects</td>
                                <td className='w-[200px] text-center'>Actions</td>
                            </tr>
                        </thead>
                        <tbody className="max-h-[200px] flex flex-col bg-gray-silver rounded-2xl dark:bg-charleston-green divide-y text-black mt-5" >
                        {groups && groups.map((item, index) => <tr key={`group-${index}`} >
                                <td className='w-[100px] text-center'>{index}</td>
                                <td className='w-[200px] text-center'>{item.name}</td>
                                <td className='w-[300px] text-center'><div className='flex flex-col'><div>{item.admin.firstname} {item.admin.lastname}</div><div>{item.admin.email}</div></div></td>
                                <td className='w-[300px] text-center'><div className='flex flex-row gap-2'><div className='w-[70%]'>Users associated : {item.users ? Object.keys(item.users).length : 0}</div></div></td>
                                <td className='w-[300px] text-center'><div className='flex flex-row gap-2'><div className='w-[70%]'>Project associated : {item.projects ? Object.keys(item.projects).length : 0}</div></div></td>
                                <td className='w-[200px]'><div className='grid grid-cols-2 w-full'>
                                    <div className='col-start-1'>{getButton("bg-blue",view,()=>navigate(`/Groups/${item._id}`))}</div>
                                    <div className='col-start-2'>{getButton("bg-red",bin,()=>deleteProject(item._id))}</div>
                                </div></td>
                            </tr>)} 
                        </tbody>
                </table>    
            </div>
            <div>{getButtonBorder("absolute top-12 ml-10 hover:bg-white hover:text-green hover:border-green","green", "Create a group",()=>{modalChange(<CreateGroup />);displayModalChange(true);})}</div>
        </div>
        </>
        )

}
export default Groups;