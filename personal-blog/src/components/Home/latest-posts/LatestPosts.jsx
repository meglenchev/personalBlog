import { endPoints } from "../../../utils/endpoints.js";
import { useFetch } from "../../hooks/useFetch.js"
import { Post } from "./Post.jsx";

export function LatestPosts() {
    const { data, isPanding } = useFetch(endPoints.latestBlogs, []);

    return (
        <article className="latest-posts">
            <h2>Последни публикации</h2>
            <div className="posts-container">
                {isPanding
                    ? <h3 className="no-articles" style={{ color: 'red' }}>Зарежда...</h3>
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