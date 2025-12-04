export const endPoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',
    allBlogs: '/data/blogs?sortBy=_createdOn%20desc', 
    latestBlogs: '/data/blogs?sortBy=_createdOn%20desc&pageSize=3',
    postBlog: '/data/blogs',
    details: (blogId) => `/data/blogs/${blogId}`,
}