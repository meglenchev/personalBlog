import { Link, useNavigate, useParams } from "react-router";
import { useFetch } from "../../hooks/useFetch.js";
import { endPoints } from "../../utils/endpoints.js";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext.jsx";
import { useRequest } from "../../hooks/useRequest.js";
import DOMPurify from "dompurify";

export function PracticeDetails() {
    const { user, isAuthenticated, isAdmin } = useContext(UserContext);
    const { practiceId } = useParams();

    const [showConfirm, setShowConfirm] = useState(false);

    const [serverError, setServerError] = useState('');

    const { data, isPending } = useFetch(endPoints.practiceDetails(practiceId), {}, practiceId);

    const pageTitle = data?.title

    useEffect(() => {
        document.title = pageTitle;

        if (pageTitle) {
            document.title = `${pageTitle}`;
        }

        return () => { document.title = "Моят блог"; };
    }, [pageTitle]);

    const { request } = useRequest();

    const navigate = useNavigate();

    const deletePracticeHandler = () => {
        setShowConfirm(true);
    }

    const confirmDelete = async (e) => {
        e.preventDefault();

        try {
            await request(endPoints.practiceDelete(practiceId), 'DELETE');

            navigate('/practices');
        } catch (err) {
            setServerError(`Неуспешно изтриване на практика: ${err.message}`);
        }
    }

    const goBackHandler = () => {
        navigate(-1);
    };

    return (
        <section className="post-details practice-details">
            {isPending
                ? <div className="loader"><img src="/images/loading.svg" alt="Зареждане" /></div>
                : Object.keys(data).length > 0
                    ? (<>
                        <img src={data.imageUrl} alt={data.title} />
                        <p className="post-date practice-date">Практиката ще се проведе на {data.practiceDate.slice(0, 10)}</p>
                        <h2>{data.title}</h2>
                        <p>{data.presentation}</p>
                        <div 
                            className="post-content"
                            dangerouslySetInnerHTML={{ 
                                __html: DOMPurify.sanitize(data.content) 
                            }} 
                        />

                        {serverError && <div className="errors">{serverError}</div>}
                        
                        <div className="post-footer">
                            <span onClick={goBackHandler} className="btn btn-back" title="Назад">Назад</span>
                            {isAuthenticated && (String(data.owner) === String(user?._id) || isAdmin)
                                ? <div className="buttons">
                                    <Link to={`/practices/${practiceId}/edit`} className="btn btn-edit" title="Редактирай практика">Редактирай</Link>
                                    <button onClick={deletePracticeHandler} className="btn btn-delete" title="Изтрий практика">Изтрий</button>
                                </div>
                                : ''
                            }
                        </div>
                    </>)
                    : <p className="no-articles">Възникна грешка. Моля опитайте по-късно!</p>
            }

            {showConfirm && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Сигурни ли сте?</h3>
                        <p>Изтриването на "<strong>{data.title}</strong>" не може да бъде отменено.</p>
                        <div className="buttons">
                            <button className="btn btn-edit" onClick={() => setShowConfirm(false)}>Отказ</button>
                            <button className="btn btn-delete" onClick={confirmDelete}>Да, изтрий</button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}