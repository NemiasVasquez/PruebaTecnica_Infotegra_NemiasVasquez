import React from 'react';
import Input from '../Components/Input';

const ListaPermisos = ({ titulo, permisos, usuario, setChange }) => {
    const handleChange = (e) => {
        const { name, checked } = e.target;
        setChange((prevState) => {
            const permisosActualizados = checked
                ? [...prevState.listaPermisos, { idPermiso: parseInt(name), nombre: permisos.find(p => p.idPermiso == name).nombre }]
                : prevState.listaPermisos.filter((permiso) => permiso.idPermiso != name);
            return { ...prevState, listaPermisos: permisosActualizados };
        });
    };

    return (
        <div className="col-12">
            <h5 className="p-3">{titulo}</h5>
            <div className="d-flex flex-wrap p-2 checkBox col-12" style={{ fontSize: "15px" }}>
                {permisos.map((permiso, index) => (
                    <Input
                        key={index}
                        type="checkbox"
                        name={permiso.idPermiso}
                        checked={usuario.listaPermisos.some((p) => p.idPermiso == permiso.idPermiso)}
                        setValue={handleChange}
                        value={""}
                        className="mr-2 bloquePermiso"
                        texto={permiso.nombre}
                    />
                ))}
            </div>
        </div>
    );
};

export default ListaPermisos;