import React, { useEffect, useRef, useState } from 'react';

import Card from '../../Components/Card';
import "../../../css/app.css";
import { configuracionDataTable } from './ConfiguracionDataTable';

import 'admin-lte/plugins/jquery/jquery.min.js';
import 'admin-lte/plugins/datatables/jquery.dataTables.min.js';
import 'admin-lte/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js';
import 'admin-lte/plugins/datatables-responsive/js/dataTables.responsive.min.js';
import 'admin-lte/plugins/datatables-buttons/js/dataTables.buttons.min.js';
import 'admin-lte/plugins/datatables-buttons/js/buttons.bootstrap4.min.js';
import 'pdfmake/build/pdfmake.min.js';
import 'pdfmake/build/vfs_fonts.js';
import 'admin-lte/plugins/datatables-buttons/js/buttons.html5.min.js';
import 'admin-lte/plugins/datatables-buttons/js/buttons.print.min.js';
import 'admin-lte/plugins/datatables-buttons/js/buttons.colVis.min.js';
import JSZip from 'admin-lte/plugins/jszip/jszip.min.js';

window.JSZip = JSZip;

const DataTable = ({ listaDatos, tituloTabla, nombreReportes, cabeceraTabla }) => {

    const [nombreUsuario, setNombreUsuario] = useState("");
    const tableRef = useRef(null);
    const [estado, setEstado] = useState(false);

    const getUsuario = async () => {
        const nombre = localStorage.getItem("nombre");
        setNombreUsuario(nombre);
    };

    useEffect(() => {
        setEstado(false);
    }, [estado]);

    useEffect(() => {
        getUsuario();
    }, []);

    useEffect(() => {
        if (nombreUsuario) {
            configuracionDataTable(tableRef, tituloTabla, nombreReportes, nombreUsuario, listaDatos);
        }
    }, [listaDatos, nombreUsuario]);

    return (
        <Card
            texto={"Lista de elementos..."}
            codigoHtml={
                <div className="table-responsive">
                    <table id={tituloTabla} className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                {cabeceraTabla.map((cab, index) => (
                                    <th key={index}>{cab}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {/* Los datos se llenan dinámicamente */}
                        </tbody>
                    </table>
                </div>
            }
        />
    );
};
export default DataTable;