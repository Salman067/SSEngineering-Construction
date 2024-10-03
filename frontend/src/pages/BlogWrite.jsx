import React from 'react'
import Navbar from '../components/nav/navbar'
import CreateBlog from '../components/blog/CreateBlog'

export default function () {
    return (
        <div>
            <Navbar />
            <div className='mt-1 flex flex-col'>
                <CreateBlog />
            </div>

        </div>
    )
}
