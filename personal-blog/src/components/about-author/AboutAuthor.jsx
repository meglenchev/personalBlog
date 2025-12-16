import { endPoints } from "../../utils/endpoints.js";
import UserContext from "../../context/UserContext.jsx";
import { useContext, useEffect } from "react";
import { Link } from "react-router";
import { useFetch } from "../../hooks/useFetch.js";

export function AboutAuthor() {
    useEffect(() => {
        document.title = 'За мен';
    }, []);

    const { user, settingsId } = useContext(UserContext);

    const fetchUrl = settingsId ? endPoints.homeSettings(settingsId) : null;

    const { data, isPending } = useFetch(fetchUrl, {});

    const hasData = data && Object.keys(data).length > 0;

    const hasUser = user && Object.keys(user).length > 0;

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
                        <p>{data.info}</p>
                        {user?._id === data._ownerId && (
                            <div className="post-footer">
                                <Link to={'/user/edit/settings'} className="btn btn-edit right" title="Редактирай информацията">Редактирай</Link>
                            </div>
                        )}
                    </>)
                    : (<>
                        <p className="no-articles">Няма добавена информация!</p>

                        {hasUser && <Link to="/user/settings" className="btn right btn-settings">Добавете информация</Link>}
                    </>)
            }
        </article>
    )
}