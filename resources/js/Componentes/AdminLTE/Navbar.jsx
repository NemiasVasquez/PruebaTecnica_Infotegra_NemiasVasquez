import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';
import ControlSidebar from './ControlSidebar';

const Navbar = () => {
    const [pantallaPequena, setPantallaPequena] = useState(window.innerWidth < 768);
    const [user, setUser] = useState(null);
    const [menuAbiertoCell, setMenuAbiertoCell] = useState(false);
    const [sidebarAbierto, setSidebarAbierto] = useState(false);
    const navigate = useNavigate();

    const getUser = async () => {
        const response = await axios.post('/me', null, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        });
        setUser(response.data);
    };

    const toggleMenuAdmin = () => {
        setMenuAbiertoCell(!menuAbiertoCell);
    };

    const toggleSidebar = () => {
        setSidebarAbierto(!sidebarAbierto);
    };

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

    const handleLogoutAdmin = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('/logout', {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            localStorage.removeItem('token');
            navigate('/login');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <>
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#" role="button">
                            <i className="fas fa-bars"></i>
                        </a>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                            <i className="fas fa-expand-arrows-alt"></i>
                        </a>
                    </li>
                    <li className="nav-item">
                        <div className="bloque_Usuario nav-link">
                            <div className="contenido_bloque_Usuario">
                                <h5 onClick={toggleMenuAdmin}>
                                    {user
                                        ? pantallaPequena
                                            ? `${user.name.charAt(0)}.`
                                            : user.name.substring(0, 15)
                                        : "PerfilUsuario"}
                                </h5>
                                {menuAbiertoCell && (
                                    <ul>
                                        <li>
                                            <button onClick={handleLogoutAdmin}>Cerrar Sesión</button>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            data-widget="control-sidebar"
                            data-controlsidebar-slide="true"
                            href="#"
                            role="button"
                            onClick={toggleSidebar}
                        >
                            <i className="fas fa-th-large"></i>
                        </a>
                    </li>
                </ul>
            </nav>

            {/* Sidebar component */}
            {sidebarAbierto && <ControlSidebar />}
        </>
    );
};

export default Navbar;
