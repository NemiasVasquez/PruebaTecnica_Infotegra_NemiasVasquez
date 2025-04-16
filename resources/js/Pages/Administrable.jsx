import React, { useState, useEffect } from 'react';
import PlantillaBase from '../Elements/PantillaBase';
import Card from '../Elements/Cards/Card';
const Administrable = () => {

    return (
        <PlantillaBase
            html={
                <div className="d-flex justify-content-center align-items-center">
                    <Card texto={"Info"}
                        cardStyle={"card-info"}
                        codigoHtml={
                            <div className='d-flex justify-content-center'>
                                <p className='text-center'> Se presenta el desarrollo de la prueba técnica para la empresa Infotegra realizada por Nemias Vasquez</p>
                            </div>
                        } />
                </div>
            }
        />
    );
};

export default Administrable;
