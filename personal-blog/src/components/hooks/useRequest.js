import { BASE_URL } from "../../utils/endpoints.js";

export function useRequest() {
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

        const res = await fetch(`${BASE_URL}${url}`, options);

        if (!res.ok) {
            throw res.statusText
        }

        if (res.status === 204) {
            return {}
        }

        const result = res.json();

        return result;
    }

    return {
        request
    }
}