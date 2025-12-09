import { Routes, Route } from 'react-router'
import { Footer } from './components/footer/Footer.jsx'
import { Header } from './components/header/Header.jsx'
import { Home } from './components/home/Home.jsx'
import { AboutAuthor } from './components/about-author/AboutAuthor.jsx'
import { EditAuthorInfo } from './components/edit-author-info/EditAuthorInfo.jsx'
import { CreatePractices } from './components/create-practices/CreatePractices.jsx'
import { UserRegister } from './components/users/UserRegister.jsx'
import { UserLogin } from './components/users/UserLogin.jsx'
import { Blogs } from './components/blogs/Blogs.jsx'
import { BlogsCreate } from './components/blogs-create/BolgsCreate.jsx'
import { PostDetails } from './components/blogs/PostDetails.jsx'
import { RouteGuard } from './components/routeGuard/RouteGuard.jsx'
import { useContext } from 'react'
import UserContext from './context/UserContext.jsx'
import { BlogsEdit } from './components/blogs-edit/BlogsEdit.jsx'

function App() {
    const { isAuthenticated } = useContext(UserContext);

    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<AboutAuthor />} />
                    <Route path='/blogs' element={<Blogs />} />
                    <Route path="/blogs/:blogId/details" element={<PostDetails />} />

                    <Route path='/user/register' element={<UserRegister />} />
                    <Route path='/user/login' element={<UserLogin />} />

                    <Route element={<RouteGuard isAuthenticated={isAuthenticated} />}>
                        <Route path='/about/edit' element={<EditAuthorInfo />} />
                        <Route path='/blogs/create' element={<BlogsCreate />} />
                        <Route path='/blogs/:blogId/edit' element={<BlogsEdit />} />
                        <Route path='/practices/create' element={<CreatePractices />} />
                    </Route>
                </Routes>
            </main>
            <Footer />
        </>
    )
}

export default App
