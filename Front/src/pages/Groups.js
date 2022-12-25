import React,{useState,useEffect}  from 'react';
import { getGroups } from '../services/group';

const Groups =()=>{
    const [groups, setGroups] = useState([]);   
    useEffect(()=>{
        const fetchData = async() =>{
            const groups = await getGroups();
            setGroups(groups);
            console.log(groups)
        };
        fetchData();
        
    },[]);
    return <h1>liste des groups</h1>

}
export default Groups;