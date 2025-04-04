import React, { useState, useEffect } from 'react';
import PlantillaBase from '../Elements/PantillaBase';
import { Usuario } from '../Interfaces/InterfazUsuario';
import { obtenerDataProtegida } from '../Config/apiClient';
import { validarUsuario } from '../Scripts/Validations/ValidarUsuario';
import { enviarFormulario } from '../Config/apiClient';
const MiPerfil = () => {
    const [usuario, setUsuario] = useState({ ...Usuario })

    const idUsuario = localStorage.getItem('idUsuario');

    const getUsuario = async () => {
        const response = await obtenerDataProtegida(`/obtenerUsuario/${idUsuario}`);
        setUsuario(response.usuario);
    }

    const enviarFormularioForm = async (e) => {
        e.preventDefault();

        if (!validarUsuario(usuario, true, true)) return false;

        try {
            const response = await enviarFormulario(`/actualizarUsuario/${idUsuario}`, usuario);
            if (response.alert) alert(response.alert);
            if (response.message) alert(response.message);

        } catch (e) {
            return console.log('Error al enviar el formulario.');
        }
    };

    useEffect(() => {
        getUsuario();
    }, []);

    return (
        <PlantillaBase
            html={
                <>
                    <h1>Mi Perfil</h1>
                </>
            }
        />
    )
}

export default MiPerfil;