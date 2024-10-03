import React from 'react';
import CreateBlog from '../blog/CreateBlog';


function CreateBlogModal({ onClose }) {
    // Add a CSS class to the root element based on whether the modal is open
    const modalClass = onClose ? 'modal-open' : '';

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${modalClass}`}>
            <div className="bg-black opacity-60 fixed inset-0"></div> {/* Overlay with 0.6 opacity */}

            <div className="bg-white rounded-lg shadow-md relative">

                <div className="px-6 -mb-10 rounded-lg bg-white text-right">
                    <button
                        className="px-3 text-sm font-medium text-white hover:text-gray-300"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>

                <div >
                    <CreateBlog onClose={onClose} />
                </div>
            </div>

        </div>
    );
}

export default CreateBlogModal;
