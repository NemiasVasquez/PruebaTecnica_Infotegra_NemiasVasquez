import { obtenerHoraActual } from "../../Scripts/Functions/Formato/fechas";
export const crearBotonExportar = (extend, text, nombreReportes, nombreUsuario, conPersonalizacion = false) => {
    const config = {
        extend,
        text,
        className: 'botonDataTable',
        title: `${nombreReportes} - ${obtenerHoraActual()}`,
        filename: `${nombreReportes}_${obtenerHoraActual()}`,
        exportOptions: { columns: ':not(:last-child)', modifier: { search: 'applied' } },
    };

    if (extend === 'pdf' && conPersonalizacion) {
        config.customize = function (doc) {
            doc.content.splice(0, 0, {
                text: `Generado por: ${nombreUsuario} \nFecha: ${obtenerHoraActual()}`,
                alignment: 'left',
                margin: [0, 12, 0, 12],
                fontSize: 10,
            });
        };
    }

    if (extend === 'print' && conPersonalizacion) {
        config.customize = function (win) {
            $(win.document.body)
                .prepend(
                    `<div style="text-align: left; margin-bottom: 10px;">
                        <h5>Generado por: ${nombreUsuario}</h5>
                        <h5>Fecha: ${obtenerHoraActual()}</h5>
                    </div>`
                )
                .css({ padding: '10px' });

            $(win.document.body).find('table').css({ margin: '20px 15px', width: '95%' });

        };
    }

    
    return config;
};
