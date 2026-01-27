import { useContext, useEffect, useState } from "react"
import UserContext from "../../context/UserContext.jsx";
import { useNavigate } from "react-router";
import { useForm } from "../../hooks/useForm.js";
import { uploadImage } from "../../hooks/uploadImage.js";
import { useRequest } from "../../hooks/useRequest.js";
import { endPoints } from "../../utils/endpoints.js";

const initialSliderValues = {
    sliderImage: '',
    sliderContent: '',
}

export function SliderSettings() {

    const { isAdmin } = useContext(UserContext);

    const { request } = useRequest();

    const navigate = useNavigate();

    const [isPendingUpload, setIsPendingUpload] = useState(false);

    const [errors, setErrors] = useState({});

    const [serverError, setServerError] = useState('');

    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        if (!isAdmin) {
            navigate('/')
        }
    }, [isAdmin, navigate]);

    function validate(values) {
        let newErrors = {};

        const noImage = !(values.sliderImage instanceof FileList) && !(values.sliderImage instanceof File);

        if (noImage) {
            newErrors.sliderImage = 'Снимката е задължителна!'
        };

        return newErrors;
    }

    const submitSliderHandler = async (formValues) => {
        const validationErrors = validate(formValues);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsPendingUpload(true);

        try {
            setErrors({});
            setServerError('');
             setShowConfirm(false);

            const fileToUpload = formValues.sliderImage;

            const uploadedUrl = await uploadImage(fileToUpload);

            const sliderData = {
                sliderContent: formValues.sliderContent,
                sliderImage: uploadedUrl
            };

            await request(endPoints.sliderCreate, 'POST', sliderData);

            setFormValues(initialSliderValues);

            if (document.getElementById('sliderImage')) {
                document.getElementById('sliderImage').value = '';
            }

        } catch (err) {
            setServerError(err.message || 'Възникна грешка при създаването на слайда!');
        } finally {
            setShowConfirm(true);
            setIsPendingUpload(false);
        }
    }

    const {
        inputPropertiesRegister,
        filePropertiesRegister,
        setFormValues,
        formAction } = useForm(submitSliderHandler, initialSliderValues);

    return (
        <article className="slider-settings">
            <form onSubmit={formAction}>
                <h2>Настройки на слайдера</h2>

                {serverError && <div className="errors">{serverError}</div>}

                {showConfirm && <div className="success"><span>Слайдът е добавен успешно!</span></div>}

                <div className="form-group-wrap two">
                    <div className="form-group">
                        <label htmlFor="sliderImage">Добавяне на снимка: {errors.sliderImage && <span className="error-text">{errors.sliderImage}</span>}</label>
                        <input
                            type="file"
                            id="sliderImage"
                            {...filePropertiesRegister('sliderImage')}
                            accept="image/*"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="sliderContent">Добавяне на текст към снимката:</label>
                        <input
                            type="text"
                            id="sliderContent"
                            {...inputPropertiesRegister('sliderContent')}
                        />
                    </div>
                </div>
                {isPendingUpload
                    ? <div className="loader"><img src="/images/loading.svg" alt="Зареждане" /></div>
                    : <button type="submit" className="btn btn-settings">Добави</button>
                }
            </form>
        </article>
    )
}