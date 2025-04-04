import React from 'react';
import { Colores } from '../../Scripts/BibliotecaStyle';

const CardEquipo = ({ data, colorFondo }) => {
    return (
        <div className={`card `} style={{ minWidth: '180px' }}>
            <div
                className="card-header"
                style={{
                    backgroundColor: Colores['verdeCardCita'],
                    color: Colores['colorLetraCardCita'],

                }}
            >
                {data.nombre}
            </div>
            <div className="card-body" style={{ backgroundColor: colorFondo }}>
                <div className="blockquote mb-0">
                    <p style={{ fontSize: '13px' }}>{data.descripcion || '-'}</p>
                    <footer style={{ fontSize: '13px' }} className="footer">
                        <strong>{data.descripcion2 || '-'}</strong>
                        {data.descripcion3 !== '-' && <><br />{data.descripcion3}</>}
                        {data.descripcion4 !== '-' && <><br />{data.descripcion4}</>}
                    </footer>
                </div>
            </div>

        </div>
    );
};

export default CardEquipo;
