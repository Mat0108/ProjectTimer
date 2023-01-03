import axios from "axios";

export const getGroups = async () => {
    const res = await axios.get(`http://localhost:3000/groups/`);
    return res.data;
}

export const getGroupbyId = async (groupId) => {
    const res = await axios.get(`http://localhost:3000/groups/${groupId}`);
    return res.data;
}

export const addUsertoGroup = async (groupId, data) =>{
    const res = await axios.patch(`http://localhost:3000/groups/${groupId}`, data);
    return res.data;
}

export const deleteUserfromGroup = async (groupId, users, admin) =>{
    const res = await axios.patch(`http://localhost:3000/groups/${groupId}/deleteUsers`,{users: users, admin: admin});
    return res.data;
}

export const createGroup = async (name, admin, users) => {
    const res = await axios.post(`http://localhost:3000/group`,{name, admin, users} )
    return res.data;
}

export const deleteGroup = async(groupId, admin) =>{
    const res = await axios.delete(`http://localhost:3000/groups/${groupId}`,{data: {admin: admin}});
    return res.data;
}

export const getGroupbyUser = async (email) => {
    const res = await axios.post("http://localhost:3000/groupsbyUser",{email: email})
    return res.data;
}