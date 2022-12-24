import { React } from 'react';
import { getGroups } from './../services/group';

const Group =()=>{
    const [groups, setGroups] = useState([]);   
    useEffect(()=>{
        const fetchData = async() =>{
            const groups = await getGroups();
            setGroups(groups);
            console.log(groups)
        };
        fetchData();
        
    },[]);


}
export default Group;