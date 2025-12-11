import { useState } from "react";

export function useForm(callback, initialValues) {
    const [formValues, setFormValues] = useState(initialValues);

    const changeHandler = (e) => {
        setFormValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const fileChangeHandler = (e) => {
        setFormValues(state => ({
            ...state,
            [e.target.name]: e.target.files[0] 
        }))
    }

    const formAction = (e) => {
        if (e) {
            e.preventDefault();
        }
        callback(formValues);
    }

    const inputPropertiesRegister = (inputName) => {
        return {
            name: inputName,
            onChange: changeHandler,
            value: formValues[inputName]
        }
    }

    const filePropertiesRegister = (inputName) => {
        return {
            name: inputName,
            onChange: fileChangeHandler,
        }
    }

    return {
        formValues,
        changeHandler,
        fileChangeHandler,
        formAction,
        setFormValues,
        inputPropertiesRegister, 
        filePropertiesRegister 
    }
}