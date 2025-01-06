import React, { useState, useEffect } from 'react';

const ControlSidebar = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [layoutNavbarFixed, setLayoutNavbarFixed] = useState(true);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [layoutFixed, setLayoutFixed] = useState(true);
    const [sidebarMiniXs, setSidebarMiniXs] = useState(false);
    const [navChildIndent, setNavChildIndent] = useState(false);
    const [footerFixed, setFooterFixed] = useState(true);
    const [textSmBody, setTextSmBody] = useState(false);
    const [textSmHeader, setTextSmHeader] = useState(false);
    const [textSmBrand, setTextSmBrand] = useState(false);
    const [textSmSidebar, setTextSmSidebar] = useState(false);
    const [textSmFooter, setTextSmFooter] = useState(false);

    const [navbarColor, setNavbarColor] = useState('navbar-dark');
    const [brandColor, setBrandColor] = useState('navbar-dark');

    const navbarColors = [
        'navbar-primary', 'navbar-secondary', 'navbar-info', 'navbar-success',
        'navbar-danger', 'navbar-indigo', 'navbar-purple', 'navbar-navy',
        'navbar-lightblue', 'navbar-teal', 'navbar-cyan', 'navbar-dark', 
        'navbar-gray-dark', 'navbar-gray', 'navbar-light', 'navbar-warning', 
        'navbar-white', 'navbar-orange'
    ];

    useEffect(() => {
        document.body.classList.toggle('dark-mode', darkMode);
        document.body.classList.toggle('layout-navbar-fixed', layoutNavbarFixed);
        document.body.classList.toggle('sidebar-collapse', sidebarCollapsed);
        document.body.classList.toggle('layout-fixed', layoutFixed);
        document.body.classList.toggle('sidebar-mini-xs', sidebarMiniXs);
        document.querySelector('.nav-sidebar')?.classList.toggle('nav-child-indent', navChildIndent);
        document.body.classList.toggle('layout-footer-fixed', footerFixed);
        document.body.classList.toggle('text-sm', textSmBody);
        document.querySelector('.main-header')?.classList.toggle('text-sm', textSmHeader);
        document.querySelector('.brand-link')?.classList.toggle('text-sm', textSmBrand);
        document.querySelector('.nav-sidebar')?.classList.toggle('text-sm', textSmSidebar);
        document.querySelector('.main-footer')?.classList.toggle('text-sm', textSmFooter);

        const mainHeader = document.querySelector('.main-header');
        const brandLink = document.querySelector('.brand-link');

        navbarColors.forEach(color => {
            mainHeader?.classList.remove(color);
            brandLink?.classList.remove(color);
        });

        mainHeader?.classList.add(navbarColor);
        brandLink?.classList.add(brandColor);

    }, [
        darkMode, layoutNavbarFixed, sidebarCollapsed, layoutFixed, sidebarMiniXs,
        navChildIndent, footerFixed, textSmBody, textSmHeader, textSmBrand,
        textSmSidebar, textSmFooter, navbarColor, brandColor
    ]);

    return (
        <aside className="control-sidebar control-sidebar-dark">
            <div className="p-3 control-sidebar-content">
                <h5>Personalizar</h5>
                <hr className="mb-2" />

                <div className="mb-4">
                    <label>
                        <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                        <span className="ml-2">Modo oscuro</span>
                    </label>
                </div>

                <h6>Opciones de cabecera</h6>
                <div className="mb-1">
                    <label>
                        <input type="checkbox" checked={layoutNavbarFixed} onChange={() => setLayoutNavbarFixed(!layoutNavbarFixed)} />
                        <span className="ml-2">Fijo</span>
                    </label>
                </div>

                <h6>Opciones de barra lateral</h6>
                <div className="mb-1">
                    <label>
                        <input type="checkbox" checked={sidebarCollapsed} onChange={() => setSidebarCollapsed(!sidebarCollapsed)} />
                        <span className="ml-2">Colapsar</span>
                    </label>
                </div>
                <div className="mb-1">
                    <label>
                        <input type="checkbox" checked={layoutFixed} onChange={() => setLayoutFixed(!layoutFixed)} />
                        <span className="ml-2">Fijo</span>
                    </label>
                </div>
                <div className="mb-1">
                    <label>
                        <input type="checkbox" checked={sidebarMiniXs} onChange={() => setSidebarMiniXs(!sidebarMiniXs)} />
                        <span className="ml-2">Mini pequeña</span>
                    </label>
                </div>

                <h6>Opciones de pie de página</h6>
                <div className="mb-4">
                    <label>
                        <input type="checkbox" checked={footerFixed} onChange={() => setFooterFixed(!footerFixed)} />
                        <span className="ml-2">Fijo</span>
                    </label>
                </div>

                <h6>Opciones de texto pequeño</h6>
                <div className="mb-1">
                    <label>
                        <input type="checkbox" checked={textSmBody} onChange={() => setTextSmBody(!textSmBody)} />
                        <span className="ml-2">Cuerpo del sitio</span>
                    </label>
                </div>
                <div className="mb-1">
                    <label>
                        <input type="checkbox" checked={textSmHeader} onChange={() => setTextSmHeader(!textSmHeader)} />
                        <span className="ml-2">Barra de navegación</span>
                    </label>
                </div>

                <h6>Color del sitio</h6>
                <p>Barra de navegación</p>
                <select value={navbarColor} onChange={(e) => setNavbarColor(e.target.value)} className="custom-select mb-3 text-light border-0 text-dark">
                    {navbarColors.map(color => (
                        <option key={color} value={color} className={color}>
                            {color.replace('navbar-', '').replace('-', ' ')}
                        </option>
                    ))}
                </select>

                <p>Logotipo de la marca</p>
                <select value={brandColor} onChange={(e) => setBrandColor(e.target.value)} className="custom-select mb-3 text-light border-0 text-dark">
                    {navbarColors.map(color => (
                        <option key={color} value={color} className={color}>
                            {color.replace('navbar-', '').replace('-', ' ')}
                        </option>
                    ))}
                </select>
            </div>
        </aside>
    );
};

export default ControlSidebar;
