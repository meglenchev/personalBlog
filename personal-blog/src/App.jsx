import { Routes, Route } from 'react-router'
import { Footer } from './components/footer/Footer.jsx'
import { Header } from './components/header/Header.jsx'
import { Home } from './components/home/Home.jsx'
import { AboutAuthor } from './components/about-author/AboutAuthor.jsx'
import { EditAuthorInfo } from './components/edit-author-info/EditAuthorInfo.jsx'
import { CreateBlog } from './components/create-blog/CreateBolg.jsx'
import { CreatePractices } from './components/create-practices/CreatePractices.jsx'
import { UserRegister } from './components/users/UserRegister.jsx'
import { UserLogin } from './components/users/UserLogin.jsx'
import { Blogs } from './components/blogs/Blogs.jsx'
import { PostDetails } from './components/blogs/PostDetails.jsx'

function App() {
    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<AboutAuthor />} />
                    <Route path='/about/edit' element={<EditAuthorInfo />} />
                    <Route path='/blogs' element={<Blogs />} />
                    <Route path="/blogs/:blogId/details" element={<PostDetails />} />
                    <Route path='/blogs/create' element={<CreateBlog />} />
                    <Route path='/practices/create' element={<CreatePractices />} />
                    <Route path='/user/register' element={<UserRegister />} />
                    <Route path='/user/login' element={<UserLogin />} />
                </Routes>
            </main>
            <Footer />
        </>
    )
}

export default App
