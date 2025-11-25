import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, afterEach } from 'vitest';
import PerfilUsuario from '../components/PerfilUsuario';

// Limpieza automática después de cada prueba
afterEach(() => {
  cleanup();
});

// --- PRUEBAS DEL COMPONENTE PERFIL USUARIO ---
describe('PerfilUsuario Component', () => {

  // --- Pruebas de Renderización Inicial ---

  it('should render the profile title "👤 Gestión de Perfil"', () => {
    render(<PerfilUsuario />);
    
    const title = screen.getByText(/Gestión de Perfil/i);
    expect(title).toBeInTheDocument();
  });

  it('should render the fidelization status section', () => {
    render(<PerfilUsuario />);
    
    const statusText = screen.getByText(/Estado de Fidelización/i);
    expect(statusText).toBeInTheDocument();
  });

  it('should display Duoc UC discount message for Duoc email', () => {
    render(<PerfilUsuario />);
    
    const discountText = screen.getByText(/Descuento Duoc UC \(20% de por vida\)/i);
    expect(discountText).toBeInTheDocument();
  });

  it('should display current level as "Elite"', () => {
    render(<PerfilUsuario />);
    
    const levelText = screen.getByText(/Nivel Actual: Elite/i);
    expect(levelText).toBeInTheDocument();
  });

  // --- Pruebas de Formulario ---

  it('should render form element', () => {
    const { container } = render(<PerfilUsuario />);
    
    const form = container.querySelector('form');
    expect(form).toBeInTheDocument();
  });

  it('should render all form labels', () => {
    render(<PerfilUsuario />);
    
    expect(screen.getByText(/Nombre:/i)).toBeInTheDocument();
    expect(screen.getByText(/Email \(No editable\):/i)).toBeInTheDocument();
    expect(screen.getByText(/Preferencia de Juego/i)).toBeInTheDocument();
    expect(screen.getByText(/Recibir notificaciones/i)).toBeInTheDocument();
  });

  // --- Pruebas de Campos de Input ---

  it('should render nombre input with initial value', () => {
    render(<PerfilUsuario />);
    
    const nombreInput = screen.getByDisplayValue(/Gamer Legendario/);
    expect(nombreInput).toBeInTheDocument();
  });

  it('should render email input as disabled', () => {
    render(<PerfilUsuario />);
    
    const emailInput = screen.getByDisplayValue(/gamer.legendario@alumnos.duoc.cl/);
    expect(emailInput).toBeDisabled();
  });

  it('should have email input as read-only field', () => {
    render(<PerfilUsuario />);
    
    const emailInput = screen.getByDisplayValue(/gamer.legendario@alumnos.duoc.cl/);
    expect(emailInput.disabled).toBe(true);
  });

  // --- Pruebas de Select (Preferencia de Juego) ---

  it('should render preference select dropdown', () => {
    render(<PerfilUsuario />);
    
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
  });

  it('should have all game preference options', () => {
    render(<PerfilUsuario />);
    
    expect(screen.getByRole('option', { name: /RPG/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /FPS \/ Shooter/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Estrategia/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Juegos de Mesa/i })).toBeInTheDocument();
  });

  it('should have RPG as initial preference', () => {
    render(<PerfilUsuario />);
    
    const selectElement = screen.getByRole('combobox');
    expect(selectElement.value).toBe('RPG');
  });

  // --- Pruebas de Checkbox ---

  it('should render notifications checkbox', () => {
    render(<PerfilUsuario />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('should have notifications checkbox initially checked', () => {
    render(<PerfilUsuario />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox.checked).toBe(true);
  });

  it('should have correct label for notifications checkbox', () => {
    render(<PerfilUsuario />);
    
    const label = screen.getByLabelText(/Recibir notificaciones de ofertas personalizadas/i);
    expect(label).toBeInTheDocument();
  });

  // --- Pruebas de Botón ---

  it('should render "Guardar Cambios" button', () => {
    render(<PerfilUsuario />);
    
    const button = screen.getByRole('button', { name: /Guardar Cambios/i });
    expect(button).toBeInTheDocument();
  });

  it('should have button with correct type', () => {
    render(<PerfilUsuario />);
    
    const button = screen.getByRole('button', { name: /Guardar Cambios/i });
    expect(button.type).toBe('submit');
  });

  // --- Pruebas de Interactividad ---

  it('should allow changing nombre input value', async () => {
    const user = userEvent.setup();
    render(<PerfilUsuario />);
    
    const nombreInput = screen.getByDisplayValue(/Gamer Legendario/);
    
    await user.clear(nombreInput);
    await user.type(nombreInput, 'Nuevo Gamer');
    
    expect(nombreInput.value).toBe('Nuevo Gamer');
  });

  it('should allow changing game preference', async () => {
    const user = userEvent.setup();
    render(<PerfilUsuario />);
    
    const selectElement = screen.getByRole('combobox');
    
    await user.selectOptions(selectElement, 'FPS');
    
    expect(selectElement.value).toBe('FPS');
  });

  it('should allow toggling notifications checkbox', async () => {
    const user = userEvent.setup();
    render(<PerfilUsuario />);
    
    const checkbox = screen.getByRole('checkbox');
    const initialState = checkbox.checked;
    
    await user.click(checkbox);
    
    expect(checkbox.checked).toBe(!initialState);
  });

  it('should change notification checkbox back to checked', async () => {
    const user = userEvent.setup();
    render(<PerfilUsuario />);
    
    const checkbox = screen.getByRole('checkbox');
    
    await user.click(checkbox);
    await user.click(checkbox);
    
    expect(checkbox.checked).toBe(true);
  });

  // --- Pruebas de Envío de Formulario ---

  it('should show success message when form is submitted', async () => {
    const user = userEvent.setup();
    render(<PerfilUsuario />);
    
    const button = screen.getByRole('button', { name: /Guardar Cambios/i });
    await user.click(button);
    
    const successMessage = screen.getByText(/✅ Perfil actualizado con éxito/i);
    expect(successMessage).toBeInTheDocument();
  });

  it('should show success message with correct styling', async () => {
    const user = userEvent.setup();
    render(<PerfilUsuario />);
    
    const button = screen.getByRole('button', { name: /Guardar Cambios/i });
    await user.click(button);
    
    const message = screen.getByText(/Perfil actualizado con éxito/i);
    expect(message).toHaveStyle({ color: '#39FF14' });
  });

  it('should preserve form data when submitting', async () => {
    const user = userEvent.setup();
    render(<PerfilUsuario />);
    
    const nombreInput = screen.getByDisplayValue(/Gamer Legendario/);
    const selectElement = screen.getByRole('combobox');
    
    // Cambiar datos
    await user.clear(nombreInput);
    await user.type(nombreInput, 'Nuevo Gamer');
    await user.selectOptions(selectElement, 'FPS');
    
    // Enviar formulario
    const button = screen.getByRole('button', { name: /Guardar Cambios/i });
    await user.click(button);
    
    // Verificar que los datos persisten
    expect(nombreInput.value).toBe('Nuevo Gamer');
    expect(selectElement.value).toBe('FPS');
  });

  // --- Pruebas de Estructura y Estilos ---

  it('should render profile container with correct structure', () => {
    const { container } = render(<PerfilUsuario />);
    
    const profileDiv = container.querySelector('[style*="maxWidth"]');
    expect(profileDiv).toBeInTheDocument();
  });

  it('should have info box for fidelization status', () => {
    const { container } = render(<PerfilUsuario />);
    
    const infoBox = container.querySelector('[style*="padding: 10px"]');
    expect(infoBox).toBeInTheDocument();
  });

  // --- Pruebas de Accesibilidad ---

  it('should have proper form structure', () => {
    const { container } = render(<PerfilUsuario />);
    
    const form = container.querySelector('form');
    const inputs = form?.querySelectorAll('input, select');
    
    expect(inputs?.length).toBeGreaterThan(0);
  });

  it('should have associated labels for form inputs', () => {
    render(<PerfilUsuario />);
    
    const notificationLabel = screen.getByLabelText(/Recibir notificaciones/i);
    expect(notificationLabel).toBeInTheDocument();
  });

  it('should have name attribute on all form inputs', () => {
    render(<PerfilUsuario />);
    
    const nombreInput = screen.getByDisplayValue(/Gamer Legendario/);
    const emailInput = screen.getByDisplayValue(/gamer.legendario@alumnos.duoc.cl/);
    const selectElement = screen.getByRole('combobox');
    
    expect(nombreInput.name).toBe('nombre');
    expect(emailInput.name).toBe('email');
    expect(selectElement.name).toBe('preferenciaJuego');
  });

  // --- Pruebas de Lógica de Negocio ---

  it('should detect Duoc email for discount eligibility', () => {
    render(<PerfilUsuario />);
    
    // El componente inicia con email @alumnos.duoc.cl
    const discountText = screen.getByText(/Descuento Duoc UC/i);
    expect(discountText).toBeInTheDocument();
  });

  it('should display all initial profile data correctly', () => {
    render(<PerfilUsuario />);
    
    expect(screen.getByDisplayValue(/Gamer Legendario/)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/gamer.legendario@alumnos.duoc.cl/)).toBeInTheDocument();
    
    const selectElement = screen.getByRole('combobox');
    expect(selectElement.value).toBe('RPG');
  });

  // --- Pruebas de Validación ---

  it('should have required attribute on nombre input', () => {
    render(<PerfilUsuario />);
    
    const nombreInput = screen.getByDisplayValue(/Gamer Legendario/);
    expect(nombreInput.required).toBe(true);
  });

  it('should have correct input types', () => {
    render(<PerfilUsuario />);
    
    const nombreInput = screen.getByDisplayValue(/Gamer Legendario/);
    const emailInput = screen.getByDisplayValue(/gamer.legendario@alumnos.duoc.cl/);
    
    expect(nombreInput.type).toBe('text');
    expect(emailInput.type).toBe('email');
  });

  // --- Pruebas de Eventos ---

  it('should handle form submission without page reload', async () => {
    const user = userEvent.setup();
    render(<PerfilUsuario />);
    
    const form = screen.getByRole('button', { name: /Guardar Cambios/i }).closest('form');
    const submitSpy = (e) => e.preventDefault();
    
    if (form) {
      form.addEventListener('submit', submitSpy);
    }
    
    const button = screen.getByRole('button', { name: /Guardar Cambios/i });
    await user.click(button);
    
    const message = screen.getByText(/Perfil actualizado con éxito/i);
    expect(message).toBeInTheDocument();
  });

});
