import React from 'react';
import Card from '../Cards/Card';
import Form from '../../Components/Form';
import Input from '../../Components/Input';
import { enviarFormularioSubmit, handleChangeDetalles } from '../../Scripts/Functions/formulario';

const RegistrarGeneral = ({ validar, getElementos, urlGuardar, elemento, textoTitulo, setChange, botonSuccess, campos = [] , elementoInterfaz, setEstadoEditar }) => {

    const limpiar = () => {
        setChange(elementoInterfaz);
        setEstadoEditar(false);
        getElementos();
    };

    return (
        <div>
            <Card
                minimizado={true}
                texto={textoTitulo}
                codigoHtml={
                    <Form
                        botonCancelar={"Cancelar"}
                        botonSuccess={botonSuccess}
                        funcion={(e) => enviarFormularioSubmit(e, validar, elemento, urlGuardar, getElementos)}
                        funcionCancelar={limpiar}
                        codigoHtml={
                            <div className="d-flex justify-content-between flex-wrap">
                                {campos.map((campo, index) => {
                                    const {
                                        type = "text",
                                        texto = "",
                                        name = "",
                                        requerido = false,
                                        maxLength = "",
                                        className = "col-12 col-md-5 col-lg-5",
                                        disabled = false,
                                    } = campo;

                                    return <Input
                                        key={index}
                                        type={type}
                                        texto={texto}
                                        name={name}
                                        requerido={requerido}
                                        value={name.includes('.')
                                            ? name.split('.').reduce((acc, key) => acc && acc[key], elemento) || ""
                                            : elemento[name] || ""}
                                        setValue={(e) => handleChangeDetalles(e, setChange)}
                                        className={className}
                                        maxLength={maxLength}
                                        disable={disabled}
                                    />

                                })}
                            </div>
                        }
                    />
                }
            />
        </div>
    );
};

export default RegistrarGeneral;
