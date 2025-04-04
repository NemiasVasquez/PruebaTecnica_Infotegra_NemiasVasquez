export const handleMostrarDetalles = (equipo, dataLista, setEquipoSeleccionado, setMostrarModal, setComentarios, setMantenimiento) => {
    const tipos = ['switch', 'router', 'ups', 'accesspoint','aires'];
    const tipoEncontrado = tipos.find(tipo => equipo[tipo] && Object.keys(equipo[tipo]).length > 0);
    if (tipoEncontrado) {
        const data = { ...equipo[tipoEncontrado], detalles: { ...equipo } };
        const funcionDetalle = dataLista[`ListaDetalles${tipoEncontrado.charAt(0).toUpperCase() + tipoEncontrado.slice(1)}`];
        if (funcionDetalle) {
            setComentarios(data.detalles.comentarios);
            setMantenimiento(data.detalles.mantenimiento);
            setEquipoSeleccionado(funcionDetalle(data));
            setMostrarModal(true);
        }
    }
};
