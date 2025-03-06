import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Colores } from "../../Scripts/BibliotecaStyle";

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

    const userRole = parseInt(localStorage.getItem("rol_id")) || 1;

    //permisos:
    //Se debe consultar los permisos registrados.



    const menuItems = [
        {
            name: "Gestión",
            icon: "fas fa-tablets",
            permisos: [1, 3],
            subItems: [
                { name: "Mesas", path: "/gestionMesas", permisos: [1, 3] },
                { name: "Tipos de mesas", path: "/gestionTipoMesas", permisos: [1, 3] },
            ],
        },

        {
            name: "Ventas y facturas", path: "https://sistemafacturacion.appexia.cloud/",
            icon: "fas fa-money-check",
            permisos: [1, 3]
        },

        {
            name: "Gestión de Platos",
            icon: "fas fa-utensils",
            permisos: [1, 3],
            subItems: [
                { name: "Platos", path: "/gestionProductos", permisos: [1, 3] },
                { name: "Categorías platos", path: "/gestionCategorias", permisos: [1, 3] },
            ],
        },
        {
            name: "Gestión de Insumos",
            icon: "fas fa-drumstick-bite",
            permisos: [1, 2, 3],
            subItems: [
                { name: "Insumos", path: "/gestionInsumo", permisos: [1, 2] },
                { name: "Categorías Insumos", path: "/gestionCategoriaInsumo", permisos: [1, 2] },
            ],
        },

        { name: "Gestión promociones", path: "/gestionPromocion", icon: "fas fa-tag", permisos: [1, 3] },


        { name: "Gestión empleados", path: "/gestionEmpleados", icon: "fas fa-users", permisos: [1] },


        { name: "Documentación API", path: "/documentacion", icon: "fas fa-microchip", permisos: [1] },
    ];

    const filteredMenu = menuItems
        .filter(item => item.permisos.includes(userRole))
        .map(item => ({
            ...item,
            subItems: item.subItems ? item.subItems.filter(sub => sub.permisos.includes(userRole)) : null,
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
            backgroundColor: Colores["Verde"],
            position: "fixed", // Mantiene el Sidebar en pantalla
            top: 0,
            left: 0,
            height: "100vh", // Ocupa toda la altura de la pantalla
            overflowY: "auto", // Permite scroll si hay muchas opciones
            width: "250px", // Ajusta según el ancho que prefieras
            zIndex: 2000
        }}>
            <div className="brand-link" style={{ cursor: "pointer", backgroundColor: Colores["Verde"] }}>
                <img
                    src="/LogoSystemFood.png"
                    alt="AppexIA- restaurante Logo"
                    onClick={handleNavigation}
                    className="brand-image img-circle elevation-3"
                    style={{ opacity: 1 }}
                />
                <span className="brand-text font-weight-light text-white" onClick={handleNavigation} style={{ fontSize: "17px" }}>
                    TIC - ECCI
                </span>
                {isSmallScreen && (
                    <a className="nav-link barraCelular" data-widget="pushmenu" role="button">
                        <i style={{ color: "#fff" }} className="fas fa-bars"></i>
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
                                                    backgroundColor: isActiveMenu ? "#28a745" : "transparent",
                                                    color: isActiveMenu ? "white" : "#c2c7d0"
                                                }}
                                            >
                                                <i className={`nav-icon ${item.icon}`}></i>
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
                                                                    backgroundColor: location.pathname === subItem.path ? "#28a745" : "transparent",
                                                                    color: location.pathname === subItem.path ? "white" : "#f8f9fa"
                                                                }}>
                                                                <i className="far fa-circle nav-icon"></i>
                                                                <p>{subItem.name}</p>
                                                            </a>
                                                        ) : (
                                                            <Link to={subItem.path} className={`nav-link ${location.pathname === subItem.path ? "active-submenu" : ""}`}
                                                                style={{
                                                                    backgroundColor: location.pathname === subItem.path ? "#28a745" : "transparent",
                                                                    color: location.pathname === subItem.path ? "white" : "#f8f9fa"
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
                                                backgroundColor: isActiveMenu ? "#28a745" : "transparent",
                                                color: isActiveMenu ? "white" : "#c2c7d0"
                                            }}
                                        >
                                            <i className={`nav-icon ${item.icon}`}></i>
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
