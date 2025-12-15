import { useState } from "react";

export function useLocalStorage(initialState, key) {
    const [state, setState] = useState(() => {
        const storageDta = localStorage.getItem(key);

        if (!storageDta) {
            return initialState;
        }

        return JSON.parse(storageDta);
    });

    const setLocalStorageState = (value) => {
        localStorage.setItem(key, JSON.stringify(value));

        setState(value);
    }

    return [
        state, 
        setLocalStorageState
    ]
}