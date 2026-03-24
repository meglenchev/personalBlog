import { useEffect, useRef } from "react";
import { endPoints } from "../../utils/endpoints.js";
import { Practice } from "./Practice.jsx";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll.js";

export function Practices() {
    const { items, loading, hasMore, loadMore } = useInfiniteScroll(endPoints.allPractices, 6);

    const observerTarget = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    loadMore();
                }
            }, { threshold: 0.1 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => observer.disconnect();
    }, [hasMore, loading, loadMore]);

    useEffect(() => {
        document.title = 'Практики';
    }, []);

    return (
        <article className="latest-posts upcoming-practices">
            <h2>Практики</h2>

            <div className={items.length > 0 ? "posts-container" : "posts-container center"}>
                {items.length > 0 && (items.map(practice => <Practice
                    key={practice._id}
                    id={practice._id}
                    title={practice.title}
                    imageUrl={practice.imageUrl}
                    presentation={practice.presentation}
                />))
                }
            </div>

            <div ref={observerTarget} className="observer-target">
                {loading && <div className="loader"><img src="/images/loading.svg" alt="Зареждане" /></div>}
            </div>

            {!loading && items.length === 0 && <p className="no-articles">Няма добавени практики!</p>}
        </article>
    )
}