import { validateMaxLength, validateNotEmpty, validatePasswords} from './Validaciones';

export const validarUsuario = (usuario, actualizar, perfil=false) => {

    if (!validateNotEmpty(usuario.usuario, "El usuario es obligatorio.")) return false;
    if (!validateMaxLength(usuario.usuario, 20, "El usuario no puede tener más de 20 caracteres.")) return false;

    if (actualizar) {
        if (usuario.password != "" && usuario.password2 != "") {
            if (!validatePasswords(usuario.password, usuario.password2, "Las contraseñas no coinciden.")) return false;
        }

    } else {
        if (!validatePasswords(usuario.password, usuario.password2, "Las contraseñas no coinciden.")) return false;

        if (!validateNotEmpty(usuario.password, "La contraseña es obligatoria.")) return false;
        if (!validateMaxLength(usuario.password, 15, "La contraseña es demasiado larga, max 15 carácteres.")) return false;

        if (!validateNotEmpty(usuario.password2, "La validación de contraseña es obligatoria.")) return false;
        if (!validateMaxLength(usuario.password2, 15, "La contraseña es demasiado larga, max 15 carácteres.")) return false;

    }

    if (!validateNotEmpty(usuario.nombres, "El nombre es obligatorio.")) return false;
    if (!validateMaxLength(usuario.nombres, 50, "El nombre no puede tener más de 50 caracteres.")) return false;

    if (!validateNotEmpty(usuario.apellidos, "El apellido es obligatorio.")) return false;
    if (!validateMaxLength(usuario.apellidos, 50, "El apellido no puede tener más de 50 caracteres.")) return false;

    if (!validateNotEmpty(usuario.estado, "Debe seleccionar el estado del usuario.")) return false;

    if(!perfil){
        if (!validateNotEmpty(usuario.listaPermisos, "Debe seleccionar almenos un permiso.")) return false;
    }

    return true;
};
