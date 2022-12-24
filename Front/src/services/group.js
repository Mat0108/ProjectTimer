import axios from "axios";
export const getGroups = async () => {
    const res = await axios.get(`http://localhost:3000/groups/`);
    return res.data;
}
