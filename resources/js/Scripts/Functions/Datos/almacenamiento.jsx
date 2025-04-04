import { obtenerDataProtegida } from "../../../Config/apiClient";

export const obtenerUsuario = async () => {
    const nombre = localStorage.getItem('usuario');
    return nombre || "usuario";
};

export const obtenerPermisosGenerales = async () => {
    if (localStorage.getItem('permisosGenerales') && localStorage.getItem('permisosAdministrativos')) {
        return false;
    }

    const response = await obtenerDataProtegida("/obtenerPermisos");

    const permisosGenerales = response.permisos.filter(p =>
        ["Leer", "Crear", "Editar", "Deshabilitar"].includes(p.nombre)
    );

    const permisosAdministrativos = response.permisos.filter(p =>
        !["Leer", "Crear", "Editar", "Deshabilitar"].includes(p.nombre)
    );

    localStorage.setItem("permisosGenerales", JSON.stringify(permisosGenerales));
    localStorage.setItem("permisosAdministrativos", JSON.stringify(permisosAdministrativos));
};

export const obtenerPermisosUsuario = async () => {
    const permisos = localStorage.getItem('listaPermisos');
    return permisos ? JSON.parse(permisos) : null;
};

export const validarPermisos = (permiso) => {
    const listaPermisos = JSON.parse(localStorage.getItem('listaPermisos'));
    const userPermisoNombres = listaPermisos.map(p => p.nombre);

    if (userPermisoNombres.includes(permiso)) {
        return true;
    }

    const permisosCrud = ["Crear", "Editar", "Deshabilitar", "Leer"];

    const tienePermisoEquipo = userPermisoNombres.some(p => [" AP", "Accesso Routers", "Accesso Switch", "Accesso Ups"]);
 
    const tienePermisoCrud = userPermisoNombres.some(p => permisosCrud.includes(p));

    if (tienePermisoEquipo && !tienePermisoCrud) {
        return true;
    }

    return false;
};