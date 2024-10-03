import axiosInstance from "../utils/axios.util";
import apiEndpoint from "../utils/endpoint.util";

const getAllBlogs = async ({ page, limit }) => {
  const response = await axiosInstance.get(
    apiEndpoint.blog.getAll + `?page=${page}&limit=${limit}`
  );
  const blogs = response.data;
  return blogs;
};

const createBlog = async (blogData) => {
  const response = await axiosInstance.post(apiEndpoint.blog.create, blogData);
  const createdBlog = response.data;

  return createdBlog;
};

const getSpecificBlog = async (id) => {
  const url = apiEndpoint.blog.getSpecific.replace(":id", id);
  console.log(url);
  const response = await axiosInstance.get(url);
  const blog = response.data;
  return blog;
};

const updateBlog = async ({ id, updatedBlogData }) => {
  const url = apiEndpoint.blog.update.replace(":id", id);
  const response = await axiosInstance.put(url, updatedBlogData);
  const updatedBlog = response.data;

  return updatedBlog;
};

const deleteBlog = async ({ id }) => {
  const url = apiEndpoint.blog.delete.replace(":id", id);
  const response = await axiosInstance.delete(url);

  return "Blog deleted successfully";
};

// const listByUser = async ({ user_id, pagination }) => {
//   const { page, limit } = pagination;
//   const url =
//     apiEndpoint.blog.getListByUser +
//     `?user_id=${user_id}&` +
//     `page=${page}&limit=${limit}`;
//   const response = await axiosInstance.get(url);
//   const blogs = response.data;
//   return blogs;
// };

const listByUser = async ({ user_id, pagination }) => {
  const { page, limit } = pagination;
  const url = apiEndpoint.blog.getListByUser + `?user_id=${user_id}&page=${page}&limit=${limit}`;
  const response = await axiosInstance.get(url);
  return response.data;  // Return the response data here
};

const getSearchResult = async (query) => {
  const url = apiEndpoint.blog.getSearchResult.replace(":query", query);
  const response = await axiosInstance.get(url);
  const result = response.data;

  return result;
};

export const BlogService = {
  getAllBlogs,
  createBlog,
  getSpecificBlog,
  updateBlog,
  deleteBlog,
  listByUser,
  getSearchResult,
};
