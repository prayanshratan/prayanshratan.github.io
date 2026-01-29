import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import App from './App'; // This is now just the layout for the main page
import Login from './pages/Login';
import Admin from './pages/Admin';
import CaseStudy from './pages/CaseStudy';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) return null; // Or a loading spinner

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route
                path="/admin"
                element={
                    <ProtectedRoute>
                        <Admin />
                    </ProtectedRoute>
                }
            />
            <Route path="/case-studies/:id" element={<CaseStudy />} />
        </Routes>
    );
};

export default AppRoutes;
