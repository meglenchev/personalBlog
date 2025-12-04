import { Routes, Route } from 'react-router'
import { Footer } from './components/footer/Footer.jsx'
import { Header } from './components/header/Header.jsx'
import { Home } from './components/home/Home.jsx'
import { AboutAuthor } from './components/about-author/AboutAuthor.jsx'
import { EditAuthorInfo } from './components/edit-author-info/EditAuthorInfo.jsx'
import { CreateBlog } from './components/create-blog/CreateBolg.jsx'
import { CreatePractices } from './components/create-practices/CreatePractices.jsx'
import { UserRegister } from './components/users/UserRegister.jsx'

function App() {
    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<AboutAuthor />} />
                    <Route path='/about/edit' element={<EditAuthorInfo />} />
                    <Route path='/blog/create' element={<CreateBlog />} />
                    <Route path='/practices/create' element={<CreatePractices />} />
                    <Route path='/user/register' element={<UserRegister />} />
                </Routes>
            </main>
            <Footer />
        </>
    )
}

export default App
