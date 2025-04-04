import $ from 'jquery';
import { crearBotonExportar } from './CrearBotonExportar';

export const configuracionDataTable = (tableRef, tituloTabla, nombreReportes, nombreUsuario, listaDatos, pagination = null) => {
    const tableId = `#${tituloTabla}`;

    if (!$.fn.dataTable.isDataTable(tableId)) {
        tableRef.current = $(tableId).DataTable({
            responsive: false,
            lengthChange: false,
            autoWidth: false,
            paging: pagination != null ? false : true,
            searching: pagination != null ? false : true,
            ordering: pagination != null ? false : true,
            info: pagination != null ? false : true,
            stateSave: false,
            drawCallback: function () {
                $(this)
                    .closest('.dataTables_wrapper')
                    .find('.dataTables_paginate .page-link')
                    .removeAttr('href');
            },

            buttons: [
                crearBotonExportar('copy', 'Copy', nombreReportes, nombreUsuario),
                crearBotonExportar('csv', 'CSV', nombreReportes, nombreUsuario),
                crearBotonExportar('excel', 'Excel', nombreReportes, nombreUsuario),
                crearBotonExportar('pdf', 'PDF', nombreReportes, nombreUsuario, true),
                crearBotonExportar('print', 'Imprimir', nombreReportes, nombreUsuario, true),
                /*
                     {
                         extend: 'colvis',
                         className: "botonDataTable",
                         text: 'Columnas Visibles',
                     },
                 */
            ],
            language: {
                lengthMenu: 'Mostrar _MENU_ registros por página',
                zeroRecords: 'No se encontraron resultados',
                info: 'Mostrando página _PAGE_ de _PAGES_',
                infoEmpty: 'No hay registros disponibles',
                infoFiltered: '(filtrado de _MAX_ total de registros)',
                search: 'Buscar:',
                paginate: {
                    first: 'Primero',
                    last: 'Último',
                    next: 'Siguiente',
                    previous: 'Anterior',
                },
                buttons: {
                    copyTitle: 'Copiado',
                    copySuccess: {
                        1: 'Se copió 1 fila al portapapeles',
                        _: 'Se copiaron %d filas al portapapeles',
                    },
                },
            },
            columnDefs: [
                {
                    targets: -1,
                    orderable: false,
                    searchable: false,
                    visible: true,
                },
            ],
            dom: 'lBfrtip',
            data: listaDatos,
        });
    } else {
        tableRef.current.clear().rows.add(listaDatos).draw();
    }
};