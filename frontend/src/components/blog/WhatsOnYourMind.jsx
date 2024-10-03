import React, { useState } from 'react';
import CreateBlogModal from '../Modal/CreateBlogModal';

function WhatsOnYourMind() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="container  max-w-4xl px-10 py-6 p-4 mb-4 bg-white  rounded-md shadow-md">
                <button
                    className="flex items-center gap-2 text-gray-500"
                    onClick={handleOpenModal}
                >
                    <svg
                        className="w-5 h-5 text-blue-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M17 9a1 1 0 01-1 1h-4v4a1 1 0 11-2 0v-4H4a1 1 0 110-2h4V4a1 1 0 112 0v4h4a1 1 0 011 1z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                    <span className="text-sm font-semibold">What's on your mind?</span>
                </button>
            </div>
            {isModalOpen && <CreateBlogModal onClose={handleCloseModal} />}
        </>
    );
}

export default WhatsOnYourMind;
