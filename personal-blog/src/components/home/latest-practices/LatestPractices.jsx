import { useFetch } from "../../hooks/useFetch.js";
import { endPoints } from "../../../utils/endpoints.js";
import { Practice } from "../../practices/Practice.jsx";

export function LatestPractices() {
    const { data, isPending } = useFetch(endPoints.latestPractices, []);

    return (
        <article className="latest-posts upcoming-practices">
            <h2>Предстоящи практики</h2>

            <div className={data.length === 0 ? 'posts-container center' : 'posts-container'}>
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