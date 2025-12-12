import { useNavigate } from "react-router";
import { useRequest } from "../hooks/useRequest.js";
import { useState } from "react";
import { endPoints } from "../../utils/endpoints.js";
import { useForm } from "../hooks/useForm.js";
import { uploadImage } from "../hooks/uploadImage.js";

const initialPracticeValues = {
    title: '',
    imageUrl: '',
    presentation: '',
    content: '',
    date: ''
}

function validate(values) {
    let errors = {};

    if (!values.title) {
        errors['title'] = 'Заглавието е задължително!';
    }

    if (!(values.imageUrl instanceof File) || values.imageUrl.size === 0) {
        errors['imageUrl'] = 'Снимката е задължителна!';
    }

    if (!values.presentation) {
        errors['presentation'] = 'Кратката презентация е задължителна!';
    }

    if (!values.content) {
        errors['content'] = 'Съдържанието е задължително!';
    }

    if (!values.date) {
        errors['date'] = 'Датата е задължителна!';
    }

    return errors;
}

export function PracticesCreate() {
    const { request } = useRequest();
    const navigate = useNavigate();
    const [isPending, setIsPending] = useState(false);

    const submitPracticetHandler = async (formValues) => {
        const errors = validate(formValues);

        if (Object.keys(errors).length > 0) {
            return alert(Object.values(errors).at(0));;
        }

        const practiceData = { ...formValues };

        setIsPending(true);

        try {
            if (practiceData.imageUrl instanceof File) {
                practiceData.imageUrl = await uploadImage(practiceData.imageUrl);
            }

            await request(endPoints.postPractices, 'POST', practiceData);

            setIsPending(false);

            navigate('/practices');
        } catch (err) {
            setIsPending(false);

            alert(`Неуспешно създаване на практика: ${err.message}`);
        }
    }

    const { inputPropertiesRegister, filePropertiesRegister, formAction } = useForm(submitPracticetHandler, initialPracticeValues);

    return (
        <article className="create-blog-post-container">
            <img src="/images/create-blog-post-img.jpg" alt="" />
            <form onSubmit={formAction}>
                <h2>Добави практика</h2>
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
                        rows="5"
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="content">Съдържание:</label>
                    <textarea
                        id="content"
                        {...inputPropertiesRegister('content')}
                        rows="10"
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="content">Кога ще се проведе практиката:</label>
                    <input
                        type="date"
                        id="date"
                        {...inputPropertiesRegister('date')}
                    />
                </div>

                {isPending
                    ? <div className="loader"><img src="/images/loading.svg" alt="Зареждане" /></div>
                    : <button type="submit" className="btn btn-register">Създай</button>
                }
            </form>
        </article>
    )
}