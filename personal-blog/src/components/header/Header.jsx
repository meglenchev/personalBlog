import { useContext } from "react";
import { NavLink } from "react-router";
import UserContext from "../../context/UserContext.jsx";

export function Header() {
    const { isAuthenticated } = useContext(UserContext);

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
                        {!isAuthenticated && <li><NavLink to="/user/login">Вход</NavLink></li>}
                        {!isAuthenticated && <li><NavLink to="/user/register">Регистрация</NavLink></li>}
                        {isAuthenticated && <li><NavLink to="/user/logout">Изход</NavLink></li>}
                    </ul>
                </div>
                {isAuthenticated && (
                    <div className="subline">
                        <ul>
                            <li><NavLink to="/blogs/create">Добави блог</NavLink></li>
                            <li><NavLink to="/practices/create">Добави практика</NavLink></li>
                            <li><NavLink to="/user/edit/settings">Промяна в настройки</NavLink></li>
                        </ul>
                    </div>
                )}
            </div>
            <h1><a href="/"><img src="/images/strateva.png" className="logo" alt="Стратева" /></a></h1>
        </header>
    )
}