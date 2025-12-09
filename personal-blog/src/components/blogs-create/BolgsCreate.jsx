import { storage } from "../../firebase.js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { useRequest } from "../hooks/useRequest.js";
import { endPoints } from "../../utils/endpoints.js";
import { useNavigate } from "react-router";
import { useState } from "react";

function validate(values) {
    let errors = {};

    if (!values.title) {
        errors['title'] = 'Заглавието е задължително!';
    }

    if (!(values.imageUrl instanceof File) || values.imageUrl.size === 0) {
        errors['imageUrl'] = 'Снимката е задължителна!';
    }

    if (!values.presentation) {
        errors['presentation'] = 'Кратката презентация е задължителна!';
    }

    if (!values.content) {
        errors['content'] = 'Съдържанието е задължително!';
    }

    return errors;
}

export function BlogsCreate() {
    const { request } = useRequest();
    const navigate = useNavigate();
    const [isPending, setIsPending] = useState(false);

    const submitBlogPostHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        
        const formDataEntries = Object.fromEntries(formData);

        const errors = validate(formDataEntries);

        if (Object.keys(errors).length > 0) {
            return alert(Object.values(errors).at(0));;
        }

        const { imageUrl, ...blogData } = formDataEntries;

        setIsPending(true);

        try {
            const imageRef = ref(storage, `images/${imageUrl.name}`);
            const snapshot = await uploadBytes(imageRef, imageUrl);
            const downloadURL = await getDownloadURL(snapshot.ref);
            blogData.imageUrl = downloadURL;
        } catch (err) {
            return alert(`Неуспешно качване на снимката: ${err.message}`);
        }

        try {
            await request(endPoints.postBlog, 'POST', blogData);

            setIsPending(false);

            navigate('/blogs');
        } catch (err) {
            setIsPending(false);

            alert(`Неуспешно създаване на публикация: ${err.message}`);
        }
    }

    return (
        <article className="create-blog-postntainer">
            <img src="/images/create-blog-post-img.jpg" alt="" />
            <form onSubmit={submitBlogPostHandler}>
                <h2>Създай публикация в блога</h2>
                <div className="form-group">
                    <label htmlFor="title">Заглавие:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
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
                        rows="3"
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="content">Съдържание:</label>
                    <textarea
                        id="content"
                        name="content"
                        rows="8"
                    ></textarea>
                </div>
                {isPending
                    ? <div className="loader"><img src="/images/loading.svg" alt="" /></div>
                    : <button type="submit" className="btn btn-register">Създай</button>
                }
            </form>
        </article>
    )
}