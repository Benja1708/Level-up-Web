// src/App.tsx

import { useState } from 'react';
import Registro from './components/Registro'; // Componente de Registro
// Importaciones futuras que debes crear:
import Catalogo from './components/Catalogo'; 
import Carrito from './components/Carrito';
import PuntosLevelUp from './components/PuntosLevelUp'; 
import PerfilUsuario from './components/PerfilUsuario';
import ComunidadSoporte from './components/ComunidadSoporte'; 

import './App.css'; 

// DEFINICIÓN DE TIPOS EXPORTABLES (NECESARIOS PARA EL CARRITO Y CATÁLOGO)
export interface Producto {
  codigo: string;
  categoria: string;
  nombre: string;
  precio: string; // Usamos string para mantener el formato CLP
  descripcion: string;
}

export interface ItemCarrito extends Producto {
  cantidad: number;
}

function App() {
  // Estado básico del carrito
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]); 
  // Estado para la gamificación
  const [puntosLevelUp] = useState(500); // Puntos iniciales simulados
  
  // Función para agregar o incrementar cantidad de un producto
  const agregarAlCarrito = (producto: Producto) => {
    setCarrito(prevCarrito => {
      const itemExistente = prevCarrito.find(item => item.codigo === producto.codigo);

      if (itemExistente) {
        // Modificar: Incrementar cantidad si ya existe
        return prevCarrito.map(item =>
          item.codigo === producto.codigo
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        // Agregar: Añadir nuevo ítem al carrito
        const nuevoItem: ItemCarrito = { ...producto, cantidad: 1 };
        return [...prevCarrito, nuevoItem];
      }
    });
  };

  // Función para modificar la cantidad o eliminar un ítem
  const modificarCantidad = (codigo: string, nuevaCantidad: number) => {
    setCarrito(prevCarrito => {
      if (nuevaCantidad <= 0) {
        // Eliminar: Si la cantidad es 0 o menos, se elimina el ítem
        return prevCarrito.filter(item => item.codigo !== codigo);
      } else {
        // Modificar: Cambiar la cantidad
        return prevCarrito.map(item =>
          item.codigo === codigo
            ? { ...item, cantidad: nuevaCantidad }
            : item
        );
      }
    });
  };


  return (
    <>
      <header>
        {/* Encabezado con Orbitron y color de acento Verde Neón */}
        <h1 style={{ fontFamily: 'Orbitron, sans-serif', color: '#39FF14', textAlign: 'center', paddingTop: '20px' }}>
            LEVEL-UP GAMER
        </h1>
        <p style={{textAlign: 'center', color: '#D3D3D3'}}>
            Tienda online dedicada a satisfacer las necesidades de los entusiastas de los videojuegos en Chile.
        </p>
      </header>
      
      <main style={{display: 'flex', flexDirection: 'column', gap: '40px'}}>
        
        {/* Los siguientes componentes deben crearse en src/components/ */}
        <ComunidadSoporte />
        <PuntosLevelUp puntosActuales={puntosLevelUp} />
        <PerfilUsuario />

        {/* Catálogo de Productos (Pasa la función para agregar) */}
        <Catalogo onAgregarAlCarrito={agregarAlCarrito} /> 
        
        {/* Carrito de Compras (Pasa el estado y la función para modificar) */}
        <Carrito carrito={carrito} onModificarCantidad={modificarCantidad} />
        
        {/* Mostramos el componente de registro */}
        <Registro />
        
      </main>
    </>
  );
}

export default App;
