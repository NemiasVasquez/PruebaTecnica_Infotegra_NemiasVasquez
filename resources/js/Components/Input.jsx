import React from 'react';

const Input = ({ type, texto, name, checked, pattern, disable, value, setValue, min, max, width, requerido, placeholder, maxLength, step, align, className }) => {
    if (type === 'checkbox') {
        return (
            <div className={`m-1 mr-2 ${className}`} style={{ minWidth: "140px" }}>
                <label className="d-flex align-items-center">
                    <input
                        type="checkbox"
                        name={name}
                        id={name}
                        checked={checked}
                        disabled={disable}
                        onChange={setValue}
                        style={{ marginRight: '8px' }}
                    />
                    {texto}
                </label>
            </div>
        );
    }

    return (
        <div className={`m-1 mr-2 ${className}`} style={{ width: width }}>
            <label>{texto}</label>
            <input
                className="form-control"
                pattern={pattern}
                style={{ textAlign: align }}
                min={min}
                max={max}
                name={name}
                id={name}
                type={type}
                disabled={disable}
                value={value}
                onChange={setValue}
                required={requerido}
                placeholder={placeholder}
                maxLength={maxLength}
                step={step}
            />
        </div>
    );
};

export default Input;
