import { Link, useNavigate, useParams } from "react-router";
import { useFetch } from "../../hooks/useFetch.js";
import { endPoints } from "../../utils/endpoints.js";
import { useDate } from "../../hooks/useDate.js";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext.jsx";
import { useRequest } from "../../hooks/useRequest.js";

export function BlogDetails() {
    const { user, isAuthenticated, isAdmin } = useContext(UserContext);

    const { blogId } = useParams();

    const { data, isPending } = useFetch(endPoints.blogDetails(blogId), {}, blogId);

    const date = useDate(data?.createdAt);

    const [showConfirm, setShowConfirm] = useState(false);

    const [serverError, setServerError] = useState('');

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

    const deleteBlogHandler = () => {
        setShowConfirm(true);
    }

    const confirmDelete = async (e) => {
        e.preventDefault();

        try {
            await request(endPoints.blogDelete(blogId), 'DELETE');

            navigate('/blogs');
        } catch (err) {
            setServerError(`Неуспешно изтриване на публикация: ${err.message}`);
        }
    }

    const goBackHandler = () => {
        navigate(-1);
    };

    return (
        <section className="post-details">
            {isPending
                ? <div className="loader"><img src="/images/loading.svg" alt="Зареждане" /></div>
                : data && Object.keys(data).length > 0
                    ? (<>
                        <img src={data.imageUrl} alt={data.title} />
                        <h2>{data.title}</h2>
                        <p className="post-date">Публикувано на {date}</p>
                        <p>{data.presentation}</p>
                        <p>{data.content}</p>

                        {serverError && <div className="errors">{serverError}</div>}
                        
                        <div className="post-footer">
                            <span onClick={goBackHandler} className="btn btn-back" title="Назад">Назад</span>
                            {isAuthenticated && (String(data.owner) === String(user?._id) || isAdmin) && (
                                <div className="buttons">
                                    <Link to={`/blogs/${blogId}/edit`} className="btn btn-edit">Редактирай</Link>
                                    <button onClick={deleteBlogHandler} className="btn btn-delete">Изтрий</button>
                                </div>
                            )}
                        </div>
                    </>)
                    : <p className="no-articles">Възникна грешка. Моля опитайте по-късно!</p>
            }

            {showConfirm && (
                <div className="delete-modal-overlay">
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