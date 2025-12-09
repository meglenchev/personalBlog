import { endPoints } from "../../utils/endpoints.js"
import { useFetch } from "../hooks/useFetch.js"
import { Post } from "./Post.jsx";

export function Blogs() {
    const { data, isPending } = useFetch(endPoints.allBlogs, []);

    return (
        <article className="latest-posts">
            <h2>Публикации</h2>
            <div className={data.length === 0 ? 'posts-container center' : 'posts-container'}>
                {isPending
                    ? <div className="loader"><img src="/images/loading.svg" alt="" /></div>
                    : data.length > 0
                        ? (data.map(blog => <Post
                            key={blog._id}
                            id={blog._id}
                            imageUrl={blog.imageUrl}
                            title={blog.title}
                            presentation={blog.presentation}
                            date={blog._createdOn}
                        />))

                        : <p className="no-articles">Няма добавени блог публикации!</p>
                }
            </div>
        </article>
    )
}