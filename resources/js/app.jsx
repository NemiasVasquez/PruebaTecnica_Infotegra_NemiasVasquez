import './bootstrap';
import React, { useEffect, useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';


import Login from './Componentes/Credenciales/Login';
import Administrable from './Paginas/Administrable';

function App() {

    const ProtectedRoute = ({ children }) => {
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const [loading, setLoading] = useState(true);

        const navigate = useNavigate(); // Hook para manejar la navegación
        const token = localStorage.getItem('token');

        const logout = useCallback(() => {
            localStorage.removeItem('token');
            setIsAuthenticated(false);
            alert('Sesión terminada');
            navigate('/login'); // Redirige al usuario al login
        }, [navigate]);

        const validateToken = useCallback(async () => {
            try {
                await axios.post('/me', {}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setIsAuthenticated(true);
            } catch (error) {
                if (error.response?.status === 401) {
                    // Manejar token inválido
                    logout();
                } else {
                    logout();
                }
            } finally {
                setLoading(false);
            }
        }, [token, logout]);

        useEffect(() => {
            if (!token) {
                setLoading(false);
                return;
            }

            validateToken();
        }, [token, validateToken]);

        if (loading) {
            return (
                <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            );
        }

        if (!isAuthenticated) {
            return <Navigate to="/login" />;
        }

        return children;
    };

    const PublicRoute = ({ children }) => {
        const token = localStorage.getItem('token');

        if (token) {
            return <Navigate to="/administrable" />;
        }

        return children;
    };
 
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/administrable"
                    element={
                        <ProtectedRoute>
                            <Administrable />
                        </ProtectedRoute>
                    }
                />
                <Route path="/*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
