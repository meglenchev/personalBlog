import { Link, useNavigate, useParams } from "react-router";
import { useFetch } from "../hooks/useFetch.js";
import { endPoints } from "../../utils/endpoints.js";
import { useContext } from "react";
import UserContext from "../../context/UserContext.jsx";
import { useRequest } from "../hooks/useRequest.js";

export function PracticeDetails() {
    const { user, isAuthenticated } = useContext(UserContext);
    const { practiceId } = useParams();

    const { data, isPending } = useFetch(endPoints.practiceDetails(practiceId), {}, practiceId);

    const { request } = useRequest();
    const navigate = useNavigate();

    const deletePracticeHandler = async (e) => {
        e.preventDefault();

        const isConfirm = confirm(`Сигурни ли сте, че искате да изтриете тази практика ${data.title}?`);

        if (!isConfirm) {
            return;
        }

        try {
            await request(endPoints.practiceDetails(practiceId), 'DELETE');

            navigate('/practices');
        } catch (err) {
            alert(`Неуспешно изтриване на практика: ${err.message}`);
        }
    }

    const goBackHandler = () => {
        navigate(-1);
    };

    return (
        <section className="post-details practice-details">
            {isPending
                ? <div className="loader"><img src="/images/loading.svg" alt="" /></div>
                : Object.keys(data).length > 0
                    ? (<>
                        <img src={data.imageUrl} alt={data.title} />
                        <p className="post-date practice-date">Практиката ще се проведе на {data.date}</p>
                        <h2>{data.title}</h2>
                        <p>{data.presentation}</p>
                        <p>{data.content}</p>
                        <div className="post-footer">
                            <span onClick={goBackHandler} className="btn btn-back" title="Назад">Назад</span>
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