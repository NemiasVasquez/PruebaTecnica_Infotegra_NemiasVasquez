import React, { useState } from "react";
import ModalBase from "./ModalBase"; // Importamos el modal base

const ModalNotas = ({ cerrarModal, nombreModal, datosComentarios = [], datosMantenimiento = [] }) => {
    const [vistaActual, setVistaActual] = useState("Comentarios");
    const datos = vistaActual === "Comentarios" ? datosComentarios : datosMantenimiento;

    return (
        <ModalBase cerrarModal={cerrarModal} nombreModal={nombreModal} datos={datos} exportable={true}>
            <div className="mb-3">
                <button className={`btn ${vistaActual === "Comentarios" ? "btn-primary" : "btn-light"}`} onClick={() => setVistaActual("Comentarios")}>Comentarios</button>
                <button className={`btn ${vistaActual === "Mantenimiento" ? "btn-primary" : "btn-light"} ml-2`} onClick={() => setVistaActual("Mantenimiento")}>Mantenimiento</button>
            </div>

            {datos.length > 0 ? (
                <table className="table table-bordered" style={{ fontSize: "0.95rem" }}>
                    <tbody>
                        {datos.map((item, index) => (
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

export default ModalNotas;
