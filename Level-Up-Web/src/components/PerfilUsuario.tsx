// src/components/PerfilUsuario.tsx

import React, { useState } from 'react';

interface PerfilData {
  nombre: string;
  email: string;
  preferenciaJuego: string;
  recibirNotificaciones: boolean;
}

const initialProfile: PerfilData = {
  nombre: 'Gamer Legendario',
  email: 'gamer.legendario@alumnos.duoc.cl', 
  preferenciaJuego: 'RPG',
  recibirNotificaciones: true,
};

const PerfilUsuario: React.FC = () => {
  const [perfil, setPerfil] = useState<PerfilData>(initialProfile);
  const [mensaje, setMensaje] = useState('');

  const tieneDescuentoDuoc = perfil.email.toLowerCase().endsWith('@duocuc.cl') || perfil.email.toLowerCase().endsWith('@alumnos.duoc.cl');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    const nuevoValor = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setPerfil(prev => ({
      ...prev,
      [name]: nuevoValor,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje('✅ Perfil actualizado con éxito.');
  };

  return (
    <div style={perfilStyle}>
      <h2 style={{ fontFamily: 'Orbitron, sans-serif', color: '#39FF14', borderBottom: '2px solid #1E90FF', paddingBottom: '10px' }}>
        👤 Gestión de Perfil
      </h2>
      
      {/* Información de Fidelización (simulación de integración con Registro/Gamificación) */}
      <div style={infoBoxStyle}>
        <p style={{ margin: '0 0 5px 0' }}>**Estado de Fidelización:**</p>
        {tieneDescuentoDuoc && (
          <p style={{ color: '#39FF14', fontWeight: 'bold', margin: '0' }}>- Descuento Duoc UC (20% de por vida)</p>
        )}
        <p style={{ color: '#1E90FF', margin: '0' }}>- Nivel Actual: Elite (Simulado)</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px', marginTop: '20px' }}>
        
        {/* Campo Nombre */}
        <label style={labelStyle}>Nombre:</label>
        <input 
          type="text" 
          name="nombre" 
          value={perfil.nombre} 
          onChange={handleChange} 
          style={inputStyle} 
          required 
        />

        {/* Campo Email (Bloqueado ya que es un identificador) */}
        <label style={labelStyle}>Email (No editable):</label>
        <input 
          type="email" 
          name="email" 
          value={perfil.email} 
          style={inputStyle} 
          disabled 
        />
        
        {/* Preferencias de compra (Gestionar preferencias) */}
        <label style={labelStyle}>Preferencia de Juego (para Recomendaciones):</label>
        <select 
          name="preferenciaJuego" 
          value={perfil.preferenciaJuego} 
          onChange={handleChange} 
          style={inputStyle}
        >
          <option value="RPG">RPG</option>
          <option value="FPS">FPS / Shooter</option>
          <option value="Estrategia">Estrategia</option>
          <option value="Juegos de Mesa">Juegos de Mesa</option>
        </select>
        
        {/* Preferencias de compra (Notificaciones) */}
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          <input 
            type="checkbox" 
            id="notificaciones"
            name="recibirNotificaciones" 
            checked={perfil.recibirNotificaciones}
            onChange={handleChange}
            style={{marginRight: '10px'}}
          />
          <label htmlFor="notificaciones" style={labelStyle}>Recibir notificaciones de ofertas personalizadas.</label>
        </div>

        <button type="submit" style={buttonStyle}>
          Guardar Cambios
        </button>
      </form>
      
      {mensaje && <p style={{ color: '#39FF14', marginTop: '15px' }}>{mensaje}</p>}
    </div>
  );
};

const perfilStyle: React.CSSProperties = {
  maxWidth: '600px',
  margin: '20px auto',
  padding: '20px',
  border: '1px solid #1E90FF',
  borderRadius: '8px',
  backgroundColor: '#111',
  color: '#FFFFFF',
};

const infoBoxStyle: React.CSSProperties = {
    padding: '10px',
    border: '1px solid #333',
    backgroundColor: '#222',
    borderRadius: '4px'
};

const labelStyle: React.CSSProperties = {
    color: '#D3D3D3',
    fontSize: '0.9em',
    marginBottom: '5px'
};

const inputStyle: React.CSSProperties = {
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid #1E90FF', 
  backgroundColor: '#000', 
  color: '#FFFFFF', 
  fontFamily: 'Roboto, sans-serif', 
};

const buttonStyle: React.CSSProperties = {
  padding: '10px',
  borderRadius: '4px',
  border: 'none',
  backgroundColor: '#1E90FF', 
  color: '#000000', 
  fontWeight: 'bold',
  cursor: 'pointer',
  fontFamily: 'Orbitron, sans-serif',
  transition: 'background-color 0.3s',
  marginTop: '10px'
};

export default PerfilUsuario;
