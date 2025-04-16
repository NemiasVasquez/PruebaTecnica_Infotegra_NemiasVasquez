export const FormPersonaje = (personaje) => [

    { type: "text", texto: "Name:", name: "name", value: personaje.name, requerido: true, maxLength: "150" },
    { type: "text", texto: "Status:", name: "status", value: personaje.status, maxLength: "50" },
    { type: "text", texto: "Species:", name: "species", value: personaje.species, maxLength: "50" },
    { type: "text", texto: "Type:", name: "type", value: personaje.type, maxLength: "50" },
    { type: "text", texto: "Sex:", name: "gender", value: personaje.gender, maxLength: "50" },

    { type: "text", texto: "Origin-Name:", name: "origin.name", value: personaje.origin.name, requerido: true, maxLength: "50" },
    { type: "text", texto: "Origin-Url:", name: "origin.url", value: personaje.origin.url, maxLength: "150" },

]
