// src/components/PuntosLevelUp.tsx

import React from 'react';

// Simulación de los niveles de Gamificación
interface Nivel {
    nombre: string;
    puntosRequeridos: number;
    beneficio: string;
}

const NIVELES: Nivel[] = [
    { nombre: "Novato", puntosRequeridos: 0, beneficio: "Acceso a descuentos del 5%" },
    { nombre: "Avanzado", puntosRequeridos: 1000, beneficio: "Descuento del 10% y Acceso a preventas" },
    { nombre: "Elite", puntosRequeridos: 5000, beneficio: "Descuento del 15% y Envío Gratuito" },
    { nombre: "Leyenda", puntosRequeridos: 10000, beneficio: "Descuento del 20%, Producto de Regalo anual" },
];

interface PuntosProps {
    puntosActuales: number;
}

const PuntosLevelUp: React.FC<PuntosProps> = ({ puntosActuales }) => {
    // Determinar el nivel actual del usuario
    const nivelActual = NIVELES.slice().reverse().find(n => puntosActuales >= n.puntosRequeridos) || NIVELES[0];

    // Determinar el siguiente nivel
    const nivelesSuperiores = NIVELES.filter(n => n.puntosRequeridos > nivelActual.puntosRequeridos);
    const siguienteNivel = nivelesSuperiores.length > 0 ? nivelesSuperiores[0] : null;

    return (
        <div style={puntosStyle}>
            <h2 style={{ fontFamily: 'Orbitron, sans-serif', color: '#1E90FF', borderBottom: '2px solid #1E90FF', paddingBottom: '10px' }}>
                🌟 Programa Level-Up (Gamificación)
            </h2>
            
            <p style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
                Puntos LevelUp Acumulados: <span style={{ color: '#39FF14' }}>{puntosActuales.toLocaleString()}</span>
            </p>

            <div style={nivelBoxStyle}>
                <p>Nivel Actual: <span style={{ fontWeight: 'bold' }}>{nivelActual.nombre}</span></p>
                <p>Beneficio: {nivelActual.beneficio}</p>
            </div>
            
            {siguienteNivel && (
                <div style={{marginTop: '15px'}}>
                    <h4 style={{ margin: '0 0 10px 0', color: '#D3D3D3' }}>Próximo Nivel: {siguienteNivel.nombre}</h4>
                    <p style={{margin: '0', color: '#D3D3D3'}}>
                        Te faltan <span style={{fontWeight: 'bold', color: '#1E90FF'}}>{(siguienteNivel.puntosRequeridos - puntosActuales).toLocaleString()}</span> puntos para alcanzar el beneficio: {siguienteNivel.beneficio}
                    </p>
                </div>
            )}
            
            <button style={buttonStyle}>Canjear Puntos por Descuentos</button>
            <p style={{fontSize: '0.9em', color: '#D3D3D3', margin: '10px 0 0 0'}}>*Los puntos se ganan con las compras y referencias.</p>
        </div>
    );
};

// Estilos internos
const puntosStyle: React.CSSProperties = {
  maxWidth: '800px',
  margin: '20px auto',
  padding: '20px',
  border: '1px solid #1E90FF',
  borderRadius: '8px',
  backgroundColor: '#111',
  color: '#FFFFFF',
};

const nivelBoxStyle: React.CSSProperties = {
    padding: '10px',
    border: '1px solid #39FF14',
    backgroundColor: '#222',
    borderRadius: '4px',
};

const buttonStyle: React.CSSProperties = {
    padding: '8px 15px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#39FF14', // Verde Neón para el canje
    color: '#000000', 
    fontWeight: 'bold',
    cursor: 'pointer',
    fontFamily: 'Roboto, sans-serif',
    marginTop: '15px',
  };

export default PuntosLevelUp;
