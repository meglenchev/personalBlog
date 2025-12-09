import { Link, useParams } from "react-router";
import { useFetch } from "../hooks/useFetch.js";
import { endPoints } from "../../utils/endpoints.js";
import { useDate } from "../hooks/useDate.js";
import { useContext } from "react";
import UserContext from "../../context/UserContext.jsx";

export function PracticeDetails() {
    const { user, isAuthenticated } = useContext(UserContext);
    const { practiceId } = useParams();

    const { data, isPending } = useFetch(endPoints.practiceDetails(practiceId), {}, practiceId);

    const date = useDate(data._createdOn);

    const deletePracticeHandler = async (e) => {
        e.preventDefault();
    }

    return (
        <section className="post-details practice-details">
            {isPending
                ? <div className="loader"><img src="/images/loading.svg" alt="" /></div>
                : Object.keys(data).length > 0
                    ? (<>
                        <img src={data.imageUrl} alt={data.title} />
                        <p className="post-date practice-date">Практиката ще се проведе на {date}</p>
                        <h2>{data.title}</h2>
                        <p>{data.presentation}</p>
                        <p>{data.content}</p>
                        <div className="post-footer">
                            <Link to={`/blogs`} className="btn btn-back" title="Назад">Назад</Link>
                            {isAuthenticated && data._ownerId === user._id
                                ? <div className="buttons">
                                    <Link to={`/practices/${practiceId}/edit`} className="btn btn-edit" title="Редактирай практика">Редактирай</Link>
                                    <Link to={`/practices/${practiceId}/delete`} onClick={deletePracticeHandler} className="btn btn-delete" title="Изтрий практика">Изтрий</Link>
                                </div>
                                : ''
                            }
                        </div>
                    </>)
                    : <p className="no-articles">Възникна грешка. Моля опитайте по-късно!</p>
            }
        </section>
    )
}