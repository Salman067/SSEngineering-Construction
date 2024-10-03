import React from 'react'
import { Link } from 'react-router-dom';

export default function CreateNewAccountButton() {
    return (
        <div className="border-t border-gray-300 mt-6 pt-6 text-center">
            <Link
                to="/signup"
                className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded hover:bg-green-500"
            >
                Create New Account
            </Link>
        </div>
    )
}
