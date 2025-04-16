export const ListaDatosApi = (datos = [], apiLocal = false) => {
    return datos.map((item) => ([
        item.id,
        item.name,
        item.status,
        item.species,
        `<a href="${item.image}" target="_blank"><img src="${item.image}" alt="${item.name}" width="80px" height="80px" /></a>`,
        `
        <div class="text-center d-flex justify-content-center align-items-center">
            <button type="button" class="btn btn-info mr-2" onclick="mostrarDetalles(${item.id})"> Detalle </button> 
           ${apiLocal ? `<button type="button" class="btn btn-warning" onclick="editarPersonaje(${item.id})"> Editar </button> ` : ''}
        </div>    
        `
    ]));
};
