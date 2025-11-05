import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Catalogo from '../components/Catalogo';

describe('Catalogo Component', () => {
  // Mock de la función onAgregarAlCarrito
  const mockOnAgregarAlCarrito = jasmine.createSpy('onAgregarAlCarrito');

  beforeEach(() => {
    mockOnAgregarAlCarrito.calls.reset();
  });

  it('should render the catalog title', () => {
    render(<Catalogo onAgregarAlCarrito={mockOnAgregarAlCarrito} />);
    expect(screen.getByText('🛒 Catálogo de Productos Level-Up')).toBeInTheDocument();
  });

  it('should render all product categories', () => {
    render(<Catalogo onAgregarAlCarrito={mockOnAgregarAlCarrito} />);
    const expectedCategories = [
      'Juegos de Mesa',
      'Accesorios',
      'Consolas',
      'Computadores Gamers',
      'Sillas Gamers',
      'Mouse',
      'Mousepad',
      'Poleras Personalizadas'
    ];

    expectedCategories.forEach(category => {
      expect(screen.getByText(new RegExp(category))).toBeInTheDocument();
    });
  });

  it('should render product cards with correct information', () => {
    render(<Catalogo onAgregarAlCarrito={mockOnAgregarAlCarrito} />);
    
    // Verificar producto específico
    expect(screen.getByText('Catan')).toBeInTheDocument();
    expect(screen.getByText('$29.990 CLP')).toBeInTheDocument();
    expect(screen.getByText(/Un clásico juego de estrategia/)).toBeInTheDocument();
  });

  it('should call onAgregarAlCarrito when clicking Add to Cart button', () => {
    render(<Catalogo onAgregarAlCarrito={mockOnAgregarAlCarrito} />);
    
    const addToCartButtons = screen.getAllByText('Agregar al Carrito');
    fireEvent.click(addToCartButtons[0]); // Click en el primer botón

    expect(mockOnAgregarAlCarrito).toHaveBeenCalledTimes(1);
    expect(mockOnAgregarAlCarrito).toHaveBeenCalledWith(jasmine.objectContaining({
      codigo: 'JM001',
      nombre: 'Catan',
      precio: '$29.990 CLP'
    }));
  });

  it('should render technical service section', () => {
    render(<Catalogo onAgregarAlCarrito={mockOnAgregarAlCarrito} />);
    expect(screen.getByText('Servicio Técnico')).toBeInTheDocument();
    expect(screen.getByText('Ofrecemos servicio de soporte técnico.')).toBeInTheDocument();
  });

  // Test de estilos
  it('should apply correct styles to product cards', () => {
    render(<Catalogo onAgregarAlCarrito={mockOnAgregarAlCarrito} />);
    const cards = screen.getAllByText('Agregar al Carrito').map(button => button.parentElement);
    
    cards.forEach(card => {
      expect(card).toHaveStyle({
        backgroundColor: '#111',
        border: '1px solid #1E90FF',
        borderRadius: '8px'
      });
    });
  });
});
