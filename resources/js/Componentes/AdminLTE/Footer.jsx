import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Footer = ({ }) => {

    return (
        <footer className="main-footer">
            <strong> © COESPE Región Lambayeque - Todos los derechos reservados.</strong>
            <div className="float-right d-none d-sm-inline-block">
                <b>Versión</b> 1.0
            </div>
        </footer>
    )
}

export default Footer;