import React from 'react';
import { Link } from 'react-router-dom';

function CategorySection() {
    const categories = ['Technology', 'Travel', 'Food', 'Fashion', 'Sports'];

    return (
        <div className="container max-w-4xl px-4 py-4 flex-col justify-center rounded-full">
            <h2 className="text-2xl text-center font-bold mb-4">Categories</h2>
            <ul className="category-list text-center space-y-2">
                {categories.map((category) => (
                    <li key={category} className="category-item">
                        <Link
                            to={`/category/${category}`}
                            className="category-link block py-2 px-4 rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-300"
                        >
                            {category}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CategorySection;
