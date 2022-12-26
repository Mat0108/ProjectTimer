import axios from "axios";
export const getGroups = async () => {
    const res = await axios.get(`http://localhost:3000/groups/`);
    return res.data;
}
export const getGroupbyId = async (groupId) => {
    const res = await axios.get(`http://localhost:3000/groups/${groupId}`);
    return res.data;
}