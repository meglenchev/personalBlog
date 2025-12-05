import { Link, useParams } from "react-router";
import { useFetch } from "../hooks/useFetch.js";
import { endPoints } from "../../utils/endpoints.js";
import { useDate } from "../hooks/useDate.js";

export function PostDetails() {
    const { blogId } = useParams();

    const { data, isPanding } = useFetch(endPoints.postDetails(blogId), {}, blogId);

    const date = useDate(data._createdOn);

    return (
        <section className="post-details">
            {isPanding
                ? <div className="loader"><img src="/images/loading.svg" alt="" /></div>
                : Object.keys(data).length > 0
                    ? (<>
                        <img src={data.imageUrl} alt={data.title} />
                        <h2>{data.title}</h2>
                        <p className="post-date">Публикувано на {date}</p>
                        <p>{data.presentation}</p>
                        <p>{data.content}</p>
                        <Link to={`/blogs/${blogId}/edit`} className="btn btn-edit" title="Редактирай публикацията">Редактирай публикацията</Link>
                    </>)
                    : <p className="no-articles">Възникна грешка. Моля опитайте по-късно!</p>
            }
        </section>
    )
}