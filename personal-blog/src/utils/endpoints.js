export const BASE_URL = "http://localhost:5000";
export const authorId = "1f7j8p0e-3a9b-4e2v-9k1g-6a5b1v8p2e6f";

export const endPoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',
    me: '/users/me',
    settings: '/settings',
    settingsEdit: '/settings/edit',
    about: '/about',
    aboutEdit: '/about/edit',
    allBlogs: '/blogs', 
    latestBlogs: '/blogs/latest',
    postBlog: '/blogs/create',
    blogEdit: (blogId) => `/blogs/${blogId}/edit`,
    blogDetails: (blogId) => `/blogs/${blogId}/details`,
    blogDelete: (blogId) => `/blogs/${blogId}/delete`,
    postPractices: '/practices/create',
    allPractices: '/practices',
    latestPractices: '/practices/latest',
    practiceDetails: (practiceId) => `/practices/${practiceId}/details`,
    practiceEdit: (practiceId) => `/practices/${practiceId}/edit`,
    practiceDelete: (practiceId) => `/practices/${practiceId}/delete`,
}