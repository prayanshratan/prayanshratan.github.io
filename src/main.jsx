import { DataProvider } from './context/DataContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import AppRoutes from './AppRoutes';
import './index.css';

import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <DataProvider>
                <AuthProvider>
                    <ThemeProvider>
                        <AppRoutes />
                    </ThemeProvider>
                </AuthProvider>
            </DataProvider>
        </BrowserRouter>
    </React.StrictMode>,
);
