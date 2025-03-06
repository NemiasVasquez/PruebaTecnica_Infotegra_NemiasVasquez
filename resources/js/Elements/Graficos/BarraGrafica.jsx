import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import { obtenerConfiguracionGrafico } from "./ConfiguracionGraficos";
import CardDashboard from "../../Components/CardDashboard";

const BarraGrafica = ({ fechas, nombreGrafico, labels, data, chartType, horizontal, colors, className }) => {
    const canvasRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        const config = obtenerConfiguracionGrafico({ labels, data, chartType, horizontal, colors });
        if (!config) return;

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
    }, [labels.join(","), data.join(","), chartType, horizontal, colors?.join(",")]);

    const descargarImagen = () => {
        if (!canvasRef.current) return;
        const url = canvasRef.current.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = url;
        link.download = `${nombreGrafico} - ${fechas.fecha1} - ${fechas.fecha2}.png`;
        link.click();
    };

    return (
        <CardDashboard className={className} nombreGrafico={nombreGrafico} descargarImagen={descargarImagen} html={
            labels.length > 0 && data.length > 0 ? (
                <div style={{
                    width: "100%",
                    overflowY: "auto",
                    maxHeight: "250px",
                    paddingBottom: "20px",
                    scrollbarWidth: "none", 
                    msOverflowStyle: "none" 
                }}>
                    <div style={{
                        height: `${Math.max(labels.length * 30, 250) + 20}px`,
                        width: "100%",
                        padding: "5px"
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
