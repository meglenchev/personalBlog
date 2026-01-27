import { useContext, useEffect, useState } from "react"
import UserContext from "../../context/UserContext.jsx";
import { useNavigate } from "react-router";
import { useForm } from "../../hooks/useForm.js";
import { uploadImage } from "../../hooks/uploadImage.js";
import { useRequest } from "../../hooks/useRequest.js";
import { endPoints } from "../../utils/endpoints.js";
import { useFetch } from "../../hooks/useFetch.js";

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

    const [showSuccess, setShowSuccess] = useState(false);

    const [showConfirm, setShowConfirm] = useState(false);

    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const { data, isPending } = useFetch(endPoints.sliders, [], refreshTrigger);

    const hasData = !isPending && Array.isArray(data) && data.length > 0;

    const isEmpty = !isPending && (!data || (Array.isArray(data) && data.length === 0));

    const [slideToDeleteId, setSlideToDeleteId] = useState(null);

    const updateUI = () => setRefreshTrigger(prev => prev + 1);

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
            setShowSuccess(false);

            const fileToUpload = formValues.sliderImage;

            const uploadedUrl = await uploadImage(fileToUpload);

            const sliderData = {
                sliderContent: formValues.sliderContent,
                sliderImage: uploadedUrl
            };

            await request(endPoints.sliderCreate, 'POST', sliderData);

            updateUI();

            setFormValues(initialSliderValues);

            if (document.getElementById('sliderImage')) {
                document.getElementById('sliderImage').value = '';
            }

        } catch (err) {
            setServerError(err.message || 'Възникна грешка при създаването на слайда!');
        } finally {
            setShowSuccess(true);
            setIsPendingUpload(false);
        }
    }

    const {
        inputPropertiesRegister,
        filePropertiesRegister,
        setFormValues,
        formAction } = useForm(submitSliderHandler, initialSliderValues);


    const deleteSlideHandler = (e, slideId) => {
        e.preventDefault();
        setShowConfirm(true);
        setSlideToDeleteId(slideId);
    }

    const confirmDelete = async (e) => {
        e.preventDefault();

        try {
            await request(endPoints.sliderDelete(slideToDeleteId), 'DELETE');

            setShowConfirm(false);

            updateUI();

            setSlideToDeleteId(null);
        } catch (err) {
            setServerError(`Неуспешно изтриване на слайдер!`);

            setShowConfirm(false);

            setSlideToDeleteId(null);
        }
    }

    return (
        <article className="slider-settings">
            <form onSubmit={formAction}>
                <h2>Настройки на слайдера</h2>

                {serverError && <div className="errors">{serverError}</div>}

                {showSuccess && <div className="success"><span>Слайдът е добавен успешно!</span></div>}

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

            {isPending && <div className="loader"><img src="/images/loading.svg" alt="Зареждане" /></div>}

            {isEmpty && <p className="no-slides">Все още няма добавени слайдове.</p>}

            {hasData && (
                <div className="current-slides">
                    <h3>Настоящи слайдове:</h3>

                    <ul className="slidersList">
                        {data.map(slide => <li key={slide._id}>
                            <img src={slide.sliderImage} alt="" />
                            <p>{slide.sliderContent}</p>
                            <button onClick={(e) => deleteSlideHandler(e, slide._id)} className="btn btn-delete ml-a">Изтрий</button>
                        </li>)}
                    </ul>
                </div>
            )}

            {showConfirm && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Сигурни ли сте?</h3>
                        <p>Изтриването на този слайд не може да бъде отменено.</p>
                        <div className="buttons">
                            <button className="btn btn-edit" onClick={() => { setShowConfirm(false); setSlideToDeleteId(null) }}>Отказ</button>
                            <button className="btn btn-delete" onClick={confirmDelete}>Да, изтрий</button>
                        </div>
                    </div>
                </div>
            )}
        </article>
    )
}