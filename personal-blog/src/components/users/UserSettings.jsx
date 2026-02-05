import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useRequest } from "../../hooks/useRequest.js";
import { endPoints } from "../../utils/endpoints.js";
import UserContext from "../../context/UserContext.jsx";
import { uploadImage } from "../../hooks/uploadImage.js";
import { useForm } from "../../hooks/useForm.js";

const initialSettingsValues = {
    name: '',
    email: '',
    facebook: '',
    instagram: '',
    presentation: '',
    authorImage: '',
}

export function UserSettings() {

    const { isAdmin } = useContext(UserContext)

    const { request } = useRequest();

    const navigate = useNavigate();

    const [isPendingUpload, setIsPendingUpload] = useState(false);

    const [errors, setErrors] = useState({});

    const [serverError, setServerError] = useState('');

    useEffect(() => {
        if (!isAdmin) {
            navigate('/');
        }
    }, [isAdmin, navigate]);


    function validate(values) {
        let newErrors = {};
        const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

        const requiredFields = ['name', 'email', 'facebook', 'instagram', 'presentation'];

        requiredFields.forEach(field => {
            if (!values[field]?.trim()) {
                newErrors[field] = 'Полето е задължително!';
            }
        });

        const fileToUpload = values.authorImg instanceof FileList ? values.authorImg[0] : values.authorImg;

        const hasImage = fileToUpload instanceof File || (typeof fileToUpload === 'string' && fileToUpload.length > 0);

        if (!hasImage) {
            newErrors.authorImg = 'Снимката е задължителна!';
        } else if (fileToUpload instanceof File && fileToUpload.size > MAX_FILE_SIZE) {
            newErrors.authorImg = 'Снимката не трябва да надвишава 2MB!';
        }
        return newErrors;
    }

    const submitSettingsHandler = async (formValues) => {
        const validationErrors = validate(formValues);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsPendingUpload(true);

        try {
            setErrors({});

            setServerError('');

            const settingsData = { ...formValues };

            const processImage = async (field) => {
                const value = settingsData[field];
                if (value instanceof FileList || value instanceof File) {
                    const fileToUpload = value instanceof FileList ? value[0] : value;
                    if (fileToUpload) {
                        settingsData[field] = await uploadImage(fileToUpload);
                    }
                }
            };

            await Promise.all([
                processImage('authorImg')
            ]);

            await request(endPoints.settingsEdit, 'PUT', settingsData);

            navigate('/', { replace: true });
        } catch (err) {
            setServerError(`Възникна грешка. Моля опитайте отново!`);
        } finally {
            setIsPendingUpload(false)
        }
    }

    const {
        inputPropertiesRegister,
        filePropertiesRegister,
        setFormValues,
        formAction } = useForm(submitSettingsHandler, initialSettingsValues);

    useEffect(() => {
        document.title = 'Настройки за проекта';

        const abortController = new AbortController();

        request(endPoints.settingsEdit, 'GET', null, abortController.signal)
            .then(result => {
                if (!result || Object.keys(result).length === 0) {
                    return;
                }

                if (!isAdmin) {
                    return navigate('/');
                }

                setFormValues(result);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    setServerError(`Неуспешно зареждане. Моля опитайте отново!`);
                }
            });
        return () => {
            abortController.abort();
        }
    }, [navigate, isAdmin]);

    return (
        <article className="register-container">
            <form onSubmit={formAction}>
                <h2>Настройки на страницата</h2>

                <div className="form-group-wrap">
                    <div className="form-group">
                        <label htmlFor="name">Име: {errors.name && <span className="error-text">{errors.name}</span>}</label>
                        <input
                            type="text"
                            id="name"
                            {...inputPropertiesRegister('name')}
                            className={errors.name && 'input-error'}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Имейл: {errors.email && <span className="error-text">{errors.email}</span>}</label>
                        <input
                            type="text"
                            id="email"
                            {...inputPropertiesRegister('email')}
                            className={errors.email && 'input-error'}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="facebook">Facebook: {errors.facebook && <span className="error-text">{errors.facebook}</span>}</label>
                        <input
                            type="text"
                            id="facebook"
                            {...inputPropertiesRegister('facebook')}
                            className={errors.facebook && 'input-error'}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="instagram">Instagram: {errors.instagram && <span className="error-text">{errors.instagram}</span>}</label>
                        <input
                            type="text"
                            id="instagram"
                            {...inputPropertiesRegister('instagram')}
                            className={errors.instagram && 'input-error'}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="presentation">Кратка презентация за началната страница: {errors.presentation && <span className="error-text">{errors.presentation}</span>}</label>
                    <textarea
                        id="presentation"
                        {...inputPropertiesRegister('presentation')}
                        rows="3"
                        className={errors.presentation && 'input-error'}
                    ></textarea>
                </div>

                <div className="form-group-wrap two">
                    <div className="form-group">
                        <label htmlFor="authorImg">Снимка на автора за начална страница: {errors.authorImg && <span className="error-text">{errors.authorImg}</span>}</label>
                        <input
                            type="file"
                            id="authorImg"
                            {...filePropertiesRegister('authorImg')}
                            accept="image/*"
                            className={errors.authorImg && 'input-error'}
                        />
                    </div>
                </div>

                {serverError && <div className="errors">{serverError}</div>}

                {isPendingUpload
                    ? <div className="loader"><img src="/images/loading.svg" alt="Зареждане" /></div>
                    : <button type="submit" className="btn btn-settings">Запази настройките</button>
                }
            </form>
        </article>
    )
}