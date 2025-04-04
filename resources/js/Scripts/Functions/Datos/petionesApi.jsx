import { obtenerDataProtegida } from "../../../Config/apiClient";

export const getData = async (url, palabra) => {
    const response = await obtenerDataProtegida(url);
    return palabra ? response[palabra] : response;
};
