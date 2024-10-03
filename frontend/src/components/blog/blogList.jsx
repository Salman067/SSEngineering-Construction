import React, { useState } from 'react';
import BlogItem from './blogItem';

const BlogList = ({ blogs }) => {
    return (
        <div >
            <ul>
                {blogs?.map((blog) => (
                    <li key={blog.id}>
                        <BlogItem blog={blog} />
                    </li>
                ))}
            </ul>
        </div >
    );
};

export default BlogList;
