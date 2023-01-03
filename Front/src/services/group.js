import axios from "axios";
export const getGroups = async () => {
    const res = await axios.get(`http://localhost:3000/groups/`);
    return res.data;
}
export const getGroupbyId = async (groupId) => {
    const res = await axios.get(`http://localhost:3000/groups/${groupId}`);
    return res.data;
}
export const addUsertoGroup = async (groupId,users) =>{
    const res = await axios.patch(`http://localhost:3000/groups/${groupId}`,users);
    return res.data;
}
export const deleteUsertoGroup = async (groupId,users,admin) =>{
    const res = await axios.patch(`http://localhost:3000/groups/${groupId}/deleteUsers`,{users,admin});
    return res.data;
}
export const createGroup = async (name,admin,users) => {
    const res = await axios.post(`http://localhost:3000/group`,{name,admin,users} )
}
export const deleteGroup = async(groupId,admin) =>{
    const res = await axios.delete(`http://localhost:3000/groups/${groupId}`,{admin});
}
export const getGroupbyUser = async (email) => {
    const res = await axios.post("http://localhost:3000/groupsbyUser",{email:email})
    return res.data;
}