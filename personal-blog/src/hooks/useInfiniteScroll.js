import { useState, useEffect, useCallback, useRef } from "react";
import { BASE_URL } from "../utils/endpoints.js";

export function useInfiniteScroll(url, limit = 6) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const pageRef = useRef(1);
    const isFetching = useRef(false);
    const hasMoreRef = useRef(true);

    const loadMore = useCallback(async (signal) => {
        if (isFetching.current || !hasMoreRef.current) return;

        isFetching.current = true;
        setLoading(true);

        try {
            const currentUrl = `${BASE_URL}${url}?page=${pageRef.current}&limit=${limit}`;
            const res = await fetch(currentUrl, { signal });
            const result = await res.json();

            if (result.docs && result.docs.length > 0) {
                setItems(prev => {
                    const existingIds = new Set(prev.map(b => b._id));
                    const uniqueNew = result.docs.filter(b => !existingIds.has(b._id));
                    return [...prev, ...uniqueNew];
                });

                pageRef.current += 1;
                hasMoreRef.current = result.hasNextPage;
                setHasMore(result.hasNextPage);
            } else {
                hasMoreRef.current = false;
                setHasMore(false);
            }
        } catch (err) {
            if (err.name !== 'AbortError') console.error("Fetch error:", err);
        } finally {
            setLoading(false);
            isFetching.current = false;
        }
    }, [url, limit]);

    useEffect(() => {
        const abortController = new AbortController();
        loadMore(abortController.signal);
        return () => abortController.abort();
    }, [loadMore]);

    return { items, loading, hasMore, loadMore };
}