import { test, describe, beforeEach, expect, vi } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router';
import { UserLogin } from './UserLogin.jsx';
import UserContext from '../../context/UserContext.jsx';


// Помощна функция за рендиране с всички нужни провайдъри
const renderWithProviders = (ui, { providerValue }) => {
    return render(
        <BrowserRouter>
            <UserContext.Provider value={providerValue}>
                {ui}
            </UserContext.Provider>
        </BrowserRouter>
    );
};

const mockOnLogin = vi.fn();

const mockNavigate = vi.fn();

vi.mock('react-router', async () => {
    const actual = await vi.importActual('react-router');
    return { ...actual, useNavigate: () => mockNavigate };
});

describe('UserLogin Component', () => {
    const providerValue = { onLogin: mockOnLogin };

    beforeEach(() => {
        vi.clearAllMocks();
        cleanup();
    });

    test('Показва грешки при празни полета и не извиква onLogin', async () => {
        const user = userEvent.setup();
        renderWithProviders(<UserLogin />, { providerValue });

        const submitButton = screen.getByRole('button', { name: 'Влез' });
        await user.click(submitButton);

        expect(screen.getByText('Имейла е задължителен!')).toBeInTheDocument();
        expect(screen.getByText('Паролата е задължителна!')).toBeInTheDocument();
        expect(mockOnLogin).not.toHaveBeenCalled();
    });

    test('Показва грешка при невалиден имейл формат и не извиква onLogin', async () => {
        const user = userEvent.setup();
        renderWithProviders(<UserLogin />, { providerValue });

        const emailInput = screen.getByPlaceholderText('Имейл');
        const submitButton = screen.getByRole('button', { name: 'Влез' });

        await user.type(emailInput, 'invalid-email');
        await user.click(submitButton);

        expect(screen.getByText('Имейл формата е неправилен!')).toBeInTheDocument();
    });

    test('Успешно извикване на onLogin при валидни данни', async () => {
        const user = userEvent.setup();
        renderWithProviders(<UserLogin />, { providerValue });

        const emailInput = screen.getByPlaceholderText('Имейл');
        const passwordInput = screen.getByPlaceholderText('Парола');
        const submitButton = screen.getByRole('button', { name: 'Влез' });

        await user.type(emailInput, 'test@example.com');
        await user.type(passwordInput, '123456');
        await user.click(submitButton);

        expect(mockOnLogin).toHaveBeenCalledWith({
            email: 'test@example.com',
            password: '123456'
        });
    });

    test('Показва сървърна грешка при неуспешен вход', async () => {
        const user = userEvent.setup();
        // Симулираме грешка от API-то
        mockOnLogin.mockRejectedValueOnce(new Error('Invalid credentials'));
        renderWithProviders(<UserLogin />, { providerValue });

        const emailInput = screen.getByPlaceholderText('Имейл');
        const passwordInput = screen.getByPlaceholderText('Парола');
        const submitButton = screen.getByRole('button', { name: 'Влез' });

        await user.type(emailInput, 'wrong@example.com');
        await user.type(passwordInput, 'wrongpassword');
        await user.click(submitButton);

        const errorDiv = await screen.findByText('Грешен имейл или парола. Опитайте отново!');

        expect(errorDiv).toBeInTheDocument();
    });

    test('променя заглавието на документа при зареждане', () => {
        renderWithProviders(<UserLogin />, { providerValue });
        expect(document.title).toBe('Вход');
    });

    test('Пренасочва към началната страница след успешен вход', async () => {
        const user = userEvent.setup();

        mockOnLogin.mockResolvedValueOnce({});

        renderWithProviders(<UserLogin />, { providerValue });

        await user.type(screen.getByPlaceholderText('Имейл'), 'test@example.com');
        await user.type(screen.getByPlaceholderText('Парола'), 'password123');

        await user.click(screen.getByRole('button', { name: 'Влез' }));

        expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
    });
});