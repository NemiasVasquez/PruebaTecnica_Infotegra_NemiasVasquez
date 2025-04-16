import { faDatabase, faMicrochip, faCloud } from "@fortawesome/free-solid-svg-icons";

export const menuItems = [
    {
        name: "Consultas Api R&M",
        path: "/consultaApi",
        icon: faCloud,
    },

    {
        name: "Consulta DB",
        path: "/consultaDB",
        icon: faDatabase,
    },

    {
        name: "Documentación",
        path: "/documentacion",
        icon: faMicrochip,
    },
];