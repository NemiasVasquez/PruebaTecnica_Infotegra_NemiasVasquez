export const Colores = {
    "Verde": '#0B6E4F',
    "Crema": '#FFEED5',
}

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleString('es-ES', options);
};