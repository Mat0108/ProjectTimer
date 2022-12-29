import axios from "axios";

export const getAllTimes = async () => {
    const res = await axios.get(`http://localhost:3000/times`);
    return res.data;
}

export const getTimeById = async (timeId) => {
    const res = await axios.get(`http://localhost:3000/${timeId}`);
    return res.data;
}

export const startTime = async (name, user) => {
    const res = await axios.post(`http://localhost:3000/time`, {name: name, user: user});
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

export const deleteTimeById = async (timeId) => {
    const res = await axios.delete(`http://localhost:3000/times${timeId}`);
    return res.data;
}