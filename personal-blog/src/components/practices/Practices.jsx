import { useEffect } from "react";
import { endPoints } from "../../utils/endpoints.js";
import { useFetch } from "../../hooks/useFetch.js";
import { Practice } from "./Practice.jsx";

export function Practices() {
    const { data, isPending } = useFetch(endPoints.allPractices, []);

    useEffect(() => {
        document.title = 'Практики';
    }, []);

    return (
        <article className="latest-posts upcoming-practices">
            <h2>Практики</h2>

            <div className={data.length > 0 ? "posts-container" : "posts-container center"}>
                {isPending
                    ? <div className="loader"><img src="/images/loading.svg" alt="Зареждане" /></div>
                    : data.length > 0
                        ? (data.map(practice => <Practice
                            key={practice._id}
                            id={practice._id}
                            title={practice.title}
                            imageUrl={practice.imageUrl}
                            presentation={practice.presentation}
                        />))
                        : <p className="no-articles">Няма добавени практики!</p>
                }
            </div>
        </article>
    )
}