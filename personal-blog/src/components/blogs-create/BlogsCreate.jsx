import { useNavigate, useParams } from "react-router"
import { endPoints } from "../../utils/endpoints.js";
import { useForm } from "../../hooks/useForm.js";
import { useContext, useEffect, useMemo, useState } from "react";
import { useRequest } from "../../hooks/useRequest.js";
import { uploadImage } from "../../hooks/uploadImage.js";
import UserContext from "../../context/UserContext.jsx";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { quillModules, quillFormats } from "../../utils/quillConfig.js";

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

    const { user, userRoles, isAdmin } = useContext(UserContext);

    const [errors, setErrors] = useState({});

    const [serverError, setServerError] = useState('');

    const isEditMode = mode === 'edit';

    const config = useMemo(() => ({
        method: isEditMode ? 'PUT' : 'POST',
        url: isEditMode ? endPoints.blogEdit(blogId) : endPoints.postBlog,
        navigateTo: isEditMode ? `/blogs/${blogId}/details` : '/blogs',
        errMsg: isEditMode ? 'Неуспешно редактиране на блог' : 'Неуспешно създаване на блог'
    }), [isEditMode, blogId]);

    function validate(values) {
        let newErrors = {};
        const MAX_FILE_SIZE = 1024 * 1024; // 1MB

        const requiredFields = ['title', 'category', 'presentation', 'content'];

        requiredFields.forEach(field => {
            if (!values[field]?.trim()) {
                newErrors[field] = 'Полето е задължително!';
            }
        });

        const noImage = isEditMode
            ? !values.imageUrl
            : (!(values.imageUrl instanceof FileList) && !(values.imageUrl instanceof File));

        if (noImage) {
            newErrors.imageUrl = 'Снимката е задължителна!'
        } else if (values.imageUrl instanceof File && values.imageUrl.size > MAX_FILE_SIZE) {
            newErrors.imageUrl = 'Снимката не трябва да надвишава 1MB!';
        }

        return newErrors;
    }

    const handleQuillChange = (value) => {
        const cleanValue = value === '<p><br></p>' || value === '<p></p>' ? '' : value;
        setFormValues(prev => ({ ...prev, content: cleanValue }));
    };

    const submitHandler = async (formValues) => {
        const validationErrors = validate(formValues);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsPending(true);

        try {
            setErrors({});

            setServerError('');

            const blogData = {...formValues};

            if (blogData.imageUrl instanceof FileList || blogData.imageUrl instanceof File) {
                const fileToUpload = blogData.imageUrl instanceof FileList
                    ? blogData.imageUrl[0]
                    : blogData.imageUrl;
                blogData.imageUrl = await uploadImage(fileToUpload);
            }

            await request(config.url, config.method, blogData);

            navigate(config.navigateTo, { replace: true });
        } catch (err) {
            setServerError(config.errMsg);
        } finally {
            setIsPending(false);
        }
    }

    const {
        inputPropertiesRegister,
        filePropertiesRegister,
        setFormValues,
        formValues,
        formAction } = useForm(submitHandler, initialBlogValues);

    useEffect(() => {
        document.title = isEditMode ? 'Редактирай блог' : 'Добави блог';

        if (!isEditMode) {
            return;
        }

        const abortController = new AbortController();

        request(endPoints.blogDetails(blogId), 'GET', null, abortController.signal)
            .then(result => {
                if (!result || Object.keys(result).length === 0) {
                    return;
                }

                const isOwner = String(user?._id) === String(result.owner);
                const hasAccess = isOwner || isAdmin || userRoles === 'moderator';

                if (!hasAccess) {
                    return navigate('/');
                }

                setFormValues(result);
            })
            .catch(err => {
                if (err.name !== 'AbortError') {
                    setServerError(`Неуспешно зареждане: ${err.message}`);
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
                    <label htmlFor="title">Заглавие: {errors.title && <span className="error-text">{errors.title}</span>}</label>
                    <input
                        type="text"
                        id="title"
                        {...inputPropertiesRegister('title')}
                        className={errors.title && 'input-error'}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="imageUrl">Снимка: {errors.imageUrl && <span className="error-text">{errors.imageUrl}</span>}</label>
                    <input
                        type="file"
                        id="imageUrl"
                        {...filePropertiesRegister('imageUrl')}
                        accept="image/*"
                        className={errors.imageUrl && 'input-error'}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="category">Категория: {errors.category && <span className="error-text">{errors.category}</span>}</label>
                    <input
                        type="text"
                        id="category"
                        {...inputPropertiesRegister('category')}
                        className={errors.category && 'input-error'}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="presentation">Презентация: {errors.presentation && <span className="error-text">{errors.presentation}</span>}</label>
                    <textarea
                        id="presentation"
                        {...inputPropertiesRegister('presentation')}
                        rows="3"
                        className={errors.presentation && 'input-error'}
                    ></textarea>
                </div>

                <div className="form-group">
                    <label>Съдържание: {errors.content && <span className="error-text">{errors.content}</span>}</label>

                    <ReactQuill
                        theme="snow"
                        value={formValues.content}
                        onChange={handleQuillChange}
                        modules={quillModules}
                        formats={quillFormats}
                        placeholder="Добави съдържанието тук..."
                        className={errors.content ? 'input-error' : ''}
                    />
                </div>

                {serverError && <div className="errors">{serverError}</div>}

                {isPending
                    ? <div className="loader"><img src="/images/loading.svg" alt="Зареждане" /></div>
                    : <button type="submit" className="btn btn-register">{mode === 'edit' ? 'Редактирай' : 'Създай публикация'}</button>
                }
            </form>
        </article>
    )
}