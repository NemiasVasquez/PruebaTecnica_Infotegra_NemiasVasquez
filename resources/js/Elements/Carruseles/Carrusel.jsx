import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import CardCita from '../Cards/CardCita';
import '../../../css/Carrusel.css';
const Carrusel = ({ data = [], itemsPerSlide = 4, enlace }) => {

    const chunkedData = [];
    for (let i = 0; i < data.length; i += itemsPerSlide) {
        chunkedData.push(data.slice(i, i + itemsPerSlide));
    }

    return (
        <div id="carouselExampleIndicators" className="carousel slide">
            <div className="carousel-indicators">
                {chunkedData.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
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
                                <CardCita
                                    key={i}
                                    data={item}
                                    enlace={enlace}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
                style={{ width: '30px' }}
            >
                <i className="fas fa-chevron-left" style={{ fontSize: '30px', color: '#000', }}></i>
                <span className="visually-hidden">Anterior</span>
            </button>
            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
                style={{ width: '30px' }}
            >
                <i className="fas fa-chevron-right" style={{ fontSize: '30px', color: '#000' }}></i>
                <span className="visually-hidden">Siguiente</span>
            </button>

        </div>
    );
};

export default Carrusel;
