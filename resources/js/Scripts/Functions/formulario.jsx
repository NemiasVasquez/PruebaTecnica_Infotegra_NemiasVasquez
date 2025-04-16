import { enviarFormApi } from "../../Config/PeticionesApi";

export const handleChangeDetalles = (e, setChange) => {
    const { name, value } = e.target;
    const keys = name.split('.');

    setChange(prevState =>
        keys.length > 1 ? {
            ...prevState,
            [keys[0]]: { ...prevState[keys[0]], [keys[1]]: value }
        } : { ...prevState, [name]: value }
    );
};

export const enviarFormularioSubmit = async (e, funcionValidar, elemento, urlGuardar, getElementos) => {
    e.preventDefault();
    if (!funcionValidar(elemento)) return;
    await enviarFormApi(urlGuardar, elemento);
    getElementos();
};
