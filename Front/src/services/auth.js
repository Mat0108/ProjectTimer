import axios from "axios";
export const register = async (user) => {
    const res = await axios.post(`http://localhost:3000/register`,user);
    return res;
    
}
export const login = async (user) => {
    const res = await axios.post(`http://localhost:3000/login`,user);
    return res;
    
}

