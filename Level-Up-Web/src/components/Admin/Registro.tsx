import React, { useState } from 'react';
import { User, Mail, Calendar, Key, CheckCircle, XCircle, Zap, Tag } from 'lucide-react';

interface FormData {
  nombre: string;
  email: string;
  fechaNacimiento: string;
  codigoReferido: string;
}

const PUNTOS_INICIALES = 100; 
const PUNTOS_REFERIDO = 500;

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
    setMensaje(''); // Limpiar mensajes anteriores

    if (!validarEdad(formData.fechaNacimiento)) {
      setMensaje('❌ ¡Registro Fallido! Debes ser mayor de 18 años para registrarte.');
      setTimeout(() => setMensaje(''), 4000);
      return;
    }
    
    let puntos = PUNTOS_INICIALES;
    let mensajeReferido = '';

    if (formData.codigoReferido.trim()) {
        puntos += PUNTOS_REFERIDO; 
        mensajeReferido = ` ¡Y ${PUNTOS_REFERIDO} Puntos LevelUp extra por tu código de referido!`;
    }
    
    const mensajeRegistro = tieneDescuento
      ? `🎉 ¡Registro Exitoso! Tienes ${puntos} Puntos LevelUp y 20% de descuento por ser Duoc UC.${mensajeReferido}`
      : `✅ ¡Registro Exitoso! Bienvenido/a a la comunidad Level-Up Gamer. Has ganado ${puntos} Puntos LevelUp.${mensajeReferido}`;
    
    setMensaje(mensajeRegistro);
    setTimeout(() => setMensaje(''), 5000);
  };
    
    // Componente de input reutilizable con ícono
    const IconInput: React.FC<{ icon: React.ElementType, name: keyof FormData, placeholder: string, type: string, value: string, required?: boolean }> = ({ icon: Icon, name, placeholder, type, value, required = false }) => (
        <div style={inputContainerStyle}>
            <Icon size={20} style={iconStyle} />
            <input 
                type={type} 
                name={name} 
                placeholder={placeholder} 
                value={value} 
                onChange={handleChange} 
                required={required} 
                style={inputFieldStyle} 
            />
        </div>
    );

  return (
    <div style={registroContainerStyle}>
      <h2 style={{ fontFamily: 'Orbitron, sans-serif', color: '#39FF14', borderBottom: '2px solid #1E90FF', paddingBottom: '10px', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Zap size={30}/> Registro Level-Up
      </h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
        
        <IconInput icon={User} name="nombre" placeholder="Nombre Completo" type="text" value={formData.nombre} required />
        
        <IconInput icon={Mail} name="email" placeholder="Correo Electrónico (ej: correo@duocuc.cl)" type="email" value={formData.email} required />
        {tieneDescuento && (
          <p style={{ color: '#39FF14', margin: '-10px 0 0 0', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Tag size={16}/> ¡Correo Duoc detectado! Descuento 20% de por vida aplicado.
          </p>
        )}

        <IconInput icon={Key} name="codigoReferido" placeholder="Código de Referido (Opcional)" type="text" value={formData.codigoReferido} />

        <label style={{ color: '#D3D3D3', fontSize: '14px', margin: '0' }}>Fecha de Nacimiento:</label>
        <div style={inputContainerStyle}>
            <Calendar size={20} style={iconStyle} />
            <input 
                type="date" 
                name="fechaNacimiento" 
                value={formData.fechaNacimiento} 
                onChange={handleChange} 
                required 
                style={inputFieldStyle} 
            />
        </div>
        
        <p style={{ color: '#D3D3D3', margin: '0', fontSize: '14px', borderTop: '1px dotted #333', paddingTop: '10px' }}>
          *Debes ser mayor de 18 años para registrarte.
        </p>

        <button type="submit" style={buttonStyle}>
          Registrarse y Obtener {PUNTOS_INICIALES} Puntos
        </button>
      </form>
      
      {mensaje && (
        <p style={{ marginTop: '20px', padding: '10px', borderRadius: '4px', fontWeight: 'bold', 
            color: mensaje.startsWith('❌') ? '#FF6347' : '#39FF14',
            border: `1px solid ${mensaje.startsWith('❌') ? '#FF6347' : '#39FF14'}`,
            backgroundColor: mensaje.startsWith('❌') ? 'rgba(255, 99, 71, 0.1)' : 'rgba(57, 255, 20, 0.1)'
        }}>
            {mensaje.startsWith('❌') ? <XCircle size={20} style={{verticalAlign: 'middle', marginRight: '5px'}}/> : <CheckCircle size={20} style={{verticalAlign: 'middle', marginRight: '5px'}}/>}
          {mensaje.substring(2).trim()}
        </p>
      )}
    </div>
  );
};

const registroContainerStyle: React.CSSProperties = {
  padding: '30px',
  maxWidth: '450px',
  margin: '50px auto',
  border: '2px solid #1E90FF', 
  borderRadius: '12px',
  backgroundColor: '#111',
  boxShadow: '0 0 15px rgba(30, 144, 255, 0.4)',
  color: '#FFFFFF'
};

const inputContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #1E90FF',
    borderRadius: '4px',
    backgroundColor: '#000',
    padding: '0 10px',
};

const iconStyle: React.CSSProperties = {
    color: '#1E90FF',
    marginRight: '10px',
};

const inputFieldStyle: React.CSSProperties = {
  padding: '10px 0',
  border: 'none', 
  backgroundColor: 'transparent', 
  color: '#FFFFFF', 
  fontFamily: 'Roboto, sans-serif', 
  flexGrow: 1,
  outline: 'none',
};

const buttonStyle: React.CSSProperties = {
  padding: '12px',
  borderRadius: '6px',
  border: 'none',
  backgroundColor: '#39FF14', 
  color: '#000000', 
  fontWeight: 'bold',
  cursor: 'pointer',
  fontFamily: 'Orbitron, sans-serif',
  transition: 'background-color 0.3s',
  boxShadow: '0 0 10px rgba(57, 255, 20, 0.6)',
  marginTop: '10px'
};


export default Registro;