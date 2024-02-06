import axios from "axios";

const API_URL = "http://localhost:3000";

export const userLogin = async (credentials) => {
    console.log(credentials);
    const res = await axios.post(`${API_URL}/api/auth/login`, credentials);
   
    return res.data.token;
}

export const clientRegister = async (registerData) => {
    const res = await axios.post(`${API_URL}/api/auth/registerClient`, registerData);
    return res;

};