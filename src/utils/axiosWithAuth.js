import axios from 'axios';

export const axiosWithAuth = () => {
    const token = window.localStorage.getItem('token');

    return axios.create({
        baseURL: 'https://sleep-tracker-backend.herokuapp.com/',
        
        headers: {
            Authorization: token 
        }
    });
};