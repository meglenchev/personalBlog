import { useContext } from "react";
import { Link, NavLink } from "react-router";
import UserContext from "../../context/UserContext.jsx";

export function Header() {
    const { isAuthenticated, isAdmin } = useContext(UserContext);

    return (
        <header className={isAuthenticated ? 'header logedin' : 'header'}>
            <div className="wrap">
                <div className="content">
                    <nav>
                        <ul>
                            <li><NavLink to="/">Начало</NavLink></li>
                            <li><NavLink to="/about">За мен</NavLink></li>
                            <li><NavLink to="/practices">Практики</NavLink></li>
                            <li><NavLink to="/blogs">Блог</NavLink></li>
                        </ul>
                    </nav>

                    <ul className="auth-nav">
                        {isAuthenticated && <li><NavLink to="/pb-admin/logout">Изход</NavLink></li>}
                    </ul>
                </div>
                {isAuthenticated && (
                    <div className="subline">
                        <ul>
                            <li><NavLink to="/blogs/create">Добави блог</NavLink></li>
                            <li><NavLink to="/practices/create">Добави практика</NavLink></li>
                            {isAdmin && <li><NavLink to="/user/edit/settings">Настройки</NavLink></li>}
                        </ul>
                    </div>
                )}
            </div>
            <h1><Link to="/"><img src="/images/strateva.png" className="logo" alt="Стратева" /></Link></h1>
        </header>
    )
}