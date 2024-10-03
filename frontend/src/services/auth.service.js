import axiosInstance from '../utils/axios.util';
import apiEndpoint from '../utils/endpoint.util';
import { removeAccessToken, storeAccessToken } from '../utils/token.util';

// const AuthService = () => {
const signup = async (userData) => {
    const response = await axiosInstance.post(apiEndpoint.auth.signup, userData);
    const data = response.data;

    return data;
};

const login = async (credentials) => {
    const response = await axiosInstance.post(apiEndpoint.auth.login, credentials);
    const data = response.data;

    return data;
};

const logout = async () => {
    try {
        //  await axiosInstance.post(apiEndpoint.auth.logout);

        removeAccessToken();

    } catch (error) {
        console.error('Error logging out:', error);
    }
};

export const AuthService = {
    signup, login, logout
}
