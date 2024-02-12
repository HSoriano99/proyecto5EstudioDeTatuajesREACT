import axios from "axios";

const API_URL = "http://localhost:3000";

export const userLogin = async (credentials) => {
    const res = await axios.post(`${API_URL}/api/auth/login`, credentials);
   
    return res.data.token;
}

export const clientRegister = async (registerData) => {
    const res = await axios.post(`${API_URL}/api/auth/registerClient`, registerData);
    return res;

};

export const getClientProfile = async (token, id) => {
    const config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
    const res = await axios.get(`${API_URL}/api/auth/getClientByUser/${id}`, config);
    console.log(res.data);
    return res.data;

};

