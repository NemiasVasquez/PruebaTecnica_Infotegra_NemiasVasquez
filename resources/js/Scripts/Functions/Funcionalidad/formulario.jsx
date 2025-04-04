import { enviarFormulario } from "../../../Config/apiClient";

export const handleChange = (e, setChange) => {
    const { name, value } = e.target;
    setChange(prevState => ({ ...prevState, [name]: value }));
};

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

export const enviarFormularioSubmit = async (
    e, funcionValidar, elemento, editar, codigo, urlActualizar, urlGuardar, limpiar, getElementos, setCodigo
) => {
    e.preventDefault();
    if (!funcionValidar(elemento)) return;

    try {
        const url = editar ? `/${urlActualizar}/${codigo}` : `/${urlGuardar}`;
        const response = await enviarFormulario(url, elemento);

        if (response.alert) alert(response.alert);
        if (response.message) {
            alert(response.message);
            limpiar();
            getElementos();
            setCodigo(0);
        }
    } catch (error) {
        console.error('Error al enviar el formulario:', error);
    }
};
