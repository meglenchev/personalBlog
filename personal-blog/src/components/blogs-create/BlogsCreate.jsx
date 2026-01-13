import { useNavigate, useParams } from "react-router"
import { endPoints } from "../../utils/endpoints.js";
import { useForm } from "../../hooks/useForm.js";
import { useContext, useEffect, useMemo, useState } from "react";
import { useRequest } from "../../hooks/useRequest.js";
import { uploadImage } from "../../hooks/uploadImage.js";
import UserContext from "../../context/UserContext.jsx";


const initialBlogValues = {
    title: '',
    imageUrl: '',
    category: '',
    presentation: '',
    content: ''
}

export function BlogsCreate({ mode }) {
    const { blogId } = useParams();

    const { request } = useRequest();

    const navigate = useNavigate();

    const [isPending, setIsPending] = useState(false);

    const { user } = useContext(UserContext);

    const isEditMode = mode === 'edit';

    const config = useMemo(() => ({
        method: isEditMode ? 'PUT' : 'POST',
        url: isEditMode ? endPoints.blogEdit(blogId) : endPoints.postBlog,
        navigateTo: isEditMode ? `/blogs/${blogId}/details` : '/blogs',
        errMsg: isEditMode ? 'Неуспешно редактиране на блог' : 'Неуспешно създаване на блог'
    }), [isEditMode, blogId]);

    function validate(values) {
        if (!values.title) {
            return 'Заглавието е задължително!'
        }

        const noImage = isEditMode
            ? !values.imageUrl
            : (!(values.imageUrl instanceof FileList) && !(values.imageUrl instanceof File));

        if (noImage) { 
            return 'Снимката е задължителна!' 
        };

        if (!values.category) {
            return 'Категорията е задължителна!'
        }

        if (!values.presentation) {
            return 'Кратката презентация е задължителна!'
        }

        if (!values.content) {
            return 'Съдържанието е задължително!'
        }

        return null;
    }

    const submitHandler = async (formValues) => {
        const errors = validate(formValues);

        if (errors) {
            alert(errors);
            return;
        }

        setIsPending(true);

        try {
            const blogData = { ...formValues };

            if (blogData.imageUrl instanceof FileList || blogData.imageUrl instanceof File) {
                const fileToUpload = blogData.imageUrl instanceof FileList
                    ? blogData.imageUrl[0]
                    : blogData.imageUrl;
                blogData.imageUrl = await uploadImage(fileToUpload);
            }

            await request(config.url, config.method, blogData);

            navigate(config.navigateTo);
        } catch (err) {
            alert(`${config.errMsg}: ${err.message}`);
        } finally {
            setIsPending(false);
        }
    }

    const { 
        inputPropertiesRegister, 
        filePropertiesRegister, 
        setFormValues, 
        formAction } = useForm(submitHandler, initialBlogValues);

    useEffect(() => {
        document.title = isEditMode ? 'Редактирай блог' : 'Добави блог';

        if (!isEditMode) {
            return;
        }

        const abortController = new AbortController();

        request(endPoints.blogDetails(blogId), 'GET', null, abortController.signal)
            .then(result => {
                if (user?._id && result._ownerId && user._id !== result._ownerId) {
                    return navigate('/');
                }

                setFormValues(result);
            })
            .catch(err => {
                if (err.name !== 'AbortError') {
                    alert(`Неуспешно зареждане: ${err.message}`);
                }
            })

        return () => {
            abortController.abort();
        }
    }, [blogId, isEditMode, navigate, user._id]);

    return (
        <article className="create-blog-post-container">
            <img src="/images/create-blog-post-img.jpg" alt="Background" />
            <form onSubmit={formAction}>
                <h2>{mode === 'edit' ? 'Редактирай публикацията' : 'Създай нова публикация'}</h2>
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
                    <label htmlFor="category">Категория:</label>
                    <input
                        type="text"
                        id="category"
                        {...inputPropertiesRegister('category')}
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
                    : <button type="submit" className="btn btn-register">{mode === 'edit' ? 'Редактирай' : 'Създай публикация'}</button>
                }
            </form>
        </article>
    )
}