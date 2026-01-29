import { test, expect, vi, describe, beforeEach } from 'vitest';
import { render, waitFor, screen, act } from '@testing-library/react';
import UserContext, { UserProvider } from './UserContext.jsx';
import { useContext } from 'react';
import { BrowserRouter } from 'react-router';
import { endPoints } from '../utils/endpoints.js';

const mockRequest = vi.fn();
vi.mock('../hooks/useRequest', () => ({
    useRequest: () => ({ request: mockRequest })
}));

// Тестов компонент за консумация на контекста
const TestComponent = () => {
    const { isAuthenticated, isAdmin, onLogin, onLogout } = useContext(UserContext);

    return (
        <div>
            <div data-testid="auth-status">{isAuthenticated ? 'Logged In' : 'Logged Out'}</div>
            <div data-testid="admin-status">{isAdmin ? 'Is Admin' : 'Not Admin'}</div>
            <button onClick={() => onLogin({ email: 'test@test.com' })}>Влез</button>
            <button onClick={onLogout}>Изход</button>
        </div>
    );
};

// Помощна функция за рендиране с всички нужни провайдъри
const renderWithProviders = (children) => {
    return render(
        <BrowserRouter>
            <UserProvider>
                {children}
            </UserProvider>
        </BrowserRouter>
    );
};

describe('UserContext', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        window.localStorage.clear();
    });

    test('Логва потребителя и създава роля', async () => {
        const fakeUserResponse = { _id: '123', email: 'test@test.com', role: 'admin' };

        mockRequest.mockImplementation((url) => {
            if (url === endPoints.me) {
                return Promise.resolve(null);
            }
            if (url === endPoints.login) {
                return Promise.resolve(fakeUserResponse);
            }
            return Promise.resolve(null);
        });

        renderWithProviders(<TestComponent />);

        const loginBtn = await screen.findByRole('button', { name: 'Влез' });

        await act(async () => {
            loginBtn.click();
        });

        await waitFor(() => {
            expect(screen.getByTestId('auth-status').textContent).toBe('Logged In');
        }, { timeout: 2000 });

        expect(screen.getByTestId('admin-status').textContent).toBe('Is Admin');

        const storedData = JSON.parse(window.localStorage.getItem('auth'));
        expect(storedData.email).toBe('test@test.com');
    });

    test('onLogout изчиства данните при грешка от сървъра', async () => {
        mockRequest.mockRejectedValue(new Error('Logout failed'));

        renderWithProviders(<TestComponent />);

        const logoutBtn = screen.getByText('Изход');

        await act(async () => {
            logoutBtn.click();
        });

        expect(screen.getByTestId('auth-status').textContent).toBe('Logged Out');
    });

    test('Изчиства данните при събитие auth-session-expired', async () => {
        renderWithProviders(<TestComponent />);

        await act(async () => {
            window.dispatchEvent(new Event('auth-session-expired'));
        });

        expect(screen.getByTestId('auth-status').textContent).toBe('Logged Out');
    });
});