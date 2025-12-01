import { NavLink } from "react-router";
import { LoginModal } from "./LoginModal.jsx";
import { useState } from "react";

export function Header() {
    const [showLoginModal, setShowLoginModal] = useState(false);

    // Show/Hide Login User Modal
    const addUserClickHandler = () => {
        setShowLoginModal(true);
    }

    const closeUserModalHandler = () => {
        setShowLoginModal(false);
    }

    return (
        <header>
            <div className="wrap">
                <div className="content">
                    <nav>
                        <ul>
                            <li><NavLink to="/">Начало</NavLink></li>
                            <li><NavLink to="/about">За мен</NavLink></li>
                            <li><NavLink to="/practices">Практики</NavLink></li>
                            <li><NavLink to="/blog">Блог</NavLink></li>
                        </ul>
                    </nav>

                    <ul className="auth-nav">
                        <li className={showLoginModal ? 'active' : ''} onClick={addUserClickHandler}>Логин</li>
                    </ul>

                    {showLoginModal && <LoginModal onClose={closeUserModalHandler} setShowLoginModal={setShowLoginModal} />}
                </div>
            </div>
            <h1><a href="/"><img src="/images/strateva.png" className="logo" alt="Стратева" /></a></h1>
        </header>
    )
}