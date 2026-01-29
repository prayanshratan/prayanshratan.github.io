import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for session cookie on load
        const session = Cookies.get('admin_session');
        if (session) {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    const login = (username, password) => {
        // In a real app, verify against a backend
        // IMPORTANT: Client-side env checks are not perfectly secure, but sufficient for a personal portfolio
        // hosted on Vercel if we accept the risk of bundle inspection.
        // Ideally, we'd use a serverless function.

        // Using import.meta.env for Vite
        const adminUser = import.meta.env.VITE_ADMIN_USER || 'admin';
        const adminPass = import.meta.env.VITE_ADMIN_PASSWORD || 'P@ssword1';

        if (username === adminUser && password === adminPass) {
            Cookies.set('admin_session', 'true', { expires: 1 }); // 1 day expiry
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        Cookies.remove('admin_session');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
