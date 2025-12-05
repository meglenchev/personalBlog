export const BASE_URL = "http://localhost:3030";

export const endPoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',
    allBlogs: '/data/blogs?sortBy=_createdOn%20desc', 
    latestBlogs: '/data/blogs?sortBy=_createdOn%20desc&pageSize=3',
    latestPractices: '/data/practices?sortBy=_createdOn%20desc&pageSize=3',
    postBlog: '/data/blogs',
    postDetails: (blogId) => `/data/blogs/${blogId}`,
}