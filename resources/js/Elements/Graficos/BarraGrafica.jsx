import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { obtenerConfiguracionGrafico } from "./ConfiguracionGraficos";
import CardDashboard from "../Cards/CardDashboard";
import { descargarImagen } from "../../Scripts/Functions/Funcionalidad/descargas";
const BarraGrafica = ({ fechas, nombreGrafico, labels, data, chartType, horizontal, colors, className }) => {
    const canvasRef = useRef(null);
    const chartInstance = useRef(null);
    const [diseño, setDiseño] = useState(chartType ?? 'bar');
    const [orientacion, setOrientacion] = useState(horizontal ?? true);

    const handledCambiarDiseño = () => { diseño == 'bar' ? setDiseño('doughnut') : setDiseño('bar') };

    const handledCambiarOrientacion = () => { setOrientacion(!orientacion) };

    useEffect(() => {
        console.log("Diseño:", diseño, "Orientación:", orientacion);
        const config = obtenerConfiguracionGrafico({ labels, data, chartType: diseño, horizontal: orientacion, colors });
        if (!config) return;
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext("2d");

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, config);

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [labels.join(","), data.join(","), diseño, orientacion, colors?.join(",")]);

    return (
        <CardDashboard tipo={diseño} cambiarDiseño={handledCambiarDiseño} cambiarOrientacion={handledCambiarOrientacion} className={className} nombreGrafico={nombreGrafico} descargarImagen={() => descargarImagen(canvasRef, nombreGrafico)} html={
            labels.length > 0 && data.length > 0 ? (
                <div >
                    <div style={{
                        height: `${Math.max(labels.length * 20, 250) + 20}px`,

                    }}>
                        <canvas ref={canvasRef} />
                    </div>
                </div>
            ) : (
                <p style={{ minHeight: "250px", height: "250px", maxHeight: "250px", maxWidth: "100%" }}
                    className="text-center text-muted d-flex align-items-center justify-content-center">
                    No hay datos para mostrar
                </p>
            )
        } />
    );

};

export default BarraGrafica;
