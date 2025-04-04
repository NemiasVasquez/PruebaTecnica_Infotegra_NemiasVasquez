import * as XLSX from 'xlsx';
import { obtenerFechaActual } from '../Formato/fechas';

export const exportToExcel = (datos, nombreModal) => {
    if (!datos || datos.length === 0) return;

    const firstItemName = datos[0]?.value?.toString().substring(0, 20) || "data";
    const hoy = obtenerFechaActual();

    const formattedData = datos.map(item => [item.label, item.value]);
    const ws = XLSX.utils.aoa_to_sheet([["Campo", "Valor"], ...formattedData]);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Detalles");
    XLSX.writeFile(wb, `${nombreModal}_${firstItemName}_${hoy}.xlsx`);
};
