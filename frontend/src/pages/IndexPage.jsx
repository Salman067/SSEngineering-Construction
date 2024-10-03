import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import indexPageLogo from "../assets/indexPage.svg";
import SSEngineeringConstruction from '../components/shared/SSEngineeringConstruction';


function IndexPage() {
    const [userMode, setUserMode] = useState('guest');

    const handleContinueAsGuestClick = () => {
        localStorage.setItem('userMode', userMode);
    };

    return (
        <div className="flex flex-col bg-gray-100 sm:flex-row">
            <div className="-mb-40 z-10 sm:mb-0 opacity-90 sm:w-1/2 flex flex-col items-center justify-center">

                <div className='mt-5'>
                    <SSEngineeringConstruction />
                </div>

                <object
                    type="image/svg+xml"
                    data={indexPageLogo}
                    className="-mt-5 sm:mt-0 max-h-[500px] "
                />
            </div>
            <div className="sm:w-1/2">
                <Outlet />
            </div>
        </div>
    );
}

export default IndexPage;
