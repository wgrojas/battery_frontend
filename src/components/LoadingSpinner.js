import React, { useEffect, useState } from "react";
import Battery from "./Battery";
import "./LoadingSpinner.css";

function LoadingSpinner() {

  const [voltage, setVoltage] = useState(9);

  // simulación de carga
  useEffect(() => {

    const interval = setInterval(() => {

      setVoltage(prev => {

        let next = prev + 0.05;

        if (next > 12.6) next = 9;

        return Number(next.toFixed(2));

      });

    }, 120);

    return () => clearInterval(interval);

  }, []);

  return (

    <div className="loading-container">

      <Battery voltage={voltage} />

      <h2 className="loading-title">
        Cargando datos del sistema...
      </h2>

      <p className="loading-subtitle">
        Inicializando sensores y servidor
      </p>

    </div>

  );

}

export default LoadingSpinner;