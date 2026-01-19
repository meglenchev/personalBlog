import { createContext, useEffect, useCallback } from "react";
import { endPoints } from "../utils/endpoints.js";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import { useRequest } from "../hooks/useRequest.js";
import { useState } from "react";

const UserContext = createContext({
    user: null,
    isAuthenticated: false,
    userRoles: null,
    isAdmin: false,
    isLoading: true,
    onRegister: () => { },
    onLogin: () => { },
    onLogout: () => { },
});

export function UserProvider({ children }) {
    const [user, setUser] = useLocalStorage(null, 'auth');
    const [userRoles, setUserRoles] = useState(null);
    const [isLoading, setIsLoading] = useState(!!user?._id);

    const { request } = useRequest();

    // Функция за локално изчистване на данните (LocalStorage)
    const clearUserData = useCallback(() => {
        setUser(null);
        setUserRoles(null);
    }, [setUser]);

    // Функция за синхронизация със сървъра (взема ролята от httpOnly бисквитката)
    const verifySession = useCallback(async () => {
        try {
            const result = await request(endPoints.me, 'GET', null);

            if (result) {
                setUserRoles(result.role ? result.role : null);
                setUser({
                    email: result.email,
                    _id: result._id,
                })
            }

        } catch (err) {
            console.error("Session verification failed:", err.message);
        } finally {
            setIsLoading(false);
        }
    }, [request, setUser]);

    useEffect(() => {
        if (user?._id) {
            verifySession();
        } else {
            setIsLoading(false);
        }
    }, []);

    // Слушател за изтекла сесия (401 от сървъра)
    useEffect(() => {
        const handleSessionExpired = () => {
            clearUserData();
        };

        window.addEventListener('auth-session-expired', handleSessionExpired);

        return () => {
            window.removeEventListener('auth-session-expired', handleSessionExpired);
        };
    }, [clearUserData]);

    // Регистрационна функция
    const onRegister = async (username, email, password, confirmPassword) => {
        const result = await request(endPoints.register, 'POST', { username, email, password, confirmPassword });

        const loggedUser = {
            email: result.email,
            _id: result._id,
        };

        setUserRoles(result.role)

        setUser(loggedUser);
    };

    // Логин функция
    const onLogin = async (loginData) => {
        const result = await request(endPoints.login, 'POST', loginData);

        const loggedUser = {
            email: result.email,
            _id: result._id,
        };

        setUserRoles(result.role)

        setUser(loggedUser);
    };

    // Логаут функция
    const onLogout = async () => {
        try {
            await request(endPoints.logout, 'POST', null);
        } catch (err) {
            if (err.name !== 'AbortError') {
                console.error("Грешка при излизане:", err);
            }
        } finally {
            // Винаги чистим локалните данни, дори ако заявката към сървъра се провали
            clearUserData();
        }
    };

    // Контекст стойности
    const userContextValues = {
        user,
        isAuthenticated: !!user?._id,
        userRoles,
        isAdmin: userRoles === 'admin',
        isLoading,
        onRegister,
        onLogin,
        onLogout,
    };

    return (
        <UserContext.Provider value={userContextValues}>
            {!isLoading && children}
        </UserContext.Provider>
    );
}

export default UserContext;
