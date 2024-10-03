import React, { createContext, useEffect, useState } from 'react';
import { getAccessToken, removeAccessToken } from '../utils/token.util';
import { useQuery } from "@tanstack/react-query";
import UserService from '../services/user.service';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {


    const [authData, setAuthData] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(!!getAccessToken());

    useQuery({
        enabled: isLoggedIn,
        queryKey: ["getUserById"],
        queryFn: async () => {
            try {
                const data = await UserService.getUserById();
                setAuthData(data[0]);
                return data;
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    setIsLoggedIn(false);
                    setAuthData({});
                    removeAccessToken();
                    toast.success("Logout successful! See you again soon.");
                    navigate('/home')
                }
                throw error;
            }
        },
        staleTime: 0
    });

    useEffect(() => {
        setIsLoggedIn(!!getAccessToken());
    }, [isLoggedIn]);

    return (
        <AuthContext.Provider value={{ authData, setAuthData, isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
