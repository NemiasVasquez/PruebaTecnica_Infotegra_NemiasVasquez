import React from 'react';
import { Colores } from '../../Scripts/BibliotecaStyle';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="main-footer" style={{ backgroundColor: Colores["Crema"], borderTop: "2px solid #FFF" }}>
            <strong>© TIC - ECCI {year} - Todos los derechos reservados.</strong>
            <div className="float-right d-none d-sm-inline-block">
                <b>Versión</b> 1.0
            </div>
        </footer>
    );
}

export default Footer;
