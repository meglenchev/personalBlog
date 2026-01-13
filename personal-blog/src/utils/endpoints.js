export const BASE_URL = "http://localhost:5000";
export const authorId = "1f7j8p0e-3a9b-4e2v-9k1g-6a5b1v8p2e6f";

export const endPoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',
    settings: '/settings',
    homeSettings: (settingsId) => `/settings/${settingsId}`,
    homeAbout: '/settings',
    allBlogs: '/blogs', 
    latestBlogs: '/blogs/latest',
    postBlog: '/blogs/create',
    blogEdit: (blogId) => `/blogs/${blogId}/edit`,
    blogDetails: (blogId) => `/blogs/${blogId}/details`,
    blogDelete: (blogId) => `/blogs/${blogId}/delete`,
    postPractices: '/practices/create',
    allPractices: '/practices?sortBy=date%20desc',
    latestPractices: '/practices?sortBy=date%20desc&pageSize=3',
    practiceDetails: (practiceId) => `/practices/${practiceId}`,
}