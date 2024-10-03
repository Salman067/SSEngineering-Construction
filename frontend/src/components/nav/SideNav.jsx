import React, { useContext, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPenToSquare, faUser, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import ProfileDropDownButton from './ProfileDropDownButton';
import ProfileDropDown from './profileDropDown';

function LoggedOutSection() {

    return (
        <ul>
            <li className='gap-1 border-b-2 border-blue-200'>
                <NavLink
                    to="/login"
                >
                    <div className=' text-white text-xl  px-6 py-2'>
                        <FontAwesomeIcon icon={faRightToBracket} className="mr-2" />
                        Login
                    </div>
                </NavLink>
            </li>
            <li className='gap-1 border-b-2 border-blue-200'>
                <NavLink
                    to="/signup"
                >
                    <div className='bg-gray-100 text-blue-600 text-xl  px-6 py-2 hover:bg-blue-400'>
                        <FontAwesomeIcon icon={faUser} className="mr-2" />
                        Register
                    </div>
                </NavLink>
            </li>
        </ul>
    )
}

function NavMenu({ authData }) {
    return (
        <>
            <ul >
                <li className='gap-1 border-b-2 border-blue-200'>
                    <NavLink
                        to="/home"
                    >
                        <div className=' text-white text-xl  px-6 py-2 hover:bg-blue-400'>
                            <FontAwesomeIcon icon={faHome} className="mr-2" />
                            Home
                        </div>
                    </NavLink>
                </li>

                <li className='gap-1 border-b-2 border-blue-200'>
                    <NavLink
                        to="/write"
                    >
                        <div className=' text-white text-xl  px-6 py-2 hover:bg-blue-400'>
                            <FontAwesomeIcon icon={faPenToSquare} className="mr-2" />
                            Write
                        </div>
                    </NavLink>
                </li>

                <li className='gap-1 border-b-2 border-blue-200'>
                    <NavLink
                        to={`/${authData.id}`}
                    >
                        <div className=' text-white text-xl  px-6 py-2 hover:bg-blue-400'>
                            <FontAwesomeIcon icon={faUser} className="mr-2" />
                            Profile
                        </div>
                    </NavLink>
                </li>
            </ul>
        </>
    )
}

export default function SideNav({ showSideNav, showDropDown, showDropDownCallback }) {
    const { authData, isLoggedIn } = useContext(AuthContext);
    const [userMode, setUserMode] = useState(localStorage.getItem('userMode'));

    const dropdownRef = useRef(null);
    return (
        <>
            <div
                className={`fixed top-16 z-30  left-0 w-full bg-white shadow-lg transition-transform duration-1000 ease-in-out
                ${showSideNav ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-100 -translate-y-full'}`}
            >
                <div className=" bg-blue-500">

                    <div className="block ">
                        <nav aria-label="Site Nav">
                            {(userMode || isLoggedIn) && (
                                <NavMenu authData={authData} />
                            )}
                        </nav>
                        {isLoggedIn ?
                            <ProfileDropDownButton showDropDownCallback={showDropDownCallback} dropdownRef={dropdownRef} />
                            :
                            <LoggedOutSection />
                        }
                    </div>

                </div>
            </div>
            <div
                ref={dropdownRef}
                className='block lg:hidden'>
                <ProfileDropDown showDropDown={showDropDown} />
            </div>
        </>
    )
}
