import { useContext } from "react";
import { BASE_URL } from "../../utils/endpoints.js";
import UserContext from "../../context/UserContext.jsx";

export function useRequest() {
    const { user, isAuthenticated } = useContext(UserContext);

    const request = async (url, method, data) => {
        let options = {}

        if (method) {
            options.method = method;
        }

        if (data) {
            options.headers = {
                'Content-Type': 'application/json',
            }

            options.body = JSON.stringify(data);
        }

        if (isAuthenticated) {
            options.headers = {
                ...options.headers,
                'X-Authorization': user.accessToken,
            }
        }

        const res = await fetch(`${BASE_URL}${url}`, options);

        if (!res.ok) {
            throw new Error(res.statusText || `Request failed with status ${res.status}`);
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