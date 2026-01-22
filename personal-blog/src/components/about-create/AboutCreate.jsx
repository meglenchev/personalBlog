import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useRequest } from "../../hooks/useRequest.js";
import { endPoints } from "../../utils/endpoints.js";
import { uploadImage } from "../../hooks/uploadImage.js";
import { useForm } from "../../hooks/useForm.js";
import UserContext from "../../context/UserContext.jsx";

const initialSettingsValues = {
    slogan: '',
    aboutImage: '',
    summary: '',
    info: ''
}

export function AboutCreate({ mode }) {

    const { isAdmin } = useContext(UserContext);

    const { request } = useRequest();

    const navigate = useNavigate();

    const [isPendingUpload, setIsPendingUpload] = useState(false);

    const [errors, setErrors] = useState({});

    const [serverError, setServerError] = useState('');

    const isEditMode = mode === 'edit';

    useEffect(() => {
        if (!isAdmin) {
            navigate('/');
        }
    }, [isAdmin, navigate]);

    function validate(values) {
        let newErrors = {};

        if (!values.slogan) {
            newErrors.slogan = 'Полето е задължително!';
        }

        const noImage = isEditMode
            ? !values.aboutImage
            : (!(values.aboutImage instanceof FileList) && !(values.aboutImage instanceof File));

        if (noImage) {
            newErrors.aboutImage = 'Снимката е задължителна!'
        };

        if (!values.summary) {
            newErrors.summary = 'Полето е задължително!';
        }

        if (!values.info) {
            newErrors.info = 'Полето е задължително!';
        }

        return newErrors;
    }

    const submitAboutHandler = async (formValues) => {
        const validationErrors = validate(formValues);
        
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsPendingUpload(true);

        try {
            setErrors({});

            setServerError('');

            const aboutData = formValues;

            if (aboutData.aboutImage instanceof FileList || aboutData.aboutImage instanceof File) {
                const fileToUpload = aboutData.aboutImage instanceof FileList
                    ? aboutData.aboutImage[0]
                    : aboutData.aboutImage;
                aboutData.aboutImage = await uploadImage(fileToUpload);
            }

            await request(endPoints.aboutEdit, 'PUT', aboutData);

            navigate('/about', { replace: true });
        } catch (err) {
            setServerError(`Възникна грешка, моля опитайте отново!`);
        } finally {
            setIsPendingUpload(false);
        }
    }

    const { 
        inputPropertiesRegister, 
        filePropertiesRegister, 
        setFormValues,
        formAction } = useForm(submitAboutHandler, initialSettingsValues);

    useEffect(() => {
        document.title = isEditMode ? 'Редактиране на информация за автора' : 'Създаване на информация за автора';
        
        if (!isEditMode) {
            return;
        }

        const abortController = new AbortController();

        request(endPoints.about, 'GET', null, abortController.signal)
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
    }, [isEditMode, navigate, isAdmin]);

    return (
        <article className="register-container">
            <form onSubmit={formAction}>
                <h2>{isEditMode ? 'Редактиране на информация за автора' : 'Създаване на информация за автора'}</h2>

                {serverError && <div className="errors">{serverError}</div>}

                <div className="form-group">
                    <label htmlFor="slogan">Слоган: {errors.slogan && <span className="error-text">{errors.slogan}</span>}</label>
                    <input
                        type="text"
                        id="slogan"
                        {...inputPropertiesRegister('slogan')}
                        className={errors.slogan && 'input-error'}
                    />
                </div>

                <div className="form-group-wrap two">
                    <div className="form-group">
                        <label htmlFor="aboutImage">Снимка за "хедъра": {errors.aboutImage && <span className="error-text">{errors.aboutImage}</span>}</label>
                        <input
                            type="file"
                            id="aboutImage"
                            {...filePropertiesRegister('aboutImage')}
                            accept="image/*"
                            className={errors.aboutImage && 'input-error'}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="summary">Резюме: {errors.summary && <span className="error-text">{errors.summary}</span>}</label>
                    <textarea
                        id="summary"
                        {...inputPropertiesRegister('summary')}
                        rows="3"
                        className={errors.summary && 'input-error'}
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="info">Подробна информация: {errors.info && <span className="error-text">{errors.info}</span>}</label>
                    <textarea
                        id="info"
                        {...inputPropertiesRegister('info')}
                        rows="8"
                        className={errors.info && 'input-error'}
                    ></textarea>
                </div>

                {isPendingUpload
                    ? <div className="loader"><img src="/images/loading.svg" alt="Зареждане" /></div>
                    : <button type="submit" className="btn btn-settings">{mode === 'edit' ? 'Редактирай' : 'Запази'}</button>
                }
            </form>
        </article>
    )
}