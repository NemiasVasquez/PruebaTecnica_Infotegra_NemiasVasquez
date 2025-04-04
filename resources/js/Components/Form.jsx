import React from 'react';
import Boton from './Boton';
const Form = ({ funcion, codigoHtml, funcionCancelar, botonSuccess, botonCancelar, submitDisabled=false }) => {
    return (
        <form onSubmit={funcion} className="d-flex flex-column flex-wrap p-1 m-1">
            {codigoHtml}
            <div className="m-3 text-center">
                <input type="button" onClick={funcionCancelar} className="btn btn-secondary m-1" value={botonCancelar}/>
                <Boton type="submit" texto={botonSuccess} className="btn btn-success m-1" disabled={submitDisabled}/>
            </div>

        </form>
    )
}

export default Form;