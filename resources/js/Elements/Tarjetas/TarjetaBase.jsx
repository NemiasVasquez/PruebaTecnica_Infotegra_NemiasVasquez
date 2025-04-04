import React from 'react';
import { Link } from 'react-router-dom';

const TarjetaBase = ({ texto, total, enlace, tamañoTarjeta = "small-box", estiloTarjeta, backgroundColor, textColor = "text-white", icono }) => {
    return (
        <div className="col-lg-2 col-md-4 col-6" style={{ padding: "5px", minWidth:'19.5%' }}>
            <div className={`${tamañoTarjeta} ${estiloTarjeta}`} style={{ backgroundColor: backgroundColor }}>
                <div className="inner">
                    <h3 className={textColor}>{total}</h3>
                    <p className={textColor}>{texto}</p>
                </div>
                <div className="icon">
                    <i className={icono} style={{ fontSize: '60px' }}></i>
                </div>
                <Link to={enlace} className="small-box-footer">
                    Detalles <i className="fas fa-arrow-circle-right"></i>
                </Link>
            </div>
        </div>
    );
};

export default TarjetaBase;
