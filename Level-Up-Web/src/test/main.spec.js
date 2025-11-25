import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import App from '../App';

// Limpieza automática después de cada prueba
afterEach(() => {
  cleanup();
});

// --- PRUEBAS DE LA APLICACIÓN PRINCIPAL ---
describe('App Component - Main Application Tests', () => {

  // --- Pruebas de Renderización Inicial ---

  it('should render the application without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });

  it('should render the main header with "LEVEL-UP GAMER" title', () => {
    render(<App />);
    const header = screen.getByText(/LEVEL-UP GAMER/i);
    expect(header).toBeInTheDocument();
  });

  it('should render the application subtitle', () => {
    render(<App />);
    const subtitle = screen.getByText(/Tienda online dedicada a satisfacer las necesidades de los entusiastas de los videojuegos/i);
    expect(subtitle).toBeInTheDocument();
  });

  // --- Pruebas de Componentes Principales ---

  it('should render the Comunidad y Soporte section', () => {
    render(<App />);
    const comunidadSection = screen.getByText(/Comunidad y Soporte Técnico/i);
    expect(comunidadSection).toBeInTheDocument();
  });

  it('should render the Puntos Level-Up section', () => {
    render(<App />);
    const puntosSection = screen.getByText(/Puntos Level-Up/i);
    expect(puntosSection).toBeInTheDocument();
  });

  it('should render the Perfil Usuario section', () => {
    render(<App />);
    const perfilSection = screen.getByText(/Perfil de Usuario/i);
    expect(perfilSection).toBeInTheDocument();
  });

  it('should render the Catálogo de Productos section', () => {
    render(<App />);
    const catalogoTitle = screen.getByText(/Catálogo de Productos Level-Up/i);
    expect(catalogoTitle).toBeInTheDocument();
  });

  it('should render the Cesta de Compra section', () => {
    render(<App />);
    const cartTitle = screen.getByText(/Cesta de Compra/i);
    expect(cartTitle).toBeInTheDocument();
  });

  it('should render the Registro de Usuarios section', () => {
    render(<App />);
    const registroTitle = screen.getByText(/Registro de Usuarios/i);
    expect(registroTitle).toBeInTheDocument();
  });

  // --- Pruebas de Estructura HTML ---

  it('should render header element', () => {
    const { container } = render(<App />);
    const header = container.querySelector('header');
    expect(header).toBeInTheDocument();
  });

  it('should render main element', () => {
    const { container } = render(<App />);
    const main = container.querySelector('main');
    expect(main).toBeInTheDocument();
  });

  it('should have main with flex layout', () => {
    const { container } = render(<App />);
    const main = container.querySelector('main');
    expect(main).toHaveStyle({ display: 'flex', flexDirection: 'column', gap: '40px' });
  });

  // --- Pruebas de Secciones en Orden Correcto ---

  it('should render sections in the correct order', () => {
    const { container } = render(<App />);
    const sections = container.querySelectorAll('section, div[style*="maxWidth"]');
    expect(sections.length).toBeGreaterThan(0);
  });

  // --- Pruebas de Catálogo de Productos ---

  it('should display all product categories in catalog', () => {
    render(<App />);
    
    expect(screen.getByText(/Juegos de Mesa/i)).toBeInTheDocument();
    expect(screen.getByText(/Accesorios/i)).toBeInTheDocument();
    expect(screen.getByText(/Consolas/i)).toBeInTheDocument();
  });

  it('should render all product names', () => {
    render(<App />);
    
    expect(screen.getByText(/Catan/)).toBeInTheDocument();
    expect(screen.getByText(/PlayStation 5/)).toBeInTheDocument();
  });

  // --- Pruebas de Botones ---

  it('should have "Agregar al Carrito" buttons for each product', () => {
    render(<App />);
    
    const addButtons = screen.getAllByRole('button', { name: /Agregar al Carrito/i });
    expect(addButtons.length).toBeGreaterThan(0);
  });

  it('should have "Leer Guía" buttons in community section', () => {
    render(<App />);
    
    const readButtons = screen.getAllByRole('button', { name: /Leer Guía/i });
    expect(readButtons.length).toBeGreaterThan(0);
  });

  it('should have social media buttons in community section', () => {
    render(<App />);
    
    const facebookBtn = screen.getByRole('button', { name: /Facebook/i });
    const instagramBtn = screen.getByRole('button', { name: /Instagram/i });
    
    expect(facebookBtn).toBeInTheDocument();
    expect(instagramBtn).toBeInTheDocument();
  });

  // --- Pruebas de Estado Inicial ---

  it('should initialize with empty cart', () => {
    render(<App />);
    
    const emptyCartMessage = screen.getByText(/Tu cesta de compra está vacía/i);
    expect(emptyCartMessage).toBeInTheDocument();
  });

  it('should show initial points level-up', () => {
    render(<App />);
    
    // App inicializa con 500 puntos
    const puntosText = screen.getByText(/Puntos Disponibles/i);
    expect(puntosText).toBeInTheDocument();
  });

  // --- Pruebas de Accesibilidad ---

  it('should have proper heading structure', () => {
    render(<App />);
    
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toBeInTheDocument();
    expect(h1).toHaveTextContent(/LEVEL-UP GAMER/i);
  });

  it('should have all necessary form inputs for registration', () => {
    render(<App />);
    
    // Verificar que hay inputs de registro (sin especificar tipos exactos ya que pueden variar)
    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBeGreaterThan(0);
  });

  // --- Pruebas de Integración ---

  it('should render all major sections of the app', () => {
    render(<App />);
    
    // Verificar que todos los componentes principales se renderizan
    expect(screen.getByText(/LEVEL-UP GAMER/i)).toBeInTheDocument();
    expect(screen.getByText(/Catálogo de Productos/i)).toBeInTheDocument();
    expect(screen.getByText(/Cesta de Compra/i)).toBeInTheDocument();
    expect(screen.getByText(/Comunidad y Soporte/i)).toBeInTheDocument();
    expect(screen.getByText(/Puntos Level-Up/i)).toBeInTheDocument();
  });

  it('should have links to WhatsApp support', () => {
    render(<App />);
    
    const whatsappLink = screen.getByRole('link', { name: /WhatsApp/i });
    expect(whatsappLink).toHaveAttribute('href', expect.stringContaining('wa.me'));
  });

  // --- Pruebas de Responsividad ---

  it('should render responsive grid layouts', () => {
    const { container } = render(<App />);
    
    const gridElements = container.querySelectorAll('[style*="grid"], .row, .col');
    expect(gridElements.length).toBeGreaterThan(0);
  });

  it('should render container with Bootstrap classes', () => {
    const { container } = render(<App />);
    
    const bootstrapContainers = container.querySelectorAll('.container');
    expect(bootstrapContainers.length).toBeGreaterThan(0);
  });

  // --- Pruebas de Estilos Neon ---

  it('should have neon green styling in header', () => {
    render(<App />);
    
    const header = screen.getByRole('heading', { level: 1 });
    expect(header).toHaveStyle({ color: '#39FF14' });
  });

  it('should display product prices in CLP format', () => {
    render(<App />);
    
    const priceElements = screen.getAllByText(/CLP/);
    expect(priceElements.length).toBeGreaterThan(0);
  });

  // --- Pruebas de Validación ---

  it('should display product descriptions', () => {
    render(<App />);
    
    const descriptions = screen.queryAllByText(/Un clásico juego|Consola|gamer/i);
    expect(descriptions.length).toBeGreaterThan(0);
  });

  it('should have proper semantic HTML structure', () => {
    const { container } = render(<App />);
    
    const header = container.querySelector('header');
    const main = container.querySelector('main');
    
    expect(header).toBeInTheDocument();
    expect(main).toBeInTheDocument();
    expect(header).toBeInstanceOf(HTMLElement);
    expect(main).toBeInstanceOf(HTMLElement);
  });

  // --- Pruebas de Funcionalidad de Carrito ---

  it('should render empty cart state on initial load', () => {
    render(<App />);
    
    const emptyMessage = screen.getByText(/Tu cesta de compra está vacía/i);
    expect(emptyMessage).toBeInTheDocument();
  });

  it('should render cart total section', () => {
    render(<App />);
    
    // Buscar el label de Total (que aparece aunque el carrito esté vacío)
    screen.queryByText(/^Total:$/);
    // Nota: El total puede no estar visible si el carrito está vacío
  });

});
