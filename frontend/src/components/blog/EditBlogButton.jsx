import React, { useState } from 'react';
import EditBlogModal from '../Modal/EditBlogModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

function EditBlogButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button
                className="block px-4 py-2 text-sm text-blue-500 hover:bg-gray-100 w-full text-left"
                onClick={handleOpenModal}
            >
                <FontAwesomeIcon icon={faEdit} className="mr-3" /> Edit
            </button>
            {isModalOpen && <EditBlogModal onClose={handleCloseModal} />}
        </>
    );
}

export default EditBlogButton;
