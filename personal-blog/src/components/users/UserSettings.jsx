import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useRequest } from "../hooks/useRequest.js";
import { endPoints } from "../../utils/endpoints.js";
import UserContext from "../../context/UserContext.jsx";
import { uploadImage } from "../hooks/uploadImage.js";
import { useForm } from "../hooks/useForm.js";

const initialSettingsValues = {
    name: '',
    email: '',
    facebook: '',
    instagram: '',
    shortInfo: '',
    headerImage: '',
    authorImage: '',
    slogan: '',
    aboutImage: '',
    summary: '',
    info: ''
}

function validate(values) {
    let errors = {};

    if (!values.name) {
        errors['name'] = 'Името е задължително!';
    }

    if (!values.email) {
        errors['email'] = 'Имейла е задължителен!';
    }

    if (!values.facebook) {
        errors['facebook'] = 'Връзката за Facebook е задължителна!';
    }

    if (!values.instagram) {
        errors['instagram'] = 'Връзката за Instagram е задължителна!';
    }

    if (!values.shortInfo) {
        errors['shortInfo'] = 'Кратка презентация е задължителна!';
    }

    if (!(values.headerImage instanceof File) || values.headerImage.size === 0) {
        errors['headerImage'] = 'Снимка за "хедъра" на начална страница е задължителна!';
    }

    if (!(values.authorImage instanceof File) || values.authorImage.size === 0) {
        errors['authorImage'] = 'Снимка на автора за начална страница е задължителна!';
    }

    if (!values.slogan) {
        errors['slogan'] = 'Слоган е задължителен!';
    }

    if (!(values.aboutImage instanceof File) || values.aboutImage.size === 0) {
        errors['aboutImage'] = 'Снимка за "хедъра" е задължителна!';
    }

    if (!values.summary) {
        errors['summary'] = 'Резюмето е задължително!';
    }

    if (!values.info) {
        errors['info'] = 'Подробната информация е задължителна!';
    }

    return errors;
}

export function UserSettings() {
    const { request } = useRequest();
    const navigate = useNavigate();
    const [isPending, setIsPending] = useState(false);

    const { setSettingsIdHandler } = useContext(UserContext);

    useEffect(() => {
        document.title = 'Настройки на страницата';
    }, []);

    const submitSettingsHandler = async (formValues) => {
        const errors = validate(formValues);

        if (Object.keys(errors).length > 0) {
            return alert(Object.values(errors).at(0));;
        }

        const { headerImage, authorImage, aboutImage, ...settingsData } = formValues;

        setIsPending(true);

        try {
            const [headerImageUrl, authorImageUrl, aboutImageUrl] = await Promise.all([
                uploadImage(headerImage),
                uploadImage(authorImage),
                uploadImage(aboutImage)
            ]);

            if (headerImageUrl) {
                settingsData.headerImage = headerImageUrl
            };

            if (authorImageUrl) {
                settingsData.authorImage = authorImageUrl
            };

            if (aboutImageUrl) {
                settingsData.aboutImage = aboutImageUrl
            };

            const res = await request(endPoints.settings, 'POST', settingsData);

            const newId = res._id;

            setSettingsIdHandler(newId);

            setIsPending(false);

            navigate('/');
        } catch (err) {
            setIsPending(false);

            alert(`Възникна грешка: ${err.message}`);
        }
    }

    const { inputPropertiesRegister, filePropertiesRegister, formAction } = useForm(submitSettingsHandler, initialSettingsValues);

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
                    <label htmlFor="shortInfo">Кратка презентация за началната страница:</label>
                    <textarea
                        id="shortInfo"
                        {...inputPropertiesRegister('shortInfo')}
                        rows="3"
                    ></textarea>
                </div>

                <div className="form-group-wrap two">
                    <div className="form-group">
                        <label htmlFor="headerImage">Снимка за "хедъра" на начална страница:</label>
                        <input
                            type="file"
                            id="headerImage"
                            {...filePropertiesRegister('headerImage')}
                            accept="image/*"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="authorImage">Снимка на автора за начална страница:</label>
                        <input
                            type="file"
                            id="authorImage"
                            {...filePropertiesRegister('authorImage')}
                            accept="image/*"
                        />
                    </div>
                </div>

                <h2 className="middle">Информация за автора</h2>

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

                {isPending
                    ? <div className="loader"><img src="/images/loading.svg" alt="Зареждане" /></div>
                    : <button type="submit" className="btn btn-settings">Запази настройките</button>
                }
            </form>
        </article>
    )
}