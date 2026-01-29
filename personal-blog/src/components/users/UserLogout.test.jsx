import { test, expect, vi, describe, beforeEach } from 'vitest';
import { render, waitFor, screen } from '@testing-library/react';
import { UserLogout } from './UserLogout.jsx';
import UserContext from '../../context/UserContext.jsx';
import { BrowserRouter } from 'react-router';

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

describe('UserLogout Component', () => {
    const mockOnLogout = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('Успешно излизане и пренасочване към страницата за вход', async () => {
        mockOnLogout.mockResolvedValueOnce();
        
        renderWithProviders(<UserLogout />, { providerValue: { onLogout: mockOnLogout } });

        expect(mockOnLogout).toHaveBeenCalledTimes(1);

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/pb-admin/login');
        });
    });

    test('Грешка при излизане и показване на модален прозорец', async () => {
        mockOnLogout.mockRejectedValueOnce(new Error('Logout failed'));

        renderWithProviders(<UserLogout />, { providerValue: { onLogout: mockOnLogout } });

        const errorModal = await screen.findByText('Заявката за излизане не бе успешна!');
        expect(errorModal).toBeInTheDocument();
    });

    test('Затваряне на модалния прозорец и пренасочване към началната страница', async () => {
        mockOnLogout.mockRejectedValueOnce(new Error('Logout failed'));

        renderWithProviders(<UserLogout />, { providerValue: { onLogout: mockOnLogout } });

        const okButton = await screen.findByRole('button', { name: 'ОК' });
        
        okButton.click();

        expect(mockNavigate).toHaveBeenCalledWith('/');
    });
});