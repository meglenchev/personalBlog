import { useFetch } from "../../hooks/useFetch.js";
import { endPoints } from "../../../utils/endpoints.js";
import { Practice } from "../../practices/Practice.jsx";

export function LatestPractices() {
    const { data, isPending } = useFetch(endPoints.latestPractices, []);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startOfTodayTimestamp = today.getTime();

    let currentPractice = [];

    if (!isPending && data?.length > 0) {
        currentPractice = data.filter(practice => {
            const practiceDateObj = new Date(practice.date);

            practiceDateObj.setHours(0, 0, 0, 0);

            const practiceTimestamp = practiceDateObj.getTime();

            return practiceTimestamp >= startOfTodayTimestamp;
        });
    }

    return (
        <article className="latest-posts upcoming-practices">
            <h2>Предстоящи практики</h2>

            <div className="posts-container">
                {isPending
                    ? <div className="loader"><img src="/images/loading.svg" alt="Зареждане" /></div>
                    : currentPractice.length > 0
                        ? (currentPractice.map(practice => <Practice
                            key={practice._id}
                            id={practice._id}
                            title={practice.title}
                            imageUrl={practice.imageUrl}
                            presentation={practice.presentation}
                        />))
                        : <p className="no-articles mb-40">Няма добавени практики!</p>
                }
            </div>
        </article>
    )
}