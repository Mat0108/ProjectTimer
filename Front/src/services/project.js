import axios from "axios";

export const getAllProjects=async ()=>{
    const res =await axios.get(`http://localhost:3000/projects/`); 

    return res.data;
}

export const getProjectById= async (projectId)=>{
    const res = await axios.get(`http://localhost:3000/projects/${projectId}`);
    
    return res.data;
}

export const saveProject= async (project)=>{
    const res = await axios.post(`http://localhost:3000/project`,{project});

    return res.data;
}


