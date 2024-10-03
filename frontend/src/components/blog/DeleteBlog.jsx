import React, { useContext, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { BlogContext } from '../../contexts/BlogContext';
import { BlogService } from '../../services/blog.service';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function DeleteBlog({ onClose }) {
    const { id, blogData, setBlogData } = useContext(BlogContext);
    const navigate = useNavigate()
    const queryClient = useQueryClient();


    const blogDeleteMutation = useMutation({
        mutationFn: BlogService.deleteBlog,

        onSuccess: (data) => {
            const updatedBlogs = blogData.blogs.filter((blog) => blog.id !== id);
            const updatedBlogData = { ...blogData, blogs: updatedBlogs }
            setBlogData(updatedBlogData);

            toast.success(data);
            if (onClose) {
                onClose();
            }
        },
        onError: (data) => {
            toast.error(data.response.data.message || data.response.statusText);
        }
    });

    const onSubmit = async () => {
        await blogDeleteMutation.mutateAsync({ id });
    }


    return (
        <div className='bg-white rounded-b-lg max-w-md mx-auto'>

            <div className="py-4 px-6 rounded-b-lg ">
                <h3 className="text-md">Are you sure you want to delete this blog?</h3>
            </div>
            <div className="m-3 text-right gap-6">
                <button
                    onClick={onClose}
                    className="p-1 gap-4 rounded-md hover:bg-gray-200 font-semibold text-lg text-[#1A6ED8]">
                    cancel
                </button>
                <button
                    onClick={onSubmit}
                    className="px-3 py-1 mr-1 ml-4  mb-4 rounded-lg bg-[#1A6ED8] text-white hover:bg-blue-500">
                    Delete
                </button>
            </div>

        </div>
    );
}
