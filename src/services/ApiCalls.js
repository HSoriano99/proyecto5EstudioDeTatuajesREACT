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

export const getArtists = async () => {
    const res = await axios.get(`${API_URL}/api/auth/getAllArtists`);
    return res.data;

};

export const getClientProfile = async (token, id, page, skip) => {
    const config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
    const res = await axios.get(`${API_URL}/api/auth/getClientByUser/${id}?page=${page}&skip=${skip}`, config);
    
    return res.data;

};

export const getArtistProfile = async (token, id, page, skip) => {
    const config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
    const res = await axios.get(`${API_URL}/api/auth/getArtistByUser/${id}?page=${page}&skip=${skip}`, config);
    
    return res.data;

};

export const updateUser = async (token, id, data) => {
    const config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
    const res = await axios.patch(`${API_URL}/api/auth/update/${id}`, data, config);
    return res;
}

export const updateClient = async (token, id, data) => {
    const config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
    const res = await axios.patch(`${API_URL}/api/auth/updateClient/user/${id}`, data, config);
    return res;
}

export const updateArtist = async (token, id, data) => {
    const config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
    const res = await axios.patch(`${API_URL}/api/auth/updateArtist/user/${id}`, data, config);
    return res;
}

export const getUsersPaginated = async (token, page, skip) => {
    const config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
    const res = await axios.get(`${API_URL}/api/users/getAllPaginated?page=${page}&skip=${skip}`, config);
    return res.data;

};

export const getAppointmentsPaginated = async (token, page, skip) => {
    const config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
    const res = await axios.get(`${API_URL}/api/appointments/getAllPaginated?page=${page}&skip=${skip}`, config);
    return res.data;

};

export const deleteAppointment = async (token, id) => {
    const config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
    const res = await axios.delete(`${API_URL}/api/appointments/delete/${id}`, config);
    return res;

};

export const deleteUser = async (token, id) => {
    const config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
    const res = await axios.delete(`${API_URL}/api/users/delete/${id}`, config);
    return res;

};

export const createNewAppointment = async (token, appointmentData) => {
    const config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
    const res = await axios.post(`${API_URL}/api/appointments/newAppointment`, appointmentData, config);
    return res;

};

export const modifAppointment = async (token, id, appointmentData) => {
    const config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
    const res = await axios.patch(`${API_URL}/api/appointments/update/${id}`, appointmentData, config);
    return res;

};
