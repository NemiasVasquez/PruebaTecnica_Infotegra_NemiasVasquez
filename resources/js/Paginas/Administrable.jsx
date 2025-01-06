import React, { useEffect } from 'react';
import Sidebar from '../Componentes/AdminLTE/Sidebar';
import Navbar from '../Componentes/AdminLTE/Navbar';

import Footer from '../Componentes/AdminLTE/Footer';
import ControlSidebar from '../Componentes/AdminLTE/ControlSidebar';

const Administrable = () => {

    return (
        <div className="wrapper">
            <Navbar />
            <Sidebar />
            <div className="content-wrapper d-flex justify-content-center align-items-center" style={{ minHeight: '85vh' }}>
                <h5 className="text-center p-3">
                    Sistema gestor de colegiados para el registro y control del colegio estadístico de Lambayeque.
                </h5>
            </div>
            <Footer />
            <ControlSidebar />
        </div>
    );
};

export default Administrable;
