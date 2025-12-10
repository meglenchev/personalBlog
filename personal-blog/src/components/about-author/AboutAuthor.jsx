import { useContext } from "react";
import { endPoints } from "../../utils/endpoints.js";
import { useFetch } from "../hooks/useFetch.js";
import UserContext from "../../context/UserContext.jsx";
import { Link } from "react-router";

export function AboutAuthor() {
    const { isAuthenticated } = useContext(UserContext);
    const { data, isPending } = useFetch(endPoints.authorInfo, []);

    return (
        <article className="about-author">
            {isPending
                ? <div className="loader"><img src="/images/loading.svg" alt="Зареждане" /></div>
                : data
                    ? <>
                        <img src={data.imageUrl} alt={data.name} />
                        <h2>За автора</h2>
                        <blockquote>{data.slogan}</blockquote>
                        <p>{data.summary}</p>
                        <p>{data.info}</p>
                        {isAuthenticated && <div className="post-footer"><Link to={'/about/edit'} className="btn btn-edit right" title="Редактирай информацията">Редактирай</Link></div>}
                    </>
                    : <p className="no-articles">Няма добавена информация!</p>
            }
        </article>
    )
}