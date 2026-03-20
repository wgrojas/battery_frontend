const axios = require("axios");

async function insertarDatos() {
  const datos = [
    {
      dispositivo: "Panel Solar 1",
      voltaje: 12.6,
      corriente: 3.2
    },
    {
      dispositivo: "Bateria Principal",
      voltaje: 11.1,
      corriente: 2.9
    },
    {
      dispositivo: "Controlador Solar",
      voltaje: 15.0,
      corriente: 4.1
    }
  ];

  const API_LOCAL = "http://localhost:5000/api/voltaje";
  const API_REMOTA = "https://battery-monitor-93742821e808.herokuapp.com/api/voltaje"; // ⚠️ revisa ruta

  try {
    for (const dato of datos) {

      const resultados = await Promise.allSettled([
        axios.post(API_LOCAL, dato),
        axios.post(API_REMOTA, dato)
      ]);

      resultados.forEach((res, i) => {
        const nombre = i === 0 ? "LOCAL" : "REMOTA";

        if (res.status === "fulfilled") {
          console.log(`✅ ${nombre}:`, res.value.data);
        } else {
          console.log(`❌ ${nombre}:`, res.reason.message);
        }
      });

      console.log("-------------");
    }

  } catch (error) {
    console.error("Error general:", error.message);
  }
}

insertarDatos();