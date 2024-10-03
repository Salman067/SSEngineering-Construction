import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import DeleteBlogModal from '../Modal/DeleteBlogModal';

function DeleteBlogButton() {
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
                className="block px-4 py-2 text-sm text-red-400 hover:bg-gray-100 w-full text-left"
                onClick={handleOpenModal}
            >
                <FontAwesomeIcon icon={faTrash} className="mr-3" /> Delete
            </button>
            {isModalOpen && <DeleteBlogModal onClose={handleCloseModal} />}
        </>
    );
}

export default DeleteBlogButton;
