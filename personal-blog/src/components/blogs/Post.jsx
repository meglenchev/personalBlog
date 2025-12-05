import { Link } from "react-router";

export function Post({
    id,
    imageUrl,
    title,
    presentation,
    date
}) {
    const dateObject = new Date(date);
    
    const day = dateObject.getDate().toString().padStart(2, '0');

    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');

    const year = dateObject.getFullYear();
    
    const formattedDate = `${day}-${month}-${year}`;

    return (
        <section className="post">
            <img src={imageUrl} alt={title} />
            <h3>{title}</h3>
            <p>{presentation}</p>
            <span className="post-date">{formattedDate}</span>
            <Link to={`/blog/${id}/details`} className="btn" title="Прочети повече">Прочети</Link>
        </section>
    )
}