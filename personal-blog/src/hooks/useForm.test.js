import { test, expect, vi, describe } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useForm } from './useForm';

describe('useForm Hook', () => {
    const initialValues = { name: '', email: '' };
    const mockCallback = vi.fn();

    test('Дали тримва изцяло специфични полета (email)', async () => {
        const { result } = renderHook(() => useForm(mockCallback, initialValues));

        act(() => {
            result.current.changeHandler({
                target: { name: 'email', value: '  test@test.com  ' }
            });
        });

        expect(result.current.formValues.email).toBe('test@test.com');
    });

    test('Дали тримва само началото за обикновени полета (title)', () => {
        const { result } = renderHook(() => useForm(mockCallback, initialValues));

        act(() => {
            result.current.changeHandler({
                target: { name: 'title', value: '  My Blog Post  ' }
            });
        });

        expect(result.current.formValues.title).toBe('My Blog Post  ');
    });

    test('formAction трябва да извика callback с текущите данни', () => {
        const { result } = renderHook(() => useForm(mockCallback, initialValues));
        const preventDefault = vi.fn();

        act(() => {
            result.current.formAction({ preventDefault });
        });

        expect(preventDefault).toHaveBeenCalled();
        expect(mockCallback).toHaveBeenCalledWith(initialValues);
    });

    test('fileChangeHandler трябва да записва първия файл', () => {
        const { result } = renderHook(() => useForm(mockCallback, { image: null }));
        const mockFile = new File([''], 'test.png', { type: 'image/png' });

        act(() => {
            result.current.fileChangeHandler({
                target: { name: 'image', files: [mockFile] }
            });
        });

        expect(result.current.formValues.image).toBe(mockFile);
    });

    test('inputPropertiesRegister трябва да връща коректни атрибути за инпут', () => {
        const customInitialValues = { username: 'ivan_p' };
        const { result } = renderHook(() => useForm(mockCallback, customInitialValues));

        const props = result.current.inputPropertiesRegister('username');

        expect(props).toEqual({
            name: 'username',
            value: 'ivan_p',
            onChange: expect.any(Function)
        });
    });

    test('промяна чрез inputPropertiesRegister трябва да обновява състоянието', () => {
        const { result } = renderHook(() => useForm(mockCallback, { username: '' }));

        const props = result.current.inputPropertiesRegister('username');

        act(() => {
            props.onChange({
                target: { name: 'username', value: 'new_user' }
            });
        });

        expect(result.current.formValues.username).toBe('new_user');
    });
});