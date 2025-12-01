import { Link } from "react-router";

export function Footer() {
    return (
        <footer>
            <div className="footer-top">
                <img src="/images/strateva-bw.png" className="footer-logo" alt="Стратева" />
                <ul>
                    <li><Link to="#" title="Facebook"><img src="/images/facebook.svg" alt="Facebook" /></Link></li>
                    <li><Link to="#" title="Instagram"><img src="/images/instagram.svg" alt="Instagram" /></Link></li>
                </ul>
            </div>
            <div className="footer-bottom">
                <Link to="email: your-email@gmail.com">your-email@gmail.com</Link>
            </div>
        </footer>
    )
}