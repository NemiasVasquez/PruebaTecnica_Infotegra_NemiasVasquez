export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleString('es-ES', options);
};

export const formatDateFecha = (dateString) => {
    const date = new Date(`${dateString}T00:00:00`);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
};

export const obtenerFechaActual = () => {
    const hoy = new Date();
    const houActualizado = formatDate(hoy);
    return houActualizado; // Formato YYYY-MM-DD
};

//obtener hora actual con milisegundos
export const obtenerHoraActual = () => {
    const ahora = new Date();
    const houActualizado = formatDate(ahora);
    return houActualizado; // Formato YYYY-MM-DDTHH:mm:ss.sssZ
};

export const obtenerAñoActual = () => {
    const year = new Date().getFullYear();
    return year;
}