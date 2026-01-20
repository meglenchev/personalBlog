import { Link } from "react-router";
import { useDate } from "../../hooks/useDate.js";

export function Blog({
    id,
    imageUrl,
    title,
    presentation,
    date
}) {
    const formattedDate = useDate(date)

    return (
        <section className="post">
            <img src={imageUrl} alt={title} />
            <div className="content">
                <h3>{title}</h3>
                <p>{presentation}</p>
                <span className="post-date">{formattedDate}</span>
            </div>
            <Link to={`/blogs/${id}/details`} className="btn" title="Прочети повече">Прочети</Link>
        </section>
    )
}