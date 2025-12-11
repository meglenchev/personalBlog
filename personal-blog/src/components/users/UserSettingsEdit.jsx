import { useContext, useEffect, useState } from "react";
import { useForm } from "../hooks/useForm.js";
import { useRequest } from "../hooks/useRequest.js";
import { endPoints } from "../../utils/endpoints.js";
import UserContext from "../../context/UserContext.jsx";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase.js";
import { useNavigate } from "react-router";

const initialSettingsValues = {
    name: '',
    email: '',
    shortInfo: '',
    facebook: '',
    instagram: '',
    headerImage: '',
    authorImage: ''
}

function validate(values) {
    let errors = {};

    if (!values.name) {
        errors['name'] = 'Името е задължително!';
    }

    if (!values.email) {
        errors['email'] = 'Имейла е задължителен!';
    }

    if (!values.shortInfo) {
        errors['shortInfo'] = 'Кратката презентация е задължителна!';
    }

    if (!values.facebook) {
        errors['facebook'] = 'Връзката за Facebook е задължителна!';
    }

    if (!values.instagram) {
        errors['instagram'] = 'Връзката за Instagram е задължителна!';
    }

    return errors;
}

const uploadImage = async (imageFile) => {
    const imageRef = ref(storage, `images/${imageFile.name}`);
    const snapshot = await uploadBytes(imageRef, imageFile);
    return await getDownloadURL(snapshot.ref);
};

export function UserSettingsEdit() {
    const { settingsId } = useContext(UserContext);

    const { request } = useRequest();

    const navigate = useNavigate();

    const [isPending, setIsPending] = useState(false);

    const submitEditHandler = async (formValues) => {

        const errors = validate(formValues);

        if (Object.keys(errors).length > 0) {
            return alert(Object.values(errors).at(0));
        }

        const settingsData = { ...formValues };

        setIsPending(true);

        try {
            if (settingsData.headerImage instanceof File) {
                settingsData.headerImage = await uploadImage(settingsData.headerImage);
            }

            if (settingsData.authorImage instanceof File) {
                settingsData.authorImage = await uploadImage(settingsData.authorImage);
            }

            await request(endPoints.homeSettings(settingsId), 'PUT', settingsData);
            
            setIsPending(false);

            navigate('/');

        } catch (err) {
            alert(`Грешка при записване на настройките: ${err.message}`);
        }
    }

    const { inputPropertiesRegister, filePropertiesRegister, setFormValues, formAction } = useForm(submitEditHandler, initialSettingsValues);

    useEffect(() => {
        if (!settingsId) {
            return
        };

        const abortController = new AbortController();

        request(endPoints.homeSettings(settingsId), 'GET', null, abortController.signal)
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
    }, [request, settingsId, setFormValues]);

    return (
        <article className="register-container">
            <img src="/images/register-img.jpg" alt="Регистрация" />
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
                </div>

                <div className="form-group">
                    <label htmlFor="shortInfo">Кратка презентация:</label>
                    <textarea
                        id="shortInfo"
                        {...inputPropertiesRegister('shortInfo')}
                        rows="5"
                    ></textarea>
                </div>

                <div className="form-group-wrap">
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


                {isPending
                    ? <div className="loader"><img src="/images/loading.svg" alt="Зареждане" /></div>
                    : <button type="submit" className="btn btn-register">Запази промените</button>
                }
            </form>
        </article>
    )
}