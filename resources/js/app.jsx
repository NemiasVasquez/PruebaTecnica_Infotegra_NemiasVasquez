import './Config/bootstrap';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './Pages/Login';

import Documentacion from './Pages/Documentacion';

import { ProtectedRoute } from './Config/ConfiguraconRutas';
import { PublicRoute } from './Config/ConfiguraconRutas';

function App() {

    const renderProtectedRoute = (path, component, allowedRoles) => (
        <Route
            path={path}
            element={
                <ProtectedRoute allowedRoles={allowedRoles}>
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

                {renderProtectedRoute("/documentacion", <Documentacion />, [1])}

                <Route path="/*" element={<Navigate to="/login" replace />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
