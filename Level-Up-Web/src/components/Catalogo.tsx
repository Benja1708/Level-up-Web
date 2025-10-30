// src/components/Catalogo.tsx

import React from 'react';
// CORRECCIÓN: Usamos 'import type' para tipos, según la configuración de TypeScript (ts(1484))
import type { Producto } from '../App'; 

// Definición de las props que el Catálogo espera recibir
interface CatalogoProps {
  onAgregarAlCarrito: (producto: Producto) => void;
}

// 2. Datos de los productos (basado en el detalle de productos del caso)
const productos: Producto[] = [
  { codigo: "JM001", categoria: "Juegos de Mesa", nombre: "Catan", precio: "$29.990 CLP", descripcion: "Un clásico juego de estrategia donde los jugadores compiten por colonizar y expandirse en la isla de Catan." },
  { codigo: "JM002", categoria: "Juegos de Mesa", nombre: "Carcassonne", precio: "$24.990 CLP", descripcion: "Un juego de colocación de fichas donde los jugadores construyen el paisaje alrededor de la fortaleza medieval de Carcassonne. Fácil de aprender." },
  { codigo: "AC001", categoria: "Accesorios", nombre: "Controlador Inalámbrico Xbox Series X", precio: "$59.990 CLP", descripcion: "Ofrece una experiencia de juego cómoda con botones mapeables y una respuesta táctil mejorada." },
  { codigo: "CO001", categoria: "Consolas", nombre: "PlayStation 5", precio: "$549.990 CLP", descripcion: "La consola de última generación de Sony, que ofrece gráficos impresionantes y tiempos de carga ultrarrápidos." },
  { codigo: "CG001", categoria: "Computadores Gamers", nombre: "PC Gamer ASUS ROG Strix", precio: "$1.299.990 CLP", descripcion: "Un potente equipo diseñado para los gamers más exigentes." },
  { codigo: "SG001", categoria: "Sillas Gamers", nombre: "Silla Gamer Secretlab Titan", precio: "$349.990 CLP", descripcion: "Diseñada para el máximo confort y personalización ajustable." },
  { codigo: "MS001", categoria: "Mouse", nombre: "Mouse Gamer Logitech G502 HERO", precio: "$49.990 CLP", descripcion: "Con sensor de alta precisión y botones personalizables, ideal para gamers que buscan un control preciso." },
  { codigo: "MP001", categoria: "Mousepad", nombre: "Mousepad Razer Goliathus Extended Chroma", precio: "$29.990 CLP", descripcion: "Ofrece un área de juego amplia con iluminación RGB personalizable." },
  { codigo: "PP001", categoria: "Poleras Personalizadas", nombre: "Polera Gamer Personalizada 'Level-Up'", precio: "$14.990 CLP", descripcion: "Una camiseta cómoda y estilizada, con la posibilidad de personalizarla con tu gamer tag o diseño favorito." },
];

// 3. Componente principal del Catálogo
const Catalogo: React.FC<CatalogoProps> = ({ onAgregarAlCarrito }) => {
  
  // Agrupamos los productos por categoría
  const categorias = productos.reduce((acc, producto) => {
    const key = producto.categoria;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(producto);
    return acc;
  }, {} as Record<string, Producto[]>);


  return (
    <div style={catalogoStyle}>
      <h2 style={{ fontFamily: 'Orbitron, sans-serif', color: '#39FF14', marginBottom: '30px', textAlign: 'center' }}>
        🛒 Catálogo de Productos Level-Up
      </h2>

      {/* Requisito: Mostrar productos categorizados */}
      {Object.entries(categorias).map(([categoria, listaProductos]) => (
        <section key={categoria} style={{ marginBottom: '40px' }}>
          <h3 style={{ fontFamily: 'Orbitron, sans-serif', color: '#1E90FF', borderBottom: '2px solid #1E90FF', paddingBottom: '5px' }}>
            {categoria} ({listaProductos.length})
          </h3>
          
          <div style={productosGridStyle}>
            {listaProductos.map((producto) => (
              <div key={producto.codigo} style={cardStyle}>
                <h4 style={{ margin: '0 0 10px 0', color: '#FFFFFF' }}>{producto.nombre}</h4>
                <p style={{ margin: '0', color: '#39FF14', fontWeight: 'bold', fontSize: '1.2em' }}>{producto.precio}</p>
                <p style={{ fontSize: '0.9em', color: '#D3D3D3' }}>{producto.descripcion}</p>
                
                {/* Llamamos a la función para agregar al hacer clic */}
                <button 
                  onClick={() => onAgregarAlCarrito(producto)}
                  style={buttonStyle}
                >
                  Agregar al Carrito
                </button>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section style={{ marginBottom: '40px' }}>
        <h3 style={{ fontFamily: 'Orbitron, sans-serif', color: '#1E90FF', borderBottom: '2px solid #1E90FF', paddingBottom: '5px' }}>
          Servicio Técnico
        </h3>
        <p style={{color: '#D3D3D3'}}>Ofrecemos servicio de soporte técnico.</p>
      </section>

    </div>
  );
};

// Estilos internos
const catalogoStyle: React.CSSProperties = {
  maxWidth: '1200px',
  margin: '50px auto',
  padding: '20px',
  backgroundColor: '#000000',
  color: '#FFFFFF',
};

const productosGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '20px',
  marginTop: '20px',
};

const cardStyle: React.CSSProperties = {
  padding: '15px',
  border: '1px solid #1E90FF', // Borde Azul Eléctrico
  borderRadius: '8px',
  backgroundColor: '#111', 
};

const buttonStyle: React.CSSProperties = {
  padding: '8px 15px',
  borderRadius: '4px',
  border: 'none',
  backgroundColor: '#1E90FF', // Azul Eléctrico
  color: '#000000', 
  fontWeight: 'bold',
  cursor: 'pointer',
  fontFamily: 'Roboto, sans-serif',
  marginTop: '15px',
};

export default Catalogo;
