import { useFetch } from "../../../hooks/useFetch.js";
import { endPoints } from "../../../utils/endpoints.js";
import { Blog } from "../../blogs/Blog.jsx";

export function LatestPosts() {
    const { data, isPending } = useFetch(endPoints.latestBlogs, []);

    return (
        <article className="latest-posts">
            <h2>Последни публикации</h2>
            <div className="posts-container">
                {isPending
                    ? <div className="loader"><img src="/images/loading.svg" alt="Зареждане" /></div>
                    : data.length > 0
                        ? (data.map(blog => <Blog
                            key={blog._id}
                            id={blog._id}
                            imageUrl={blog.imageUrl}
                            title={blog.title}
                            presentation={blog.presentation}
                            date={blog.createdAt}
                        />))

                        : <p className="no-articles mb-40">Няма добавени блог публикации!</p>
                }
            </div>
        </article>
    )
}