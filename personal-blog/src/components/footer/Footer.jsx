import { useFetch } from "../../hooks/useFetch.js"
import { endPoints } from "../../utils/endpoints.js"

export function Footer() {
    const { data } = useFetch(endPoints.contacts, {});

    const renderSocial = (url, iconPath, alt, isEmail = false) => {
        const fullUrl = isEmail ? `mailto:${url}` : url;

        return (
            <li>
                {url ? (
                    <a href={fullUrl} title={alt} target="_blank" rel="noreferrer">
                        <img src={iconPath} alt={alt} />
                    </a>
                ) : (
                    <span><img src={iconPath} alt={alt} /></span>
                )}
            </li>
        );
    };

    return (
        <footer>
            <div className="footer-top">
                <img src="/images/strateva-bw.png" className="footer-logo" alt="Logo" />
                <ul>
                    {renderSocial(data?.facebook, "/images/facebook.svg", "Facebook")}
                    {renderSocial(data?.instagram, "/images/instagram.svg", "Instagram")}
                    {renderSocial(data?.email, "/images/email.svg", "Email", true)}
                </ul>
            </div>
            <div className="footer-bottom">
                <span>&copy; {new Date().getFullYear()} Всички права запазени</span>
            </div>
        </footer>
    );
}
