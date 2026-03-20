import React, { useEffect, useState, useCallback } from "react";

import API from "./services/api";

import GraficaSistema from "./components/GraficaSistema";
import TablaDatos from "./components/TablaDatos";
import Battery from "./components/Battery";
import Login from "./components/Login";
import Header from "./components/Header";
import RegistrarUsuarioModal from "./components/RegistrarUsuarioModal";
import LoadingSpinner from "./components/LoadingSpinner";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  // =============================
  // AUTENTICACIÓN
  // =============================
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("token");
    const usuario = localStorage.getItem("usuario");
    return token ? { token, usuario } : null;
  });

  const [datos, setDatos] = useState([]);
  const [voltajeActual, setVoltajeActual] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Validar si el usuario es admin
  const esAdmin = auth?.usuario?.toLowerCase() === "admin";

  // =============================
  // CARGAR DATOS
  // =============================
  const cargarDatos = useCallback(async () => {
    if (!auth?.token) return;

    try {
      const res = await API.get("/api/datos");
      const data = res.data || [];

      setDatos(data);

      if (data.length > 0) {
        setVoltajeActual(data[0].voltaje);
      }
    } catch (err) {
      console.error("Error cargando datos:", err);
    } finally {
      setLoading(false);
    }
  }, [auth]);

  // =============================
  // ACTUALIZACIÓN AUTOMÁTICA
  // =============================
  useEffect(() => {
    if (!auth?.token) return;

    setLoading(true);
    cargarDatos();

    const intervalo = setInterval(() => {
      cargarDatos();
    }, 5000);

    return () => clearInterval(intervalo);
  }, [auth, cargarDatos]);

  // =============================
  // LOGIN
  // =============================
  const handleLogin = (data) => {
    setAuth(data);

    localStorage.setItem("token", data.token);
    localStorage.setItem("usuario", data.usuario);

    setLoading(true);
  };

  // =============================
  // LOGOUT
  // =============================
  const handleLogout = () => {
    setAuth(null);

    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
  };

  const handleRegistrar = () => {
    if (esAdmin) {
      setShowModal(true);
    }
  };

  // =============================
  // LOGIN SCREEN
  // =============================
  if (!auth) return <Login onLogin={handleLogin} />;

  // =============================
  // INTERFAZ PRINCIPAL
  // =============================
  return (
    <div className="appContainer">
      <Header
        usuario={auth.usuario}
        onLogout={handleLogout}
        onRegistrar={esAdmin ? handleRegistrar : null}
      />

      <div className="container mt-4">
        <h2 className="tituloSistema">☀️ Monitor Sistema Solar</h2>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="batteryContainer">
              <Battery voltage={voltajeActual} />
            </div>

            <GraficaSistema datos={datos} />

            <TablaDatos datos={datos} />
          </>
        )}
      </div>

      {showModal && esAdmin && (
        <RegistrarUsuarioModal
          token={auth.token}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default App;
