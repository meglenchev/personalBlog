import { useState } from "react";

export function useForm(callback, initialValues) {
    const [formValues, setFormValues] = useState(initialValues);

    const changeHandler = (e) => {
        setFormValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const formAction = () => {
        callback(formValues);
    }

    const inputPropertiesRegister = (inputName) => {
        return {
            name: inputName,
            onChange: changeHandler,
            value: formValues[inputName]
        }
    }

    return {
        formValues,
        changeHandler,
        formAction,
        inputPropertiesRegister
    }
}