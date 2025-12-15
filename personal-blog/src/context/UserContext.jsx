import { createContext } from "react";
import { endPoints } from "../utils/endpoints.js";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import { useRequest } from "../hooks/useRequest.js";

const UserContext = createContext({
    isAuthenticated: false,
    user: {
        email: '',
        _id: '',
        accessToken: '',
        username: ''
    },
    onRegister() { },
    onLogin() { },
    onLogout() { },
    settingsId: '',
    setSettingsIdHandler() {}
});

export function UserProvider({ children }) {
    const [user, setUser] = useLocalStorage(null, 'auth');

    const [settingsId, setSettingsId] = useLocalStorage(null, 'userSettingsId');

    const setSettingsIdHandler = (id) => {
        setSettingsId(id);
    }

    const { request } = useRequest();

    const onRegister = async (username, email, password) => {
        const result = await request(endPoints.register, 'POST', { username, email, password })

        const loggedUser = {
            email: result.email,
            username: result.username,
            _id: result._id,
            accessToken: result.accessToken
        }

        setUser(loggedUser)
    };

    const onLogin = async (loginData) => {
        const result = await request(endPoints.login, 'POST', loginData);

        const loggedUser = {
            email: result.email,
            username: result.username,
            _id: result._id,
            accessToken: result.accessToken
        }

        setUser(loggedUser);
    };

    const onLogout = async () => {
        try {
            await request(endPoints.logout, 'POST', null);
        } catch (err) {
            if (err.name !== 'AbortError') {
                console.error("Заявката за излизане не бе успешна:", err);
            }
        } finally {
            setUser(null);
            setSettingsId(null)
        }
    };

    const userContextValues = {
        user,
        isAuthenticated: !!user?.accessToken,
        onRegister,
        onLogin,
        onLogout, 
        setSettingsIdHandler,
        settingsId
    };

    return (
        <UserContext.Provider value={userContextValues}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;