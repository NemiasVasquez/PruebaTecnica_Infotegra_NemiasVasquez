import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { logout as apiLogout } from './apiClient'; 

export const LimpiarDatosLocalStorage=async()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('listaPermisos');
    localStorage.removeItem('nombre');
}

const hasSessionExpired = (lastLogin) => {
    const currentTime = Date.now();
    const sessionTimeLimit = 5 * 60 * 60 * 1000;
    return lastLogin && currentTime - lastLogin >= sessionTimeLimit;
};

const handleLogout = async (navigate, setIsAuthenticated) => {
    const result = await apiLogout();
    if (result.message === 'Logout exitoso') {
        setIsAuthenticated(false);
        alert('Sesión terminada');
    } else {
        alert(result.error || 'Error al cerrar sesión');
    }
};

const initializeSession = (setIsAuthenticated) => {
    setIsAuthenticated(true);
    localStorage.setItem('lastLogin', Date.now()); 
};

const manageSession = (token, setLoading, setIsAuthenticated, navigate) => {
    const lastLogin = localStorage.getItem('lastLogin');
    if (hasSessionExpired(lastLogin)) {
        handleLogout(navigate, setIsAuthenticated);
    } else {
        initializeSession(setIsAuthenticated);
    }
    setLoading(false); 
};

export const ProtectedRoute = ({ children, allowedPermisos }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }
        manageSession(token, setLoading, setIsAuthenticated, navigate);
    }, [token, navigate]);

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

    if (!allowedPermisos.includes(userRole)) {
        alert("No tiene acceso a esta funcionalidad del sistema.");
        return <Navigate to="/administrable" />;
    }

    return children;
};


export const PublicRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (token) {
        return <Navigate to="/administrable" />;
    }

    return children;
};