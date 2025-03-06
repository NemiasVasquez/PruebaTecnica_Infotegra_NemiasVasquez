import $ from 'jquery';

export const configuracionDataTable = (tableRef, tituloTabla, nombreReportes, nombreUsuario, listaDatos) => {
    const tableId = `#${tituloTabla}`;

    const obtenerFechaActual = () => {
        const hoy = new Date();
        const dia = hoy.getDate().toString().padStart(2, '0');
        const mes = (hoy.getMonth() + 1).toString().padStart(2, '0');
        const anio = hoy.getFullYear();
        return `${dia}-${mes}-${anio}`;
    };

    if (!$.fn.dataTable.isDataTable(tableId)) {
        tableRef.current = $(tableId).DataTable({
            responsive: true,
            lengthChange: false,
            autoWidth: false,
            buttons: [
                {
                    extend: 'copy',
                    text: 'Copiar',
                    className: "botonDataTable",
                    title: `${nombreReportes} - ${obtenerFechaActual()}`,
                    filename: `${nombreReportes}_${obtenerFechaActual()}`,
                    exportOptions: { columns: ':visible', modifier: { search: 'applied' } }
                },
                {
                    extend: 'csv',
                    text: 'CSV',
                    className: "botonDataTable",
                    title: `${nombreReportes} - ${obtenerFechaActual()}`,
                    filename: `${nombreReportes}_${obtenerFechaActual()}`,
                    exportOptions: { columns: ':visible', modifier: { search: 'applied' } }
                },
                {
                    extend: 'excel',
                    text: 'Excel',
                    className: "botonDataTable",
                    title: `${nombreReportes} - ${obtenerFechaActual()}`,
                    filename: `${nombreReportes}_${obtenerFechaActual()}`,
                    exportOptions: { columns: ':visible', modifier: { search: 'applied' } }
                },
                {
                    extend: 'pdf',
                    text: 'PDF',
                    className: "botonDataTable",
                    title: `${nombreReportes}`,
                    filename: `${nombreReportes}_${obtenerFechaActual()}`,
                    exportOptions: { columns: ':visible', modifier: { search: 'applied' } },
                    customize: function (doc) {
                        doc.content.splice(0, 0, {
                            text: `Generado por: ${nombreUsuario} \nFecha: ${obtenerFechaActual()}`,
                            alignment: 'left',
                            margin: [0, 0, 0, 12],
                            fontSize: 10
                        });
                    }
                },
                {
                    extend: 'print',
                    text: 'Imprimir',
                    className: "botonDataTable",
                    title: `${nombreReportes}`,
                    exportOptions: { columns: ':visible', modifier: { search: 'applied' } },
                    customize: function (win) {
                        $(win.document.body)
                            .prepend(
                                `<div style="text-align: left; margin-bottom: 10px;">
                                    <h5>Generado por: ${nombreUsuario}</h5>
                                    <h5>Fecha: ${obtenerFechaActual()}</h5>
                                </div>`
                            )
                            .css({
                                margin: '20px',
                                padding: '10px',
                            });
                        $(win.document.body).css({
                            margin: '20px',
                            padding: '10px',
                            fontSize: '14px'
                        });

                        $(win.document.body).find('table').css({
                            margin: '20px auto',
                            padding: '10px',
                            width: '95%',
                        });
                    }
                },
               
                /*
                    {
                        extend: 'colvis',
                        className: "botonDataTable",
                        text: 'Columnas Visibles',
                    }
                */
            ],
            language: {
                lengthMenu: "Mostrar _MENU_ registros por página",
                zeroRecords: "No se encontraron resultados",
                info: "Mostrando página _PAGE_ de _PAGES_",
                infoEmpty: "No hay registros disponibles",
                infoFiltered: "(filtrado de _MAX_ total de registros)",
                search: "Buscar:",
                paginate: {
                    first: "Primero",
                    last: "Último",
                    next: "Siguiente",
                    previous: "Anterior"
                },
                buttons: {
                    copyTitle: 'Copiado',
                    copySuccess: {
                        1: "Se copió 1 fila al portapapeles",
                        _: "Se copiaron %d filas al portapapeles"
                    }
                }
            },
            columnDefs: [
                {
                    targets: -1, // Última columna
                    orderable: true, // Deshabilita ordenamiento
                    searchable: false, // No se puede buscar por esta columna
                    visible: true // Asegura que siempre se muestre
                }
            ],
            dom: 'Bfrtip',
        });
    } else {
        tableRef.current.clear().rows.add(listaDatos).draw();
    }
};
