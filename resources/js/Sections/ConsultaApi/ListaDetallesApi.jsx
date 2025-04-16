export const ListaDetallesApi = (personaje) => {
    return [
        { label: "Type", value: personaje.type || '-' },
        { label: "Sex", value: personaje.gender || '-' },
        {
            label: "Origin",
            value: (
                <span>
                    {personaje.origin?.name || '-'} -
                    <a href={personaje.origin?.url} target="_blank" rel="noreferrer">
                        {personaje.origin?.url}
                    </a>
                </span>
            )
        },
        {
            label: "Image",
            value: (
                <a href={personaje.image} target="_blank" rel="noreferrer">
                    <img src={personaje.image} alt={personaje.name} width="180" height="200" />
                </a>
            )
        },
    ];
};
