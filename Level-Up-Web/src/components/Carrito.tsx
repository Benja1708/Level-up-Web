// src/components/Carrito.tsx

import React from 'react';
// CORRECCIÓN: Usamos 'import type' para el tipo ItemCarrito exportado desde src/App.tsx
import type { ItemCarrito } from '../App'; 

interface CarritoProps {
  carrito: ItemCarrito[];
  onModificarCantidad: (codigo: string, nuevaCantidad: number) => void;
}

// Función auxiliar para convertir el precio CLP de string a número entero
const parseCLP = (precioStr: string): number => {
  // Elimina el signo $ y los puntos de miles, luego convierte a número
  const limpio = precioStr.replace('$', '').replace(/\./g, '').replace(' CLP', '');
  return parseInt(limpio, 10) || 0;
};

const Carrito: React.FC<CarritoProps> = ({ carrito, onModificarCantidad }) => {

  // Calcular el Total de la Compra (Requisito: Mostrar totales)
  const totalCompra = carrito.reduce((total, item) => {
    const precioUnitario = parseCLP(item.precio); 
    return total + (precioUnitario * item.cantidad);
  }, 0);

  // Formatear el total a CLP con separadores de miles
  const totalFormateado = `$${totalCompra.toLocaleString('es-CL')} CLP`;

  // Muestra el carrito
  return (
    <div style={carritoStyle}>
      <h2 style={{ fontFamily: 'Orbitron, sans-serif', color: '#39FF14', borderBottom: '2px solid #1E90FF', paddingBottom: '10px' }}>
        🛍️ Carrito de Compras
      </h2>
      
      {carrito.length === 0 ? (
        <p style={{ color: '#D3D3D3' }}>Tu carrito está vacío. ¡Añade algunos productos gamers!</p>
      ) : (
        <>
          {carrito.map(item => (
            <div key={item.codigo} style={itemStyle}>
              <div style={{ flexGrow: 1 }}>
                <h4 style={{ margin: '0', color: '#FFFFFF' }}>{item.nombre}</h4>
                <p style={{ margin: '5px 0 0 0', color: '#D3D3D3', fontSize: '0.9em' }}>
                  Precio unitario: {item.precio}
                </p>
              </div>
              
              <div style={controlesStyle}>
                {/* Requisito: Opciones para agregar, eliminar y modificar productos */}
                <input
                  type="number"
                  min="0"
                  value={item.cantidad}
                  // Modificar: Llama a la función para actualizar la cantidad
                  onChange={(e) => onModificarCantidad(item.codigo, parseInt(e.target.value))}
                  style={inputCantidadStyle}
                />
                <button
                  onClick={() => onModificarCantidad(item.codigo, 0)} // Eliminar: Pasa cantidad 0
                  style={{ ...buttonStyle, backgroundColor: '#FF4500' }} // Naranja (DarkOrange) para eliminar
                >
                  X
                </button>
              </div>
            </div>
          ))}

          {/* Resumen del carrito con precios detallados y totales */}
          <div style={resumenStyle}>
            <p style={{ fontWeight: 'bold' }}>Total de la Compra:</p>
            <p style={{ color: '#39FF14', fontWeight: 'bold', fontSize: '1.4em' }}>{totalFormateado}</p>
            <button style={{ ...buttonStyle, width: '100%', marginTop: '15px' }}>
              Finalizar Compra
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// Estilos internos
const carritoStyle: React.CSSProperties = {
  maxWidth: '800px',
  margin: '20px auto',
  padding: '20px',
  border: '1px solid #1E90FF',
  borderRadius: '8px',
  backgroundColor: '#111',
  color: '#FFFFFF',
};

const itemStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 0',
  borderBottom: '1px dotted #333',
};

const controlesStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
};

const inputCantidadStyle: React.CSSProperties = {
  width: '60px',
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #1E90FF',
  backgroundColor: '#000',
  color: '#FFFFFF',
  textAlign: 'center',
};

const resumenStyle: React.CSSProperties = {
  marginTop: '20px',
  paddingTop: '15px',
  borderTop: '2px solid #1E90FF',
  textAlign: 'right',
  fontSize: '1.1em',
};

const buttonStyle: React.CSSProperties = {
  padding: '8px 15px',
  borderRadius: '4px',
  border: 'none',
  backgroundColor: '#1E90FF', 
  color: '#000000', 
  fontWeight: 'bold',
  cursor: 'pointer',
  fontFamily: 'Roboto, sans-serif',
};

export default Carrito;
