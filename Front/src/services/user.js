import axios from "axios";
export const register = async (user) => {
    const res = await axios.post(`http://localhost:3000/user/register`,user);
    return res;
    
}
export const login = async (user) => {
    const res = await axios.post(`http://localhost:3000/user/login`,user);
    return res.data;
    
}
export const logout = async (userId) => {
    const res = await axios.post(`http://localhost:3000/user/logout/${userId}`);
    return res.data;
 
}
export const getAllUsers = async (user) => {
    const res = await axios.get(`http://localhost:3000/users/`);
    return res.data;
    
}

