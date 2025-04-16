import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Colores } from "../../Scripts/BibliotecaStyle";
import { menuItems } from "../../Scripts/MenuIntems";
import '../../../css/Siderbar.css';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1000);

    useEffect(() => {
        const handleResize = () => setIsSmallScreen(window.innerWidth < 1000);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <aside className="siderbar main-sidebar sidebar-dark-primary elevation-4" style={{ backgroundColor: Colores["FondoSliderbar"] }}>
            <div className="brand-link" style={{ cursor: "pointer", backgroundColor: Colores["FondoSliderbar"] }}>

                <img src="/LogoSliderbar.png" alt="Infotegra" onClick={() => navigate("/administrable")} className="brand-image img-circle elevation-3"/>

                <span className="font-weight-light" onClick={() => navigate("/administrable")} style={{ fontSize: "17px" }}>
                    <strong>Prueba técnica</strong>
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

                        {menuItems.map((item, index) => {

                            const isActiveMenu = location.pathname === item.path || (item.subItems && item.subItems.some(sub => sub.path === location.pathname));

                            return (
                                <li key={index} className={`nav-item`} style={{ cursor: "pointer" }}>
                                    <Link to={item.path} className={`nav-link ${isActiveMenu ? "active-menu" : ""}`}
                                        style={{
                                            backgroundColor: isActiveMenu ? Colores['MenuActivo'] : "transparent",
                                            color: isActiveMenu ? Colores['ColorLetraMenuActivo'] : Colores['ColorLetraMenuInactivo']
                                        }}
                                    >
                                        <p className="mr-1"><FontAwesomeIcon className="mr-1" icon={item.icon} />{item.name}</p>
                                    </Link>
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