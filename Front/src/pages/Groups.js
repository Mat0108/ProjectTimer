import React,{ useState, useEffect, useContext, useMemo}  from 'react';
import { getGroups, getGroupbyUser, deleteGroup} from '../services/group';
import { useNavigate } from "react-router-dom";
import Modal from '../componants/Modal/Modal';
import { ModalContext } from './../containers/Modal';
import CreateGroup from './../componants/Groups/CreateGroup';
import { View} from '../componants/Image/Image';

const Groups =()=>{
    const [groups, setGroups] = useState([]);  
    const { displayModal, modalChange, displayModalChange } =useContext(ModalContext);
    const [refreshData, setRefreshData] = useState(false);
    let navigate = useNavigate(); 

    useEffect(()=>{
        const fetchData = async() =>{
            const groupslocal = await getGroups()

            if(groupslocal){
                setGroups(groupslocal);
            }
            
        };
        const fetchDataLogin = async() => {
            const groupslocal = await getGroupbyUser(localStorage.getItem("userEmail"))
            
            if(groups){
                setGroups(groupslocal);
            }
            
        };

        if(localStorage.getItem("userEmail")){
            fetchDataLogin()
        }
        else{
            fetchData();
        }

        if(refreshData){
            fetchDataLogin();
        }
    },[refreshData]);

    
    const view = <View size={[25,25]}/>
    const bin = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 25 25" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
    
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
        } 
        else {
          return <Modal noAnimation={true} />;
        }
      }, [displayModal]);

    const deleteAGroup = async (groupId, admin)=>{
        if(admin === localStorage.getItem("userEmail")){
            await deleteGroup(groupId, localStorage.getItem("userEmail"))
            setRefreshData(true)
        }
        else{
            alert("You can't delete this group because you're not the admin of the group !")
        }
    }

    return (<>       
        {displayModal && <div className={`fixed inset-0 z-[99999] justify-center h-full w-full `}>{DriverModal}</div>}
        <div className='relative'>
            <h1 className='text-3xl text-center mt-8 text-black font-bold mb-20'>LIST OF GROUPS</h1>
            <div className='overflow-auto rounded-lg shadow mx-9'>
                <table className=" w-full">
                        <thead className="bg-gray-700 border-b-2 border-gray-700">
                            <tr className="font-bold">
                                <td className='p-3 text-sm front-semibold tracking-wide  text-center'>No.</td>
                                <td className='p-3 text-sm front-semibold tracking-wide  text-center'>Group name</td>
                                <td className='p-3 text-sm front-semibold tracking-wide  text-center'>Admin</td>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100" >
                        {groups && groups.map((item, index) => 
                            <tr key={`group-${index}`} className="bg-white mb-2">
                                <td className='px-4 py-2 text-center '>{index}</td>
                                <td className='px-4 py-2 text-center '>{item.name}</td>
                                <td className='px-4 py-2 text-center '>
                                    <div className='flex flex-col'>
                                        <div>{item.admin.firstname} {item.admin.lastname}</div>
                                        <div>{item.admin.email}</div>
                                    </div>
                                </td>
                                <td className='px-4 py-2 text-center'>
                                    <div className='flex justify-center align-center'>
                                        <div className='mr-10'>{getButton("hover:bg-black hover:bg-opacity-25", view, () => navigate(`/Groups/${item._id}`))}</div>
                                        <div>{getButton("text-red hover:bg-black hover:bg-opacity-25", bin, () => {
                                            deleteAGroup(item._id, item.admin.email)
                                        })}</div>
                                    </div>
                                </td>
                            </tr>
                        )} 
                        </tbody>
                </table>    
            </div>
            <div>{getButtonBorder("absolute top-12 ml-10 hover:bg-white hover:text-green hover:border-green font-bold","green", "Create a group",()=>{modalChange(<CreateGroup />);displayModalChange(true);})}</div>
        </div>
        </>
        )

}
export default Groups;