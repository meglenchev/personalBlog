import { Routes, Route } from 'react-router'
import { Footer } from './components/footer/Footer.jsx'
import { Header } from './components/header/Header.jsx'
import { Home } from './components/home/Home.jsx'
import { AboutAuthor } from './components/about-author/AboutAuthor.jsx'
import { PracticesCreate } from './components/practices-create/PracticesCreate.jsx'
import { UserRegister } from './components/users/UserRegister.jsx'
import { UserLogin } from './components/users/UserLogin.jsx'
import { Blogs } from './components/blogs/Blogs.jsx'
import { BlogsCreate } from './components/blogs-create/BolgsCreate.jsx'
import { BlogDetails } from './components/blogs/BlogDetails.jsx'
import { RouteGuard } from './components/routeGuard/RouteGuard.jsx'
import { useContext } from 'react'
import UserContext from './context/UserContext.jsx'
import { BlogsEdit } from './components/blogs-edit/BlogsEdit.jsx'
import { Practices } from './components/practices/Practices.jsx'
import { PracticeDetails } from './components/practices/PracticeDetails.jsx'
import { PracticesEdit } from './components/practices-edit/PracticesEdit.jsx'
import UserLogout from './components/users/UserLogout.jsx'
import { UserSettings } from './components/users/UserSettings.jsx'
import { UserSettingsEdit } from './components/users/UserSettingsEdit.jsx'

function App() {
    const { isAuthenticated } = useContext(UserContext);

    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path='/user/register' element={<UserRegister />} />
                    <Route path='/user/login' element={<UserLogin />} />

                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<AboutAuthor />} />
                    <Route path='/blogs' element={<Blogs />} />
                    <Route path="/blogs/:blogId/details" element={<BlogDetails />} />

                    <Route path='/practices' element={<Practices />} />
                    <Route path='/practices/:practiceId/details' element={<PracticeDetails />} />

                    <Route element={<RouteGuard isAuthenticated={isAuthenticated} />}>
                        <Route path='/blogs/create' element={<BlogsCreate />} />
                        <Route path='/blogs/:blogId/edit' element={<BlogsEdit />} />
                        <Route path='/practices/create' element={<PracticesCreate />} />
                        <Route path='/practices/:practiceId/edit' element={<PracticesEdit />} />
                        <Route path='/user/logout' element={<UserLogout />} />
                        <Route path='/user/settings' element={<UserSettings />} />
                        <Route path='/user/edit/settings' element={<UserSettingsEdit />} />
                    </Route>
                </Routes>
            </main>
            <Footer />
        </>
    )
}

export default App
