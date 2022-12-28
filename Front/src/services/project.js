import axios from "axios";

export const getProjects=async ()=>{
    const res =await axios.get(`http://localhost:3000/projects/`); 
}
