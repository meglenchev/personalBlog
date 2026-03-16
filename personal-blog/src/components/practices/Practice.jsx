import { useState } from "react";
import { Link } from "react-router";

export function Practice({
    id,
    title,
    imageUrl,
    presentation
}) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <section className="post">
            {!isLoaded && <img src="/images/loading.svg" className="loading-image" alt="Зареждане" />}

            <img src={imageUrl} alt={title} onLoad={() => setIsLoaded(true)} style={{ display: isLoaded ? 'block' : 'none' }} />

            <Link to={`/practices/${id}/details`} className="btn" title="Научи повече">Научи повече</Link>
            
            <div className="content">
                <h3>{title}</h3>
                <p>{presentation}</p>
            </div>
        </section>
    )
}