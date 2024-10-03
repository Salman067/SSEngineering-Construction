import React from 'react'
import { Link } from 'react-router-dom'

export default function ForgottenPassword() {
    return (
        <div className="text-center mt-4">
            <Link to="/recover" className="text-blue-500 hover:cursor-pointer">
                Forgotten Password?
            </Link>
        </div>
    )
}
