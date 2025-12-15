import { useNavigate, useParams } from "react-router"
import { endPoints } from "../../utils/endpoints.js";
import { useForm } from "../../hooks/useForm.js";
import { useEffect, useState } from "react";
import { useRequest } from "../../hooks/useRequest.js";
import { uploadImage } from "../../hooks/uploadImage.js";


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

    if (!values.presentation) {
        errors['presentation'] = 'Кратката презентация е задължителна!';
    }

    if (!values.content) {
        errors['content'] = 'Съдържанието е задължително!';
    }

    return errors;
}

export function BlogsEdit() {
    const { blogId } = useParams();
    const { request } = useRequest();
    const navigate = useNavigate();
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        document.title = 'Редакция на блога';
    }, []);

    const submitEditHandler = async (formValues) => {
        const errors = validate(formValues);

        if (Object.keys(errors).length > 0) {
            return alert(Object.values(errors).at(0));
        }

        const blogData = { ...formValues };

        setIsPending(true);

        try {
            if (blogData.imageUrl instanceof File) {
                blogData.imageUrl = await uploadImage(blogData.imageUrl);
            }

            await request(endPoints.blogDetails(blogId), 'PUT', blogData);

            setIsPending(false);

            navigate(`/blogs/${blogId}/details`);
        } catch (err) {
            setIsPending(false);

            alert(`Неуспешно редактиране на публикация: ${err.message}`);
        }
    }

    const { inputPropertiesRegister, filePropertiesRegister, setFormValues, formAction } = useForm(submitEditHandler, initialBlogValues);

    useEffect(() => {
        const abortController = new AbortController();

        request(endPoints.blogDetails(blogId), 'GET', null, abortController.signal)
            .then(result => {
                setFormValues(result);
            })
            .catch(err => {
                if (err.name !== 'AbortError') {
                    alert(`Неуспешно зареждане на информацията: ${err.message}`);
                }
            })

        return () => {
            abortController.abort();
        }
    }, [request, blogId, setFormValues]);

    return (
        <article className="create-blog-post-container">
            <img src="/images/create-blog-post-img.jpg" />
            <form onSubmit={formAction}>
                <h2>Редактирай публикацията</h2>
                <div className="form-group">
                    <label htmlFor="title">Заглавие:</label>
                    <input
                        type="text"
                        id="title"
                        {...inputPropertiesRegister('title')}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="imageUrl">Снимка:</label>
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
                    : <button type="submit" className="btn btn-register">Редактирай</button>
                }
            </form>
        </article>
    )
}