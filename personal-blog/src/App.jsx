import { useScrollToTop } from './hooks/useScrollToTop.jsx'
import { Routes, Route } from 'react-router'
import { Footer } from './components/footer/Footer.jsx'
import { Header } from './components/header/Header.jsx'
import { Home } from './components/home/Home.jsx'
import { AboutAuthor } from './components/about-author/AboutAuthor.jsx'
import { UserRegister } from './components/users/UserRegister.jsx'
import { UserLogin } from './components/users/UserLogin.jsx'
import { Blogs } from './components/blogs/Blogs.jsx'
import { BlogDetails } from './components/blogs/BlogDetails.jsx'
import { RegisteredOnlyRoute } from './components/routeGuard/RegisteredOnlyRoute.jsx'
import { PublicOnlyRoute } from './components/routeGuard/PublicOnlyRoute.jsx'
import { useContext } from 'react'
import UserContext from './context/UserContext.jsx'
import { BlogsCreate } from './components/blogs-create/BlogsCreate.jsx'
import { Practices } from './components/practices/Practices.jsx'
import { PracticeDetails } from './components/practices/PracticeDetails.jsx'
import { PracticesCreate } from './components/practices-create/PracticesCreate.jsx'
import UserLogout from './components/users/UserLogout.jsx'
import { UserSettings } from './components/users/UserSettings.jsx'
import { UserSettingsEdit } from './components/users/UserSettingsEdit.jsx'
import './styles/style.css'
import { NotFound } from './components/not-found/NotFound.jsx'
import { AboutCreate } from './components/about-create/AboutCreate.jsx'

function App() {
    const { isAuthenticated, userRoles } = useContext(UserContext);

    useScrollToTop();

    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path='*' element={<NotFound />} />

                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<AboutAuthor />} />
                    <Route path='/blogs' element={<Blogs />} />
                    <Route path="/blogs/:blogId/details" element={<BlogDetails />} />

                    <Route path='/practices' element={<Practices />} />
                    <Route path='/practices/:practiceId/details' element={<PracticeDetails />} />

                    <Route path='/pb-admin/register' element={<UserRegister />} />

                    <Route element={<PublicOnlyRoute isAuthenticated={isAuthenticated} />}>
                        <Route path='/pb-admin/login' element={<UserLogin />} />
                    </Route>

                    <Route element={<RegisteredOnlyRoute isAuthenticated={isAuthenticated} userRoles={userRoles} />}>
                        <Route path='/blogs/create' element={<BlogsCreate mode="create" />} />
                        <Route path='/blogs/:blogId/edit' element={<BlogsCreate mode="edit" />} />
                        <Route path='/practices/create' element={<PracticesCreate mode="create" />} />
                        <Route path='/practices/:practiceId/edit' element={<PracticesCreate mode="edit" />} />
                        <Route path='/pb-admin/logout' element={<UserLogout />} />
                        <Route path='/user/settings' element={<UserSettings mode="create" />} />
                        <Route path='/user/edit/settings' element={<UserSettingsEdit mode="edit" />} />
                        <Route path='/about/create' element={<AboutCreate mode="create" />} />  
                        <Route path='/about/edit' element={<AboutCreate mode="edit" />} />   
                    </Route>
                </Routes>
            </main>
            <Footer />
        </>
    )
}

export default App
