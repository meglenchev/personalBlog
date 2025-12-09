import { useParams } from "react-router"

export function BlogsEdit() {
    const { blogId } = useParams();
    
    return (
        <article className="create-blog-postntainer">
            <img src="/images/create-blog-post-img.jpg" alt="" />
            <form>
                <h2>Редактирай публикацията</h2>
                <div className="form-group">
                    <label htmlFor="blogTitle">Заглавие:</label>
                    <input
                        type="text"
                        id="blogTitle"
                        name="blogTitle"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="image">Снимка:</label>
                    <input
                        type="file"
                        id="imageUrl"
                        name="imageUrl"
                        accept="image/*"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="presentation">Презентация:</label>
                    <textarea
                        id="presentation"
                        name="presentation"
                        rows="5"
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="content">Съдържание:</label>
                    <textarea
                        id="content"
                        name="content"
                        rows="10"
                    ></textarea>
                </div>
                {/* <div className="loader"><img src="/images/loading.svg" alt="" /></div> */}
                <button type="submit" className="btn btn-register">Редактирай</button>
            </form>
        </article>
    )
}