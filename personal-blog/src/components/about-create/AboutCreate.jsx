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

    const isEditMode = mode === 'edit';

    useEffect(() => {
        if (!isAdmin) {
            navigate('/');
        }
    }, [isAdmin, navigate]);

    function validate(values) {
        if (!values.slogan) {
            return 'Слоган е задължителен!';
        }

        const noImage = isEditMode
            ? !values.aboutImage
            : (!(values.aboutImage instanceof FileList) && !(values.aboutImage instanceof File));

        if (noImage) {
            return 'Снимка за "хедъра" е задължителна!'
        };

        if (!values.summary) {
            return 'Резюмето е задължително!';
        }

        if (!values.info) {
            return 'Подробната информация е задължителна!';
        }

        return null;
    }

    const submitAboutHandler = async (formValues) => {
        const errors = validate(formValues);

        if (errors) {
            alert(errors);
            return;
        }

        setIsPendingUpload(true);

        try {
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

            alert(`Възникна грешка: ${err.message}`);
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
                <h2>{isEditMode ? 'Редактиране на информация за автора' : 'Създаване на информация за автора'}</h2>
                <div className="form-group">
                    <label htmlFor="slogan">Слоган</label>
                    <input
                        type="text"
                        id="slogan"
                        {...inputPropertiesRegister('slogan')}
                    />
                </div>

                <div className="form-group-wrap two">
                    <div className="form-group">
                        <label htmlFor="aboutImage">Снимка за "хедъра":</label>
                        <input
                            type="file"
                            id="aboutImage"
                            {...filePropertiesRegister('aboutImage')}
                            accept="image/*"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="summary">Резюме:</label>
                    <textarea
                        id="summary"
                        {...inputPropertiesRegister('summary')}
                        rows="3"
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="info">Подробна информация:</label>
                    <textarea
                        id="info"
                        {...inputPropertiesRegister('info')}
                        rows="8"
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