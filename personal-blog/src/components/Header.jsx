export function Header() {
    return (
        <header>
            <div className="wrap">
                <div className="content">
                    <nav>
                        <ul>
                            <li><a href="#home" className="active">Начало</a></li>
                            <li><a href="#about">За мен</a></li>
                            <li><a href="#contact">Практики</a></li>
                            <li><a href="#blog">Блог</a></li>
                        </ul>
                    </nav>

                    <ul className="auth-nav">
                        <li><a href="#login">Логин</a></li>
                    </ul>

                    <div className="login-container">
                        <form>
                            <div className="form-group">
                                <input type="text" id="useremail" name="email" placeholder="Имейл" required />
                            </div>
                            <div className="form-group">
                                <input type="password" id="password" name="password" placeholder="Парола" required />
                            </div>
                            <button type="submit" className="btn btn-login">Влез</button>
                        </form>
                    </div>
                </div>
            </div>
            <h1><a href="/"><img src="/images/strateva.png" className="logo" alt="Стратева" /></a></h1>
        </header>
    )
}