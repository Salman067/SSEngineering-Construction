import React, { useContext, useState } from 'react'
import BlogForm from '../form/BlogForm';
import { BlogService } from '../../services/blog.service';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const CreateBlog = ({ onClose }) => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const queryClient = useQueryClient();
    const { authData } = useContext(AuthContext)

    const queriesToInvalidate = [
        ['listByUser', authData.id, 1, 10],
        ['list', 1, 10]
    ];

    const blogCreateMutation = useMutation({
        mutationFn: BlogService.createBlog,

        onSuccess: (data) => {
            queriesToInvalidate.forEach(query => {
                queryClient.invalidateQueries(query);
            });

            toast.success("Blog Published Successfully");

            if (!onClose) {
                navigate(`/blog/${data.id}`)
            }
            if (onClose) {
                onClose();
            }
        },
        onError: (data) => {
            if (data.response.status == 503) {
                // toast.error("Oops! Something went wrong. Please Try Again Later.");
            }
            else {
                if (data.response.status == '401') {
                    navigate('/login');
                    toast.error("You are logged out");
                }
                setError(data.response.data.message);
            }
        }
    });

    const onSubmit = async (blogData) => {
        await blogCreateMutation.mutateAsync(blogData);
    }

    return (
        <div className='max-w-md mx-auto'>
            <div className="bg-blue-500 py-4 px-6 rounded-t-lg text-white">
                <h3 className="text-xl font-semibold">Create Blog</h3>
            </div>
            <BlogForm onSubmit={onSubmit} error={error} setError={setError} />
        </div>
    )
}
export default CreateBlog;