import React from 'react';
import DeleteBlog from '../blog/DeleteBlog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';


function DeleteBlogModal({ onClose }) {
    const modalClass = onClose ? 'modal-open' : '';

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${modalClass}`}>
            <div className="bg-black opacity-60 fixed inset-0"></div> {/* Overlay with 0.6 opacity */}
            <div className="rounded-lg shadow-md relative">
                <div className="px-4 pb-2 rounded-t-lg bg-white flex flex-row justify-center">
                    <div className="flex items-center flex-grow">
                        <span className="mx-auto mt-2 text-lg font-semibold">Delete</span>
                    </div>
                    <div className="flex-shrink-0">
                        <button
                            className="mt-2 w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300"
                            onClick={onClose}
                        >
                            <FontAwesomeIcon icon={faXmark} size="lg" />
                        </button>
                    </div>
                </div>
                <hr className='w-0.5' />
                <div>
                    <DeleteBlog onClose={onClose} />
                </div>
            </div>
        </div>


    );
}

export default DeleteBlogModal;
