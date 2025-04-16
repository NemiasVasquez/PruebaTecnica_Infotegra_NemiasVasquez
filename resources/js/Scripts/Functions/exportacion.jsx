import * as XLSX from 'xlsx';
import { obtenerFechaActual } from './fechas';

export const exportToExcel = (datos, nombreModal) => {
    if (!datos || datos.length === 0) return;

    const firstItemName = datos[0]?.value?.toString().substring(0, 20) || "data";
    const hoy = obtenerFechaActual();

    const formattedData = [];

    datos.forEach(item => {
        if (typeof item.value === 'object' && item.value !== null) {
            Object.entries(item.value).forEach(([key, val]) => {

                formattedData.push([`${key == 0 ? item.label : ''}`, val.props.children[0]]);
            });
        } else {
            formattedData.push([item.label, item.value]);
        }
    });

    const ws = XLSX.utils.aoa_to_sheet([['Campo', 'Valor'], ...formattedData]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Detalles');
    XLSX.writeFile(wb, `${nombreModal}_${firstItemName}_${hoy}.xlsx`);
};
