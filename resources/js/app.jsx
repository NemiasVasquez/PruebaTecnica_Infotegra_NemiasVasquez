import React from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import NavigateSetter from './Config/NavigateSetter';

import Login from './Pages/Login';

import Documentacion from './Pages/Documentacion';

import Administrable from './Pages/Administrable';

import MiPerfil from './Pages/MiPerfil';

import { ProtectedRoute, PublicRoute } from './Config/ConfiguraconRutas';

function App() {

    const renderProtectedRoute = (path, component, allowedPermisos) => (
        <Route
            path={path}
            element={
                <ProtectedRoute allowedPermisos={allowedPermisos}>
                    {component}
                </ProtectedRoute>
            }
        />
    );

    const renderPublicRoute = (path, component) => (
        <Route
            path={path}
            element={
                <PublicRoute>
                    {component}
                </PublicRoute>
            }
        />
    );

    return (

        <BrowserRouter>
            <Routes>
                
                {renderPublicRoute("/login", <Login />)}

                {/* IMPORTANTE ----> Para poder definir si tiene o no los permisos se debe asignar la palabra dentro del array en renderProtecteRoute */}

                {renderProtectedRoute("/administrable", <Administrable />, ['todos'])}

                {renderProtectedRoute("/perfil", <MiPerfil />, ['todos'])}

                {renderProtectedRoute("/documentacion", <Documentacion />, ['documentación'])}

                <Route path="/*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>

    );
}

export default App;
