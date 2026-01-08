import { useEffect } from "react";
import { endPoints } from "../../utils/endpoints.js"
import { useFetch } from "../../hooks/useFetch.js"
import { Blog } from "./Blog.jsx";

export function Blogs() {
    const { data, isPending } = useFetch(endPoints.allBlogs, []);

    useEffect(() => {
        document.title = 'Блог';
    }, []);

    return (
        <article className="latest-posts">
            <h2>Публикации</h2>
            <div className={data.length > 0 ? "posts-container" : "posts-container center"}>
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

                        : <p className="no-articles">Няма добавени блог публикации!</p>
                }
            </div>
        </article>
    )
}