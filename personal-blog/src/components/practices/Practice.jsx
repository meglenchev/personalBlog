import { Link } from "react-router";

export function Practice({
    id,
    title,
    imageUrl,
    presentation
}) {
    return (
        <section className="post">
            <img src={imageUrl} alt={title} />
            <Link to={`/practices/${id}/details`} className="btn" title="Научи повече">Научи повече</Link>
            <div className="content">
                <h3>{title}</h3>
                <p>{presentation}</p>
            </div>
        </section>
    )
}