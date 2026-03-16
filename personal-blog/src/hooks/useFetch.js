import { BASE_URL } from "../utils/endpoints.js";
import { useEffect, useState } from "react";

export function useFetch(url, initialValue, postId, refreshTrigger) {
    const [data, setData] = useState(initialValue);
    const [isPending, setIsPending] = useState(!!url);

    useEffect(() => {
        if (!url) {
            setIsPending(false);
            return;
        }

        setIsPending(true);

        const abortController = new AbortController();
        setIsPending(true);

        fetch(`${BASE_URL}${url}`, { signal: abortController.signal })
            .then(async res => {
                if (!res.ok) {
                    const errorText = await res.text();
                    throw new Error(errorText || `Error ${res.status}`);
                }

                return res.json();
            })
            .then(result => {
                setData(result)
            })
            .catch(err => {
                if (err.name !== 'AbortError') {
                    console.error(err.message); 
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