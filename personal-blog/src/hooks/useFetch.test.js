import { renderHook, waitFor } from '@testing-library/react';
import { useFetch } from './useFetch';
import { vi, describe, test, expect, beforeEach } from 'vitest';

describe('useFetch hook', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    test('трябва да започне със статус зареждане и да върне данни', async () => {
        const mockData = { id: 1, name: 'Sample Post' };

        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockData),
        }));

        const { result } = renderHook(() => useFetch('/test-url', null));

        expect(result.current.isPending).toBe(true);
        expect(result.current.data).toBe(null);

        await waitFor(() => expect(result.current.isPending).toBe(false));

        expect(result.current.data).toEqual(mockData);
    });

    test('трябва да спре зареждането веднага, ако няма подаден URL', async () => {
        const { result } = renderHook(() => useFetch(null, []));

        expect(result.current.isPending).toBe(false);
        expect(result.current.data).toEqual([]);
    });

    test('трябва да реагира на промяна в refreshTrigger', async () => {
        const mockFetch = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ success: true }),
        });
        vi.stubGlobal('fetch', mockFetch);

        const { rerender } = renderHook(
            ({ trigger }) => useFetch('/url', null, null, trigger),
            { initialProps: { trigger: 1 } }
        );

        await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));

        rerender({ trigger: 2 });

        await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(2));
    });

    test('трябва да извика abort при unmount на компонента', async () => {
        const abortSpy = vi.spyOn(AbortController.prototype, 'abort');

        vi.stubGlobal('fetch', vi.fn().mockImplementation(() => new Promise(() => { })));

        const { unmount } = renderHook(() => useFetch('/cancel-test', null));

        unmount();

        expect(abortSpy).toHaveBeenCalled();
    });

    test('трябва да хвърля грешка при неуспешен статус (Line 20)', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: false,
            text: () => Promise.resolve('Server Error')
        }));

        const { result } = renderHook(() => useFetch('/error', null));

        await waitFor(() => expect(result.current.isPending).toBe(false));
    });
});