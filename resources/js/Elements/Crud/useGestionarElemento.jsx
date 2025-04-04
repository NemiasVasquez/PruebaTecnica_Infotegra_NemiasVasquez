import { useState } from 'react';
import { formatDateFecha } from '../../Scripts/Functions/Formato/fechas';
import { getData } from '../../Scripts/Functions/Datos/petionesApi';
export const useGestionarElemento = ({ elementosData, idElemento, setElemento, setElementoDetalles }) => {
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarModalNotas, setMostrarModalNotas] = useState(false);
    const [comentarios, setComentarios] = useState([]);
    const [mantenimiento, setMantenimiento] = useState([]);
    const [editar, setEditar] = useState(false);
    const [codigo, setCodigo] = useState(0);

    window.handleEditClick = (codigo) => {
        setEditar(true);
        const elementoSeleccionado = elementosData.find(elem => elem[idElemento] == codigo);

        if (elementoSeleccionado) {
            setCodigo(elementoSeleccionado[idElemento]);
            setElemento(elementoSeleccionado);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    window.handleDetalles = (codigo) => {
        const elemento = elementosData.find(elem => elem[idElemento] == codigo);
        if (elemento) {
            setElementoDetalles(elemento);
            setMostrarModal(true);
        }
    };

    window.handleNotas = (codigo) => {
        const elemento = elementosData.find(elem => elem[idElemento] == codigo);
        if (!elemento) return;

        const comentariosArray = Array.isArray(elemento.detalles.comentarios) ? elemento.detalles.comentarios : [elemento.detalles.comentarios];
        const mantenimientoArray = Array.isArray(elemento.detalles.mantenimiento) ? elemento.detalles.mantenimiento : [elemento.detalles.mantenimiento];

        setComentarios(comentariosArray.map(item => ({
            label: formatDateFecha(item.fecha),
            value: item.comentario
        })));

        setMantenimiento(mantenimientoArray.map(item => ({
            label: formatDateFecha(item.fecha),
            value: item.nota
        })));

        setMostrarModalNotas(true);
    };

    const cerrarModal = () => {
        setMostrarModal(false);
        setMostrarModalNotas(false);
    };

    return {
        editar, setEditar, codigo, setCodigo,
        mostrarModal, mostrarModalNotas, comentarios, mantenimiento,
        handleEditClick, handleDetalles, handleNotas, cerrarModal
    };
};
