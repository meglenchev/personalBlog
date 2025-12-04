import { endPoints } from "../../utils/endpoints.js";
import { useForm } from "../hooks/useForm.js"
import { useRequest } from "../hooks/useRequest.js";

let initialRegisterData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function validate(values) {
    let errors = {};

    if (!values.username) {
        errors['username'] = 'Името е задължително!'
    }

    if (!values.email) {
        errors['email'] = 'Имейл е задължителен!'
    }

    if (!emailRegex.test(values.email)) {
        errors['email'] = 'Грешно изписан имейл!'
    }

    if (!values.password) {
        errors['password'] = 'Паролата е задължителена!'
    }

    if (values.confirmPassword != values.password) {
        errors['confirmPassword'] = 'Паролите трябва да са еднакви!'
    }

    return errors;
}

export function UserRegister() {
    const { request } = useRequest();

    const submitUserRegisterData = async (formValues) => {

        const { username, email, password } = formValues;

        if (Object.keys(validate(formValues)).length > 0) {
            return alert(Object.values(validate(formValues)).at(0));
        }

        const response = await request(endPoints.register, 'POST', {username, email, password});
    }

    const { inputPropertiesRegister, formAction } = useForm(submitUserRegisterData, initialRegisterData);

    return (
        <article className="register-container">
            <img src="/images/register-img.jpg" alt="Регистрация" />
            <form action={formAction}>
                <h2>Регистрация</h2>
                <div className="form-group">
                    <label htmlFor="username">Име:</label>
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