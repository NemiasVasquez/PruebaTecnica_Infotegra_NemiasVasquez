import React from 'react';

const Boton = ({type, texto, funcion, className, disabled, id}) =>{
    return(
        <button type={type} id={id} onClick={funcion} className={className} disabled={disabled}>
            {texto}
        </button>
    )
}

export default Boton;