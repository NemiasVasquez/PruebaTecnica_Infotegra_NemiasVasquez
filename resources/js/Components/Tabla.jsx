import React from 'react';

const Tabla = ({ cabecera, datos, alignColumns = {} }) => {
    return (
        <div className="table-responsive" style={{ maxHeight: "450px", overflowY: "auto" }}>
            <table className="table table-hover table-striped table-bordered">
                <thead>
                    <tr>
                        {cabecera.map((item, index) => (
                            <th key={index}>{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {datos.map((item, index) => (
                        <tr key={index}>
                            {Object.values(item).map((value, index2) => (
                                <td key={index2} style={{ textAlign: alignColumns[index2] || "left" }}>
                                    {value}
                                </td>
                            ))}
                        </tr>
                    ))}
                    {!datos.length && (
                        <tr>
                            <td colSpan={cabecera.length}>No hay datos disponibles.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Tabla;
