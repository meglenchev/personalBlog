import { useNavigate } from "react-router";
import { useRequest } from "../hooks/useRequest.js";
import { useState } from "react";
import { storage } from "../../firebase.js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { endPoints } from "../../utils/endpoints.js";

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

    const submitPracticetHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const formDataEntries = Object.fromEntries(formData);

        const errors = validate(formDataEntries);

        if (Object.keys(errors).length > 0) {
            return alert(Object.values(errors).at(0));;
        }

        const { imageUrl, ...practicesData } = formDataEntries;

        console.log(practicesData)

        setIsPending(true);

        try {
            const imageRef = ref(storage, `images/${imageUrl.name}`);
            const snapshot = await uploadBytes(imageRef, imageUrl);
            const downloadURL = await getDownloadURL(snapshot.ref);
            practicesData.imageUrl = downloadURL;
        } catch (err) {
            return alert(`Неуспешно качване на снимката: ${err.message}`);
        }

        try {
            await request(endPoints.postPractices, 'POST', practicesData);

            setIsPending(false);

            navigate('/practices');
        } catch (err) {
            setIsPending(false);

            alert(`Неуспешно създаване на практика: ${err.message}`);
        }
    }

    return (
        <article className="create-blog-post-container">
            <img src="/images/create-blog-post-img.jpg" alt="" />
            <form onSubmit={submitPracticetHandler}>
                <h2>Добави практика</h2>
                <div className="form-group">
                    <label htmlFor="title">Заглавие:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="imageUrl">Снимка:</label>
                    <input
                        type="file"
                        id="imageUrl"
                        name="imageUrl"
                        accept="image/*"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="presentation">Презентация:</label>
                    <textarea
                        id="presentation"
                        name="presentation"
                        rows="5"
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="content">Съдържание:</label>
                    <textarea
                        id="content"
                        name="content"
                        rows="10"
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="content">Кога ще се проведе практиката:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
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