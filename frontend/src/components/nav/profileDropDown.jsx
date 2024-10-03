import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faUser } from '@fortawesome/free-solid-svg-icons';

import Logout from '../auth/Logout';

export default function ProfileDropDown({ showDropDown }) {

    const handleOptionClick = (option) => {
        console.log(`Selected option: ${option}`);
    };

    return (
        <>
            <div
                data-testid='profile-dropdown'
                className={`fixed top-60 mt-2  lg:top-14 z-20 right-0  bg-white rounded-md shadow-lg transform transition-transform duration-1000 ease-in-out
                    ${showDropDown ? 'opacity-100 translate-x-0' : 'pointer-events-none opacity-100 translate-x-full  '}`}
            >
                <ul className=''>
                    <li className="w-full text-xl  px-6 py-2 text-gray-700 hover:text-blue-500   ">
                        <div
                            className='hover:cursor-pointer'
                            onClick={() => handleOptionClick('Account')}
                        >
                            <FontAwesomeIcon icon={faUser} className="mr-2" />
                            Account
                        </div>
                    </li>

                    <li className="w-full text-xl  px-6 py-2 text-gray-700 hover:text-blue-500 ">
                        <div
                            className='hover:cursor-pointer'

                            onClick={() => handleOptionClick('Settings')}
                        >
                            <FontAwesomeIcon icon={faCog} className="mr-2" />
                            Settings
                        </div>
                    </li>
                    <Logout />
                </ul>

            </div>
        </>
    )
}
