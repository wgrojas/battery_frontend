import React from "react";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function GraficaSistema({ datos }) {
  // Ordenamos los datos por fecha de menor a mayor
  const datosOrdenados = [...datos].sort(
    (a, b) => new Date(a.fecha) - new Date(b.fecha)
  );

  const labels = datosOrdenados.map((d) =>
    new Date(d.fecha).toLocaleTimeString("es-CO", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    })
  );

  const voltaje = datosOrdenados.map((d) => Number(d.voltaje));
  const corriente = datosOrdenados.map((d) => Number(d.corriente));

  // Función para color de voltaje
  const colorVoltaje = (v) => {
    if (v >= 12) return "#16a34a";
    if (v >= 11) return "#f59e0b";
    return "#dc2626";
  };

  // Función para color de corriente
  const colorCorriente = (c) => {
    if (c <= 10) return "#2563eb";
    return "#dc2626";
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Voltaje (V)",
        data: voltaje,
        borderColor: "#16a34a",
        backgroundColor: "rgba(34, 197, 94, 0.15)",
        pointBackgroundColor: voltaje.map((v) => colorVoltaje(v)),
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        yAxisID: "yVoltaje"
      },
      {
        label: "Corriente (A)",
        data: corriente,
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.12)",
        pointBackgroundColor: corriente.map((c) => colorCorriente(c)),
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        yAxisID: "yCorriente"
      }
    ]
  };

  const maxCorriente = Math.max(...corriente, 1);
  const maxVoltaje = Math.max(...voltaje, 15);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#334155",
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          font: {
            size: 13,
            weight: "600"
          }
        }
      },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.92)",
        titleColor: "#ffffff",
        bodyColor: "#e2e8f0",
        borderColor: "#334155",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 10,
        displayColors: true
      }
    },
    scales: {
      x: {
        type: "category",
        grid: {
          display: true,
          color: "rgba(148, 163, 184, 0.10)",
          drawBorder: false,
          lineWidth: 1
        },
        ticks: {
          color: "#64748b",
          maxRotation: 45,
          minRotation: 0,
          autoSkip: true,
          maxTicksLimit: 8,
          font: {
            size: 11
          }
        }
      },
      yCorriente: {
        type: "linear",
        position: "left",
        min: 0,
        max: Math.ceil(maxCorriente + 1),
        ticks: {
          stepSize: 1,
          color: "#2563eb",
          padding: 12,
          font: {
            size: 12
          }
        },
        grid: {
          color: "rgba(148, 163, 184, 0.15)",
          drawBorder: false
        },
        title: {
          display: true,
          text: "Corriente (A)",
          color: "#2563eb",
          font: {
            size: 12,
            weight: "600"
          }
        }
      },
      yVoltaje: {
        type: "linear",
        position: "right",
        min: 1,
        max: Math.ceil(maxVoltaje + 1),
        ticks: {
          stepSize: 1,
          color: "#16a34a",
          padding: 12,
          font: {
            size: 12
          }
        },
        grid: {
          drawOnChartArea: false,
          drawBorder: false
        },
        title: {
          display: true,
          text: "Voltaje (V)",
          color: "#16a34a",
          font: {
            size: 12,
            weight: "600"
          }
        }
      }
    },
    elements: {
      line: {
        capBezierPoints: true
      }
    }
  };

  return (
    <div
      className="card border-0 shadow-sm p-3 p-md-4 mx-auto"
      style={{
        borderRadius: "20px",
        background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
        maxWidth: "1000px",
        width: "100%"
      }}
    >
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
        <h5
          className="mb-2 mb-md-0"
          style={{
            color: "#0f172a",
            fontWeight: "700"
          }}
        >
          📊 Monitoreo del sistema solar
        </h5>

        <span
          style={{
            fontSize: "0.85rem",
            color: "#64748b",
            background: "#e2e8f0",
            padding: "6px 12px",
            borderRadius: "999px"
          }}
        >
          Tiempo real
        </span>
      </div>

      <div style={{ position: "relative", width: "100%", height: "430px" }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default GraficaSistema;
