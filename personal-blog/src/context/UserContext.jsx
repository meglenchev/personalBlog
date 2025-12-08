import { createContext } from "react";
import { useRequest } from "../components/hooks/useRequest.js";
import { endPoints } from "../utils/endpoints.js";
import { useLocalStorage } from "../components/hooks/useLocalStorage.js";

const UserContext = createContext({
    isAuthenticated: false,
    user: {
        email: '',
        _id: '',
        accessToken: ''
    },
    onRegister() { },
    onLogin() { },
});

export function UserProvider({ children }) {
    const [user, setUser] = useLocalStorage(null, 'auth');

    const { request } = useRequest();

    const onRegister = async (username, email, password) => {
        const result = await request(endPoints.register, 'POST', { username, email, password })

        const loggedUser = {
            email: result.email, 
            name: result.username, 
            _id: result._id, 
            accessToken: result.accessToken
        }

        setUser(loggedUser)
    };

    const onLogin = async (loginData) => {
        const result = await request(endPoints.login, 'POST', loginData);

        const loggedUser = {
            email: result.email, 
            name: result.username, 
            _id: result._id, 
            accessToken: result.accessToken
        }

        setUser(loggedUser);
    };

    const userContextValues = {
        user,
        isAuthenticated: !!user?.accessToken,
        onRegister,
        onLogin,
    };

    return (
        <UserContext.Provider value={userContextValues}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;