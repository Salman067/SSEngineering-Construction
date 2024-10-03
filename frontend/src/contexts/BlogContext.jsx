import React, { useState } from 'react';

const BlogContext = React.createContext();

const BlogProvider = ({ children }) => {

    const [blogData, setBlogData] = useState({});
    const [id, setid] = useState(null);

    return (
        <BlogContext.Provider value={{ blogData, setBlogData, id, setid }}>
            {children}
        </BlogContext.Provider>
    );
};

export { BlogContext, BlogProvider };