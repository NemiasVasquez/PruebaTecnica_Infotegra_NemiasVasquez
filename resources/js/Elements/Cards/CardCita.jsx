import React from 'react';
import { Link } from 'react-router-dom';
import { Colores } from '../../Scripts/BibliotecaStyle';
import { toSlug } from '../../Scripts/Functions/Formato/texto';
const CardCita = ({ data, enlace = '', className }) => {
    return (
        <div className={`card ${className}`} style={{ minWidth: '180px' }}>
            <Link to={data.nombreCompleto ? `${enlace}${toSlug(data.nombreCompleto)}` : ''} style={{ textDecoration: 'none' }}>

                <div
                    className="card-header"
                    style={{
                        backgroundColor: Colores['verdeCardCita'],
                        color: Colores['colorLetraCardCita']
                    }}
                >
                    {data.nombre}
                </div>
            </Link>
            <div className="card-body">
                <div className="blockquote mb-0">
                    <p style={{ fontSize: '13px' }}>{data.descripcion || '-'}</p>
                    <footer style={{ fontSize: '13px' }} className="footer">
                        {data.descripcion2 || '-'}
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default CardCita;
