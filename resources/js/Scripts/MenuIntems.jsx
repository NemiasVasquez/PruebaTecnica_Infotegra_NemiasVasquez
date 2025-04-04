import { faDesktop, faSitemap, faCircleNodes, faFileInvoice, faMicrochip, faScrewdriverWrench, faUsers, faEthernet, faWind } from "@fortawesome/free-solid-svg-icons";

//permisos:
//Se debe consultar los permisos registrados.

export const menuItems = [
    {
        name: "Gestión Equipos",
        icon: faDesktop,
        permisos: ['Switch', 'AP', 'Routers', 'Ups','Aires'],
        subItems: [
            { name: "Switch", path: "/gestionSwitches", permisos: ['Switch'] },
            { name: "Access Point", path: "/gestionAccessPoints", permisos: ['AP'] },
            { name: "Router", path: "/gestionRouters", permisos: ['Routers'] },
            { name: "Ups", path: "/gestionUps", permisos: ['Ups'] },
            { name: "Aires", path: "/gestionAires", permisos: ['Aires'] },
        ],
    },
    {
        name: "Gestión Sedes",
        path: "/gestionSedes",
        icon: faSitemap,
        permisos: ['general'],
    },

    {
        name: "Composición de Red",
        path: "/composicionRed",
        icon: faEthernet,
        permisos: ['Red'],
    },

    {
        name: "Gestión de soporte",
        path: "/gestionarSoporte",
        icon: faScrewdriverWrench,
        permisos: ['soporte'],
    },
    {
        name: "Gestión general",
        icon: faCircleNodes,
        permisos: ['general'],
        subItems: [
            { name: "Marcas", path: "/gestionMarcas", permisos: ['general'] },
            { name: "Estados", path: "/gestionEstados", permisos: ['general'] },
            { name: "Propietarios", path: "/gestionPropietarios", permisos: ['general'] },
            { name: "Funciones de Red", path: "/gestionFuncionesRed", permisos: ['general'] },
        ],
    },
    {
        name: "Gestión de usuarios",
        path: "/gestionUsuarios",
        icon: faUsers,
        permisos: ['Usuarios'],
    },
    {
        name: "Reportes",
        icon: faFileInvoice,
        permisos: ['reportes'],
        subItems: [
            { name: "Basado en sedes", path: "/reportePorSedes", permisos: ['reportes'] },
            { name: "Basado en equipos", path: "/reportePorEquipos", permisos: ['reportes'] },
            { name: "Basado en estados", path: "/reportePorEstados", permisos: ['reportes'] },
        ],
    },
    {
        name: "Documentación", path: "/documentacion",
        icon: faMicrochip,
        permisos: ['documentación']
    },
];