import { useRequest } from "../hooks/useRequest.js";
import { endPoints } from "../../utils/endpoints.js";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { uploadImage } from "../hooks/uploadImage.js";
import { useForm } from "../hooks/useForm.js";

const initialBlogValues = {
    title: '',
    imageUrl: '',
    presentation: '',
    content: ''
}

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

    useEffect(() => {
        document.title = 'Добави блог';
    }, []);

    const submitBlogPostHandler = async (formValues) => {

        const errors = validate(formValues);

        if (Object.keys(errors).length > 0) {
            return alert(Object.values(errors).at(0));;
        }

        const blogData = { ...formValues };

        setIsPending(true);

        try {
            if (blogData.imageUrl instanceof File) {
                blogData.imageUrl = await uploadImage(blogData.imageUrl);
            }

            await request(endPoints.postBlog, 'POST', blogData);

            setIsPending(false);

            navigate('/blogs');
        } catch (err) {
            setIsPending(false);

            alert(`Неуспешно създаване на публикация: ${err.message}`);
        }
    }

    const { inputPropertiesRegister, filePropertiesRegister, formAction } = useForm(submitBlogPostHandler, initialBlogValues);

    return (
        <article className="create-blog-post-container">
            <img src="/images/create-blog-post-img.jpg" alt="" />
            <form onSubmit={formAction}>
                <h2>Създай публикация в блога</h2>
                <div className="form-group">
                    <label htmlFor="title">Заглавие:</label>
                    <input
                        type="text"
                        id="title"
                        {...inputPropertiesRegister('title')}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="image">Снимка:</label>
                    <input
                        type="file"
                        id="imageUrl"
                        {...filePropertiesRegister('imageUrl')}
                        accept="image/*"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="presentation">Презентация:</label>
                    <textarea
                        id="presentation"
                        {...inputPropertiesRegister('presentation')}
                        rows="3"
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="content">Съдържание:</label>
                    <textarea
                        id="content"
                        {...inputPropertiesRegister('content')}
                        rows="8"
                    ></textarea>
                </div>
                {isPending
                    ? <div className="loader"><img src="/images/loading.svg" alt="Зареждане" /></div>
                    : <button type="submit" className="btn btn-register">Създай</button>
                }
            </form>
        </article>
    )
}