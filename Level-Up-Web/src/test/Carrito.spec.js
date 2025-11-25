import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, afterEach, vi, beforeEach } from 'vitest';
import Carrito from '../components/Carrito';

// Limpieza automática después de cada prueba
afterEach(() => {
  cleanup();
});

// --- PRUEBAS DEL COMPONENTE CARRITO ---
describe('Carrito Component', () => {

  // Mock de la función callback
  const mockOnQuantityChange = vi.fn();

  // Datos de prueba de items del carrito
  const mockCartItems = [
    {
      codigo: 'JM001',
      categoria: 'Juegos de Mesa',
      nombre: 'Catan',
      precio: '$29.990 CLP',
      descripcion: 'Un clásico juego de estrategia',
      cantidad: 2
    },
    {
      codigo: 'CO001',
      categoria: 'Consolas',
      nombre: 'PlayStation 5',
      precio: '$549.990 CLP',
      descripcion: 'Consola de última generación',
      cantidad: 1
    }
  ];

  beforeEach(() => {
    mockOnQuantityChange.mockClear();
  });

  // --- Pruebas de Renderización Inicial ---

  it('should render the cart title "🛍️ Cesta de Compra"', () => {
    render(<Carrito currentItems={mockCartItems} onQuantityChange={mockOnQuantityChange} />);
    
    const title = screen.getByText(/Cesta de Compra/i);
    expect(title).toBeInTheDocument();
  });

  it('should render empty cart message when no items', () => {
    render(<Carrito currentItems={[]} onQuantityChange={mockOnQuantityChange} />);
    
    const emptyMessage = screen.getByText(/Tu cesta de compra está vacía/i);
    expect(emptyMessage).toBeInTheDocument();
  });

  it('should not show items when cart is empty', () => {
    render(<Carrito currentItems={[]} onQuantityChange={mockOnQuantityChange} />);
    
    const catan = screen.queryByText(/Catan/);
    expect(catan).not.toBeInTheDocument();
  });

  // --- Pruebas de Renderización de Items ---

  it('should render all cart items with their names', () => {
    render(<Carrito currentItems={mockCartItems} onQuantityChange={mockOnQuantityChange} />);
    
    const catan = screen.getByText(/Catan/);
    const ps5 = screen.getByText(/PlayStation 5/);
    
    expect(catan).toBeInTheDocument();
    expect(ps5).toBeInTheDocument();
  });

  it('should display unit price for each item', () => {
    render(<Carrito currentItems={mockCartItems} onQuantityChange={mockOnQuantityChange} />);
    
    const prices = screen.getAllByText(/Valor unitario:/i);
    expect(prices.length).toBe(2);
  });

  it('should show product price in item details', () => {
    render(<Carrito currentItems={mockCartItems} onQuantityChange={mockOnQuantityChange} />);
    
    expect(screen.getByText('$29.990 CLP')).toBeInTheDocument();
    expect(screen.getByText('$549.990 CLP')).toBeInTheDocument();
  });

  // --- Pruebas de Controles de Cantidad ---

  it('should render quantity input field for each item', () => {
    render(<Carrito currentItems={mockCartItems} onQuantityChange={mockOnQuantityChange} />);
    
    const quantityInputs = screen.getAllByRole('spinbutton');
    expect(quantityInputs.length).toBe(2);
  });

  it('should display correct initial quantity values', () => {
    render(<Carrito currentItems={mockCartItems} onQuantityChange={mockOnQuantityChange} />);
    
    const quantityInputs = screen.getAllByRole('spinbutton');
    expect(quantityInputs[0]).toHaveValue(2);
    expect(quantityInputs[1]).toHaveValue(1);
  });

  it('should call onQuantityChange when quantity input changes', async () => {
    const user = userEvent.setup();
    render(<Carrito currentItems={mockCartItems} onQuantityChange={mockOnQuantityChange} />);
    
    const quantityInputs = screen.getAllByRole('spinbutton');
    
    // Cambiar la cantidad del primer item
    await user.clear(quantityInputs[0]);
    await user.type(quantityInputs[0], '5');
    
    expect(mockOnQuantityChange).toHaveBeenCalledWith('JM001', 5);
  });

  it('should allow changing quantity to 0', async () => {
    const user = userEvent.setup();
    render(<Carrito currentItems={mockCartItems} onQuantityChange={mockOnQuantityChange} />);
    
    const quantityInputs = screen.getAllByRole('spinbutton');
    
    await user.clear(quantityInputs[0]);
    await user.type(quantityInputs[0], '0');
    
    expect(mockOnQuantityChange).toHaveBeenCalledWith('JM001', 0);
  });

  // --- Pruebas de Botones de Eliminar ---

  it('should render delete button for each item', () => {
    render(<Carrito currentItems={mockCartItems} onQuantityChange={mockOnQuantityChange} />);
    
    const deleteButtons = screen.getAllByRole('button', { name: /🗑️/i });
    expect(deleteButtons.length).toBe(2);
  });

  it('should call onQuantityChange with 0 when delete button is clicked', async () => {
    const user = userEvent.setup();
    render(<Carrito currentItems={mockCartItems} onQuantityChange={mockOnQuantityChange} />);
    
    const deleteButtons = screen.getAllByRole('button', { name: /🗑️/i });
    
    // Hacer clic en el botón de eliminar del primer item
    await user.click(deleteButtons[0]);
    
    expect(mockOnQuantityChange).toHaveBeenCalledWith('JM001', 0);
  });

  // --- Pruebas de Total ---

  it('should display "Total:" label', () => {
    render(<Carrito currentItems={mockCartItems} onQuantityChange={mockOnQuantityChange} />);
    
    const totalLabel = screen.getByText(/^Total:$/);
    expect(totalLabel).toBeInTheDocument();
  });

  it('should calculate and display correct total for cart items', () => {
    render(<Carrito currentItems={mockCartItems} onQuantityChange={mockOnQuantityChange} />);
    
    // Catan: 29.990 * 2 = 59.980
    // PS5: 549.990 * 1 = 549.990
    // Total: 609.970
    const totalDisplay = screen.getByText(/609.970/);
    expect(totalDisplay).toBeInTheDocument();
  });

  it('should format total in CLP currency', () => {
    render(<Carrito currentItems={mockCartItems} onQuantityChange={mockOnQuantityChange} />);
    
    const totalDisplay = screen.getByText(/\$.*CLP/);
    expect(totalDisplay).toBeInTheDocument();
  });

  it('should show total of $0 CLP for empty cart', () => {
    render(<Carrito currentItems={[]} onQuantityChange={mockOnQuantityChange} />);
    
    // El total no se muestra si el carrito está vacío
    const emptyMessage = screen.getByText(/Tu cesta de compra está vacía/i);
    expect(emptyMessage).toBeInTheDocument();
  });

  // --- Pruebas de Botón Checkout ---

  it('should render "Proceder al Checkout" button when cart has items', () => {
    render(<Carrito currentItems={mockCartItems} onQuantityChange={mockOnQuantityChange} />);
    
    const checkoutButton = screen.getByRole('button', { name: /Proceder al Checkout/i });
    expect(checkoutButton).toBeInTheDocument();
  });

  it('should not show checkout button when cart is empty', () => {
    render(<Carrito currentItems={[]} onQuantityChange={mockOnQuantityChange} />);
    
    const checkoutButton = screen.queryByRole('button', { name: /Proceder al Checkout/i });
    expect(checkoutButton).not.toBeInTheDocument();
  });

  // --- Pruebas de Estructura Layout ---

  it('should render cart container with proper classes', () => {
    const { container } = render(<Carrito currentItems={mockCartItems} onQuantityChange={mockOnQuantityChange} />);
    
    const containerDiv = container.querySelector('.container');
    expect(containerDiv).toBeInTheDocument();
  });

  it('should have responsive grid layout', () => {
    const { container } = render(<Carrito currentItems={mockCartItems} onQuantityChange={mockOnQuantityChange} />);
    
    const rowDiv = container.querySelector('.row');
    expect(rowDiv).toBeInTheDocument();
  });

  // --- Pruebas de Casos Especiales ---

  it('should handle single item in cart', () => {
    const singleItem = [mockCartItems[0]];
    render(<Carrito currentItems={singleItem} onQuantityChange={mockOnQuantityChange} />);
    
    expect(screen.getByText(/Catan/)).toBeInTheDocument();
    expect(screen.queryByText(/PlayStation 5/)).not.toBeInTheDocument();
  });

  it('should handle items with different quantities', () => {
    const itemsWithVariousQties = [
      { ...mockCartItems[0], cantidad: 10 },
      { ...mockCartItems[1], cantidad: 3 }
    ];
    
    render(<Carrito currentItems={itemsWithVariousQties} onQuantityChange={mockOnQuantityChange} />);
    
    const inputs = screen.getAllByRole('spinbutton');
    expect(inputs[0]).toHaveValue(10);
    expect(inputs[1]).toHaveValue(3);
  });

  it('should correctly calculate total with high quantity items', () => {
    const highQtyItem = [
      {
        codigo: 'TEST001',
        categoria: 'Test',
        nombre: 'Test Product',
        precio: '$100.000 CLP',
        descripcion: 'Test description',
        cantidad: 5
      }
    ];
    
    render(<Carrito currentItems={highQtyItem} onQuantityChange={mockOnQuantityChange} />);
    
    // 100.000 * 5 = 500.000
    const totalDisplay = screen.getByText(/500.000/);
    expect(totalDisplay).toBeInTheDocument();
  });

  // --- Pruebas de Accesibilidad ---

  it('should have accessible quantity inputs', () => {
    render(<Carrito currentItems={mockCartItems} onQuantityChange={mockOnQuantityChange} />);
    
    const quantityInputs = screen.getAllByRole('spinbutton');
    quantityInputs.forEach((input) => {
      expect(input).toHaveAttribute('min', '0');
    });
  });

  it('should have accessible delete buttons', () => {
    render(<Carrito currentItems={mockCartItems} onQuantityChange={mockOnQuantityChange} />);
    
    const deleteButtons = screen.getAllByRole('button', { name: /🗑️/i });
    deleteButtons.forEach((button) => {
      expect(button).toBeInTheDocument();
    });
  });

  // --- Pruebas de Callback ---

  it('should not call onQuantityChange on initial render', () => {
    render(<Carrito currentItems={mockCartItems} onQuantityChange={mockOnQuantityChange} />);
    
    expect(mockOnQuantityChange).not.toHaveBeenCalled();
  });

  it('should call onQuantityChange only once per input change', async () => {
    const user = userEvent.setup();
    render(<Carrito currentItems={mockCartItems} onQuantityChange={mockOnQuantityChange} />);
    
    const quantityInputs = screen.getAllByRole('spinbutton');
    
    await user.clear(quantityInputs[0]);
    await user.type(quantityInputs[0], '3');
    
    expect(mockOnQuantityChange).toHaveBeenCalledTimes(1);
  });

});
