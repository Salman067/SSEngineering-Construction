import React from 'react'
import { Navigate } from 'react-router-dom';
import { getAccessToken } from '../utils/token.util';

const LoggedOutMode = ({ children }) => {
    var isLoggedIn = !!getAccessToken();
    if (isLoggedIn) {
        return <Navigate to="/home" replace />;
    }
    return children;
}

const LoggedInMode = ({ children }) => {
    var isLoggedIn = !!getAccessToken();
    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
    }
    return children;
}

const GuestOrLoggedInMode = ({ children }) => {
    var isGuest = localStorage.getItem("userMode");

    if (isGuest) {

        return <Navigate to="/home" replace />;
    }
    return children;
}

const NotGuestOrLoggedInMode = ({ children }) => {
    var isLoggedIn = !!getAccessToken();
    var isGuest = localStorage.getItem("userMode");

    if (isLoggedIn) {

        return <Navigate to="/home" replace />;
    }
    return children;
}

export { LoggedOutMode, LoggedInMode, GuestOrLoggedInMode, NotGuestOrLoggedInMode };