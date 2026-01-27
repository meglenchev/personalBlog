import { useContext, useState } from "react";
import { Link, NavLink } from "react-router";
import UserContext from "../../context/UserContext.jsx";

export function Header() {
    const { isAuthenticated, isAdmin } = useContext(UserContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className={`${isAuthenticated ? 'header logedin' : 'header'} ${isMenuOpen ? 'menu-open' : ''}`}>
            <div className="wrap">
                <button className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>

                <div className={`menu-wrap ${isMenuOpen ? 'active' : ''}`}>
                    <div>
                        <div className="content">
                            <nav>
                                <ul>
                                    <li><NavLink to="/" onClick={closeMenu}>Начало</NavLink></li>
                                    <li><NavLink to="/about" onClick={closeMenu}>За мен</NavLink></li>
                                    <li><NavLink to="/practices" onClick={closeMenu}>Практики</NavLink></li>
                                    <li><NavLink to="/blogs" onClick={closeMenu}>Блог</NavLink></li>
                                </ul>
                            </nav>

                            <ul className="auth-nav">
                                {isAuthenticated && <li><NavLink to="/pb-admin/logout" onClick={closeMenu}>Изход</NavLink></li>}
                            </ul>
                        </div>
                        {isAuthenticated && (
                            <div className="subline">
                                <ul>
                                    <li><NavLink to="/blogs/create" onClick={closeMenu}>Добави блог</NavLink></li>
                                    <li><NavLink to="/practices/create" onClick={closeMenu}>Добави практика</NavLink></li>
                                    {isAdmin && (
                                        <>
                                            <li><NavLink to="/user/edit/settings" onClick={closeMenu}>Настройки</NavLink></li>
                                            <li><Link to="/slider/settings" title="Редактирай слайдера">Редактирай слайдера</Link></li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <h1><Link to="/"><img src="/images/strateva.png" className="logo" alt="Стратева" /></Link></h1>
        </header>
    )
}