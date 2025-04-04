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

    const esCircular = chartType === "pie" || chartType === "doughnut";

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
            // Oculta las escalas si es pie o doughnut
            scales: esCircular
                ? {}
                : {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            autoSkip: false,
                            maxRotation: 0,
                            minRotation: 0,
                            font: { size: 12, weight: "bold" },
                            color: "#333",
                        },
                    },
                    x: {
                        beginAtZero: true,
                        ticks: {
                            autoSkip: false,
                            font: { size: 12, weight: "bold" },
                            color: "#333",
                        },
                    },
                },

            responsive: true,
            maintainAspectRatio: false,
            indexAxis: horizontal ? "y" : "x",
            cutout: esCircular && chartType === "doughnut" ? "50%" : undefined, // Reducir tamaño en doughnut
            radius: esCircular ? "80%" : undefined, // Reducir radio en pie
            plugins: {

                legend: { display: esCircular },
                tooltip: { enabled: true, bodyFont: { size: 7 }, },
                datalabels: {

                    color: "#fff",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    borderRadius: 5,
                    padding: 4,
                    anchor: esCircular ? "end" : "end",
                    align: "center",
                    offset: 10,
                    clamp: true,
                    display: (context) => {
                        if (esCircular) {
                            const dataset = context.dataset;
                            const value = dataset.data[context.dataIndex];

                            const total = dataset.data.reduce((acc, val) => acc + val, 0);
                            return value / total >= 0.05;
                        }
                    },
                    formatter: (value, ctx) => {
                        const dataset = ctx.dataset;
                        const total = dataset.data.reduce((acc, val) => acc + val, 0);
                        const percentage = ((value / total) * 100).toFixed(1) + "%";

                        return esCircular ? `${ctx.chart.data.labels[ctx.dataIndex]}: ${value} (${percentage})` : `${value}`
                    },
                },
            },
        },
    };
};
