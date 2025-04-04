import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import CardEquipo from '../Cards/CardEquipo';
import '../../../css/Carrusel.css';
import { recortarPalabras } from '../../Scripts/Functions/Formato/texto';

const CarruselEquipos = ({ data = [], itemsPerSlide = 4, handleClick, id = '', colorFondo = '' }) => {
    const chunkedData = [];
    for (let i = 0; i < data.length; i += itemsPerSlide) {
        chunkedData.push(data.slice(i, i + itemsPerSlide));
    }

    return (
        <div id={`carouselEquipos${id}`} className="carousel slide">
            <div className="carousel-indicators">
                {chunkedData.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        data-bs-target={`#carouselEquipos${id}`}
                        data-bs-slide-to={index}
                        className={index === 0 ? 'active' : ''}
                        aria-current={index === 0 ? 'true' : undefined}
                        aria-label={`Slide ${index + 1}`}
                    ></button>
                ))}
            </div>
            <div className="carousel-inner">
                {chunkedData.map((group, index) => (
                    <div
                        key={index}
                        className={`carousel-item ${index === 0 ? 'active' : ''}`}
                    >
                        <div className="d-flex justify-content-center gap-3 flex-wrap p-3">
                            {group.map((item, i) => (
                                <div
                                    key={i}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        handleClick(item)
                                    }}
                                >
                                    <CardEquipo
                                        data={{
                                            nombre: item.piso ? 'Piso: ' + item.piso : 'Piso: -',
                                            descripcion: recortarPalabras(item.lugar || '', 20),
                                            descripcion2: `${item.estado?.nombre || ''} ${item.marca ? '- ' + item.marca.nombre : ''}`,
                                            // Determina si es Switch o AccessPoint
                                            descripcion3: item.switch?.ip || item.accesspoint?.ip || '-',
                                            descripcion4: item.switch?.mac || item.accesspoint?.mac || '-'
                                        }}
                                        colorFondo={colorFondo.id != null ? item.idDetalles == colorFondo.id ? colorFondo.color : '' : ''}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target={`#carouselEquipos${id}`}
                data-bs-slide="prev"
                style={{ width: '30px' }}
            >
                <i className="fas fa-chevron-left" style={{ fontSize: '30px', color: '#000' }}></i>
                <span className="visually-hidden">Anterior</span>
            </button>
            <button
                className="carousel-control-next"
                type="button"
                data-bs-target={`#carouselEquipos${id}`}
                data-bs-slide="next"
                style={{ width: '30px' }}
            >
                <i className="fas fa-chevron-right" style={{ fontSize: '30px', color: '#000' }}></i>
                <span className="visually-hidden">Siguiente</span>
            </button>
        </div>
    );
};

export default CarruselEquipos;
