import React, { useContext, useState } from 'react'
import { useMutation } from '@tanstack/react-query';

import SSEngineeringConstruction from '../components/shared/SSEngineeringConstruction';
import ForgottenPassword from '../components/auth/ForgottenPassword';
import CreateNewAccountButton from '../components/auth/CreateNewAccountButton';
import blogLogo from "../assets/logo.jpg";
import LoginForm from '../components/form/LoginForm';

import { AuthService } from '../services/auth.service';
import { AuthContext } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { storeAccessToken } from '../utils/token.util';
import { toast } from 'react-toastify';


export default function LoginPage() {

    const navigate = useNavigate();
    const { setIsLoggedIn } = useContext(AuthContext);
    const [loginError, setLoginError] = useState(null);

    const loginMutation = useMutation({
        mutationFn: AuthService.login,

        onSuccess: (data) => {
            storeAccessToken(data.UserToken);
            setIsLoggedIn(!!data.UserToken);
            toast.success("Login successful! Welcome back.");
            navigate("/home");
        },
        onError: (data) => {
            if (data.response.status == 503) {
                // toast.error("Oops! Something went wrong. Please Try Again Later.");
                // setLoginError("Oops! Something went wrong. Please Try Again Later.");
            }
            else {
                setLoginError(data.response.data.message || data.response.statusText);
            }
        }
    });

    const onSubmit = async (credential) => {
        await loginMutation.mutateAsync(credential);
    }


    return (
        <div className='mt-1'>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

                {window.location.href.endsWith('/login') &&
                    <SSEngineeringConstruction />
                }

                <div className="w-96 p-8 bg-white rounded shadow-lg mt-2">

                    <div className='inline-flex text-center gap-3 mb-3'>
                        <p className="text-center text-2xl">Log in to SSEngineeringConstruction Blog </p>

                        <img src={blogLogo} className="w-10 h-10 " alt="SSEngineeringConstruction Blog Logo" />
                    </div>

                    <LoginForm onSubmit={onSubmit} loginError={loginError} setLoginError={setLoginError} />

                    <ForgottenPassword />

                    {!window.location.href.endsWith('/login') &&
                        <>
                            <CreateNewAccountButton />
                            <div className='text-blue-600 text-lg text-center mt-3'>

                                <Link to='/home' className='hover:cursor-pointer'>
                                    Continue as guest
                                </Link>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}