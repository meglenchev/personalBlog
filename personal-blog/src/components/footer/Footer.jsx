import { NavLink } from "react-router";

export function Footer() {
    return (
        <footer>
            <div className="footer-top">
                <img src="/images/strateva-bw.png" className="footer-logo" alt="Стратева" />
                <ul>
                    <li><NavLink to="#" title="Facebook"><img src="/images/facebook.svg" alt="Facebook" /></NavLink></li>
                    <li><NavLink href="#" title="Instagram"><img src="/images/instagram.svg" alt="Instagram" /></NavLink></li>
                </ul>
            </div>
            <div className="footer-bottom">
                <NavLink to="email: your-email@gmail.com">your-email@gmail.com</NavLink>
            </div>
        </footer>
    )
}