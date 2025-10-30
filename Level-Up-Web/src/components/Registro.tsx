// src/components/Registro.tsx

import React, { useState } from 'react';

// Tipos para el estado del formulario usando TypeScript
interface FormData {
  nombre: string;
  email: string;
  fechaNacimiento: string;
}

const Registro: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    fechaNacimiento: '',
  });
  const [mensaje, setMensaje] = useState('');
  const [tieneDescuento, setTieneDescuento] = useState(false);

// Función para manejar los cambios en los inputs
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

  // Requisito Funcional: Descuento 20% para usuarios con correos de Duoc
    if (name === 'email') {
    const esDuoc = value.toLowerCase().endsWith('@duocuc.cl') || value.toLowerCase().endsWith('@alumnos.duoc.cl');
    setTieneDescuento(esDuoc);
    }
};

  // Función para validar la edad (mayor de 18)
const validarEdad = (fechaStr: string): boolean => {
    if (!fechaStr) return false;
    const fechaNac = new Date(fechaStr);
    const hoy = new Date();
  // Calcular la edad en años
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();

  // Ajustar si aún no ha cumplido años este mes
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
    edad--;
    }
    return edad >= 18;
};

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación de Edad
    if (!validarEdad(formData.fechaNacimiento)) {
      setMensaje('❌ ¡Registro Fallido! Debes ser mayor de 18 años para registrarte.');
      setTieneDescuento(false); 
      return;
    }

    // Mensaje basado en el descuento
    const mensajeRegistro = tieneDescuento
      ? '🎉 ¡Registro Exitoso! Tienes un descuento del 20% de por vida por ser Duoc UC.'
      : '✅ ¡Registro Exitoso! Bienvenido/a a la comunidad Level-Up Gamer.';
    
    setMensaje(mensajeRegistro);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto', border: '1px solid #1E90FF', borderRadius: '8px', backgroundColor: '#000000' }}>
      <h2 style={{ fontFamily: 'Orbitron, sans-serif', color: '#39FF14' }}>Únete a Level-Up Gamer</h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
        
        {/* Campo Nombre */}
        <input
          type="text"
          name="nombre"
          placeholder="Nombre Completo"
          value={formData.nombre}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        {/* Campo Email */}
        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico (ej: correo@duocuc.cl)"
          value={formData.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        {tieneDescuento && (
          <p style={{ color: '#39FF14', margin: '0', fontSize: '14px' }}>
            ¡Correo Duoc detectado! Descuento 20% de por vida aplicado.
          </p>
        )}

        {/* Campo Fecha de Nacimiento */}
        <label style={{ color: '#D3D3D3', fontSize: '14px' }}>Fecha de Nacimiento:</label>
        <input
          type="date"
          name="fechaNacimiento"
          value={formData.fechaNacimiento}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        {/* Mensaje de Edad */}
        <p style={{ color: '#D3D3D3', margin: '0', fontSize: '14px' }}>
          *Debes ser mayor de 18 años para registrarte.
        </p>

        {/* Botón de Registro */}
        <button type="submit" style={buttonStyle}>
          Registrarse
        </button>
      </form>
      
      {/* Mensaje de Estado */}
      {mensaje && (
        <p style={{ marginTop: '20px', fontWeight: 'bold', color: mensaje.startsWith('🎉') || mensaje.startsWith('✅') ? '#39FF14' : '#1E90FF' }}>
          {mensaje}
        </p>
      )}
    </div>
  );
};

// Estilos internos basados en el Diseño Visual (Negro, Azul Eléctrico, Verde Neón)
const inputStyle: React.CSSProperties = {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #1E90FF', // Azul Eléctrico
    backgroundColor: '#111',
    color: '#FFFFFF', // Blanco
    fontFamily: 'Roboto, sans-serif', // Fuente Principal
};

const buttonStyle: React.CSSProperties = {
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
  backgroundColor: '#1E90FF', // Azul Eléctrico
    color: '#000000',
    fontWeight: 'bold',
    cursor: 'pointer',
  fontFamily: 'Orbitron, sans-serif', // Fuente de Encabezado (futurista)
    transition: 'background-color 0.3s',
};

export default Registro;