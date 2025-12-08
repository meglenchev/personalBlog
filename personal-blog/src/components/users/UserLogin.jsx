import { useContext } from "react";
import { useForm } from "../hooks/useForm.js";
import UserContext from "../../context/UserContext.jsx";
import { useNavigate } from "react-router";

const initialLoginValues = {
    email: '',
    password: ''
}

function validate(values) {
    let errors = {}

    if (!values.email) {
        errors['email'] = 'E-mail is required!'
    }

    if (!values.password) {
        errors['password'] = 'Password is required!'
    }

    return errors;
}

export function UserLogin() {

    const { onLogin } = useContext(UserContext);
    const navigate = useNavigate();

    const submitLoginHandler = (formValues) => {
        const { email, password } = formValues;

        if (Object.keys(validate(formValues)).length > 0) {
            return alert(Object.values(validate(formValues)).at(0));
        }

        try {
            onLogin(email, password);
            navigate('/');
        } catch (err) {
            alert(err.message);
        }
    }

    const { inputPropertiesRegister, formAction } = useForm(submitLoginHandler, initialLoginValues);

    return (
        <>
            <div className="login-container">
                <h2>Вход</h2>
                <form action={formAction}>
                    <div className="form-group">
                        <input
                            type="text"
                            id="useremail"
                            {...inputPropertiesRegister('email')}
                            placeholder="Имейл"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            id="password"
                            {...inputPropertiesRegister('password')}
                            placeholder="Парола"
                        />
                    </div>
                    <button type="submit" className="btn btn-login">Влез</button>
                </form>
            </div>
        </>
    )
}