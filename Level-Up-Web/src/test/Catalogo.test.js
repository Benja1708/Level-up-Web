// Catalogo.test.tsx

// Importamos las utilidades de React Testing Library (RTL)
import { render, screen } from '@testing-library/react'; 
// Importamos la librería para simular interacciones del usuario de manera más realista
import userEvent from '@testing-library/user-event'; 
import Catalogo from './Catalogo';

// Mock de la función Producto, que es la dependencia del componente
// Nota: La definición del tipo Producto debería estar disponible (e.g., importada de '../App')
type Producto = { 
  codigo: string; 
  categoria: string; 
  nombre: string; 
  precio: string; 
  descripcion: string; 
};

// 1. Describe el componente a probar (similar a la suite de Jasmine)
describe('Catalogo Component', () => {
  // Mockeamos la prop de la función que el componente usa
  let mockOnAgregarAlCarrito: (producto: Producto) => void; 

  // Se ejecuta antes de cada prueba (similar a beforeEach de Jasmine)
  beforeEach(() => {
    // Creamos un 'spy' o función mock para verificar si se llama y con qué argumentos
    mockOnAgregarAlCarrito = jest.fn(); 
  });

  // 2. Prueba de Renderizado: Asegura que el componente se muestre correctamente
  it('debería renderizar el título y todas las categorías de productos', () => {
    render(<Catalogo onAgregarAlCarrito={mockOnAgregarAlCarrito} />);
    
    // Asertamos que el título principal esté presente (RTL busca elementos como lo haría el usuario)
    // Usamos 'getByRole' o 'getByText'
    expect(screen.getByText('🛒 Catálogo de Productos Level-Up')).toBeInTheDocument();
    
    // Verificamos algunas categorías (p. ej., la primera)
    expect(screen.getByText(/Juegos de Mesa \(\d\)/i)).toBeInTheDocument(); // Usa expresión regular para el conteo (2)
    expect(screen.getByText(/Consolas \(\d\)/i)).toBeInTheDocument(); // Espera la categoría Consolas (1)
    expect(screen.getByText('Servicio Técnico')).toBeInTheDocument();
  });

  // 3. Prueba de Interacción: Asegura que la función `onAgregarAlCarrito` se llame correctamente
  it('debería llamar a onAgregarAlCarrito con el producto correcto al hacer clic en un botón', async () => {
    render(<Catalogo onAgregarAlCarrito={mockOnAgregarAlCarrito} />);
    
    // El producto que vamos a probar es "Carcassonne"
    const nombreProductoEsperado = 'Carcassonne';
    // Buscamos el botón 'Agregar al Carrito' asociado con ese producto
    // Nota: Es mejor buscar por texto y rol que por data-testid si es posible
    const botonCarcassonne = screen.getAllByRole('button', { name: /Agregar al Carrito/i })
        .find(button => button.closest('div')!.textContent!.includes(nombreProductoEsperado));

    // Verificamos que el botón exista
    expect(botonCarcassonne).toBeInTheDocument();

    // Actuamos: Hacemos clic en el botón
    await userEvent.click(botonCarcassonne!); 

    // Asertamos: Verificamos que la función mock se haya llamado
    expect(mockOnAgregarAlCarrito).toHaveBeenCalledTimes(1);
    
    // Asertamos: Verificamos que haya sido llamada con el objeto Producto correcto
    // (Buscamos la propiedad 'nombre' en el argumento de la llamada)
    expect(mockOnAgregarAlCarrito).toHaveBeenCalledWith(
        expect.objectContaining({ nombre: nombreProductoEsperado, codigo: 'JM002' })
    );
  });
});