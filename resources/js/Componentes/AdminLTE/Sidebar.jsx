import React, { useState,useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1000);

    const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 1000);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const menuItems = [
        {
            name: 'Gestión Colegiado',
            icon: 'fas fa-graduation-cap',
            subItems: [
                { name: 'Registrar Colegiado', path: '/registrarColegiado' },
                { name: 'Listar Colegiados', path: '/listarColegiados' },
                { name: 'Eliminar Duplicados', path: '/eliminarDuplicados' },
            ],
        },
        {
            name: 'Gestión Categorías',
            path: '/gestion-categorias',
            icon: 'fas fa-list',
        },
        {
            name: 'Gestión Universidades',
            path: '/gestion-universidades',
            icon: 'fas fa-book',
        },
        {
            name: 'Gestión Ubigeos',
            path: '/gestion-ubigeo',
            icon: 'fas fa-map',
        },
    ];

    useEffect(() => {
        const treeview = document.querySelectorAll('[data-widget="treeview"]');
        treeview.forEach((element) => {
            element.addEventListener('click', (event) => {
                if (event.target.closest('.nav-link')) {
                    const item = event.target.closest('.nav-item');
                    if (item) {
                        const submenu = item.querySelector('.nav-treeview');
                        if (submenu) {
                            submenu.classList.toggle('menu-open');
                        }
                    }
                }
            });
        });

        return () => {
            treeview.forEach((element) => {
                element.removeEventListener('click', (event) => { });
            });
        };
    }, []);

    const handleNavigation = () => {
        navigate('/administrable');
    };

    return (
        <aside className="main-sidebar  sidebar-dark-primary elevation-4 ">
            <div className="brand-link" style={{ cursor: 'pointer' }}>
                <img src="/LogoCoespe.png" alt="AdminLTE Logo" onClick={handleNavigation} className="brand-image img-circle elevation-3" style={{ opacity: .8 }} />
                <span className="brand-text font-weight-light text-white " onClick={handleNavigation} style={{ fontSize: "17px" }}>Proyecto Base </span>
                {isSmallScreen && (
                    <a className="nav-link barraCelular" data-widget="pushmenu" href="#" role="button"  >
                        <i className="fas fa-bars"></i>
                    </a>
                )}
            </div>


            <div className="sidebar">

                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        {menuItems.map((item, index) => (
                            <li key={index} className="nav-item menu-open" style={{ cursor: 'pointer' }}>
                                {item.subItems ? (
                                    <>
                                        <div className="nav-link ">
                                            <i className={`nav-icon ${item.icon}`}></i>
                                            <p>
                                                {item.name}
                                                <i className="right fas fa-angle-left"></i>
                                            </p>
                                        </div>
                                        <ul className="nav nav-treeview">
                                            {item.subItems.map((subItem, subIndex) => (
                                                <li key={subIndex} className="nav-item">
                                                    <Link to={subItem.path} className={`nav-link ${location.pathname === subItem.path ? 'active' : ''}`}>
                                                        <i className="far fa-circle nav-icon"></i>
                                                        <p>{subItem.name}</p>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                ) : (
                                    <Link to={item.path} className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}>
                                        <i className={`nav-icon ${item.icon}`}></i>
                                        <p>{item.name}</p>
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
