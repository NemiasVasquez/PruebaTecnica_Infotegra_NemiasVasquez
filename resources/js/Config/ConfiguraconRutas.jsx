import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { logout as apiLogout } from './apiClient';
import { contienePalabra } from '../Scripts/Functions/Formato/texto'

export const LimpiarDatosLocalStorage = async () => {
    localStorage.clear();
}

const hasSessionExpired = (lastLogin) => {
    const currentTime = Date.now();
    const sessionTimeLimit = 10 * 60 * 60 * 1000  ;// 10 horas en milisegundos
    return lastLogin && currentTime - lastLogin >= sessionTimeLimit;
};

const manageSession = () => {
    const lastLogin = localStorage.getItem('lastLogin');
    if (hasSessionExpired(lastLogin)) {
        alert("Se cerrará la sesión - solo dura 8 horas");
        apiLogout();
    } else {
        localStorage.setItem('lastLogin', Date.now());
    }
};

export const ProtectedRoute = ({ children, allowedPermisos }) => {
    const token = localStorage.getItem('token');
    const listaPermisos = JSON.parse(localStorage.getItem('listaPermisos')) || [];

    useEffect(() => {
       token? manageSession() :''
    }, []);

    if (allowedPermisos.includes('todos')) {
        return children;
    }

    const tieneAcceso = listaPermisos.some(permiso =>
        allowedPermisos.some(allowed => contienePalabra(permiso.nombre, allowed))
    );

    if (!tieneAcceso) {
        alert("No tiene acceso a esta funcionalidad del sistema.")
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