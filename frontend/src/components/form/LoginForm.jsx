// src/components/LoginForm.js
import React, { useState } from 'react';
import ShowPassword from '../shared/ShowPassword'; // Make sure this file exists
import ErrorShow from '../shared/ErrorShow'; // Make sure this file exists
import validateInputs from '../../utils/formValidation.util'; // Ensure this is the correct path

export default function LoginForm({ onSubmit, loginError, setLoginError }) {
    const [inputs, setInputs] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationError = validateInputs(inputs);
        if (validationError) {
            setLoginError(validationError);
        } else {
            onSubmit(inputs);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs((prevValues) => ({ ...prevValues, [name]: value }));

        // Email validation
        if (name === 'email') {
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailPattern.test(value)) {
                setEmailError('Please enter a valid email address.');
            } else {
                setEmailError('');
            }
        }
    };

    const handleTogglePassword = (shouldShow) => {
        setShowPassword(shouldShow);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4 relative">
                <label htmlFor="email" className="block font-medium mb-1">
                    Email
                </label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={inputs.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className={`w-full px-3 py-2 border rounded focus:outline-none ${
                        loginError ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                    }`}
                />
                {emailError && <p className="text-red-500 text-sm">{emailError}</p>} {/* Error message */}
            </div>

            <div className="mb-6 relative">
                <label htmlFor="password" className="block font-medium mb-1">
                    Password
                </label>
                <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={inputs.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                    className={`w-full px-3 py-2 border rounded focus:outline-none ${
                        loginError ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                    }`}
                />
                {inputs.password && <ShowPassword onTogglePassword={handleTogglePassword} />}
            </div>

            <ErrorShow error={loginError} />

            <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
            >
                Log In
            </button>
        </form>
    );
}
