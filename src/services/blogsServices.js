import axios from "axios";

const SERVER_URL = "https://jsonplaceholder.typicode.com";

export const getAllBlogs = () => {
    const url= `${SERVER_URL}/posts`;
    return axios.get(url);
};

export const getBlog = (blogId) => {
    const url= `${SERVER_URL}/posts/${blogId}`;
    return axios.get(url);
};

export const getAllUsers = () => {
  return axios.get('https://jsonplaceholder.typicode.com/users');
};


export const getUser = (userId) => {
    const url = `${SERVER_URL}/users/${userId}`;
    return axios.get(url)

};
export const createBlog = (blogId) => {
    const url= `${SERVER_URL}/blogs/${blogId}`;
    return axios.post(url);
};
export const createUser = (userId) => {
    const url = `${SERVER_URL}/users/${userId}`;
    return axios.post(url)
};
export const updateBlog = (blog, blogId) => {
    const url= `${SERVER_URL}/blog/${blogId}`;
    return axios.put(url, blog);
};
export const updateUser = (user,userId) => {
    const url = `${SERVER_URL}/users/${userId}`;
    return axios.put(url, user)
};
export const deleteBlog = ( blogId) => {
    const url= `${SERVER_URL}/blog/${blogId}`;
    return axios.delete(url);
};
export const deleteUser = (userId) => {
    const url = `${SERVER_URL}/users/${userId}`;
    return axios.delete(url)
};