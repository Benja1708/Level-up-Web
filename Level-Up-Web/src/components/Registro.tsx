// src/components/Registro.tsx

import React, { useState } from 'react';

interface FormData {
  nombre: string;
  email: string;
  fechaNacimiento: string;
  codigoReferido: string;
}

const PUNTOS_INICIALES = 100; 

const Registro: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    fechaNacimiento: '',
    codigoReferido: '',
  });
  const [mensaje, setMensaje] = useState('');
  const [tieneDescuento, setTieneDescuento] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'email') {
      const esDuoc = value.toLowerCase().endsWith('@duocuc.cl') || value.toLowerCase().endsWith('@alumnos.duoc.cl');
      setTieneDescuento(esDuoc);
    }
  };

  const validarEdad = (fechaStr: string): boolean => {
    if (!fechaStr) return false;
    const fechaNac = new Date(fechaStr);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
    
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }
    return edad >= 18; 
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarEdad(formData.fechaNacimiento)) {
      setMensaje('❌ ¡Registro Fallido! Debes ser mayor de 18 años para registrarte.');
      return;
    }
    
    let puntos = PUNTOS_INICIALES;
    let mensajeReferido = '';

    if (formData.codigoReferido) {
        puntos += 500; 
        mensajeReferido = ' ¡Y 500 Puntos LevelUp extra por tu código de referido!';
    }
    
    const mensajeRegistro = tieneDescuento
      ? `🎉 ¡Registro Exitoso! Tienes ${puntos} Puntos LevelUp y 20% de descuento por ser Duoc UC.${mensajeReferido}`
      : `✅ ¡Registro Exitoso! Bienvenido/a a la comunidad Level-Up Gamer. Has ganado ${puntos} Puntos LevelUp.${mensajeReferido}`;
    
    setMensaje(mensajeRegistro);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto', border: '1px solid #1E90FF', borderRadius: '8px', backgroundColor: '#000000' }}>
      <h2 style={{ fontFamily: 'Orbitron, sans-serif', color: '#39FF14' }}>Únete a Level-Up Gamer</h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
        
        <input type="text" name="nombre" placeholder="Nombre Completo" value={formData.nombre} onChange={handleChange} required style={inputStyle} />
        
        <input type="email" name="email" placeholder="Correo Electrónico (ej: correo@duocuc.cl)" value={formData.email} onChange={handleChange} required style={inputStyle} />
        {tieneDescuento && (
          <p style={{ color: '#39FF14', margin: '0', fontSize: '14px' }}>
            ¡Correo Duoc detectado! Descuento 20% de por vida aplicado.
          </p>
        )}

        <input 
            type="text" 
            name="codigoReferido" 
            placeholder="Código de Referido (Opcional)" 
            value={formData.codigoReferido} 
            onChange={handleChange} 
            style={inputStyle} 
        />
        
        <label style={{ color: '#D3D3D3', fontSize: '14px' }}>Fecha de Nacimiento:</label>
        <input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} required style={inputStyle} />

        <p style={{ color: '#D3D3D3', margin: '0', fontSize: '14px' }}>
          *Debes ser mayor de 18 años para registrarte.
        </p>

        <button type="submit" style={buttonStyle}>
          Registrarse
        </button>
      </form>
      
      {mensaje && (
        <p style={{ marginTop: '20px', fontWeight: 'bold', color: mensaje.startsWith('❌') ? '#1E90FF' : '#39FF14' }}>
          {mensaje}
        </p>
      )}
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid #1E90FF', 
  backgroundColor: '#111', 
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
};


export default Registro;
