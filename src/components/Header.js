import React from "react";

function Header({ usuario, onLogout, onRegistrar }) {
  return (
    <header className="headerBar">
      <div className="usuarioBienvenida">
        Bienvenido, <span className="usuarioNombre">{usuario}</span>
      </div>

      <div className="headerActions">
        {onRegistrar && (
          <button className="btn btn-success" onClick={onRegistrar}>
            Registrar Usuario
          </button>
        )}

        <button className="btn btn-danger" onClick={onLogout}>
          Salir
        </button>
      </div>
    </header>
  );
}

export default Header;
