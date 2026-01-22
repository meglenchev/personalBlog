import { useContext, useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm.js"
import UserContext from "../../context/UserContext.jsx";
import { useNavigate } from "react-router";

let initialRegisterData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
}

export function UserRegister() {
    const { isAuthenticated, onRegister } = useContext(UserContext);
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Регистрация';
    }, []);

    function validate(values) {
        let newErrors = {};

        if (!values.username) {
            newErrors.username = 'Името е задължително!'
        }

        if (!values.email) {
            newErrors.email = 'Имейла е задължителен!'
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            newErrors.email = 'Имейл формата е неправилен!';
        }

        if (!values.password) {
            newErrors.password = 'Паролата е задължителена!'
        }

        if (values.confirmPassword !== values.password) {
            newErrors.confirmPassword = 'Паролите не съвпадат!'
        }

        return newErrors;
    }

    useEffect(() => {
        if (isAuthenticated) {
            if (window.location.pathname.includes('register')) {
                navigate('/', { replace: true });
            }
        }
    }, [isAuthenticated, navigate])

    const submitUserRegisterData = async (formValues) => {

        const { username, email, password, confirmPassword } = formValues;

        const validationErrors = validate(formValues);
        
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            setErrors({});

            setServerError('');

            await onRegister(username, email, password, confirmPassword);

            navigate('/', { replace: true });
        } catch (err) {
            setServerError('Регистрацията беше неуспешна. Опитайте отново!');
        }
    }

    const { inputPropertiesRegister, formAction } = useForm(submitUserRegisterData, initialRegisterData);

    return (
        <article className="register-container">
            <img src="/images/register-img.jpg" alt="Регистрация" />

            <form onSubmit={formAction}>
                <h2>Регистрация</h2>

                {serverError && <div className="errors">{serverError}</div>}

                <div className="form-group">
                    <label htmlFor="username">Потребител: {errors.username && <span className="error-text">{errors.username}</span>}</label>
                    <input
                        type="text"
                        id="username"
                        {...inputPropertiesRegister('username')}
                        className={errors.username && 'input-error'}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Имейл: {errors.email && <span className="error-text">{errors.email}</span>}</label>
                    <input
                        type="email"
                        id="email"
                        {...inputPropertiesRegister('email')}
                        className={errors.email && 'input-error'}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Парола: {errors.password && <span className="error-text">{errors.password}</span>}</label>
                    <input
                        type="password"
                        id="password"
                        {...inputPropertiesRegister('password')}
                        className={errors.password && 'input-error'}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Потвърдете паролата: {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        {...inputPropertiesRegister('confirmPassword')}
                        className={errors.confirmPassword && 'input-error'}
                    />
                </div>

                <button type="submit" className="btn btn-register">Регистрация</button>
            </form>
        </article>
    )
}