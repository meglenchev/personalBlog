import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router';
import { UserProvider } from './context/UserContext.jsx';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <StrictMode>
            <UserProvider>
                <App />
            </UserProvider>
        </StrictMode>
    </BrowserRouter>
)
