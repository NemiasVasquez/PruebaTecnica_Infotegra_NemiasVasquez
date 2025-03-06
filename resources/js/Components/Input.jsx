import React from 'react';

const Input = ({ type, texto, name, pattern,disable, value, setValue, min, max, width, requerido, placeholder, maxLength, step, align, className }) => {
    return (
        <div className={`m-1 mr-2 ${className}`} style={{ minWidth: "200px", width: width, }}>
            <label>{texto}</label>
            <input className="form-control" pattern={pattern} style={{ textAlign: align }} min={min} max={max} name={name} id={name} type={type} disabled={disable} value={value} onChange={setValue} required={requerido} placeholder={placeholder} maxLength={maxLength} step={step} />
        </div>

    )
}

export default Input;