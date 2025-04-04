export const transformarEquiposPorSede = (data) => {
    if (!data.equipos) return { equiposPorTipo: [] };
    return {
        equiposPorTipo: data.equipos.map(sede => ({
            tipo: sede.nombre,
            total: sede.equipos.length,
            equipos: sede.equipos
        }))
    };
};
