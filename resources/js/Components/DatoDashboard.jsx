import React from 'react';
import { Colores } from '../Scripts/BibliotecaStyle';
const DatoDashboard = ({ texto, valor }) => {
    return (
        <div className="col-6 p-2">
            <div className="border text-center" 
                style={{
                    borderRadius: "1em 1em 0 0",
                    borderColor: "black",
                    borderWidth: "2px",
                    borderBottom: "none", 
                    padding: "8px",
                    textAnchor: "center"
                }}
            >
                <h3>{valor}</h3>
            </div>
            <div 
                style={{
                    backgroundColor: Colores["Verde"],
                    color: "white",
                    textAlign: "center",
                    padding: "8px",
                    borderRadius: "0 0 1em 1em",
                    border: "1px solid black",
                    fontSize: "14px"
                }}
            >
                <p className="mb-0">{texto}</p>
            </div>
        </div>
    );
    
}

export default DatoDashboard;