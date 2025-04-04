import { toSlug } from "../Formato/texto";
import { validarPermisos } from "../Datos/almacenamiento";
import DataTable from "../../../Elements/DataTable/DataTable";
let contador = 1;

export const infraestructuraAgrupada = (data) => {
    let contador = 1;
    return data.reduce((acc, item) => {
        const sedeNombre = item.sede ? item.sede.nombre : "Sin Sede";

        if (!acc[sedeNombre]) {
            acc[sedeNombre] = [];
        }

        acc[sedeNombre].push([
            contador++,
            item.item || "-",
            item.marca ? item.marca.nombre : "-",
            item.ip ? item.ip : "-",
            item.funcion ? item.funcion.nombre : "-",
            item.sede ? item.sede.nombre : "-",
            item.idInfraestructura // Último elemento para evitar que se muestre
        ]);

        return acc;
    }, {});

}

export const crearTabla = (palabra, listaElementos, index = 1, cabecera, btnEditar, btnDetalles, btnNotas, btnDeshabilitar) => {
    return (
        <DataTable
            key={index}
            tituloCard={`Lista de ${palabra}`}
            tituloTabla={toSlug(`Lista${palabra}`)}
            nombreReportes={`Reporte de ${palabra}`}
            cabeceraTabla={cabecera}
            listaDatos={[
                ...listaElementos.map((fila) => {
                    const id = fila[fila.length - 1];
                    const filaSinId = fila.slice(0, -1);
                    const vigente = fila[fila.length - 2];
                    return [
                        ...filaSinId,
                        ` <div class="text-center">
                            ${btnEditar && validarPermisos('Editar') ? `<button type="button" class="btn btn-warning pb-1 pt-1 m-1 text-center mr-1"  style="font-size: 10pt;" onclick="handleEditClick(${id})">Editar</button>` : ''}
                            ${btnDetalles ? `<button type="button" class="btn btn-info pb-1 pt-1 m-1 text-center mr-1" style="font-size: 10pt" onclick="handleDetalles(${id})">Detalles</button> ` : ''}
                            ${btnNotas ? `<button type="button" class="btn btn-secondary pb-1 pt-1 m-1 text-center mr-1" style="font-size: 10pt" onclick="handleNotas(${id})">Notas</button>` : ''}
                            ${validarPermisos('Deshabilitar') && btnDeshabilitar ? `<button type="button" class="btn btn-warning pb-1 pt-1 m-1 text-center mr-1" style="font-size: 10pt" onclick="handleCambiarVigencia(${id})">${vigente == 'Si' ? 'Deshabilitar' : 'Habilitar'}</button>` : ''}
                        </div>`
                    ];
                })
            ]}
        />
    );
};

