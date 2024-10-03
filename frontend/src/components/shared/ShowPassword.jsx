import React, { useState } from 'react'
import { FaEye as EyeOn, FaEyeSlash as EyeOff } from 'react-icons/fa';

export default function ShowPassword({ onTogglePassword }) {

    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        const updateShowPassword = !showPassword
        setShowPassword(updateShowPassword);

        onTogglePassword(updateShowPassword);
    };

    return (
        <div
            data-testid="show-password"
            className="absolute mt-4 p-1 rounded-full right-2 top-1/2 transform -translate-y-1/2 cursor-pointer hover:bg-gray-200"
            onClick={handleTogglePassword}
        >
            {showPassword ? <EyeOn data-testid="eye-on-icon" /> : <EyeOff data-testid="eye-off-icon" />}
        </div>
    )
}
