import React, { useContext, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPenToSquare, faUser } from '@fortawesome/free-solid-svg-icons';

import SSEngineeringConstruction from '../shared/SSEngineeringConstruction';
import { AuthContext } from '../../contexts/AuthContext';
import SideNavToggleButton from './SideNavToggleButton';
import SideNav from './SideNav';
import ProfileDropDownButton from './ProfileDropDownButton';
import ProfileDropDown from './profileDropDown';

function LoggedOutSection() {
    return (
        <>
            <NavLink
                data-testid="loggedOut-login"
                className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                to="/login"
            >
                Login
            </NavLink>


            <NavLink

                className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-blue-600"
                to="/signup"
            >
                Register
            </NavLink>
        </>
    )
}

function NavMenu({ authData }) {
    return (
        <>
            <ul className="flex justify-center items-center gap-4 text-lg">
                <li
                    data-testid="nav-home"
                    className='border-b-blue-500'>
                    <NavLink

                        className={({ isActive }) => isActive ? `text-blue-600 p-3 border-b-4 border-blue-600` : `text-gray-500 transition hover:bg-gray-100 text-lg px-3 py-3 rounded-md`}
                        to="/home"
                    >
                        <FontAwesomeIcon icon={faHome} className="mr-2 text-lg " />
                        Home
                    </NavLink>
                </li>

                <li
                    data-testid="nav-write"
                >
                    <NavLink
                        className={({ isActive }) => isActive ? `text-blue-600 p-3 border-b-4 border-blue-600` : `text-gray-500 transition hover:bg-gray-100 text-lg px-3 py-3 rounded-md`}
                        to="/write"
                        disabled
                    >
                        <FontAwesomeIcon icon={faPenToSquare} className="mr-2 text-lg" />
                        Write
                    </NavLink>
                </li>

                <li
                    data-testid="nav-profile"
                >
                    <NavLink
                        className={({ isActive }) => isActive ? `text-blue-600 p-3 border-b-4 border-blue-600` : `text-gray-500 transition hover:bg-gray-100 text-lg px-3 py-3 rounded-md`}
                        to={`/${authData?.id}`}

                    >
                        <FontAwesomeIcon icon={faUser} className="mr-2 text-lg" />
                        Profile
                    </NavLink>
                </li>
            </ul>
        </>
    )
}

function Navbar() {
    const dropdownRef = useRef(null);
    const { authData, isLoggedIn } = useContext(AuthContext);
    const [userMode, setUserMode] = useState(localStorage.getItem('userMode'));

    const [showSideNav, setShowSideNav] = useState(false);
    const [showDropDown, setShowDropDown] = useState(false);

    const showSideNavCallback = (value) => {
        setShowSideNav(value);
    }

    const showDropDownCallback = (value) => {
        setShowDropDown(value);
    }

    return (
        <>
            <header
                aria-label="Site Header" className="bg-white shadow-md sticky top-0 z-50">

                <div className=" px-4 sm:px-6 lg:px-8">

                    <div className="flex h-16 items-center justify-between">

                        <div className=" lg:w-1/3 flex items-center">
                            <NavLink
                                className='mt-1'
                                to='/home'>
                                <SSEngineeringConstruction />
                            </NavLink>
                        </div>

                        <div className="lg:w-1/3 hidden lg:block">
                            <nav aria-label="Site Nav" className=''>
                                {(userMode || isLoggedIn) &&
                                    <NavMenu authData={authData} />
                                }
                            </nav>
                        </div>

                        <div className="lg:w-1/3  hidden gap-4 lg:block">
                            <div className="sm:flex justify-end sm:gap-4">

                                {isLoggedIn ?
                                    <ProfileDropDownButton showDropDownCallback={showDropDownCallback} dropdownRef={dropdownRef} />
                                    :
                                    <LoggedOutSection />
                                }
                            </div>
                        </div>
                        <div
                            className="block lg:hidden">
                            <SideNavToggleButton showSideNavCallback={showSideNavCallback} />
                        </div>
                    </div>

                </div>
            </header>
            <div className='block lg:hidden'>
                <SideNav showSideNav={showSideNav} showDropDown={showDropDown} showDropDownCallback={showDropDownCallback} />
            </div>
            <div
                ref={dropdownRef}
                className='hidden lg:block'>
                <ProfileDropDown showDropDown={showDropDown} />
            </div>
        </>
    );
}

export default Navbar;
