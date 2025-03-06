import React, { useState, useEffect } from "react";
import Sidebar from "./AdminLTE/Sidebar";
import Navbar from "./AdminLTE/Navbar";
import Footer from "./AdminLTE/Footer";
import Preload from "./AdminLTE/Preload";

const PlantillaBase = ({ html }) => {
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoader(false);
        }, 1300); // 1.3 segundos de carga

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="wrapper" >
            <Navbar />
            <Sidebar />

            <div className="content-wrapper pt-4 position-relative" style={{
                //minHeight: "85vh",
                backgroundColor: "#FFEED5",
                //marginLeft: "250px", // Deja espacio para el Sidebar fijo
                //marginTop: "50px", // Deja espacio para el Navbar fijo
                //overflowY: "auto", // Permite desplazamiento solo en el contenido
                padding: "20px"
            }}>
                {showLoader && (
                    <div
                        className="overlay d-flex justify-content-center align-items-center"
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "100%",
                            height: "110%",
                            backgroundColor: "rgba(255, 255, 255, 1)",
                            zIndex: 10,
                        }}
                    >
                        <Preload />
                    </div>
                )}
                {html}
            </div>

            <Footer />
        </div>
    );
};

export default PlantillaBase;
