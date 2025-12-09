import { Link, useNavigate, useParams } from "react-router";
import { useFetch } from "../hooks/useFetch.js";
import { endPoints } from "../../utils/endpoints.js";
import { useDate } from "../hooks/useDate.js";
import { useContext } from "react";
import UserContext from "../../context/UserContext.jsx";
import { useRequest } from "../hooks/useRequest.js";

export function PostDetails() {
    const { user, isAuthenticated } = useContext(UserContext);

    const { blogId } = useParams();

    const { data, isPending } = useFetch(endPoints.postDetails(blogId), {}, blogId);

    const date = useDate(data._createdOn);

    const { request } = useRequest();
    const navigate = useNavigate();

    const deleteBlogHandler = async (e) => {
        e.preventDefault();

        const isConfirm = confirm(`Сигурни ли сте, че искате да изтриете тази публикация ${data.title}?`);

        if (!isConfirm) {
            return;
        }

        try {
            await request(endPoints.postDetails(blogId), 'DELETE');

            navigate('/blogs');
        } catch (err) {
            alert(`Неуспешно изтриване на публикация: ${err.message}`);
        }
    }

    return (
        <section className="post-details">
            {isPending
                ? <div className="loader"><img src="/images/loading.svg" alt="" /></div>
                : Object.keys(data).length > 0
                    ? (<>
                        <img src={data.imageUrl} alt={data.title} />
                        <h2>{data.title}</h2>
                        <p className="post-date">Публикувано на {date}</p>
                        <p>{data.presentation}</p>
                        <p>{data.content}</p>
                        <div className="post-footer">
                            <Link to={`/blogs`} className="btn btn-back" title="Назад">Назад</Link>
                            {isAuthenticated && data._ownerId === user._id
                                ? <div className="buttons">
                                    <Link to={`/blogs/${blogId}/edit`} className="btn btn-edit" title="Редактирай публикацията">Редактирай</Link>
                                    <Link to={`/blogs/${blogId}/delete`} onClick={deleteBlogHandler} className="btn btn-delete" title="Изтрий публикацията">Изтрий</Link>
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