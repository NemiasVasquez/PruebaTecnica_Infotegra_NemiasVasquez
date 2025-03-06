import React from 'react';
import { Colores } from '../Scripts/BibliotecaStyle';
import * as XLSX from 'xlsx';

const ModalDetal = ({ cerrarModal, nombreModal, datos }) => {
    if (!datos || datos.length === 0) return null;

    // Función para exportar a Excel
    const exportToExcel = () => {
        if (!datos || datos.length === 0) return;

        // Obtener el primer elemento del array y formatearlo para el nombre del archivo
        const firstItemName = datos[0]?.value?.toString().replace(/[^a-zA-Z0-9_-]/g, "_") || "archivo";

        // Transformar los datos a un formato de tabla vertical
        const formattedData = datos.map(item => [item.label, item.value]);

        // Crear una nueva hoja de cálculo y agregar los datos verticalmente
        const ws = XLSX.utils.aoa_to_sheet([["Campo", "Valor"], ...formattedData]);

        // Crear y exportar el archivo
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Detalles");
        XLSX.writeFile(wb, `${firstItemName}_${nombreModal}.xlsx`);
    };


    return (
        <div className="modal fade show" style={{
            display: "block",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1050,
            backdropFilter: "blur(4px)"
        }} aria-modal="true" role="dialog">
            <div className="modal-dialog modal-lg" style={{ maxWidth: "600px" }}>
                <div className="modal-content" style={{ backgroundColor: Colores["Crema"], borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }}>

                    {/* Header */}
                    <div className="modal-header" style={{ borderBottom: "2px solid #ddd", padding: "12px 20px" }}>
                        <h5 className="modal-title" style={{ fontWeight: "bold", color: "#333" }}>{nombreModal}</h5>
                        <button type="button" className="close" onClick={cerrarModal} style={{ fontSize: "1.5rem", border: "none", background: "none" }}>
                            &times;
                        </button>
                    </div>

                    {/* Cuerpo con scroll */}
                    <div className="modal-body" style={{ maxHeight: "400px", overflowY: "auto", padding: "15px 20px" }}>
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
                    </div>

                    {/* Footer con botón de exportar */}
                    <div className="modal-footer" style={{ borderTop: "2px solid #ddd", padding: "12px 20px", textAlign: "right" }}>
                        <button type="button" className="btn btn-success" onClick={exportToExcel} style={{ padding: "8px 16px", borderRadius: "6px", marginRight: "10px" }}>
                            📥 Exportar a Excel
                        </button>
                        <button type="button" className="btn btn-dark" onClick={cerrarModal} style={{ padding: "8px 16px", borderRadius: "6px" }}>
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalDetal;
