import React, { useState, useEffect } from 'react';
import PlantillaBase from '../Elements/PantillaBase';
import {obtenerPermisosGenerales} from '../Scripts/Functions/Datos/almacenamiento'

import { getData } from '../Scripts/Functions/Datos/petionesApi';
const Administrable = () => {
    const [dataDashBoard, setDataDashboard] = useState([]);

    useEffect(() => {
        obtenerPermisosGenerales();
        getData('/obtenerDatosDashboard').then(res => setDataDashboard(res))
    }, []);

    return (
        <PlantillaBase
            html={
                <div className="container-fluid">
                   Dashboard
                </div>
            }
        />
    );
};

export default Administrable;
