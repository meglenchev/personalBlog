import { useState } from "react";

export function useLocalStorage(initialState, key) {
    const [state, setState] = useState(() => {
        const storageDta = localStorage.getItem(key);

        if (!storageDta || storageDta === 'null') {
            return initialState;
        }

        try {
            return JSON.parse(storageDta);
        } catch {
            return initialState;
        }
    });

    const setLocalStorageState = (value) => {
        if (value === null || value === undefined) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, JSON.stringify(value));
        }

        setState(value);
    }

    return [
        state, 
        setLocalStorageState
    ]
}