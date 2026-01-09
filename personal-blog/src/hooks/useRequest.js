import UserContext from "../context/UserContext.jsx";
import { BASE_URL } from "../utils/endpoints.js";
//import { useContext } from "react";

export function useRequest() {
    //const { user, isAuthenticated } = useContext(UserContext);

    const request = async (url, method = 'GET', data) => {
        let options = {
            method,
            headers: {}, 
            credentials: 'include'
        };

        if (data) {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(data);
        }

        // този хедър вече не е необходим за автентикация с JWT в cookie
        // if (isAuthenticated && user?.accessToken) {
        //     options.headers['x-authorization'] = user.accessToken;
        // }

        const res = await fetch(`${BASE_URL}${url}`, options);

        if (!res.ok) {
            throw new Error(res.statusText || `Неуспешна заявка със статус ${res.status}`);
        }

        if (res.status === 204) {
            return null
        }

        const result = await res.json();

        return result;
    }

    return {
        request
    }
}