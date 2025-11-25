import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, afterEach, vi } from 'vitest';

// IMPORTACIONES NECESARIAS
// Asumimos que App y Registro son los componentes principales que estamos testeando
// Nota: La importación de App debe ser ajustada a tu estructura de archivos.
// Si App es el componente principal que contiene todo el layout, es válido para el test del título.
import App from '../App'; 
import Registro from '../components/Registro'; 

// Mockear setTimeout para evitar esperar 4-5 segundos en cada test
vi.useFakeTimers();

// Asegura la limpieza del DOM después de cada prueba (buena práctica en React Testing Library)
afterEach(() => {
    cleanup();
    vi.clearAllTimers(); // Limpia los temporizadores falsos después de cada test
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
        // Inicializamos el user event para simular interacciones del usuario
        const user = userEvent.setup();
        render(<Registro />);
        
        // 1. Encontrar campos
        const dateInput = screen.getByLabelText(/Fecha de Nacimiento/i);
        const submitButton = screen.getByRole('button', { name: /Registrarse y Obtener/i });

        // 2. Ingresar datos de un menor de edad (asumiendo que hoy es Nov 2025)
        await user.type(screen.getByPlaceholderText(/Nombre Completo/i), 'Test Menor');
        await user.type(screen.getByPlaceholderText(/Correo Electrónico/i), 'menor@test.cl');
        await user.type(dateInput, '2008-11-26'); 

        // 3. Enviar formulario
        await user.click(submitButton);

        // 4. Esperar el mensaje de error de validación
        const errorMessage = await screen.findByText(/Debes ser mayor de 18 años para registrarte/i);
        expect(errorMessage).toBeInTheDocument();
        
        // Avanzamos los temporizadores para que el mensaje desaparezca (simulación)
        vi.advanceTimersByTime(4000); 
        expect(screen.queryByText(/Debes ser mayor de 18 años para registrarte/i)).not.toBeInTheDocument();
    });
    
    it('should show a success message and correct points if the age is valid (no referral, no Duoc)', async () => {
        const user = userEvent.setup();
        render(<Registro />);
        
        const dateInput = screen.getByLabelText(/Fecha de Nacimiento/i);
        const submitButton = screen.getByRole('button', { name: /Registrarse y Obtener/i });

        // 1. Simulamos una edad válida y email normal
        await user.type(screen.getByPlaceholderText(/Nombre Completo/i), 'Adult User');
        await user.type(screen.getByPlaceholderText(/Correo Electrónico/i), 'adult@user.cl');
        await user.type(dateInput, '1990-01-01'); 

        // 2. Enviar y verificar mensaje de éxito con PUNTOS_INICIALES (100)
        await user.click(submitButton);

        const successMessage = await screen.findByText(/¡Registro Exitoso! Bienvenido\/a a la comunidad Level-Up Gamer\. Has ganado 100 Puntos LevelUp/i);
        expect(successMessage).toBeInTheDocument();
    });

    it('should grant referral points and Duoc discount if code and email are provided', async () => {
        const user = userEvent.setup();
        render(<Registro />);
        
        const emailInput = screen.getByPlaceholderText(/Correo Electrónico/i);
        const referralInput = screen.getByPlaceholderText(/Código de Referido/i);
        const dateInput = screen.getByLabelText(/Fecha de Nacimiento/i);
        const submitButton = screen.getByRole('button', { name: /Registrarse y Obtener/i });

        // 1. Ingresar datos con email Duoc y código de referido (100 + 500 = 600 puntos)
        await user.type(screen.getByPlaceholderText(/Nombre Completo/i), 'Duoc Gamer');
        await user.type(emailInput, 'student@alumnos.duoc.cl');
        await user.type(referralInput, 'REFERIDO123');
        await user.type(dateInput, '1995-01-01'); 
        
        // 2. Enviar y verificar mensaje completo
        await user.click(submitButton);

        const expectedMessage = /¡Registro Exitoso! Tienes 600 Puntos LevelUp y 20% de descuento por ser Duoc UC\. ¡Y 500 Puntos LevelUp extra por tu código de referido!/i;
        const successMessage = await screen.findByText(expectedMessage);
        
        expect(successMessage).toBeInTheDocument();
    });