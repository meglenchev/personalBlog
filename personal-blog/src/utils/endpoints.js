export const BASE_URL = "http://localhost:3030";
export const authorId = "1f7j8p0e-3a9b-4e2v-9k1g-6a5b1v8p2e6f";

export const endPoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',
    authorInfo: '/data/author/1f7j8p0e-3a9b-4e2v-9k1g-6a5b1v8p2e6f',
    allBlogs: '/data/blogs?sortBy=_createdOn%20desc', 
    latestBlogs: '/data/blogs?sortBy=_createdOn%20desc&pageSize=3',
    postBlog: '/data/blogs',
    blogDetails: (blogId) => `/data/blogs/${blogId}`,
    allPractices: '/data/practices?sortBy=_createdOn%20desc',
    latestPractices: '/data/practices?sortBy=_createdOn%20desc&pageSize=3',
    postPractices: '/data/practices',
    practiceDetails: (practicesId) => `/data/practices/${practicesId}`,
}