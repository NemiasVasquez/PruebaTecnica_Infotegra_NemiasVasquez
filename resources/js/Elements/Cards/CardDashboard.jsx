import Boton from "../../Components/Boton";
const CardDashboard = ({ className, nombreGrafico, descargarImagen, html, cambiarDiseño, cambiarOrientacion, tipo }) => {
    return (
        <div className={className}>
            <div className="card card-info">
                <div className="card-header">
                    <h3 className="card-title">{nombreGrafico}</h3>
                    <div className="card-tools">
                        <Boton className={'btn btn-light'} texto={"Diseño"} funcion={() => cambiarDiseño()} />
                        {tipo == "bar" ? <Boton className={'btn btn-warning ml-2'} texto={"Orientación"} funcion={() => cambiarOrientacion()} /> : ''}
                        {descargarImagen && (
                            <button onClick={descargarImagen} className="btn btn-info btn-sm ml-1">
                                <i className="fas fa-download"></i>
                            </button>
                        )}
                        <button type="button" className="btn btn-tool" data-card-widget="collapse">
                            <i className="fas fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div className="card-body">
                    <div className="chart" >
                        {html}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardDashboard;