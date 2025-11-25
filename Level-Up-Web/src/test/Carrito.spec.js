import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, afterEach, vi } from 'vitest';

// IMPORTACIONES NECESARIAS
// Asumimos que App, Registro y Carrito están en las rutas relativas correctas.
import App from '../App'; 
import Registro from '../components/Registro'; 
import Carrito from '../components/Carrito';

// --- MOCK INTERFACES & DATA para Carrito ---
// SOLUCIÓN: Usamos 'export interface' para asegurar que TypeScript reconozca la estructura de datos.
export interface ItemCarrito {
    codigo: string; 
    nombre: string;
    precio: string; // Ejemplo: "$10.000 CLP"
    cantidad: number;
}

const mockItem1: ItemCarrito = { 
    codigo: 'P001', 
    nombre: 'Teclado Mecánico', 
    precio: '$10.000', 
    cantidad: 2 
};
const mockItem2: ItemCarrito = { 
    codigo: 'P002', 
    nombre: 'Mouse Inalámbrico', 
    precio: '$5.000', 
    cantidad: 1 
};
const mockCarritoFull: ItemCarrito[] = [mockItem1, mockItem2];


// Mockear setTimeout para evitar esperas largas en tests de componentes con feedback
vi.useFakeTimers();

// Asegura la limpieza del DOM después de cada prueba (buena práctica en React Testing Library)
afterEach(() => {
    cleanup();
    vi.clearAllTimers(); // Limpia los temporizadores falsos
});

// --- 1. PRUEBAS DEL COMPONENTE PRINCIPAL (App.tsx) ---
describe('App Component', () => {

    it('should render the main title (e.g., LEVEL-UP GAMER)', () => {
        // Renderizamos el componente principal
        render(<App />);
        
        // Buscamos el texto del título principal. Usamos un RegExp (i) para ser insensible a mayúsculas/minúsculas.
        const titleElement = screen.getByText(/LEVEL-UP GAMER/i);
        
        expect(titleElement).toBeInTheDocument();
    });

    it('should render the Catalogue/Products link', () => {
        render(<App />);
        // Asume que hay un enlace o botón para el Catálogo
        const catalogLink = screen.getByRole('link', { name: /catálogo|productos/i });
        expect(catalogLink).toBeInTheDocument();
    });
});


// --- 2. PRUEBAS DE FUNCIONALIDAD DEL REGISTRO (Registro.tsx) ---
describe('Registro Component', () => {

    it('should show an error message if the user is under 18', async () => {
        const user = userEvent.setup();
        render(<Registro />);
        
        // Buscamos el input por su etiqueta (label)
        const dateInput = screen.getByLabelText(/Fecha de Nacimiento/i);
        const submitButton = screen.getByRole('button', { name: /Registrarse y Obtener/i });

        await user.type(screen.getByPlaceholderText(/Nombre Completo/i), 'Test Menor');
        await user.type(screen.getByPlaceholderText(/Correo Electrónico/i), 'menor@test.cl');
        await user.type(dateInput, '2008-11-26'); 

        await user.click(submitButton);

        const errorMessage = await screen.findByText(/Debes ser mayor de 18 años para registrarte/i);
        expect(errorMessage).toBeInTheDocument();
        
        vi.advanceTimersByTime(4000); 
        expect(screen.queryByText(/Debes ser mayor de 18 años para registrarte/i)).not.toBeInTheDocument();
    });
    
    it('should show a success message and correct points if the age is valid (no referral, no Duoc)', async () => {
        const user = userEvent.setup();
        render(<Registro />);
        
        const dateInput = screen.getByLabelText(/Fecha de Nacimiento/i);
        const submitButton = screen.getByRole('button', { name: /Registrarse y Obtener/i });

        await user.type(screen.getByPlaceholderText(/Nombre Completo/i), 'Adult User');
        await user.type(screen.getByPlaceholderText(/Correo Electrónico/i), 'adult@user.cl');
        await user.type(dateInput, '1990-01-01'); 

        await user.click(submitButton);

        const successMessage = await screen.findByText(/Has ganado 100 Puntos LevelUp/i);
        expect(successMessage).toBeInTheDocument();
    });

    it('should grant referral points and Duoc discount if code and email are provided', async () => {
        const user = userEvent.setup();
        render(<Registro />);
        
        const emailInput = screen.getByPlaceholderText(/Correo Electrónico/i);
        const referralInput = screen.getByPlaceholderText(/Código de Referido/i);
        const dateInput = screen.getByLabelText(/Fecha de Nacimiento/i);
        const submitButton = screen.getByRole('button', { name: /Registrarse y Obtener/i });

        await user.type(screen.getByPlaceholderText(/Nombre Completo/i), 'Duoc Gamer');
        await user.type(emailInput, 'student@alumnos.duoc.cl');
        await user.type(referralInput, 'REFERIDO123');
        await user.type(dateInput, '1995-01-01'); 
        
        await user.click(submitButton);

        const expectedMessage = /¡Registro Exitoso! Tienes 600 Puntos LevelUp y 20% de descuento por ser Duoc UC\. ¡Y 500 Puntos LevelUp extra por tu código de referido!/i;
        const successMessage = await screen.findByText(expectedMessage);
        
        expect(successMessage).toBeInTheDocument();
    });
});


// --- 3. PRUEBAS DE FUNCIONALIDAD DEL CARRITO (Carrito.tsx) ---
describe('Carrito Component (CartDisplay)', () => {
    
    // Mock handler function
    const mockOnQuantityChange = vi.fn();

    it('should show the title "🛒 Cesta de Compra"', () => {
        // La prueba se basa en el texto real que se encuentra en el Carrito (Cesta de Compra, no Carrito de Compras)
        render(<Carrito currentItems={[]} onQuantityChange={mockOnQuantityChange} />);
        expect(screen.getByText(/Cesta de Compra/i)).toBeInTheDocument();
    });

    it('should show a message when the cart is empty', () => {
        render(<Carrito currentItems={[]} onQuantityChange={mockOnQuantityChange} />);
        expect(screen.getByText(/Tu cesta de compra está vacía/i)).toBeInTheDocument();
    });

    it('should display the correct total amount', () => {
        // La lógica interna suma (precio numérico * cantidad). 
        // Total esperado: ($10,000 * 2) + ($5,000 * 1) = $25,000. Formato esperado: "$25.000 CLP"
        render(<Carrito currentItems={mockCarritoFull} onQuantityChange={mockOnQuantityChange} />);
        
        // Buscamos el total formateado
        expect(screen.getByText('$25.000 CLP', { exact: false })).toBeInTheDocument();
    });

    it('should call onQuantityChange when quantity input is modified', async () => {
        const user = userEvent.setup();

        render(<Carrito currentItems={[mockItem1]} onQuantityChange={mockOnQuantityChange} />);
        
        // 1. Encontrar el input de cantidad para 'Teclado Mecánico' (cuyo valor actual es 2)
        const quantityInput = screen.getByDisplayValue('2'); 
        
        // 2. Simular cambio a 5
        await user.clear(quantityInput);
        await user.type(quantityInput, '5');

        // 3. Verificar que el handler fue llamado con el código de producto y la nueva cantidad (5)
        expect(mockOnQuantityChange).toHaveBeenCalledWith('P001', 5);
    });

    it('should call onQuantityChange with 0 when the trash button is clicked', async () => {
        const user = userEvent.setup();

        render(<Carrito currentItems={[mockItem2]} onQuantityChange={mockOnQuantityChange} />);
        
        // 1. Encontrar el botón de eliminar (trash can)
        const trashButton = screen.getByRole('button', { name: '🗑️' });
        
        // 2. Click en el botón de eliminar
        await user.click(trashButton);

        // 3. Verificar que el handler fue llamado con el código de producto y cantidad 0
        expect(mockOnQuantityChange).toHaveBeenCalledWith('P002', 0);
    });
});