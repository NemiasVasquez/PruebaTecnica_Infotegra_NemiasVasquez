export const recortarPalabras = (palabra, numeroCaracteres) =>
    palabra.length <= numeroCaracteres ? palabra : `${palabra.slice(0, numeroCaracteres - 3)}...`;

export const toSlug = (text) =>
    text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-').trim();

export const contienePalabra = (texto, palabra) => {
    if (typeof texto !== 'string' || typeof palabra !== 'string') return false;
    return texto.toLowerCase().includes(palabra.toLowerCase());
};


