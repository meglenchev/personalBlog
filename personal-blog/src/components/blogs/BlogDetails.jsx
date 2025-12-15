import { Link, useNavigate, useParams } from "react-router";
import { useFetch } from "../../hooks/useFetch.js";
import { endPoints } from "../../utils/endpoints.js";
import { useDate } from "../../hooks/useDate.js";
import { useContext, useEffect } from "react";
import UserContext from "../../context/UserContext.jsx";
import { useRequest } from "../../hooks/useRequest.js";

export function BlogDetails() {
    const { user, isAuthenticated } = useContext(UserContext);

    const { blogId } = useParams();

    const { data, isPending } = useFetch(endPoints.blogDetails(blogId), {}, blogId);

    const date = useDate(data?._createdOn);

    const pageTitle = data?.title

    useEffect(() => {
        document.title = pageTitle;
    }, [pageTitle]);

    const { request } = useRequest();
    const navigate = useNavigate();

    const deleteBlogHandler = async (e) => {
        e.preventDefault();

        const isConfirm = confirm(`Сигурни ли сте, че искате да изтриете тази публикация ${data.title}?`);

        if (!isConfirm) {
            return;
        }

        try {
            await request(endPoints.blogDetails(blogId), 'DELETE');

            navigate('/blogs');
        } catch (err) {
            alert(`Неуспешно изтриване на публикация: ${err.message}`);
        }
    }

    const goBackHandler = () => {
        navigate(-1);
    };

    return (
        <section className="post-details">
            {isPending
                ? <div className="loader"><img src="/images/loading.svg" alt="Зареждане" /></div>
                : Object.keys(data).length > 0
                    ? (<>
                        <img src={data.imageUrl} alt={data.title} />
                        <h2>{data.title}</h2>
                        <p className="post-date">Публикувано на {date}</p>
                        <p>{data.presentation}</p>
                        <p>{data.content}</p>
                        <div className="post-footer">
                            <span onClick={goBackHandler} className="btn btn-back" title="Назад">Назад</span>
                            {isAuthenticated && data._ownerId === user._id
                                ? <div className="buttons">
                                    <Link to={`/blogs/${blogId}/edit`} className="btn btn-edit" title="Редактирай публикацията">Редактирай</Link>
                                    <button onClick={deleteBlogHandler} className="btn btn-delete" title="Изтрий публикацията">Изтрий</button>
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