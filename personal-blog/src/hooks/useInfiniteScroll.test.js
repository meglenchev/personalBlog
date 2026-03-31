import { describe, test, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useInfiniteScroll } from './useInfiniteScroll';

globalThis.fetch = vi.fn();

describe('useInfiniteScroll Hook', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('трябва да зареди първоначалните данни успешно', async () => {
        const mockData = {
            docs: [{ _id: '1', title: 'Post 1' }, { _id: '2', title: 'Post 2' }],
            hasNextPage: true
        };

        fetch.mockResolvedValueOnce({
            json: async () => mockData,
        });

        const { result } = renderHook(() => useInfiniteScroll('/posts', 2));

        expect(result.current.loading).toBe(true);

        await waitFor(() => {
            expect(result.current.items).toHaveLength(2);
            expect(result.current.items[0]._id).toBe('1');
            expect(result.current.hasMore).toBe(true);
            expect(result.current.loading).toBe(false);
        });
    });

    test('не трябва да добавя дублиращи се елементи по _id', async () => {
        const firstLoad = { docs: [{ _id: '1', title: 'Post 1' }], hasNextPage: true };
        const secondLoad = { docs: [{ _id: '1', title: 'Post 1' }, { _id: '2', title: 'Post 2' }], hasNextPage: false };

        fetch
            .mockResolvedValueOnce({ json: async () => firstLoad })
            .mockResolvedValueOnce({ json: async () => secondLoad });

        const { result } = renderHook(() => useInfiniteScroll('/posts', 1));

        await waitFor(() => expect(result.current.items).toHaveLength(1));

        result.current.loadMore();

        await waitFor(() => {
            expect(result.current.items).toHaveLength(2);
            expect(result.current.hasMore).toBe(false);
        });
    });

    test('трябва да спре зареждането, когато hasNextPage е false', async () => {
        fetch.mockResolvedValueOnce({
            json: async () => ({ docs: [], hasNextPage: false }),
        });

        const { result } = renderHook(() => useInfiniteScroll('/posts'));

        await waitFor(() => {
            expect(result.current.hasMore).toBe(false);
        });

        result.current.loadMore();

        expect(fetch).toHaveBeenCalledTimes(1);
    });

    test('трябва да обработва грешки при fetch', async () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
        fetch.mockRejectedValueOnce(new Error('Network error'));

        const { result } = renderHook(() => useInfiniteScroll('/posts'));

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
            expect(consoleSpy).toHaveBeenCalledWith("Fetch error:", expect.any(Error));
        });

        consoleSpy.mockRestore();
    });

    test('не трябва да логва грешка, ако заявката е прекъсната (AbortError)', async () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

        const abortError = new Error('Aborted');
        abortError.name = 'AbortError';

        globalThis.fetch = vi.fn().mockRejectedValueOnce(abortError);

        const { result } = renderHook(() => useInfiniteScroll('/posts'));

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(consoleSpy).not.toHaveBeenCalled();

        consoleSpy.mockRestore();
    });
});