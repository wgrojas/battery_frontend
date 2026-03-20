import React, { useState } from "react";
import API from "../services/api";
import "./Login.css";

function Login({ onLogin }) {
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/api/usuarios/login", {
        nombre,
        password,
      });

      const data = res.data;

      if (!data.token) {
        setError(data.error || "Usuario o contraseña incorrectos");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", data.usuario || nombre);

      onLogin({
        token: data.token,
        usuario: data.usuario || nombre,
      });
    } catch (err) {
      console.error(err);

      if (err.response) {
        setError(err.response.data.error || "Error en el servidor");
      } else if (err.request) {
        setError("No se pudo conectar con el servidor");
      } else {
        setError("Error inesperado en la aplicación");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginCard">
        <div className="loginHeader">
          <h3>☀️ Monitor de Batería</h3>
          <p>Sistema de monitoreo de batería</p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Usuario"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="form-control mb-3"
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control mb-3"
            required
          />

          <button
            type="submit"
            className="btn btn-success w-100 loginButton"
            disabled={loading || !nombre || !password}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Verificando...
              </>
            ) : (
              "Ingresar"
            )}
          </button>
        </form>

        {error && (
          <div className="alert alert-danger mt-3 text-center">
            {error}
          </div>
        )}

        <div className="loginFooter">Sistema de monitoreo energético</div>
      </div>
    </div>
  );
}

export default Login;