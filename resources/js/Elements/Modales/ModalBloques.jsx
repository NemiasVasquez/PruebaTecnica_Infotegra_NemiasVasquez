import React, { useState } from "react";
import { Colores } from "../../Scripts/BibliotecaStyle";
import { formatDate } from "../../Scripts/Functions/Formato/fechas";
const ModalBloques = ({ cerrarModal, nombreModal, datos, enviarPromocion, datosVisita }) => {
    const [promoSeleccionada, setPromoSeleccionada] = useState(null);
    return (
        <div className="modal fade show"
            style={{
                display: "block",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 1050,
                backdropFilter: "blur(4px)"
            }}
            aria-modal="true"
            role="dialog"
        >
            <div className="modal-dialog modal-lg" style={{ maxWidth: "600px" }}>
                <div className="modal-content"
                    style={{
                        backgroundColor: Colores["Crema"],
                        borderRadius: "10px",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)"
                    }}
                >
                    {/* Header */}
                    <div className="modal-header" style={{ borderBottom: "2px solid #ddd", padding: "12px 20px" }}>
                        <h5 className="modal-title" style={{ fontWeight: "bold", color: "#333" }}>
                            {nombreModal}
                        </h5>

                        <button type="button" className="close" onClick={cerrarModal}
                            style={{ fontSize: "1.5rem", border: "none", background: "none" }}>
                            &times;
                        </button>
                    </div>

                    {/* Cuerpo del modal */}
                    <div className="modal-body" style={{ maxHeight: "400px", overflowY: "auto", padding: "15px 20px" }}>
                        <p>Tiene acomulado: <strong>{datosVisita.puntos} puntos(s)</strong></p>
                        {datos && datos.length > 0 ? (
                            <div style={{
                                display: "grid",
                                gridTemplateColumns: "1fr",
                                gap: "10px"
                            }}>
                                {datos.map((promo) => (
                                    <div
                                        key={promo.id}
                                        onClick={() => {
                                            setPromoSeleccionada(promo.id);
                                            console.log("ID de promoción seleccionada:", promo.id);
                                        }}
                                        style={{
                                            cursor: "pointer",
                                            padding: "12px",
                                            borderRadius: "8px",
                                            backgroundColor: promoSeleccionada === promo.id ? "#FFD700" : "#fff",
                                            boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
                                            border: "2px solid " + (promoSeleccionada === promo.id ? "#FFB300" : "#ddd"),
                                            transition: "all 0.2s ease-in-out"
                                        }}
                                    >
                                        <h5>{promo.nombre}</h5>
                                        <p>{promo.descripcion}</p>
                                        <p style={{ fontSize: "12px", color: "#888" }}>
                                            Válido desde: <strong>{formatDate(promo.fecha_inicio)}</strong> hasta <strong>{formatDate(promo.fecha_fin)}</strong>
                                        </p>
                                        {promo.monto_minimo && (
                                            <p style={{ fontSize: "12px", color: "#555" }}>
                                                🔹 Mínimo de consumo: s/<strong>{promo.monto_minimo}</strong>
                                            </p>
                                        )}
                                        {promo.porcentaje_descuento && (
                                            <p style={{ fontSize: "12px", color: "#555" }}>
                                                🔹 Porcentaje de descuento: <strong>{promo.porcentaje_descuento}%</strong>
                                            </p>
                                        )}
                                        {promo.visitas_requeridas && (
                                            <p style={{ fontSize: "12px", color: "#555" }}>
                                                🔹 Requiere <strong>{promo.visitas_requeridas}</strong> punto(s)
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p style={{ textAlign: "center", color: "#555" }}>No hay promociones disponibles.</p>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-success" onClick={() => enviarPromocion(promoSeleccionada)}>
                            Reclamar Promoción
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalBloques;
