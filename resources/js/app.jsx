import React from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Documentacion from './Pages/Documentacion';
import Administrable from './Pages/Administrable';

import ConsultaApi from './Pages/ConsultaApi';
import ConsultaDB from './Pages/ConsultaDB';

function App() {

    return (

        <BrowserRouter>
            <Routes>

                <Route path='/documentacion' element={<Documentacion />} />

                <Route path='/administrable' element={<Administrable />} />

                <Route path='/consultaApi' element={<ConsultaApi />} />
                <Route path='/consultaDB' element={<ConsultaDB />} />

                <Route path="/*" element={<Navigate to="/administrable" replace />} />
            </Routes>
        </BrowserRouter>

    );
}

export default App;
