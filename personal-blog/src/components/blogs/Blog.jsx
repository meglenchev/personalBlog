import { Link } from "react-router";
import { useDate } from "../../hooks/useDate.js";
import { useState } from "react";

export function Blog({
    id,
    imageUrl,
    title,
    presentation,
    date
}) {
    const formattedDate = useDate(date)
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <section className="post">
            {!isLoaded && <img src="/images/loading.svg" className="loading-image" alt="Зареждане" />}

            <img src={imageUrl} alt={title} onLoad={() => setIsLoaded(true)} style={{ display: isLoaded ? 'block' : 'none' }} />

            <div className="content">
                <h3>{title}</h3>
                <p>{presentation}</p>
                <span className="post-date">{formattedDate}</span>
            </div>
            
            <Link to={`/blogs/${id}/details`} className="btn" title="Прочети повече">Прочети</Link>
        </section>
    )
}