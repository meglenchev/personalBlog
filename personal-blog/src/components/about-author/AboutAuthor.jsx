import { endPoints } from "../../utils/endpoints.js";
import UserContext from "../../context/UserContext.jsx";
import { useContext, useEffect } from "react";
import { Link } from "react-router";
import { useFetch } from "../../hooks/useFetch.js";
import DOMPurify from "dompurify";

export function AboutAuthor() {
    useEffect(() => {
        document.title = 'За мен';
    }, []);

    const { isAdmin } = useContext(UserContext);

    const { data, isPending } = useFetch(endPoints.about, {});

    const hasData = data && Object.keys(data).length > 0;

    return (
        <article className="about-author">
            {isPending
                ? (<div className="loader"><img src="/images/loading.svg" alt="Зареждане" /></div>)
                : hasData
                    ? (<>
                        <img src={data.aboutImage} alt={data.name} />
                        <h2>За автора</h2>
                        <blockquote>{data.slogan}</blockquote>
                        <p>{data.summary}</p>
                        <div 
                            className="info-content"
                            dangerouslySetInnerHTML={{ 
                                __html: DOMPurify.sanitize(data.info) 
                            }} 
                        />
                        {isAdmin && (
                            <div className="post-footer">
                                <Link to={'/about/edit'} className="btn btn-edit right" title="Редактирай информацията">Редактирай</Link>
                            </div>
                        )}
                    </>)
                    : (<>
                        <p className="no-articles">Няма добавена информация!</p>

                        {isAdmin && <Link to="/about/create" className="btn right btn-settings">Добавете информация</Link>}
                    </>)
            }
        </article>
    )
}