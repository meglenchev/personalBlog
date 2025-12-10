export const BASE_URL = "http://localhost:3030";

export const endPoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',
    authorInfo: '/data/author',
    allBlogs: '/data/blogs?sortBy=_createdOn%20desc', 
    latestBlogs: '/data/blogs?sortBy=_createdOn%20desc&pageSize=3',
    postBlog: '/data/blogs',
    blogDetails: (blogId) => `/data/blogs/${blogId}`,
    allPractices: '/data/practices?sortBy=_createdOn%20desc',
    latestPractices: '/data/practices?sortBy=_createdOn%20desc&pageSize=3',
    postPractices: '/data/practices',
    practiceDetails: (practicesId) => `/data/practices/${practicesId}`,
}