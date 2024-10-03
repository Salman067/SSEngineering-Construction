import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/nav/navbar'
import { BlogService } from '../services/blog.service';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';

import dayjs from 'dayjs';
import EditDropdown from '../components/blog/EditDropDown';
import { AuthContext } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBlog } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";


export default function SingleBlog() {
    const { authData } = useContext(AuthContext);
    const { id } = useParams();
    const [updateIsHovered, setUpdatedIsHovered] = useState(false);
    const [createdIsHovered, setCreatedIsHovered] = useState(false);
    const { data, isError } = useQuery({
        queryKey: ["getBlogById", id],
        queryFn: async () => await BlogService.getSpecificBlog(id),
        staleTime: 30000
    });
    useEffect(() => {
        if (isError) {
            toast.error("You need to be logged in to access this feature.");
        }
    }, [isError])
    return (
        <div>
            <Navbar />
            <div className='mt-1 flex flex-col'>
                {data && <div className="text-black-100">
                    <div className="container max-w-4xl px-10 py-6 mx-auto rounded-lg shadow-sm ">

                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-blue-950 text-4xl font-bold "><FontAwesomeIcon icon={faBlog} size='lg' /> {data?.title}</h2>
                            </div>

                            {(data.id === authData.id) && <div>
                                <EditDropdown id={data.id} />
                            </div>}
                        </div>


                        <div className="border-t-2 border-b-2 mt-4 py-4 border-gray-900">

                            <div className="flex-col sm:flex sm:flex-row items-center justify-between">
                                <div>
                                    <span className="px-2 line-clamp-1 py-1 mb-2 font-bold rounded bg-violet-300 dark:text-gray-900 text-left">
                                        Published By <Link to={`/${data.id}`}>{data.userName}</Link>
                                    </span>
                                </div>

                                <div className='flex-col '>
                                    {(data.createdAt !== data.updatedAt) &&
                                        <div>
                                            <div className='relative'>
                                                <span
                                                    className="hidden sm:block text-lg font-bold text-blue-950"
                                                    onMouseEnter={() => setUpdatedIsHovered(true)}
                                                    onMouseLeave={() => setUpdatedIsHovered(false)}
                                                >

                                                    Updated On: {dayjs(data.updatedAt).format("DD MMMM, YYYY")}</span>
                                            </div>
                                            {updateIsHovered && (
                                                <span className="bg-black z-20 absolute text-white text-sm p-2 rounded-lg">
                                                    {dayjs(data.updatedAt).format("dddd, DD MMMM, YYYY, hh:mma")}
                                                </span>
                                            )}
                                        </div>
                                    }
                                    <div>
                                        <div className='relative sm:text-right'>
                                            <span
                                                className={`px-2 text-sm  font-semibold text-gray-500 ${(data.createdAt === data.updatedAt && `sm:text-lg`)} `}
                                                onMouseEnter={() => setCreatedIsHovered(true)}
                                                onMouseLeave={() => setCreatedIsHovered(false)}
                                            >

                                                Published: {dayjs(data.createdAt).format("DD MMMM, YYYY")}
                                            </span>
                                        </div>
                                        {(createdIsHovered && !updateIsHovered) && (
                                            <span className="bg-black z-20 absolute text-white text-sm p-2 rounded-lg">
                                                {dayjs(data.createdAt).format("dddd, DD MMMM, YYYY, hh:mma")} <br />
                                                {(data.createdAt !== data.updatedAt) &&
                                                    <span className='block sm:hidden'>
                                                        Updated: {dayjs(data.updatedAt).format("dddd, DD MMMM, YYYY, hh:mma")}
                                                    </span>
                                                }
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="mt-4">
                            <p className="mt-2">{data.content}</p>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            {/* <span className="text-violet-400">Read more</span> */}
                            <span></span>
                            <div>
                                <div className="flex items-center">
                                    <img src="https://avatars.githubusercontent.com/u/61628453?v=4" alt="avatar" className="object-cover w-10 h-10 mx-4 rounded-full dark:bg-gray-500" />
                                    <Link to={`/${data.id}`}><span className="text-teal-500 font-bold text-xl">{data.userName}</span></Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>}
            </div>
        </div>
    )
}
