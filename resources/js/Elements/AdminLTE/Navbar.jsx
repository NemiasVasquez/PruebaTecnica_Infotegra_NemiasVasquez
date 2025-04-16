import { Colores } from '../../Scripts/BibliotecaStyle';

const Navbar = () => {
    return (
        <>
            <nav className="main-header navbar navbar-expand" style={{ backgroundColor: Colores['FondoNavbar'] }}>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#" role="button">
                            <i style={{ color: Colores['ColorLetraNavbar'] }} className="fas fa-bars"></i>
                        </a>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="fullscreen" role="button">
                            <i style={{ color: Colores['ColorLetraNavbar'] }} className="fas fa-expand-arrows-alt"></i>
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Navbar;
