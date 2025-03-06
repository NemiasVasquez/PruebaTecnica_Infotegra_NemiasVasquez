import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.register(ChartDataLabels);

export const obtenerConfiguracionGrafico = ({ labels, data, chartType, horizontal, colors }) => {
    if (!labels || !data || labels.length === 0 || data.length === 0) return null;

    const defaultColors = labels.map(() =>
        `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.7)`
    );

    const backgroundColors = colors || defaultColors;
    const borderColors = backgroundColors.map(c => c.replace("0.7", "1"));

    return {
        type: chartType,
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Cantidad",
                    data: data,
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 2,
                },
            ],
        },

        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        autoSkip: false, // NO OMITIR ETIQUETAS
                        maxRotation: 0,
                        minRotation: 0,
                        font: {
                            size: 12, // Ajusta el tamaño de las etiquetas
                            weight: "bold",
                        },
                        color: "#333", // Color de texto
                    }
                },
                x: {
                    beginAtZero: true,
                    ticks: {
                        autoSkip: false, // Asegurar que no se oculten etiquetas en X tampoco
                        font: {
                            size: 12,
                            weight: "bold",
                        },
                        color: "#333",
                    },
                },
            },
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: horizontal ? "y" : "x",
          
            plugins: {
                legend: { display: chartType === "doughnut" || chartType === "pie" },
                tooltip: { enabled: true },
                datalabels: {
                    color: "#fff",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    borderRadius: 5,
                    padding: 4,
                    anchor: chartType === "doughnut" || chartType === "pie" ? "end" : "end",
                    align: "center",
                    offset: 5,
                    formatter: (value, ctx) => chartType === "doughnut" ? `${ctx.chart.data.labels[ctx.dataIndex]}: ${value}` : value,
                    font: {
                        weight: "bold",
                        size: 12,
                    },
                    clip: false,
                },
            },
        },
    };
};
