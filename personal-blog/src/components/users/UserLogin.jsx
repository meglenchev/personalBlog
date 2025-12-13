import { useContext } from "react";
import { useForm } from "../hooks/useForm.js";
import UserContext from "../../context/UserContext.jsx";
import { useNavigate } from "react-router";

const initialLoginValues = {
    email: '',
    password: ''
}

function validate(values) {
    let errors = {};

    if (!values.email) {
        errors['email'] = 'Имейла е задължителен!'
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors['email'] = 'Имейл формата е неправилен!';
    }

    if (!values.password) {
        errors['password'] = 'Паролата е задължителна!'
    }

    return errors;
}

export function UserLogin() {
    const { onLogin } = useContext(UserContext);
    const navigate = useNavigate();

    const submitLoginHandler = (formValues) => {
        const errors = validate(formValues);

        if (Object.keys(errors).length > 0) {
            return alert(Object.values(errors).at(0));;
        }

        try {
            onLogin(formValues);
            navigate('/');
        } catch (err) {
            alert(`Технически затруднения: ${err.message}`);
        }
    }

    const { inputPropertiesRegister, formAction } = useForm(submitLoginHandler, initialLoginValues);

    return (
        <>
            <div className="login-container">
                <h2>Вход</h2>
                <form onSubmit={formAction}>
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