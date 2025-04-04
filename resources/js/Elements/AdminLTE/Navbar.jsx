import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate } from "react-router-dom";
import '../../../css/Navbar.css';
import { logout } from '../../Config/apiClient';
import { Colores } from '../../Scripts/BibliotecaStyle';
const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [pantallaPequena, setPantallaPequena] = useState(window.innerWidth < 500);
    const [user, setUser] = useState(null);
    const [menuAbiertoCell, setMenuAbiertoCell] = useState(false);

    const getUser = async () => {
        const nombre = localStorage.getItem('usuario')
        nombre ? setUser(nombre) : setUser("usuario")
    };

    const toggleMenuAdmin = () => {
        setMenuAbiertoCell(!menuAbiertoCell);
    };

    const miPerfil = () => {
        navigate("/perfil");
    }

    useEffect(() => {
        getUser();
        const handleResizeAdmin = () => {
            setPantallaPequena(window.innerWidth < 500);
        };
        window.addEventListener('resize', handleResizeAdmin);
        return () => {
            window.removeEventListener('resize', handleResizeAdmin);
        };
    }, []);

    return (
        <>
            <nav className="main-header navbar navbar-expand" style={{ backgroundColor: Colores['FondoNavbar'] }}>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#" role="button">
                            <i style={{ color: Colores['ColorLetraNavbar'] }} className="fas fa-bars"></i>
                        </a>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="fullscreen" role="button">
                            <i style={{ color: Colores['ColorLetraNavbar'] }} className="fas fa-expand-arrows-alt"></i>
                        </a>
                    </li>
                    <li className="nav-item">
                        <div className="bloque_Usuario nav-link">
                            <div className="contenido_bloque_Usuario">
                                <h5 onClick={toggleMenuAdmin}>
                                    {user
                                        ? pantallaPequena
                                            ? `${user.charAt(0)}.`
                                            : user.substring(0, 15)
                                        : "PerfilUsuario"}
                                </h5>
                                {menuAbiertoCell && (
                                    <ul>
                                        <li>
                                            <button onClick={miPerfil}>Mi Perfil</button>
                                        </li>
                                        <li>
                                            <button onClick={() => { logout() }}>Cerrar Sesión</button>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Navbar;
