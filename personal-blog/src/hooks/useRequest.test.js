import { test, expect, vi, describe } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useRequest } from './useRequest.js';

describe('useRequest hook', () => {
    test('Добавяне на Content-Type хедър и тяло при наличие на данни', async () => {
        const mockFetch = vi.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: () => Promise.resolve({ success: true }),
        });

        vi.stubGlobal('fetch', mockFetch);

        const { result } = renderHook(() => useRequest());
        const postData = { name: 'Test' };

        await result.current.request('/blogs', 'POST', postData);

        const fetchOptions = mockFetch.mock.calls[0][1];

        expect(fetchOptions.headers['Content-Type']).toBe('application/json');
        expect(fetchOptions.body).toBe(JSON.stringify(postData));
        expect(fetchOptions.credentials).toBe('include');
    });

    test('Грешка със съобщение от сървъра при неуспешен отговор', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: false,
            status: 400,
            json: () => Promise.resolve({ message: 'Грешка от сървъра' }),
        }));

        const { result } = renderHook(() => useRequest());

        await expect(result.current.request('/bad-path')).rejects.toThrow('Грешка от сървъра');
    });

    test('Дали включва credentials: "include" в конфигурацията на fetch', async () => {
        const mockFetch = vi.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: () => Promise.resolve({}),
        });

        vi.stubGlobal('fetch', mockFetch);

        const { result } = renderHook(() => useRequest());

        await result.current.request('/settings/edit');

        const fetchArgs = mockFetch.mock.calls[0][1];

        expect(fetchArgs.credentials).toBe('include');
    });

    test('Трябва да излъчи auth-session-expired при статус 401', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: false,
            status: 401,
            json: () => Promise.resolve({ message: 'Session expired' }),
        }));

        const dispatchSpy = vi.spyOn(window, 'dispatchEvent');
        const { result } = renderHook(() => useRequest());

        await expect(result.current.request('/settings/edit')).rejects.toThrow();

        expect(dispatchSpy).toHaveBeenCalledWith(
            expect.objectContaining({ type: 'auth-session-expired' })
        );
    });

    test('Връща null при статус 204', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            status: 204,
        }));

        const { result } = renderHook(() => useRequest());
        const data = await result.current.request('/delete-something');

        expect(data).toBeNull();
    });
});