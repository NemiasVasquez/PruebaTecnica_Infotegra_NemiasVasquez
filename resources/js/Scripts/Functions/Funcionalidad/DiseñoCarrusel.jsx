export const ordenTipo = {
    'switch': 1,
    'accesspoint': 2,
    'router': 3,
    'ups': 4,
    'aires': 5
};

export const clases = (estado) => {
    if (estado) {
        return ['full-width', 'full-width', 'full-width', 'full-width']
    }
    return ['full-width', 'full-width', 'full-width', 'full-width']
};

export const itemsCardCarrusel = (estado) => {
    if (estado) return [5, /* Switch*/ 5, /* AccessPoint*/ 5, /* Router*/ 5  /* UPS*/]
    return [5, /* Switch*/ 5, /* AccessPoint*/ 5, /* Router*/ 5  /* UPS*/]
};

export const obtenerTituloDetalleSede = (tipo, total) => {
    const tipos = {
        'switch': `Switches disponibles - ${total}`,
        'router': `Routers registrados - ${total}`,
        'ups': `Equipos UPS - ${total}`,
        'accesspoint': `Access Points disponibles - ${total}`,
        'aires': `Aires disponibles - ${total}`,
    };
    return tipos[tipo.toLowerCase()] || `${tipo} (${total})`;
};

export const contenidoTablasListado = (tipoEquipo, listaDatos, cabeceraTabla) => {
    const tieneRed = tipoEquipo.equipos.some(equi => equi.switch || equi.router);

    cabeceraTabla = ['#', 'Ubicación', 'Piso', 'Estado', 'Marca'];
    if (tieneRed) cabeceraTabla.push('IP', 'MAC');
    cabeceraTabla.push('Acciones');

    listaDatos = tipoEquipo.equipos.map((equi, index) => {
        let fila = [
            index + 1,
            equi.lugar || '-',
            equi.piso || '-',
            equi.estado ? equi.estado.nombre : '-',
            equi.marca ? equi.marca.nombre : '-'
        ];

        if (tieneRed) {
            fila.push(equi.switch?.ip || equi.router?.ip || '-');
            fila.push(equi.switch?.mac || equi.router?.mac || '-');
        }

        fila.push(`<button class="btn btn-info btn-sm ver-mas-btn" data-equi='${JSON.stringify(equi)}'>Detalles</button>`);

        return fila;
    });
    return [listaDatos, cabeceraTabla]

}