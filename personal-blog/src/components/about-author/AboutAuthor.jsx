import { endPoints } from "../../utils/endpoints.js";
import { useFetch } from "../hooks/useFetch.js";

export function AboutAuthor() {
    const { data, isPending } = useFetch(endPoints.authorInfo, []);
    const authorData = data.at(0);

    return (
        <article className="about-author">
            {isPending
                ? <div className="loader"><img src="/images/loading.svg" alt="" /></div>
                : data.length > 0
                    ? <>
                        <img src={authorData.imageUrl} alt={authorData.name} />
                        <h2>За автора</h2>
                        <blockquote>{authorData.slogan}</blockquote>
                        <p>{authorData.info}</p>
                    </> 
                    : <p className="no-articles">Няма добавена информация!</p>
            }
        </article>
    )
}