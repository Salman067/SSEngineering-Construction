import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, } from '@fortawesome/free-solid-svg-icons';

function SideNavToggleButton({ showSideNavCallback }) {

    const [showSideNav, setShowSideNav] = useState(false);

    const toggleSideNav = () => {
        setShowSideNav(prevValue => !prevValue);
    };

    useEffect(() => {
        showSideNavCallback(showSideNav);
    }, [showSideNav])

    return (
        <>
            <button
                data-testid="sidenav-toggle-button"
                className="rounded z-40 bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                onClick={toggleSideNav}
            >
                <FontAwesomeIcon icon={showSideNav ? faTimes : faBars} className="h-5 w-5 text-blue-500" />
            </button>
        </>

    );
}

export default SideNavToggleButton;
