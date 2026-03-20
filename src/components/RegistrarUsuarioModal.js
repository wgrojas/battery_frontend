import React, { useState } from "react";
import API from "../services/api";

function RegistrarUsuarioModal({ token, onClose }) {
  const [nuevoUsuario, setNuevoUsuario] = useState("");
  const [nuevoPassword, setNuevoPassword] = useState(""); // ⚡ cambio de variable
  const [errorRegistro, setErrorRegistro] = useState("");
  const [exitoRegistro, setExitoRegistro] = useState("");

  const handleGuardarUsuario = async () => {
    if (!nuevoUsuario || !nuevoPassword) {
      setErrorRegistro("Debe completar todos los campos");
      setExitoRegistro("");
      return;
    }

    try {
      const res = await API.post(
        "/api/usuarios/register",
        { nombre: nuevoUsuario, password: nuevoPassword }, // ⚡ enviar como "password"
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = res.data;

      if (!data.success) {
        if (data.error === "Usuario repetido") {
          setErrorRegistro("❌ El usuario ya está registrado");
        } else {
          setErrorRegistro(data.error || "Error al registrar usuario");
        }
        setExitoRegistro("");
      } else {
        setExitoRegistro("✅ Usuario registrado exitosamente");
        setErrorRegistro("");
        setNuevoUsuario("");
        setNuevoPassword("");

        setTimeout(() => onClose(), 1200);
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setErrorRegistro(err.response.data.error);
      } else {
        setErrorRegistro("Error de conexión al servidor");
      }
      setExitoRegistro("");
      console.error(err);
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Registrar Nuevo Usuario</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <input
              type="text"
              placeholder="Nombre usuario"
              className="form-control mb-2"
              value={nuevoUsuario}
              onChange={(e) => setNuevoUsuario(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password" // ⚡ placeholder actualizado
              className="form-control mb-2"
              value={nuevoPassword}
              onChange={(e) => setNuevoPassword(e.target.value)}
            />

            {errorRegistro && <p className="text-danger mt-2">{errorRegistro}</p>}
            {exitoRegistro && <p className="text-success mt-2">{exitoRegistro}</p>}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="button" className="btn btn-primary" onClick={handleGuardarUsuario}>
              Guardar y Salir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrarUsuarioModal;