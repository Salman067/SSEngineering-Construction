import React, { useState } from 'react'
import SSEngineeringConstruction from "../assets/logo.jpg";
import SignupForm from '../components/form/SignupForm';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { AuthService } from '../services/auth.service';

import { toast } from 'react-toastify';

export default function SignupPage() {

    const navigate = useNavigate();
    const [signupError, setSignupError] = useState(null);

    const loginMutation = useMutation({
        mutationFn: AuthService.signup,
        onMutate: () => {

        },
        onSuccess: (data) => {
            toast.success("Signup successful! Welcome to our community.")
            navigate("/login");
        },
        onError: (data) => {
            if (data.response.status == 503) {
                setSignupError(data.response.data.message);
            }
            else {
                setSignupError(data.response.data.message);
            }
        }
    });

    const onSubmit = async (credential) => {
        await loginMutation.mutateAsync(credential);
    }

    return (
        <div className='mt-1'>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

                <div className="w-96 p-8 bg-white rounded shadow-lg">

                    <div className='inline-flex items-center gap-3 mb-3'>
                        <p className="text-center text-2xl">Create a New Account</p>

                        <img src={SSEngineeringConstruction} className="w-10 h-10 " alt="SSEngineeringConstruction Blog Logo" />
                    </div>

                    <SignupForm onSubmit={onSubmit} signupError={signupError} setSignupError={setSignupError} />

                    <div className='text-center mt-3'>
                        <Link to="/login" className="text-blue-600 text-lg text-center hover:cursor-pointer">
                            Already have an account?
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    )
}
