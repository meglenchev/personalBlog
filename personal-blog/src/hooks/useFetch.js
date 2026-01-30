import { BASE_URL } from "../utils/endpoints.js";
import { useEffect, useState } from "react";

export function useFetch(url, initialValue, postId, refreshTrigger) {
    const [data, setData] = useState(initialValue);
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
        if (!url) {
            setIsPending(false);
            return; 
        }

        const abortController = new AbortController();
        setIsPending(true);

        fetch(`${BASE_URL}${url}`, { signal: abortController.signal })
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.text());
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

    }, [url, postId, refreshTrigger])

    return {
        data,
        isPending
    }
}