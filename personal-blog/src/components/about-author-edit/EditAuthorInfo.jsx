import { endPoints, BASE_URL } from "../../utils/endpoints.js";
import { useEffect } from "react";
import { useForm } from "../hooks/useForm.js";
import { useRequest } from "../hooks/useRequest.js";
import { useNavigate } from "react-router";

const initialAuthorValues = {
    name: '',
    slogan: '',
    imageUrl: '',
    summary: '',
    details: ''
}

function validate(values) {
    let errors = {};

    if (!values.name) {
        errors['name'] = 'Името е задължително!';
    }

    if (!values.slogan) {
        errors['slogan'] = 'Слогана е задължителен!';
    }

    if (!values.imageUrl) {
        errors['imageUrl'] = 'Снимката е задължителна!';
    }

    if (!values.summary) {
        errors['summary'] = 'Резюмето е задължително!';
    }

    if (!values.info) {
        errors['info'] = 'Информацията е задължителна!';
    }

    return errors;
}

export function EditAuthorInfo() {
    const url = `${BASE_URL}${endPoints.authorInfo}`;
    const { request } = useRequest();
    const navigate = useNavigate();

    const submitEditHandler = async (formValues) => {
        const errors = validate(formValues);

        if (Object.keys(errors).length > 0) {
            return alert(Object.values(errors).at(0));;
        }

        try {
            await request(`${endPoints.authorInfo}`, 'PUT', formValues);

            navigate(`/about`);
        } catch (err) {
            alert(`Неуспешно редактиране на информацията: ${err.message}`);
        }
    }

    const { inputPropertiesRegister, formAction, setFormValues } = useForm(submitEditHandler, initialAuthorValues);

    useEffect(() => {
        const abortController = new AbortController();

        (async () => {
            try {
                const res = await fetch(url, { signal: abortController.signal });

                if (!res.ok) {
                    throw new Error(`Техническа грешка! статус: ${res.status}`);
                }

                const authorData = await res.json();

                setFormValues(authorData);

            } catch (err) {
                throw new Error(err.message);
            }
        })();

        return () => {
            abortController.abort();
        }
    }, [url, setFormValues])

    return (
        <article className="create-about-author">
            <img src="/images/create-aboutn-info.jpg" alt="About author" />
            <form action={formAction}>
                <h2>Информация за автора</h2>
                <div className="form-group">
                    <label htmlFor="name">Име</label>
                    <input
                        type="text"
                        id="name"
                        {...inputPropertiesRegister('name')}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="slogan">Слоган</label>
                    <input
                        type="text"
                        id="slogan"
                        {...inputPropertiesRegister('slogan')}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="imageUrl">Снимка:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        {...inputPropertiesRegister('imageUrl')}
                    />
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

                <button type="submit" className="btn btn-register">Редактирай</button>
            </form>
        </article>
    )
}