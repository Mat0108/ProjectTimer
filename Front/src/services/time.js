import axios from "axios";

export const getAllTimes = async () => {
    const res = await axios.get(`http://localhost:3000/times`);
    return res.data;
}

export const getTimeById = async (timeId) => {
    const res = await axios.get(`http://localhost:3000/times/${timeId}`);
    return res.data;
}

export const startTime = async (name, user, projectId) => {
    const res = await axios.post(`http://localhost:3000/time`, {name: name, user: user});
    const project = await axios.get(`http://localhost:3000/projects/${projectId}`);
    project.data.timer.push(res.data._id);
   
    await axios.patch(`http://localhost:3000/projects/${projectId}/updateTimer`, {timer: project.data.timer}, {new: true});
    
    return res.data;
}

export const stopTime = async (timeId) => {
    const res = await axios.patch(`http://localhost:3000/times/${timeId}/stop`, {}, {new: true});
    return res.data;
}

export const continueTime = async (timeId, user) => {
    const res = await axios.patch(`http://localhost:3000/times/${timeId}/continue`, {user: user}, {new: true});
    return res.data;
}

export const deleteTimeById = async (timeId, projectId) => {
    const res = await axios.delete(`http://localhost:3000/times/${timeId}`);
    const project = await axios.get(`http://localhost:3000/projects/${projectId}`);
    const updateTimer = project.data.timer.filter(timer => timer !== timeId);
    
    await axios.patch(`http://localhost:3000/projects/${projectId}/updateTimer`, {timer: updateTimer}, {new: true});

    return res.data;
}