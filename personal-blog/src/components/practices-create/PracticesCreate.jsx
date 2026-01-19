import { useNavigate, useParams } from "react-router";
import { useRequest } from "../../hooks/useRequest.js";
import { useContext, useState, useEffect, useMemo } from "react";
import { endPoints } from "../../utils/endpoints.js";
import { useForm } from "../../hooks/useForm.js";
import { uploadImage } from "../../hooks/uploadImage.js";
import UserContext from "../../context/UserContext.jsx";

const initialPracticeValues = {
    title: '',
    imageUrl: '',
    presentation: '',
    content: '',
    practiceDate: ''
};

export function PracticesCreate({ mode }) {
    const { practiceId } = useParams();

    const { request } = useRequest();

    const navigate = useNavigate();

    const [isPending, setIsPending] = useState(false);

    const { user, isAdmin, userRoles } = useContext(UserContext);

    const isEditMode = mode === 'edit';

    const config = useMemo(() => ({
        method: isEditMode ? 'PUT' : 'POST',
        url: isEditMode ? endPoints.practiceEdit(practiceId) : endPoints.postPractices,
        navigateTo: isEditMode ? `/practices/${practiceId}/details` : '/practices',
        errMsg: isEditMode ? 'Неуспешно редактиране на практика' : 'Неуспешно създаване на практика'
    }), [isEditMode, practiceId]);

    function validate(values) {
        if (!values.title) {
            return 'Заглавието е задължително!'
        };

        const noImage = isEditMode
            ? !values.imageUrl
            : (!(values.imageUrl instanceof FileList) && !(values.imageUrl instanceof File));

        if (noImage) {
            return 'Снимката е задължителна!'
        };

        if (!values.presentation) {
            return 'Кратката презентация е задължителна!'
        };

        if (!values.content) {
            return 'Съдържанието е задължително!'
        };

        if (!values.practiceDate) {
            return 'Датата е задължителна!'
        };

        return null;
    }

    const submitHandler = async (formValues) => {
        const errors = validate(formValues);

        if (errors) {
            alert(errors);
            return;
        }

        setIsPending(true);

        try {
            const practiceData = { ...formValues };

            if (practiceData.imageUrl instanceof FileList || practiceData.imageUrl instanceof File) {
                const fileToUpload = practiceData.imageUrl instanceof FileList
                    ? practiceData.imageUrl[0]
                    : practiceData.imageUrl;
                practiceData.imageUrl = await uploadImage(fileToUpload);
            }

            await request(config.url, config.method, practiceData);

            navigate(config.navigateTo, { replace: true });
        } catch (err) {
            alert(`${config.errMsg}: ${err.message}`);
        } finally {
            setIsPending(false);
        }
    };

    const {
        inputPropertiesRegister,
        filePropertiesRegister,
        setFormValues,
        formAction
    } = useForm(submitHandler, initialPracticeValues);

    useEffect(() => {
        document.title = isEditMode ? 'Редактирай практика' : 'Добави практика';

        if (!isEditMode) {
            return
        };

        const abortController = new AbortController();

        request(endPoints.practiceDetails(practiceId), 'GET', null, abortController.signal)
            .then(result => {
                if (!result || Object.keys(result).length === 0) {
                    return;
                }

                const isOwner = String(user?._id) === String(result.owner);
                const hasAccess = isOwner || isAdmin || userRoles === 'moderator';

                if (!hasAccess) {
                    return navigate('/');
                }
                setFormValues(result);
            })
            .catch(err => {
                if (err.name !== 'AbortError') {
                    alert(`Неуспешно зареждане: ${err.message}`);
                }
            });

        return () => abortController.abort();
    }, [isEditMode, practiceId, navigate, user?._id]);

    return (
        <article className="create-blog-post-container">
            <img src="/images/create-blog-post-img.jpg" alt="Background" />
            <form onSubmit={formAction}>
                <h2>{isEditMode ? 'Редактирай практика' : 'Добави практика'}</h2>

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
                    <label htmlFor="practiceDate">Кога ще се проведе практиката:</label>
                    <input
                        type="date"
                        id="practiceDate"
                        {...inputPropertiesRegister('practiceDate')}
                    />
                </div>

                {isPending ? (
                    <div className="loader">
                        <img src="/images/loading.svg" alt="Зареждане" />
                    </div>
                ) : (
                    <button type="submit" className="btn btn-register">
                        {isEditMode ? 'Запази промените' : 'Добави практика'}
                    </button>
                )}
            </form>
        </article>
    );
}
