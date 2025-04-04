import React from "react";
import { Colores } from "../../Scripts/BibliotecaStyle";

const ModalGenerico = ({ cerrarModal, nombreModal, children }) => {
    return (
        <div className="modal fade show" style={{
            display: "block",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 3050,
            backdropFilter: "blur(4px)"
        }} aria-modal="true" role="dialog">
            <div className="modal-dialog modal-lg" style={{ maxWidth: "600px" }}>
                <div className="modal-content" style={{
                    backgroundColor: Colores["backGroundModal"],
                    borderRadius: "10px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)"
                }}>
                    {/* Header */}
                    <div className="modal-header" style={{ borderBottom: "2px solid #ddd", padding: "12px 20px", backgroundColor:Colores["headerModal"] }}>
                        <h5 className="modal-title" style={{ fontWeight: "bold", color: Colores['textHeaderModal'] }}>{nombreModal}</h5>
                        <button type="button" className="close" onClick={cerrarModal} style={{ fontSize: "1.5rem", border: "none", background: 'none' }}>
                            &times;
                        </button>
                    </div>

                    {/* Body (Contenido dinámico) */}
                    <div className="modal-body" style={{ maxHeight: "400px", overflowY: "auto", padding: "15px 20px", backgroundColor:Colores['backgroundCuerpoModal'] }}>
                        {children}
                    </div>

                    {/* Footer */}
                    <div className="modal-footer" style={{ borderTop: "2px solid #ddd", padding: "12px 20px", textAlign: "right", backgroundColor:Colores['backgroundFooterModal'] }}>
                        <button type="button" className="btn btn-dark" onClick={cerrarModal} style={{ padding: "8px 16px", borderRadius: "6px" }}>
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalGenerico;
