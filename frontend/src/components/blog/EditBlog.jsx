import React, { useContext, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { BlogContext } from '../../contexts/BlogContext';
import { BlogService } from '../../services/blog.service';
import BlogForm from '../form/BlogForm';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function EditBlog({ onClose }) {
    const { id } = useContext(BlogContext);
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    const queryClient = useQueryClient();

    const { data, isError } = useQuery({
        queryKey: ["getBlogById", id],
        queryFn: async () => await BlogService.getSpecificBlog(id),
        staleTime: 30000
    });

    const blogUpdateMutation = useMutation({
        mutationFn: BlogService.updateBlog,
        onSuccess: (data) => {
            queryClient.invalidateQueries(['getBlogById', id]);
            toast.success("Blog Updated Successfully");
            if (onClose) {
                onClose();
            }
            navigate(`/blog/${id}`);
        },
        onError: (data) => {
            setError(data.response.data.message || data.response.statusText);
        }
    });

    const onSubmit = async (updatedBlogData) => {
        await blogUpdateMutation.mutateAsync({ id, updatedBlogData });
    }


    return (
        <div className='max-w-md mx-auto'>
            <div className="bg-blue-500 py-4 px-6 rounded-t-lg text-white">
                <h3 className="text-xl font-semibold">Edit Blog</h3>
            </div>
            <BlogForm onSubmit={onSubmit} data={data} error={error} setError={setError} />
        </div>
    );
}
