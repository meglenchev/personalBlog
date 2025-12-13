import { endPoints } from "../../utils/endpoints.js";
import { useFetch } from "../hooks/useFetch.js";
import UserContext from "../../context/UserContext.jsx";
import { useContext, useEffect } from "react";
import { Link } from "react-router";

export function AboutAuthor() {
    const { isAuthenticated, settingsId } = useContext(UserContext);

    const { data, isPending } = useFetch(endPoints.homeSettings(settingsId), []);

    useEffect(() => {
        document.title = 'За мен';
    }, []);

    return (
        <article className="about-author">
            {isPending
                ? <div className="loader"><img src="/images/loading.svg" alt="Зареждане" /></div>
                : data
                    ? <>
                        <img src={data.aboutImage} alt={data.name} />
                        <h2>За автора</h2>
                        <blockquote>{data.slogan}</blockquote>
                        <p>{data.summary}</p>
                        <p>{data.info}</p>
                        {isAuthenticated && <div className="post-footer"><Link to={'/user/edit/settings'} className="btn btn-edit right" title="Редактирай информацията">Редактирай</Link></div>}
                    </>
                    : <p className="no-articles">Няма добавена информация!</p>
            }
        </article>
    )
}