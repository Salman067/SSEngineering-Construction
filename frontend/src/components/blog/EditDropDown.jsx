import React, { useContext, useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faShare, faTrash } from '@fortawesome/free-solid-svg-icons';
import EditBlogButton from './EditBlogButton';
import { BlogContext } from '../../contexts/BlogContext';
import DeleteBlogButton from './DeleteBlogButton';

export default function EditDropdown({ id }) {
    const { setid } = useContext(BlogContext);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const dropdownButtonRef = useRef(null);

    const handleDropdownToggle = () => {
        setid(id);
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };



    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                !dropdownButtonRef.current.contains(event.target)
            ) {
                closeDropdown();
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div
            data-testid="edit-dropdown"
            className="relative inline-block">
            <button
                ref={dropdownButtonRef}
                className="flex items-center p-2 rounded-full hover:bg-gray-200 focus:outline-none"
                onClick={handleDropdownToggle}
            >
                <FontAwesomeIcon icon={faEllipsis} style={{ color: '#8690a2' }} />
            </button>

            {isOpen && (
                <ul ref={dropdownRef} className="absolute z-30 right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1">
                    <li>
                        <button
                            className="block px-4 py-2 text-sm text-blue-500 hover:bg-gray-100 w-full text-left"
                            onClick={() => console.log('share')}
                        >
                            <FontAwesomeIcon icon={faShare} className="mr-3" />
                            Share
                        </button>
                    </li>
                    <li>
                        <EditBlogButton />
                    </li>
                    <li>
                        <DeleteBlogButton />
                    </li>
                </ul>
            )}
        </div>
    );
}
