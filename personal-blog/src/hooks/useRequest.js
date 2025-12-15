import UserContext from "../context/UserContext.jsx";
import { BASE_URL } from "../utils/endpoints.js";
import { useContext } from "react";

export function useRequest() {
    const { user, isAuthenticated } = useContext(UserContext);

    const request = async (url, method = 'GET', data) => {
        let options = {
            method,
            headers: {}
        };

        if (data) {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(data);
        }

        if (isAuthenticated && user?.accessToken) {
            options.headers['X-Authorization'] = user.accessToken;
        }

        const res = await fetch(`${BASE_URL}${url}`, options);

        if (!res.ok) {
            throw new Error(res.statusText || `Неуспешна заявка със статус ${res.status}`);
        }

        if (res.status === 204) {
            return {}
        }

        const result = await res.json();

        return result;
    }

    return {
        request
    }
}