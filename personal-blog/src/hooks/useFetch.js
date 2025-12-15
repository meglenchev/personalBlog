import { BASE_URL } from "../utils/endpoints.js";
import { useEffect, useState } from "react";

export function useFetch(url, iniinitialValue, postId) {
    const [data, setData] = useState(iniinitialValue);
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
        const abortController = new AbortController();

        fetch(`${BASE_URL}${url}`, { signal: abortController.signal })
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.text);
                }

                return res.json();
            })
            .then(result => {
                setData(result)
            })
            .catch(err => {
                if (err.name !== 'AbortError') {
                    throw new Error(err);
                }
            })
            .finally(() => {
                setIsPending(false)
            })

            return () => {
                abortController.abort();
            }

    }, [url, postId])

    return {
        data,
        isPending
    }
}