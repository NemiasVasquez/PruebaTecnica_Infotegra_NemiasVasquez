import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Colores } from "../../Scripts/BibliotecaStyle";
import { menuItems } from "../../Scripts/MenuIntems";
import { contienePalabra } from "../../Scripts/Functions/Formato/texto";
const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1000);
    const [openMenus, setOpenMenus] = useState({});

    useEffect(() => {
        const handleResize = () => setIsSmallScreen(window.innerWidth < 1000);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const userPermisos = JSON.parse(localStorage.getItem('listaPermisos')) || [];

    const userPermisoNombres = userPermisos.map(p => p.nombre.toLowerCase());

    const filteredMenu = menuItems
        .filter(item =>
            item.permisos.some(permiso =>
                userPermisoNombres.some(userPermiso => contienePalabra(userPermiso, permiso.toLowerCase()))
            )
        )
        .map(item => ({
            ...item,
            subItems: item.subItems
                ? item.subItems.filter(sub =>
                    sub.permisos.some(permiso =>
                        userPermisoNombres.some(userPermiso => contienePalabra(userPermiso, permiso.toLowerCase()))
                    )
                )
                : null,
        }))
        .filter(item => !item.subItems || item.subItems.length > 0);

    useEffect(() => {
        setOpenMenus(prevState => {
            const updatedMenus = { ...prevState };

            filteredMenu.forEach(item => {
                if (item.subItems) {
                    item.subItems.forEach(subItem => {
                        if (location.pathname === subItem.path) {
                            updatedMenus[item.name] = true;
                        }
                    });
                }
            });

            return updatedMenus;
        });
    }, [location.pathname]);

    const toggleMenu = (menuName) => {
        setOpenMenus(prevState => ({
            ...prevState,
            [menuName]: !prevState[menuName],
        }));
    };

    const handleNavigation = () => {
        navigate("/administrable");
    };

    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4" style={{
            backgroundColor: Colores["FondoSliderbar"],
            position: "fixed", // Mantiene el Sidebar en pantalla
            top: 0,
            left: 0,
            height: "100vh", // Ocupa toda la altura de la pantalla
            overflowY: "auto", // Permite scroll si hay muchas opciones
            width: "250px", // Ajusta según el ancho que prefieras
            zIndex: 2000
        }}>
            <div className="brand-link" style={{ cursor: "pointer", backgroundColor: Colores["FondoSliderbar"] }}>
                <img
                    src="/LogoSliderbar.png"
                    alt="Logo ECCI"
                    onClick={handleNavigation}
                    className="brand-image img-circle elevation-3"
                    style={{ opacity: 1, padding: '3px' }}

                />
                <span className="brand-text font-weight-light text-white" onClick={handleNavigation} style={{ fontSize: "17px" }}>
                    <strong>Infraestructura Red</strong>
                </span>
                {isSmallScreen && (
                    <a className="nav-link barraCelular" data-widget="pushmenu" role="button">
                        <i style={{ color: Colores["ColorBarraCelular"] }} className="fas fa-bars"></i>
                    </a>
                )}
            </div>

            <div className="sidebar">
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        {filteredMenu.map((item, index) => {
                            const isActiveMenu = location.pathname === item.path || (item.subItems && item.subItems.some(sub => sub.path === location.pathname));

                            return (
                                <li key={index} className={`nav-item ${openMenus[item.name] ? "menu-open" : ""}`} style={{ cursor: "pointer" }}>
                                    {item.subItems ? (
                                        <>
                                            <div
                                                className={`nav-link ${isActiveMenu ? "active-menu" : ""}`}
                                                onClick={() => toggleMenu(item.name)}
                                                style={{
                                                    backgroundColor: isActiveMenu ? Colores['MenuActivo'] : "transparent",
                                                    color: isActiveMenu ? Colores["ColorLetraMenuActivo"] : Colores['ColorLetraMenuInactivo']
                                                }}
                                            >
                                                <p className="mr-1"><FontAwesomeIcon icon={item.icon} /></p>
                                                <p>
                                                    {item.name}
                                                    <i className={`right fas ${openMenus[item.name] ? "fa-angle-down" : "fa-angle-left"}`}></i>
                                                </p>
                                            </div>
                                            <ul className={`nav nav-treeview ${openMenus[item.name] ? "d-block" : "d-none"}`}>
                                                {item.subItems && item.subItems.map((subItem, subIndex) => (
                                                    <li key={subIndex} className="nav-item">
                                                        {subItem.path.startsWith("https") ? (
                                                            <a href={subItem.path} target="_blank" rel="noopener noreferrer" className="nav-link"
                                                                style={{
                                                                    backgroundColor: location.pathname === subItem.path ? Colores['MenuActivo'] : "transparent",
                                                                    color: location.pathname === subItem.path ? Colores['ColorLetraMenuActivo'] : Colores['ColorLetraMenuInactivo']
                                                                }}>
                                                                <i className="far fa-circle nav-icon"></i>
                                                                <p>{subItem.name}</p>
                                                            </a>
                                                        ) : (
                                                            <Link to={subItem.path} className={`nav-link ${location.pathname === subItem.path ? "active-submenu" : ""}`}
                                                                style={{
                                                                    backgroundColor: location.pathname === subItem.path ? Colores['MenuActivo'] : "transparent",
                                                                    color: location.pathname === subItem.path ? Colores['ColorLetraMenuActivo'] : Colores['ColorLetraMenuInactivo']
                                                                }}>
                                                                <i className="far fa-circle nav-icon"></i>
                                                                <p>{subItem.name}</p>
                                                            </Link>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    ) : (
                                        <Link
                                            to={item.path}
                                            className={`nav-link ${isActiveMenu ? "active-menu" : ""}`}
                                            style={{
                                                backgroundColor: isActiveMenu ? Colores['MenuActivo'] : "transparent",
                                                color: isActiveMenu ? Colores['ColorLetraMenuActivo'] : Colores['ColorLetraMenuInactivo']
                                            }}
                                        >
                                            <p className="mr-1"><FontAwesomeIcon icon={item.icon} /></p>

                                            <p>{item.name}</p>
                                        </Link>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
