import axios from 'axios';

const API_URL = "https://rjl-spergblogbackend-08fe3b62e5a0.herokuapp.com/api/users/";

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    };

    return response.data;
}

// Login User
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData);

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    };

    return response.data;
}

// Logout user
const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register, login, logout
};

export default authService;