import { useScrollToTop } from './hooks/useScrollToTop.jsx';
import { lazy, Suspense, useContext } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Routes, Route } from 'react-router';
import UserContext from './context/UserContext.jsx';
import { Footer } from './components/footer/Footer.jsx';
import { Header } from './components/header/Header.jsx';
import { Home } from './components/home/Home.jsx';
import { AboutAuthor } from './components/about-author/AboutAuthor.jsx';
import { UserLogin } from './components/users/UserLogin.jsx';
import { Blogs } from './components/blogs/Blogs.jsx';
import { BlogDetails } from './components/blogs/BlogDetails.jsx';
import { RegisteredOnlyRoute } from './components/routeGuard/RegisteredOnlyRoute.jsx';
import { PublicOnlyRoute } from './components/routeGuard/PublicOnlyRoute.jsx';
import { Practices } from './components/practices/Practices.jsx';
import { PracticeDetails } from './components/practices/PracticeDetails.jsx';
import { NotFound } from './components/not-found/NotFound.jsx';

const UserRegister = lazy(() => import('./components/users/UserRegister.jsx'));
const BlogsCreate = lazy(() => import('./components/blogs-create/BlogsCreate.jsx'));
const UserSettings = lazy(() => import('./components/users/UserSettings.jsx'));
const SliderSettings = lazy(() => import('./components/slider-settings/SliderSettings.jsx'));
const AboutCreate = lazy(() => import('./components/about-create/AboutCreate.jsx'));
const PracticesCreate = lazy(() => import('./components/practices-create/PracticesCreate.jsx'));
const UserLogout = lazy(() => import('./components/users/UserLogout.jsx'));

import './styles/style.css'

function App() {
    const { isAuthenticated, userRoles } = useContext(UserContext);

    useScrollToTop();

    const ErrorFallback = ({ error, resetErrorBoundary }) => (
        <div className="error-container">
            <h2>Проблем с мрежата!</h2>
            <p className='mb-40'>Не успяхме да заредим тази част от приложението. Моля, проверете връзката си.</p>
            <button onClick={resetErrorBoundary} className='btn btn-edit'>Опитай отново</button>
        </div>
    );

    return (
        <>
            <Header />
            <main>
                <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
                    <Suspense fallback={<div className="loader"><img src="/images/loading.svg" alt="Зареждане" /></div>}>
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
                                <Route path='/user/edit/settings' element={<UserSettings mode="edit" />} />
                                <Route path='/about/create' element={<AboutCreate mode="create" />} />
                                <Route path='/about/edit' element={<AboutCreate mode="edit" />} />
                                <Route path='/slider/settings' element={<SliderSettings />} />
                            </Route>
                        </Routes>
                    </Suspense>
                </ErrorBoundary>
            </main>
            <Footer />
        </>
    )
}

export default App
