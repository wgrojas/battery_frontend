import React from "react";

function TablaDatos({ datos }) {
  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="card p-3 shadow" style={{ width: "100%", maxWidth: "1000px" }}>
        <h5 className="text-center mb-3">📋 Historial de monitoreo</h5>

        <div className="table-responsive">
          <table className="table table-striped text-center align-middle mb-0">
            <thead>
              <tr>
                <th>Voltaje</th>
                <th>Corriente</th>
                <th>Estado</th>
                <th>Fecha</th>
              </tr>
            </thead>

            <tbody>
              {datos.map((d) => (
                <tr key={d.id}>
                  <td>{d.voltaje} V</td>
                  <td>{d.corriente} A</td>
                  <td>
                    {d.estado === "NORMAL" && (
                      <span className="badge bg-success">NORMAL</span>
                    )}
                    {d.estado === "BAJO" && (
                      <span className="badge bg-warning text-dark">BAJO</span>
                    )}
                    {d.estado === "SOBRECARGA" && (
                      <span className="badge bg-danger">SOBRECARGA</span>
                    )}
                  </td>
                  <td>{new Date(d.fecha).toLocaleString("es-CO")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TablaDatos;