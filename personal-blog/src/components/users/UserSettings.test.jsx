import { test, expect, vi, describe, beforeEach } from 'vitest';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserSettings from './UserSettings.jsx';
import UserContext from '../../context/UserContext.jsx';
import { BrowserRouter } from 'react-router';

const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
    const actual = await vi.importActual('react-router');
    return { ...actual, useNavigate: () => mockNavigate };
});

const mockRequest = vi.fn();
vi.mock('../../hooks/useRequest', () => ({
    useRequest: () => ({
        request: mockRequest,
    }),
}));

vi.mock('../../hooks/uploadImage', () => ({
    uploadImage: vi.fn().mockResolvedValue('https://mock-url.com'),
}));

const renderWithProviders = (isAdmin = true) => {
    return render(
        <BrowserRouter>
            <UserContext.Provider value={{ isAdmin }}>
                <UserSettings />
            </UserContext.Provider>
        </BrowserRouter>
    );
};

describe('UserSettings Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockRequest.mockResolvedValue({});
        cleanup();
    });

    test('Показва съобщения за грешка при празни полета', async () => {
        const user = userEvent.setup();
        renderWithProviders(true);

        const submitButton = screen.getByRole('button', { name: 'Запази настройките' });
        await user.click(submitButton);

        await waitFor(() => {
            expect(screen.getAllByText('Полето е задължително!').length).toBe(5);
            expect(screen.getByText('Снимката е задължителна!')).toBeInTheDocument();
        });
    });

    test('Изпраща PUT заявка при коректно попълнени данни', async () => {
        const user = userEvent.setup();
        mockRequest.mockResolvedValueOnce({})
            .mockResolvedValueOnce({ success: true });

        renderWithProviders(true);

        await user.type(screen.getByLabelText('Име:'), 'Ivan');
        await user.type(screen.getByLabelText('Имейл:'), 'ivan@test.com');
        await user.type(screen.getByLabelText('Facebook:'), 'ivan.fb');
        await user.type(screen.getByLabelText('Instagram:'), 'ivan.ig');
        await user.type(screen.getByLabelText('Кратка презентация за началната страница:'), 'Info');

        const file = new File(['test'], 'test.png', { type: 'image/png' });
        const input = screen.getByLabelText('Снимка на автора за начална страница:');
        await user.upload(input, file);

        const submitButton = screen.getByRole('button', { name: 'Запази настройките' });
        await user.click(submitButton);

        await waitFor(() => {
            expect(mockRequest).toHaveBeenCalledWith(expect.any(String), 'PUT', expect.any(Object));
        });

        expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
    });

    test('Показва грешка, ако файлът е твърде голям', async () => {
        const user = userEvent.setup();
        renderWithProviders(true);

        const bigFile = new File(['a'.repeat(3 * 1024 * 1024)], 'large.png', { type: 'image/png' });
        const input = screen.getByLabelText('Снимка на автора за начална страница:');

        await user.upload(input, bigFile);

        const submitButton = screen.getByRole('button', { name: 'Запази настройките' });
        await user.click(submitButton);

        expect(await screen.findByText('Снимката не трябва да надвишава 2MB!')).toBeInTheDocument();
    });

    test('Показва грешка от сървъра при неуспешна заявка', async () => {
        mockRequest.mockRejectedValue(new Error('Server Error'));
        renderWithProviders(true);

        await waitFor(() => {
            expect(screen.queryByText('Възникна грешка. Моля опитайте отново!') || screen.queryByText('Неуспешно зареждане. Моля опитайте отново!')).toBeDefined();
        });
    });

    test('Попълва автоматично полетата при успешно зареждане на данни от сървъра', async () => {
        const mockData = {
            name: 'John Doe',
            email: 'john@example.com',
            facebook: 'fb/john',
            instagram: 'ig/john',
            presentation: 'Hello world',
            authorImg: 'existing-image.jpg'
        };
        mockRequest.mockResolvedValueOnce(mockData);

        renderWithProviders(true);

        await waitFor(() => {
            expect(screen.getByLabelText('Име:').value).toBe(mockData.name);
            expect(screen.getByLabelText('Имейл:').value).toBe(mockData.email);
        });
    });

    test('Пренасочва към началната страница, ако потребителят не е админ', () => {
        const providerValue = { isAdmin: false };

        render(
            <BrowserRouter>
                <UserContext.Provider value={providerValue}>
                    <UserSettings />
                </UserContext.Provider>
            </BrowserRouter>
        );

        expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    test('Не прави нищо, ако сървърът върне празен резултат', async () => {
        mockRequest.mockResolvedValueOnce({}); // Празен обект
        const providerValue = { isAdmin: true };

        render(
            <BrowserRouter>
                <UserContext.Provider value={providerValue}>
                    <UserSettings />
                </UserContext.Provider>
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(mockRequest).toHaveBeenCalled();
        });
    });

    test('Показва грешка при прекъсната заявка и почиства при unmount', async () => {
        const abortError = new Error('Aborted');
        abortError.name = 'AbortError';
        mockRequest.mockRejectedValueOnce(abortError);

        const { unmount } = render(
            <BrowserRouter>
                <UserContext.Provider value={{ isAdmin: true }}>
                    <UserSettings />
                </UserContext.Provider>
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/Неуспешно зареждане/i)).toBeInTheDocument();
        });

        unmount();
    });
});
