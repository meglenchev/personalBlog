import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useRequest } from "../../hooks/useRequest.js";
import { endPoints } from "../../utils/endpoints.js";
import UserContext from "../../context/UserContext.jsx";
import { uploadImage } from "../../hooks/uploadImage.js";
import { useForm } from "../../hooks/useForm.js";
import { useFetch } from "../../hooks/useFetch.js";

const initialSettingsValues = {
    name: '',
    email: '',
    facebook: '',
    instagram: '',
    shortInfo: '',
    headerImage: '',
    authorImage: '',
}

export function UserSettings({ mode }) {

    const { isAdmin } = useContext(UserContext)

    const { request } = useRequest();

    const navigate = useNavigate();

    const [isPendingUpload, setIsPendingUpload] = useState(false);

    const isEditMode = mode === 'edit';

    useEffect(() => {
        if (!isAdmin) {
            navigate('/');
        }
    }, [isAdmin, navigate]);


    function validate(values) {
        if (!values.name) {
            return 'Името е задължително!';
        }

        if (!values.email) {
            return 'Имейла е задължителен!';
        }

        if (!values.facebook) {
            return 'Връзката за Facebook е задължителна!';
        }

        if (!values.instagram) {
            return 'Връзката за Instagram е задължителна!';
        }

        if (!values.presentation) {
            return 'Кратка презентация е задължителна!';
        }

        const noHeaderImage = isEditMode
            ? !values.headerImg
            : (!(values.headerImg instanceof FileList) && !(values.headerImg instanceof File));

        if (noHeaderImage) {
            return 'Снимка за "хедъра" е задължителна!'
        };

        const noAuthorImage = isEditMode
            ? !values.authorImg
            : (!(values.authorImg instanceof FileList) && !(values.authorImg instanceof File));

        if (noAuthorImage) {
            return 'Снимка на автора е задължителна!'
        };

        return null;
    }

    const submitSettingsHandler = async (formValues) => {
        const errors = validate(formValues);

        if (errors) {
            alert(errors);
            return;
        }

        setIsPendingUpload(true);

        try {
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
                processImage('headerImg'),
                processImage('authorImg')
            ]);

            await request(endPoints.settingsEdit, 'PUT', settingsData);
            
            navigate('/', { replace: true });
        } catch (err) {
            alert(`Възникна грешка: ${err.message}`);
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
        document.title = isEditMode ? 'Редакция на настройките за проекта' : 'Създай настройки за проекта';

        if (!isEditMode) {
            return;
        }

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
                    alert(`Неуспешно зареждане: ${err.message}`);
                }
            });
        return () => {
            abortController.abort();
        }
    }, [isEditMode, navigate, isAdmin]);

    return (
        <article className="register-container">
            <form onSubmit={formAction}>
                <h2>Настройки на страницата</h2>
                <div className="form-group-wrap">
                    <div className="form-group">
                        <label htmlFor="name">Име:</label>
                        <input
                            type="text"
                            id="name"
                            {...inputPropertiesRegister('name')}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Имейл:</label>
                        <input
                            type="text"
                            id="email"
                            {...inputPropertiesRegister('email')}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="facebook">Facebook връзка:</label>
                        <input
                            type="text"
                            id="facebook"
                            {...inputPropertiesRegister('facebook')}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="instagram">Instagram връзка:</label>
                        <input
                            type="text"
                            id="instagram"
                            {...inputPropertiesRegister('instagram')}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="presentation">Кратка презентация за началната страница:</label>
                    <textarea
                        id="presentation"
                        {...inputPropertiesRegister('presentation')}
                        rows="3"
                    ></textarea>
                </div>

                <div className="form-group-wrap two">
                    <div className="form-group">
                        <label htmlFor="headerImg">Снимка за "хедъра" на начална страница:</label>
                        <input
                            type="file"
                            id="headerImg"
                            {...filePropertiesRegister('headerImg')}
                            accept="image/*"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="authorImg">Снимка на автора за начална страница:</label>
                        <input
                            type="file"
                            id="authorImg"
                            {...filePropertiesRegister('authorImg')}
                            accept="image/*"
                        />
                    </div>
                </div>

                {isPendingUpload
                    ? <div className="loader"><img src="/images/loading.svg" alt="Зареждане" /></div>
                    : <button type="submit" className="btn btn-settings">Запази настройките</button>
                }
            </form>
        </article>
    )
}