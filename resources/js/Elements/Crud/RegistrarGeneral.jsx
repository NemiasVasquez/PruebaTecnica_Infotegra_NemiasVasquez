import React from 'react';
import Card from '../Cards/Card';
import Form from '../../Components/Form';
import Input from '../../Components/Input';
import Select from '../../Components/Select';
import { enviarFormularioSubmit, handleChangeDetalles } from '../../Scripts/Functions/Funcionalidad/formulario';
const RegistrarGeneral = ({ datosRegistrar, elemento, textoTitulo, setChange, botonSuccess, campos = [], submitDisabled }) => {

    const limpiar = () => {
        datosRegistrar.setElemento(datosRegistrar.elementoInterfaz);
        datosRegistrar.setEditar(false);
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
                        funcion={(e) => enviarFormularioSubmit(e, datosRegistrar.funcionValidar, elemento, datosRegistrar.editar,
                            datosRegistrar.codigo, datosRegistrar.urlActualizar, datosRegistrar.urlGuardar,
                            limpiar, datosRegistrar.getElementos, datosRegistrar.setCodigo)}
                        funcionCancelar={limpiar}
                        submitDisabled={submitDisabled}
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
                                        options = [],
                                        disabled = false,

                                    } = campo;

                                    return type == "select" ? (
                                        <Select
                                            key={index}
                                            texto={texto}
                                            name={name}
                                            options={options}
                                            valor={name.includes('.')
                                                ? name.split('.').reduce((acc, key) => acc && acc[key], elemento) ?? ""
                                                : elemento[name] ?? ""}
                                            setValor={(e) => handleChangeDetalles(e, setChange)}
                                            className={className}
                                            requerido={requerido}
                                            disabled={disabled}
                                        />
                                    ) : (
                                        <Input
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
                                    );
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
