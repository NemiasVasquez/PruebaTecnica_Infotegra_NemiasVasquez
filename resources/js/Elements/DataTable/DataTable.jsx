import React, { useEffect, useRef, useState } from 'react';

import Card from '../Cards/Card';
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

//EL TITULO TABLA DEBE SER SIN ESPACIOS YA QUE ES EL NOMBRE DE LA TABLA COMO REF EN JQUERY
const DataTable = ({ listaDatos, tituloTabla, nombreReportes, cabeceraTabla, pagination = null, tituloCard = "Lista de elementos..." }) => {

    const tableRef = useRef(null);
    const [estado, setEstado] = useState(false);

    useEffect(() => {
        setEstado(false);
    }, [estado]);

    useEffect(() => {
        configuracionDataTable(tableRef, tituloTabla, nombreReportes, "Prueba infotegra", listaDatos, pagination);
    }, [listaDatos]);

    return (
        <Card
            texto={tituloCard}
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
                        <tbody style={{ fontSize: '10pt' }}>
                            {/* Los datos se llenan dinámicamente */}
                        </tbody>

                    </table>

                </div>
            }
        />
    );
};
export default DataTable;