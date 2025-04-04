import React from "react";
import ModalBase from "./ModalBase"; // Importamos el modal base

const ModalDetalles = ({ cerrarModal, nombreModal, datos }) => {
    if (!datos || datos.length === 0) return null;

    return (
        <ModalBase cerrarModal={cerrarModal} nombreModal={nombreModal} datos={datos} exportable={true}>
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
        </ModalBase>
    );
};

export default ModalDetalles;
