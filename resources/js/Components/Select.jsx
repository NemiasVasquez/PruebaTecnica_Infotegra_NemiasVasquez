import React from 'react';

const Select = ({ options, name,valor, setValor, texto, width, disabled, className }) => {
    return (
        <div className={`d-flex flex-column m-1 mr-2 ${className}`} style={{ minWidth: "200px", width: width }}>
            <label >{texto}</label>
            <select className="form-select p-1 pr-3" name={name}  disabled={disabled} value={valor} onChange={setValor}>
                <option value="">Debe seleccionar una opción</option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>{option.texto}</option>
                ))}
            </select>
        </div>

    )
}

export default Select;