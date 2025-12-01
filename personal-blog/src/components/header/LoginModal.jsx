import { useForm } from "../hooks/useForm.js";

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

export function LoginModal({ onClose, setShowLoginModal }) {
    const submitLoginHandler = async (formValues) => {
        const { email, password } = formValues;

        if (Object.keys(validate(formValues)).length > 0) {
            return alert(Object.values(validate(formValues)).at(0));
        }

        try {
            const res = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'content-type': 'aplication/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!res.ok) {
                throw res.statusText;
            }

            const user = await res.json();

            console.log(user)

            setShowLoginModal(false)
        } catch (err) {
            alert(err.messages)
        }
    }

    const { inputPropertiesRegister, formAction } = useForm(submitLoginHandler, initialLoginValues);

    return (
        <>
            <div className="login-modal" onClick={onClose}></div>
            <div className="login-container">
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