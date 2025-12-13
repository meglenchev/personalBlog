import { useContext, useEffect } from "react";
import { useForm } from "../hooks/useForm.js"
import UserContext from "../../context/UserContext.jsx";
import { useNavigate } from "react-router";

let initialRegisterData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
}

function validate(values) {
    let errors = {};

    if (!values.username) {
        errors['username'] = 'Името е задължително!'
    }

    if (!values.email) {
        errors['email'] = 'Имейла е задължителен!'
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors['email'] = 'Имейл формата е неправилен!';
    }

    if (!values.password) {
        errors['password'] = 'Паролата е задължителена!'
    }

    if (values.confirmPassword !== values.password) {
        errors['confirmPassword'] = 'Паролите трябва да са еднакви!'
    }

    return errors;
}

export function UserRegister() {
    const { onRegister } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Регистрация';
    }, []);

    const submitUserRegisterData = async (formValues) => {

        const { username, email, password } = formValues;

        const errors = validate(formValues);

        if (Object.keys(errors).length > 0) {
            return alert(Object.values(errors).at(0));
        }

        try {
            await onRegister(username, email, password);
            navigate('/user/settings');
        } catch (err) {
            alert(`Регистрацията беше неуспешна: ${err.message}`);
        }
    }

    const { inputPropertiesRegister, formAction } = useForm(submitUserRegisterData, initialRegisterData);

    return (
        <article className="register-container">
            <img src="/images/register-img.jpg" alt="Регистрация" />
            <form onSubmit={formAction}>
                <h2>Регистрация</h2>
                <div className="form-group">
                    <label htmlFor="username">Потребителско име:</label>
                    <input
                        type="text"
                        id="username"
                        {...inputPropertiesRegister('username')}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Имейл:</label>
                    <input
                        type="email"
                        id="email"
                        {...inputPropertiesRegister('email')}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Парола:</label>
                    <input
                        type="password"
                        id="password"
                        {...inputPropertiesRegister('password')}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Потвърдете паролата:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        {...inputPropertiesRegister('confirmPassword')}
                    />
                </div>

                <button type="submit" className="btn btn-register">Регистрация</button>
            </form>
        </article>
    )
}