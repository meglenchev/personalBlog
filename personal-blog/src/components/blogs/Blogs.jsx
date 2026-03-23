import { useEffect, useRef } from "react";
import { endPoints } from "../../utils/endpoints.js"
import { Blog } from "./Blog.jsx";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll.js";

export function Blogs() {
    const { items, loading, hasMore, loadMore } = useInfiniteScroll(endPoints.allBlogs, 6);

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
        document.title = 'Блог';
    }, []);

    return (
        <article className="latest-posts">
            <h2>Публикации</h2>

            <div className={items.length > 0 ? "posts-container" : "posts-container center"}>
                {items.length > 0 && (items.map(blog => <Blog
                    key={blog._id}
                    id={blog._id}
                    imageUrl={blog.imageUrl}
                    title={blog.title}
                    presentation={blog.presentation}
                    date={blog.createdAt}
                />))}
            </div>

            <div ref={observerTarget} className="observer-target">
                {loading && <div className="loader"><img src="/images/loading.svg" alt="Зареждане" /></div>}
            </div>

            {!loading && items.length === 0 && <p className="no-articles">Няма добавени блог публикации!</p>}
        </article>
    )
}