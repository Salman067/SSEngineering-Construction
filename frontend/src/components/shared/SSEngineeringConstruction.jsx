import React from 'react';

import blogLogo from '../../assets/logo.jpg';

export default function SSEngineeringConstruction() {
    return (
        <div className='inline-flex items-center gap-2 sm:gap-4'>
            <img src={blogLogo} className='w-14 h-14' alt='SSEngineeringConstruction Blog Logo' />
            <h1 className='text-primary text-base sm:text-lg font-bold'>
                SSEngineeringConstruction Blog
            </h1>
        </div>
    );
}
