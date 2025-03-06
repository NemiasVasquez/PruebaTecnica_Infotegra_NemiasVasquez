import React, { useState, useEffect } from 'react';
import PlantillaBase from '../Elements/PantillaBase';
import BarraGrafica from '../Elements/Graficos/BarraGrafica';
import { enviarFormulario } from '../Config/apiClient';
import BuscarFechas from '../Elements/Graficos/BuscadorFechas';
import { validateFechasDashboard } from '../Scripts/Validaciones'
import DatoDashboard from '../Components/DatoDashboard';
import CardDashboard from '../Components/CardDashboard';
const Administrable = () => {

    const [dataCMV, setDataCMV] = useState([]);//Data de Categorias mas vendidas
    const [dataVPD, setDataVPD] = useState([]);//Data Ventas Por Dia
    const [dataMPD, setDataMPD] = useState([]);//Data Mesas Por Dias
    const [data4DD, setData4DD] = useState([]);//data 4 Datos Dashboard

    const today = new Date();
    const fechaActual = today.toISOString().split("T")[0];

    const pastDate = new Date();
    pastDate.setDate(today.getDate() - 7);
    const fechaPasada = pastDate.toISOString().split("T")[0];

    const storageKey = "dashboardData";

    const obtenerFechasDesdeLocalStorage = () => {
        const storedData = localStorage.getItem(storageKey);
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            return {
                fecha1: parsedData.fechas.fecha1,
                fecha2: parsedData.fechas.fecha2,
            };
        }
        return { fecha1: fechaPasada, fecha2: fechaActual }; 
    };

    const [fechas, setFechas] = useState(obtenerFechasDesdeLocalStorage());

    const obtenerDatosLocalStorage = (fechas) => {
        const storedData = localStorage.getItem(storageKey);
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            if (parsedData.fechas.fecha1 === fechas.fecha1 && parsedData.fechas.fecha2 === fechas.fecha2) {
                return parsedData;
            }
        }
        return null;
    };

    const guardarDatosLocalStorage = (fechas, response) => {
        const newData = {
            fechas,
            ventas_por_categoria: response.ventas_por_categoria,
            ventas_por_dia: response.ventas_por_dia,
            uso_mesas: response.uso_mesas,
            datos_dashboard: response.datos_dashboard
        };
        localStorage.setItem(storageKey, JSON.stringify(newData));
    };

    const buscarDatosDesdeAPI = async () => {
        if (!validateFechasDashboard(fechas)) {
            setFechas({ fecha1: fechaPasada, fecha2: fechaActual });
            return;
        }

        const localData = obtenerDatosLocalStorage(fechas);
        if (localData) {
            setDataCMV(localData.ventas_por_categoria);
            setDataVPD(localData.ventas_por_dia);
            setDataMPD(localData.uso_mesas);
            setData4DD(localData.datos_dashboard);
            return;
        }

        const response = await enviarFormulario("/datosDsahboardCompleto", fechas);

        guardarDatosLocalStorage(fechas, response);

        setDataCMV(response.ventas_por_categoria);
        setDataVPD(response.ventas_por_dia);
        setDataMPD(response.uso_mesas);
        setData4DD(response.datos_dashboard);
    };

    const buscarDatos = (e) => {
        e.preventDefault();
        buscarDatosDesdeAPI();
    };

    useEffect(() => {
        buscarDatosDesdeAPI();
    }, []);

    return (
        <PlantillaBase
            html={
                <div className="container-fluid">
                    <BuscarFechas fechas={fechas} setChange={setFechas} funcionBuscar={buscarDatos} />

                    <div className="row g-3 mt-4">
                        <div className="col-12 col-md-6">
                            <BarraGrafica
                                nombreGrafico="Categorías más vendidas"
                                labels={dataCMV.map((item) => item.categoria)}
                                data={dataCMV.map((item) => Number(item.total_vendidos))}
                                chartType="bar"
                                horizontal={true}
                                fechas={fechas}
                            />
                        </div>
                        <div className="col-12 col-md-6">
                            <BarraGrafica
                                nombreGrafico="Ventas por día"
                                labels={dataVPD.map((item) => item.fecha)}
                                data={dataVPD.map((item) => Number(item.total))}
                                chartType="bar"
                                horizontal={true}
                                fechas={fechas}
                            />
                        </div>
                        <div className="col-12 col-md-6">
                            <BarraGrafica
                                nombreGrafico="Tipos de mesas más usadas"
                                labels={dataMPD.map((item) => item.tipo_mesa)}
                                data={dataMPD.map((item) => Number(item.total_mesas_usadas))}
                                chartType="doughnut"
                                horizontal={true}
                                fechas={fechas}
                            />
                        </div>

                        <CardDashboard className={"col-12 col-md-6 d-flex flex-wrap"} nombreGrafico={"Informes generales"} html={
                            <div className="d-flex flex-wrap">
                                <DatoDashboard texto="Productos vendidos" valor={data4DD.total_productos_vendidos} />
                                <DatoDashboard texto="Promociones activadas" valor={data4DD.promociones_activadas} />
                                <DatoDashboard texto="Mesas atendidas" valor={data4DD.mesas_atendidas} />
                                <DatoDashboard texto="Promedio de ventas" valor={`S/${data4DD.promedio_ventas}`} />
                            </div>
                        } />
                    </div>
                </div>
            }
        />
    );
};

export default Administrable;
