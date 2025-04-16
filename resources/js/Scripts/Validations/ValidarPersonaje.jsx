import { validateNotEmpty, validateMaxLength } from './Validaciones';

export const validarPersonaje = (Personaje) => {

    if (!validateNotEmpty(Personaje.name, `Debe ingresar el name o Nombre del Personaje.`)) return false;

    if (!validateMaxLength(Personaje.name, 50, `El nombre no debe tener más de 50 caracteres`)) return false;

    return true;
};
