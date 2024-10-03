import axiosInstance from "../utils/axios.util";
import apiEndpoint from "../utils/endpoint.util";

const UserService = {
    getAllUsers: async () => {
        const response = await axiosInstance.get(apiEndpoint.user.getAll);
        return response.data;
    },

    getUserByUsername: async (user_id) => {
        const endpoint = apiEndpoint.user.getUserByUsername.replace(':id', user_id);
        const response = await axiosInstance.get(endpoint);
        return response.data;
    },

    getUserById: async () => {
        const endpoint = apiEndpoint.user.getUserById;
        const response = await axiosInstance.get(endpoint);
        return response.data;
    },

    updateUserByUsername: async ({ id, updatedUserData }) => {
        const endpoint = apiEndpoint.user.update.replace(':id', id);
        const response = await axiosInstance.put(endpoint, updatedUserData);
        return response.data;
    },

    deleteUserByUsername: async (username) => {
        const endpoint = apiEndpoint.user.delete.replace(':username', username);
        const response = await axiosInstance.delete(endpoint);
        return response.data;
    },
};

export default UserService;
