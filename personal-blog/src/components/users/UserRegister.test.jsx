import { test, describe, beforeEach, expect, vi } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router';
import UserRegister from './UserRegister.jsx';
import UserContext from '../../context/UserContext.jsx';

const mockNavigate = vi.fn();

vi.mock('react-router', async () => {
    const actual = await vi.importActual('react-router');
    return { ...actual, useNavigate: () => mockNavigate };
});

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

describe('UserRegister Component', () => {
    const mockOnRegister = vi.fn();
    const providerValue = { isAuthenticated: false, onRegister: mockOnRegister };

    beforeEach(() => {
        vi.clearAllMocks();
        cleanup();
    });

    test('Показва съобщения за грешка при празни задължителни полета', async () => {
        const user = userEvent.setup();
        renderWithProviders(<UserRegister />, { providerValue });

        const submitButton = screen.getByRole('button', { name: 'Регистрация' });
        await user.click(submitButton);

        expect(screen.getByText('Името е задължително!')).toBeInTheDocument();
        expect(screen.getByText('Имейла е задължителен!')).toBeInTheDocument();
        expect(screen.getByText('Паролата е задължителена!')).toBeInTheDocument();
        expect(mockOnRegister).not.toHaveBeenCalled();
    });

    test('Показване на грешка, когато паролите не съвпадат', async () => {
        const user = userEvent.setup();
        renderWithProviders(<UserRegister />, { providerValue });

        const submitButton = screen.getByRole('button', { name: 'Регистрация' });

        await user.type(screen.getByLabelText('Потребител:'), 'Ivan');
        await user.type(screen.getByLabelText('Имейл:'), 'ivan@test.com');
        await user.type(screen.getByLabelText('Парола:'), 'password123');
        await user.type(screen.getByLabelText('Потвърдете паролата:'), 'differentPassword');

        await user.click(submitButton);

        expect(screen.getByText('Паролите не съвпадат!')).toBeInTheDocument();
        expect(mockOnRegister).not.toHaveBeenCalled();
    });

    test('Извиква onRegister с правилните параметри при валидни данни', async () => {
        const user = userEvent.setup();
        renderWithProviders(<UserRegister />, { providerValue });

        const submitButton = screen.getByRole('button', { name: 'Регистрация' });

        await user.type(screen.getByLabelText('Потребител:'), 'Ivan');
        await user.type(screen.getByLabelText('Имейл:'), 'ivan@test.com');
        await user.type(screen.getByLabelText('Парола:'), 'password123');
        await user.type(screen.getByLabelText('Потвърдете паролата:'), 'password123');

        await user.click(submitButton);

        expect(mockOnRegister).toHaveBeenCalledWith('Ivan', 'ivan@test.com', 'password123', 'password123');
        expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
    });

    test('Показване на сървърна грешка при неуспешна регистрация', async () => {
        const user = userEvent.setup();
        mockOnRegister.mockRejectedValueOnce(new Error('Registration failed'));
        renderWithProviders(<UserRegister />, { providerValue });

        const submitButton = screen.getByRole('button', { name: 'Регистрация' });

        await user.type(screen.getByLabelText('Потребител:'), 'Ivan');
        await user.type(screen.getByLabelText('Имейл:'), 'ivan@test.com');
        await user.type(screen.getByLabelText('Парола:'), 'password123');
        await user.type(screen.getByLabelText('Потвърдете паролата:'), 'password123');

        await user.click(submitButton);

        const serverErr = await screen.findByText('Регистрацията беше неуспешна. Опитайте отново!');
        expect(serverErr).toBeInTheDocument();
    });

    test('пренасочва автоматично, ако потребителят вече е логнат', async () => {
        const user = userEvent.setup();

        mockOnRegister.mockResolvedValueOnce({});
        renderWithProviders(<UserRegister />, { providerValue });

        const submitButton = screen.getByRole('button', { name: 'Регистрация' });

        await user.type(screen.getByLabelText('Потребител:'), 'Ivan');
        await user.type(screen.getByLabelText('Имейл:'), 'ivan@test.com');
        await user.type(screen.getByLabelText('Парола:'), 'password123');
        await user.type(screen.getByLabelText('Потвърдете паролата:'), 'password123');

        await user.click(submitButton);

        expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
    });

    test('Пренасочва към началната страница, ако потребителят вече е логнат', () => {
        delete window.location;
        window.location = { pathname: '/register' };

        const loggedInValue = { isAuthenticated: true, onRegister: vi.fn() };

        render(
            <BrowserRouter>
                <UserContext.Provider value={loggedInValue}>
                    <UserRegister />
                </UserContext.Provider>
            </BrowserRouter>
        );

        expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
    });

    test('Показва грешка при невалиден формат на имейла', async () => {
        const user = userEvent.setup();
        renderWithProviders(<UserRegister />, { providerValue });

        await user.type(screen.getByLabelText('Потребител:'), 'Ivan');
        await user.type(screen.getByLabelText('Имейл:'), 'ivan@test');
        await user.type(screen.getByLabelText('Парола:'), '123456');
        await user.type(screen.getByLabelText('Потвърдете паролата:'), '123456');

        const submitButton = screen.getByRole('button', { name: 'Регистрация' });
        await user.click(submitButton);

        const errorMsg = await screen.findByText((content, element) => {
            return element.tagName.toLowerCase() === 'span' && content.includes('Имейл формата е неправилен!');
        });

        expect(errorMsg).toBeInTheDocument();
        expect(errorMsg).toHaveClass('error-text');
    });
});