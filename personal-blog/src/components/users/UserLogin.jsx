import { useState, useContext, useEffect } from "react";
import { useForm } from "../../hooks/useForm.js";
import UserContext from "../../context/UserContext.jsx";
import { useNavigate } from "react-router";

const initialLoginValues = {
    email: '',
    password: ''
}

export function UserLogin() {
    const { onLogin } = useContext(UserContext);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');

    useEffect(() => {
        document.title = 'Вход';
    }, []);

    function validate(values) {
        const newErrors = {};

        if (!values.email) {
            newErrors.email = 'Имейла е задължителен!'
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            newErrors.email = 'Имейл формата е неправилен!';
        }

        if (!values.password) {
            newErrors.password = 'Паролата е задължителна!'
        }

        return newErrors;
    }

    const submitLoginHandler = async (formValues) => {
        const validationErrors = validate(formValues);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            setErrors({});

            setServerError('');

            await onLogin(formValues);

            navigate('/', { replace: true });
        } catch (err) {
            setServerError('Грешен имейл или парола. Опитайте отново!');
        }
    }

    const { inputPropertiesRegister, formAction } = useForm(submitLoginHandler, initialLoginValues);

    return (
        <>
            <div className="login-container">
                <h2>Вход</h2>

                {serverError && <div className="errors">{serverError}</div>}

                <form onSubmit={formAction} noValidate>
                    <div className="form-group">
                        {errors.email && <label><span className="error-text">{errors.email}</span></label>}
                        <input
                            type="email"
                            id="useremail"
                            {...inputPropertiesRegister('email')}
                            placeholder="Имейл"
                            className={errors.email && 'input-error'}
                        />
                    </div>
                    <div className="form-group">
                        {errors.password && <label><span className="error-text">{errors.password}</span></label>}
                        <input
                            type="password"
                            id="password"
                            {...inputPropertiesRegister('password')}
                            placeholder="Парола"
                            className={errors.password && 'input-error'}
                        />
                    </div>
                    <button type="submit" className="btn btn-login">Влез</button>
                </form>
            </div>
        </>
    )
}