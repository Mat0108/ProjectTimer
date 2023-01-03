import axios from "axios";

export const getAllProjects=async ()=>{
    const res =await axios.get(`http://localhost:3000/projects/`); 
    return res.data;
}

export const getProjectById= async (projectId)=>{
    const res = await axios.get(`http://localhost:3000/projects/${projectId}`);
    return res.data;
}

export const saveProject= async (admin,name)=>{
    const res = await axios.post(`http://localhost:3000/project`,{admin:admin,name:name});
    return res.data;
}


export const deleteProjectById= async (projectId,admin)=>{
    const res = await axios.delete(`http://localhost:3000/projects/${projectId}`,{data:{admin:admin}});
    return res.data;
}

export const addGroupToProject= async (projectId,admin,groups) =>{
    const res = await axios.patch(`http://localhost:3000/projects/${projectId}`,{admin:admin,groups:groups});
    return res.data;
}

export const  updateTimer = async(projectId, timer) => {
    const res = await axios.patch(`http://localhost:3000/projects/${projectId}/updateTimer`, {timer: timer}, {new: true});
    return res.data;
}

export const deleteGrouptoProject = async (projectId,admin,groups) =>{
    const res = await axios.patch(`http://localhost:3000/projects/${projectId}/deleteGroups`,{admin:admin,groups:groups});
    return res.data;
}




