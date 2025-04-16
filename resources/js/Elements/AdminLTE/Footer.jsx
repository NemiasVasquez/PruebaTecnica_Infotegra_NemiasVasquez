import { Colores } from '../../Scripts/BibliotecaStyle';
import { obtenerAñoActual } from '../../Scripts/Functions/fechas';

const Footer = () => {
    return (
        <footer className="main-footer" style={{
            backgroundColor: Colores['FondoFooter'],
            borderTop: `2px solid ${Colores['Blanco']}`,
            color: Colores['ColorLetraFooter']
        }}>
            <strong>© Nemias Vasquez - {obtenerAñoActual()}</strong>
            <div className="float-right d-none d-sm-inline-block">
                <b>Versión</b> 1.0
            </div>
        </footer>
    );
}

export default Footer;
