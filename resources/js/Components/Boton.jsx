import React from 'react';

const Boton = ({type, texto, funcion, className}) =>{
    return(
        <button type={type} onClick={funcion} className={className}>
            {texto}
        </button>
    )
}

export default Boton;