import { Link } from 'react-router-dom';
import { Group, Project, Timer } from '../componants/Image/Image';

const Menu = ()=>{    
    return (
        <div className="flex flex-col text-white mt-[90%]">
            <div><Link className="text-2xl flex hover:bg-white hover:bg-opacity-20 py-4 px-8" to="/Groups"><Group size={[40,40]}/> Groups </Link></div>
            <div><Link className="text-2xl flex hover:bg-white hover:bg-opacity-20 py-4 px-8" to="/Projects"><Project size={[40,40]}/> Projects </Link></div>
            <div><Link className="text-2xl flex hover:bg-white hover:bg-opacity-20 py-4 px-8" to="/TimeTracker"><Timer size={[40,40]}/> Time Tracker </Link></div>
        </div>
    )
}
export default Menu
