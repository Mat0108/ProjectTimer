import { Link } from 'react-router-dom';
const Menu = ()=>{
    const group = <img className="mr-3"src="/images/group.png" alt="image" width={40} height={20} ></img>
    const project = <img className="mr-3"src="/images/project.png" alt="image" width={40} height={20} ></img>
    const timer = <img className="mr-3"src="/images/timer.png" alt="image" width={40} height={20} ></img>
    return <div className="flex flex-col  text-white gap-8 ml-3 mt-[90%] ">
        <div ><Link className="text-3xl flex" to="/Groups">{group} Groups </Link></div>
        <div ><Link className="text-3xl flex" to="/=">{project} Projects </Link></div>
        <div ><Link className="text-3xl flex" to="/TimeTracker">{timer} Time Tracker </Link></div>
    </div>
}
export default Menu