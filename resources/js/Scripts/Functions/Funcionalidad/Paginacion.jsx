export const handlePageChange = (url, obtenerDatos) => {
    if (url) {
        const page = new URL(url).searchParams.get("page");
        obtenerDatos(page);
    }
};