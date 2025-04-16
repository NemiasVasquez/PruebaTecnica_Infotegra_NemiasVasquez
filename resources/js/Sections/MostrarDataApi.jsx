import React, { useState, useEffect } from 'react';
import PlantillaBase from '../Elements/PantillaBase';
import { Personaje } from '../Interfaces/InterfazPersonaje';
import { obtenerDataApi, enviarFormApi } from '../Config/PeticionesApi';
import Boton from '../Components/Boton';
import DataTable from '../Elements/DataTable/DataTable';
import { ListaDatosApi } from '../Sections/ConsultaApi/listaDatosApi';
import ModalDetalles from '../Elements/Modales/ModalDetalles';
import { ListaDetallesApi } from '../Sections/ConsultaApi/ListaDetallesApi';
import RegistrarGeneral from '../Elements/Crud/RegistrarGeneral';
import { FormPersonaje } from './ConsultaApi/FormPersonaje';
import { validarPersonaje } from '../Scripts/Validations/ValidarPersonaje';

const MostrarDataApi = ({ apiLocal = false }) => {
    const [personaje, setPersonaje] = useState({ ...Personaje })
    const [personajesData, setPersonajesData] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [estadoEditar, setEstadoEditar] = useState(false);
    const [codigo, setCodigo] = useState(0);

    const obtenerDataApiRM = async () => {
        if (personajesData.length == 100) return alert("Ya se han obtenido los 100 registros");

        const urls = Array.from({ length: 5 }, (_, i) => `https://rickandmortyapi.com/api/character?page=${i + 1}`);

        const respuestas = await Promise.all(urls.map(url => obtenerDataApi(url)));
        setPersonajesData(respuestas.flatMap(res => res.data.results))
    };

    const obtenerDataLocal = () => {
        console.log("Se ha actualizado...");
        obtenerDataApi('/obtenerPersonajes').then((res) => setPersonajesData(res.data.personajes));
    }

    window.editarPersonaje = (id) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setCodigo(id);
        setPersonaje(personajesData.find(elem => elem.id == id));
        setEstadoEditar(true);
    }

    window.mostrarDetalles = (id) => {
        setPersonaje(personajesData.find(elem => elem.id == id));
        setMostrarModal(true);
    }

    const guardarData = () => {
        enviarFormApi('/guardarListaPersonajes', personajesData);
    }

    return (
        <PlantillaBase html={
            <div className='d-flex flex-column'>

                <div className='d-flex justify-content-center'>
                    <Boton texto={apiLocal ? "Obtener Data local" : "Obtener Data Api R&M"} className={"btn btn-info col-4 text-center m-2"} funcion={apiLocal ? obtenerDataLocal : obtenerDataApiRM} />
                    {apiLocal == false && personajesData.length == 100 ? <Boton texto={"Guardar la data en DB"} className={"btn btn-success col-4 text-center m-2"} funcion={guardarData} /> : ''}
                </div>

                {estadoEditar ?
                    <RegistrarGeneral validar={validarPersonaje} elemento={personaje} setChange={setPersonaje} getElementos={obtenerDataLocal}
                        textoTitulo={'Actualziar Personaje'} urlGuardar={`/actualizarPersonaje/${codigo}`} botonSuccess={'Guardar'}
                        elementoInterfaz={Personaje} setEstadoEditar={setEstadoEditar} campos={FormPersonaje(personaje)}
                    />
                    : ''
                }

                {personajesData.length == 100 &&
                    <>
                        <DataTable
                            nombreReportes={"datosPersonajes"}
                            tituloCard={"Lista de 100 registros obtenidos de API R&M"}
                            cabeceraTabla={["Id", "name", "status", "specie", "imagen", "Options"]}
                            tituloTabla={"listaPersonajes"}
                            listaDatos={ListaDatosApi(personajesData, apiLocal)}
                        />

                        {mostrarModal &&
                            <ModalDetalles
                                cerrarModal={() => { setMostrarModal(false) }}
                                nombreModal={"Detalles personajes"}
                                datos={ListaDetallesApi(personaje)}
                                exportable={false}
                            />
                        }
                    </>
                }
            </div>
        } />
    )
}

export default MostrarDataApi;