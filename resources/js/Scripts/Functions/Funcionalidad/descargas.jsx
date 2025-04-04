
export const descargarImagen = (canvasRef, nombreGrafico, fechas = null) => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = `${nombreGrafico}${fechas ? ' - ' + fechas.fecha1 : ''}${fechas ? ' - ' + fechas.fecha2 : ''}.png`;
    link.click();
};
