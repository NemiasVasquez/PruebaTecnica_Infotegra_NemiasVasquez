import Input from '../../Components/Input';
import Boton from '../../Components/Boton';

const BuscarFechas = ({ fechas, funcionBuscar, setChange }) => {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setChange(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    return (
        <div className="container-fluid m-1">
            <div className="bg-white shadow-sm rounded p-2">
                <h5 className="fw-bold text-secondary mb-1">📅 Seleccionar Rango de Fechas</h5>
                <div className="row g-2 align-items-center">

                    <div className="col-12 col-md-4">
                        <Input
                            texto={"Fecha inicio:"}
                            type={"date"}
                            name={"fecha1"}
                            className=""
                            value={fechas.fecha1}
                            setValue={handleChange}
                        />
                    </div>

                    <div className="col-12 col-md-4">
                        <Input
                            texto={"Fecha fin:"}
                            type={"date"}
                            name={"fecha2"}
                            className=""
                            value={fechas.fecha2}
                            setValue={handleChange}
                        />
                    </div>

                    <div className="col-12 col-md-4 d-flex justify-content-md-end mt-4">
                        <Boton
                            funcion={funcionBuscar}
                            texto={"🔍 Buscar"}
                            className="btn btn-info w-100 w-md-auto"
                        />
                    </div>
                </div>
            </div>
        </div>
    );

}

export default BuscarFechas;