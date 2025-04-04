import React, { useState, useEffect } from 'react';
import PlantillaBase from '../PantillaBase';
import DataTable from '../DataTable/DataTable';
import RegistrarGeneral from './RegistrarGeneral';
import ModalDetalles from '../Modales/ModalDetalles';
import ModalNotas from '../Modales/ModalNotas';
import { getData } from '../../Scripts/Functions/Datos/petionesApi';
import { useGestionarElemento } from './useGestionarElemento';
import { validarPermisos } from '../../Scripts/Functions/Datos/almacenamiento';
import { toSlug } from '../../Scripts/Functions/Formato/texto';
import { infraestructuraAgrupada } from '../../Scripts/Functions/Funcionalidad/DiseñoDataTables';
import { crearTabla } from '../../Scripts/Functions/Funcionalidad/DiseñoDataTables';
const GestionarGeneral = ({
    setElementoDetalles, elemento, setElemento, elementoInterfaz, elementosData, setElementosData, submitDisabled, listaDatosModal, palabra, urlObtenerData, idElemento,
    urlGuardar, urlActualizar, cabecera, listaElementos, funcionValidar, camposRegistrar, btnEditar = true, btnDetalles = true, btnNotas = false, btnDeshabilitar = true, tablas = null }) => {

    const { editar, setEditar, comentarios, mantenimiento, mostrarModal, mostrarModalNotas, cerrarModal, codigo, setCodigo } = useGestionarElemento({ elementosData, idElemento, setElemento, setElementoDetalles });

    const getElementos = async () => {
        getData(urlObtenerData, palabra).then((res) => setElementosData(res));
    };

    window.handleCambiarVigencia = (codigo) => {
        const elementoSeleccionado = elementosData.find(elem => elem[idElemento] == codigo);
        if (elementoSeleccionado) {
            console.log('Elemento seleccionado:', elementoSeleccionado);
            if (!confirm(`¿Está seguro de ${elementoSeleccionado.detalles.vigente ? 'deshabilitar' : 'habilitar'} el equipo ?`)) return;
            getData('/activarDesactivarEquipo/' + elementoSeleccionado.idDetalles)
                .then((res) => { res.message ? alert(res.message) : '' })
            getElementos();
        }
    };

    useEffect(() => {
        getElementos();
    }, []);

    const InfraestructuraData = infraestructuraAgrupada(elementosData)

    return (
        <PlantillaBase
            html={
                <div className="container-fluid">
                    {validarPermisos('Crear') || editar ?
                        <RegistrarGeneral
                            datosRegistrar={{ funcionValidar, editar, urlActualizar, urlGuardar, getElementos, setCodigo, setElemento, setEditar, elementoInterfaz, codigo }}
                            submitDisabled={codigo > 0 ? false : submitDisabled}
                            elemento={elemento}
                            textoTitulo={editar ? `Actualizar ${palabra}` : `Registrar ${palabra}`}
                            setChange={setElemento}
                            botonSuccess={editar ? "Actualizar" : "Registrar"}
                            campos={camposRegistrar}
                        />
                        : ''
                    }

                    {validarPermisos('Leer') &&
                        (tablas == null
                            ? crearTabla(palabra, listaElementos, 1, cabecera, btnEditar, btnDetalles, btnNotas, btnDeshabilitar)
                            : Object.entries(InfraestructuraData).map(([sede, listaElementos], index) =>
                                crearTabla(sede, listaElementos, index, cabecera, btnEditar, btnDetalles, btnNotas, btnDeshabilitar)
                            )
                        )
                    }

                    {mostrarModal && (<ModalDetalles cerrarModal={cerrarModal} nombreModal={`Detalles ${palabra}`} datos={listaDatosModal} />)}

                    {mostrarModalNotas && (<ModalNotas datosMantenimiento={mantenimiento} datosComentarios={comentarios} nombreModal={`Notas ${palabra}`} cerrarModal={cerrarModal} />)}

                </div>
            }
        />
    );
};

export default GestionarGeneral;
