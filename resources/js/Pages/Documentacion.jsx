import React from 'react';
import PlantillaBase from '../Elements/PantillaBase';
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { baseUrls } from '../Config/baseUrl';
import '../../css/SwaggerCustom.css';

const Documentacion = () => {
    const apiUrl = baseUrls[0].replace("/api", "");

    const customAuth = {
        requestInterceptor: (req) => {
            const token = localStorage.getItem("token");
            if (token) {
                req.headers['Authorization'] = `Bearer ${token}`;
            }
            return req;
        }
    };

    return (
        <PlantillaBase html={
            <div >

                <h2 style={{ textAlign: "center", color: "#333", fontSize: "24px", marginBottom: "10px" }}>
                    📜 Documentación API
                </h2>
                <SwaggerUI
                    url={`${apiUrl}/docs`}
                    docExpansion="none"
                    defaultModelsExpandDepth={-1}
                    defaultModelExpandDepth={2}
                    requestInterceptor={customAuth.requestInterceptor}
                />
            </div>

        } />
    );
}

export default Documentacion;
