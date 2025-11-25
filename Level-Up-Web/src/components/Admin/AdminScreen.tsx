import { useState } from "react";

export default function AdminDashboard() {
  const [view, setView] = useState("home");

  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>Panel de Administración</h1>

      <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
        <button onClick={() => setView("usuarios")} className="btn">Usuarios</button>
        <button onClick={() => setView("productos")} className="btn">Productos</button>
        <button onClick={() => setView("reportes")} className="btn">Reportes</button>
      </div>

      {view === "home" && (
        <div className="card">
          <p>Bienvenido al panel administrador.</p>
        </div>
      )}

      {view === "usuarios" && <UsuariosAdmin />}
      {view === "productos" && <ProductosAdmin />}
      {view === "reportes" && <ReportesAdmin />}
    </div>
  );
}

function UsuariosAdmin() {
  return (
    <div className="card">
      <h2 className="title">Gestión de Usuarios</h2>
      <button className="btn" style={{ marginBottom: "12px" }}>Crear nuevo usuario</button>
      <div className="box">Lista de usuarios...</div>
    </div>
  );
}

function ProductosAdmin() {
  return (
    <div className="card">
      <h2 className="title">Gestión de Productos</h2>
      <button className="btn" style={{ marginBottom: "12px" }}>Agregar producto</button>
      <div className="box">Lista de productos...</div>
    </div>
  );
}

function ReportesAdmin() {
  return (
    <div className="card">
      <h2 className="title">Reportes</h2>
      <div className="box">Gráficos y métricas...</div>
    </div>
  );
}

/* CSS Sugerido
.btn {
  padding: 8px 16px;
  border-radius: 8px;
  background: #333;
  color: white;
  border: none;
  cursor: pointer;
}

.card {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 16px;
}

.box {
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 12px;
}

.title {
  font-size: 24px;
  margin-bottom: 12px;
}
*/
