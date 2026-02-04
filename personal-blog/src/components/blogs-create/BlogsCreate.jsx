import { useNavigate, useParams } from "react-router"
import { endPoints } from "../../utils/endpoints.js";
import { useForm } from "../../hooks/useForm.js";
import { useContext, useEffect, useMemo, useState } from "react";
import { useRequest } from "../../hooks/useRequest.js";
import { uploadImage } from "../../hooks/uploadImage.js";
import UserContext from "../../context/UserContext.jsx";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';


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

    const [quillContent, setQuillContent] = useState('');

    const quillModules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link'],
            ['clean']
        ]
    };

    const quillFormats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list',
        'link',
    ];

    const config = useMemo(() => ({
        method: isEditMode ? 'PUT' : 'POST',
        url: isEditMode ? endPoints.blogEdit(blogId) : endPoints.postBlog,
        navigateTo: isEditMode ? `/blogs/${blogId}/details` : '/blogs',
        errMsg: isEditMode ? 'Неуспешно редактиране на блог' : 'Неуспешно създаване на блог'
    }), [isEditMode, blogId]);

    function validate(values) {
        let newErrors = {};

        if (!values.title.trim()) {
            newErrors.title = 'Полето е задължително!'
        }

        const noImage = isEditMode
            ? !values.imageUrl
            : (!(values.imageUrl instanceof FileList) && !(values.imageUrl instanceof File));

        if (noImage) {
            newErrors.imageUrl = 'Снимката е задължителна!'
        };

        if (!values.category.trim()) {
            newErrors.category = 'Полето е задължително!'
        }

        if (!values.presentation.trim()) {
            newErrors.presentation = 'Полето е задължително!'
        }

        if (!values.content.trim()) {
            newErrors.content = 'Полето е задължително!'
        }

        return newErrors;
    }

    const handleQuillChange = (value) => {
        setQuillContent(value);
        setFormValues(prev => ({ ...prev, content: value }));
    };

    const submitHandler = async (formValues) => {
        const validationErrors = validate({ ...formValues, content: quillContent });

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsPending(true);

        try {
            setErrors({});

            setServerError('');

            const blogData = {
                ...formValues,
                content: quillContent
            };

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
        if (isEditMode && formValues.content) {
            setQuillContent(formValues.content);
        }
    }, [formValues.content, isEditMode]);

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

                {serverError && <div className="errors">{serverError}</div>}

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
                        value={quillContent}
                        onChange={handleQuillChange}
                        modules={quillModules}
                        formats={quillFormats}
                        placeholder="Добави съдържанието тук..."
                        className={errors.content ? 'input-error' : ''}
                    />
                </div>
                {isPending
                    ? <div className="loader"><img src="/images/loading.svg" alt="Зареждане" /></div>
                    : <button type="submit" className="btn btn-register">{mode === 'edit' ? 'Редактирай' : 'Създай публикация'}</button>
                }
            </form>
        </article>
    )
}