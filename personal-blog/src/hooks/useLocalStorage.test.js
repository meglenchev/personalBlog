import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';
import { describe, test, expect, beforeEach, vi } from 'vitest';

describe('useLocalStorage hook', () => {
    const key = 'auth';
    const initialData = { id: 1, name: 'Test' };

    beforeEach(() => {
        window.localStorage.clear();
        vi.clearAllMocks();
    });

    test('трябва да започне с initialValue, ако localStorage е празен', () => {
        const { result } = renderHook(() => useLocalStorage(initialData, key));
        expect(result.current[0]).toEqual(initialData);
    });

    test('трябва да зареди съществуващи данни от localStorage', () => {
        const existingData = { id: 99, name: 'Existing' };
        window.localStorage.setItem(key, JSON.stringify(existingData));

        const { result } = renderHook(() => useLocalStorage(initialData, key));
        expect(result.current[0]).toEqual(existingData);
    });

    test('трябва да премахне ключа от localStorage, когато се подаде null', () => {
        const { result } = renderHook(() => useLocalStorage(initialData, key));

        act(() => {
            const setState = result.current[1];
            setState(null);
        });

        expect(result.current[0]).toBeNull();
        expect(window.localStorage.getItem(key)).toBeNull(); // Тук вече е истинско null
    });

    test('трябва да се справи със стринга "null" в localStorage', () => {
        window.localStorage.setItem(key, 'null');
        
        const { result } = renderHook(() => useLocalStorage(initialData, key));
        
        // Трябва да върне initialData вместо "null" стринга
        expect(result.current[0]).toEqual(initialData);
    });

    test('трябва да върне initialValue при невалиден JSON (try-catch блок)', () => {
        window.localStorage.setItem(key, 'invalid-json-{}-');

        const { result } = renderHook(() => useLocalStorage(initialData, key));

        expect(result.current[0]).toEqual(initialData);
    });

    test('трябва да записва нови стойности в localStorage', () => {
        const { result } = renderHook(() => useLocalStorage(initialData, key));
        const newData = { id: 2, name: 'Updated' };

        act(() => {
            result.current[1](newData);
        });

        expect(result.current[0]).toEqual(newData);
        expect(JSON.parse(window.localStorage.getItem(key))).toEqual(newData);
    });
});
