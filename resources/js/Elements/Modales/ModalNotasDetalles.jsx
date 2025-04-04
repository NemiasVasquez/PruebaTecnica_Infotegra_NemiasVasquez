import React, { useState } from "react";
import ModalBase from "./ModalBase";
import { formatDateFecha } from "../../Scripts/Functions/Formato/fechas";
const ModalNotasDetalles = ({ cerrarModal, nombreModal, datos, datosComentarios = [], datosMantenimiento = [] }) => {
    const [vistaActual, setVistaActual] = useState("Detalles");

    const comentarios = (datosComentarios || []).map((c, index) => ({
        label: `${formatDateFecha(c.fecha)}`,
        value: c.comentario || "Sin descripción"
    }));

    const mantenimiento = (datosMantenimiento || []).map((m, index) => ({
        label: `${formatDateFecha(m.fecha)}`,
        value: m.nota || "Sin descripción"
    }));

    let datosVista = [];
    if (vistaActual == "Detalles") datosVista = datos;
    else if (vistaActual == "Notas") datosVista = comentarios;
    else if (vistaActual == "Mantenimiento") datosVista = mantenimiento;

    return (
        <ModalBase cerrarModal={cerrarModal} nombreModal={nombreModal} datos={datosVista} exportable={true}>
            <div className="mb-3 d-flex justify-content-between">
                <div>
                    <button
                        className={`btn ${vistaActual == "Detalles" ? "btn-primary" : "btn-light"} mr-2`}
                        onClick={() => setVistaActual("Detalles")}
                    >
                        Detalles
                    </button>
                    <button
                        className={`btn ${vistaActual == "Notas" ? "btn-primary" : "btn-light"} mr-2`}
                        onClick={() => setVistaActual("Notas")}
                    >
                        Notas
                    </button>
                    <button
                        className={`btn ${vistaActual == "Mantenimiento" ? "btn-primary" : "btn-light"}`}
                        onClick={() => setVistaActual("Mantenimiento")}
                    >
                        Mantenimiento
                    </button>
                </div>
            </div>

            {datosVista.length > 0 ? (
                <table className="table table-bordered" style={{ fontSize: "0.95rem" }}>
                    <tbody>
                        {datosVista.map((item, index) => (
                            <tr key={index}>
                                <th style={{
                                    width: "40%",
                                    backgroundColor: index % 2 === 0 ? "#f1f1f1" : "#e0e0e0",
                                    fontWeight: "bold",
                                    textAlign: "left",
                                    padding: "8px"
                                }}>
                                    {item.label}
                                </th>
                                <td style={{ padding: "5px", textAlign: "left" }}>{item.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="text-center text-muted" style={{ fontSize: "1rem", padding: "20px" }}>
                    No hay registros en {vistaActual}.
                </div>
            )}
        </ModalBase>
    );
};

export default ModalNotasDetalles;
