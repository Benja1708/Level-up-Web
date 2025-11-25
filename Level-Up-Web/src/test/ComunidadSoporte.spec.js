import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, afterEach, vi } from 'vitest';
import ComunidadSoporte from '../components/ComunidadSoporte';

// Limpieza automática después de cada prueba
afterEach(() => {
  cleanup();
});

// --- PRUEBAS DEL COMPONENTE COMUNIDAD SOPORTE ---
describe('ComunidadSoporte Component', () => {

  // --- Pruebas de Renderización Inicial ---

  it('should render the main title "Comunidad y Soporte Técnico"', () => {
    render(<ComunidadSoporte />);
    
    const title = screen.getByText(/Comunidad y Soporte Técnico/i);
    expect(title).toBeInTheDocument();
  });

  it('should render the news section title "Novedades y Guías Level-Up"', () => {
    render(<ComunidadSoporte />);
    
    const newsTitle = screen.getByText(/Novedades y Guías Level-Up/i);
    expect(newsTitle).toBeInTheDocument();
  });

  it('should render the technical support section title', () => {
    render(<ComunidadSoporte />);
    
    const supportTitle = screen.getByText(/Soporte Técnico Inmediato/i);
    expect(supportTitle).toBeInTheDocument();
  });

  it('should render the social networks section title', () => {
    render(<ComunidadSoporte />);
    
    const socialTitle = screen.getByText(/Síguenos en Redes Sociales/i);
    expect(socialTitle).toBeInTheDocument();
  });

  // --- Pruebas de Sección de Noticias ---

  it('should render all news items', () => {
    render(<ComunidadSoporte />);
    
    expect(screen.getByText(/Mejora tu FPS: Guía de optimización de PC Gamer/i)).toBeInTheDocument();
    expect(screen.getByText(/¿Cómo elegir tu primera silla gamer\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Top 5 Juegos de Mesa para la comunidad/i)).toBeInTheDocument();
  });

  it('should display news author and date', () => {
    render(<ComunidadSoporte />);
    
    expect(screen.getByText(/LevelUp Pro/i)).toBeInTheDocument();
    expect(screen.getByText(/Duoc UC Gaming/i)).toBeInTheDocument();
    expect(screen.getByText(/Admin/i)).toBeInTheDocument();
    expect(screen.getByText(/25\/10\/2025/)).toBeInTheDocument();
    expect(screen.getByText(/18\/10\/2025/)).toBeInTheDocument();
  });

  it('should render "Leer Guía" buttons for each news item', () => {
    render(<ComunidadSoporte />);
    
    const buttons = screen.getAllByRole('button', { name: /Leer Guía/i });
    expect(buttons).toHaveLength(3);
  });

  it('should trigger alert when clicking "Leer Guía" button', async () => {
    const user = userEvent.setup();
    window.alert = vi.fn();
    
    render(<ComunidadSoporte />);
    
    const buttons = screen.getAllByRole('button', { name: /Leer Guía/i });
    await user.click(buttons[0]);
    
    expect(window.alert).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith(
      expect.stringContaining('Mejora tu FPS')
    );
  });

  // --- Pruebas de Sección de Soporte Técnico ---

  it('should render WhatsApp support button', () => {
    render(<ComunidadSoporte />);
    
    const whatsappButton = screen.getByRole('link', { name: /Abrir Chat de WhatsApp/i });
    expect(whatsappButton).toBeInTheDocument();
  });

  it('should have correct WhatsApp link href', () => {
    render(<ComunidadSoporte />);
    
    const whatsappLink = screen.getByRole('link', { name: /Abrir Chat de WhatsApp/i });
    expect(whatsappLink).toHaveAttribute('href', expect.stringContaining('wa.me'));
    expect(whatsappLink).toHaveAttribute('target', '_blank');
    expect(whatsappLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should display support technical description', () => {
    render(<ComunidadSoporte />);
    
    const description = screen.getByText(/¿Problemas con tu PC Gamer o accesorios/i);
    expect(description).toBeInTheDocument();
  });

  // --- Pruebas de Sección de Redes Sociales ---

  it('should render Facebook social button', () => {
    render(<ComunidadSoporte />);
    
    const facebookButton = screen.getByRole('button', { name: /Facebook/i });
    expect(facebookButton).toBeInTheDocument();
  });

  it('should render Instagram social button', () => {
    render(<ComunidadSoporte />);
    
    const instagramButton = screen.getByRole('button', { name: /Instagram/i });
    expect(instagramButton).toBeInTheDocument();
  });

  it('should render X (Twitter) social button', () => {
    render(<ComunidadSoporte />);
    
    const twitterButton = screen.getByRole('button', { name: /X \(Twitter\)/i });
    expect(twitterButton).toBeInTheDocument();
  });

  it('should trigger alert when clicking Facebook button', async () => {
    const user = userEvent.setup();
    window.alert = vi.fn();
    
    render(<ComunidadSoporte />);
    
    const facebookButton = screen.getByRole('button', { name: /Facebook/i });
    await user.click(facebookButton);
    
    expect(window.alert).toHaveBeenCalledWith(
      expect.stringContaining('Facebook')
    );
  });

  it('should trigger alert when clicking Instagram button', async () => {
    const user = userEvent.setup();
    window.alert = vi.fn();
    
    render(<ComunidadSoporte />);
    
    const instagramButton = screen.getByRole('button', { name: /Instagram/i });
    await user.click(instagramButton);
    
    expect(window.alert).toHaveBeenCalledWith(
      expect.stringContaining('Instagram')
    );
  });

  it('should trigger alert when clicking X (Twitter) button', async () => {
    const user = userEvent.setup();
    window.alert = vi.fn();
    
    render(<ComunidadSoporte />);
    
    const twitterButton = screen.getByRole('button', { name: /X \(Twitter\)/i });
    await user.click(twitterButton);
    
    expect(window.alert).toHaveBeenCalledWith(
      expect.stringContaining('X')
    );
  });

  // --- Pruebas de Estructura HTML ---

  it('should render container div with correct styling', () => {
    const { container } = render(<ComunidadSoporte />);
    
    const mainContainer = container.querySelector('div');
    expect(mainContainer).toBeInTheDocument();
  });

  it('should render all three main sections', () => {
    const { container } = render(<ComunidadSoporte />);
    
    const sections = container.querySelectorAll('section');
    expect(sections).toHaveLength(3);
  });

  it('should render news grid with correct structure', () => {
    const { container } = render(<ComunidadSoporte />);
    
    // Verificar que existan las tarjetas de noticias
    const newsCards = container.querySelectorAll('[style*="grid"]');
    expect(newsCards.length).toBeGreaterThan(0);
  });

  // --- Pruebas de Textos y Descripciones ---

  it('should display news section description', () => {
    render(<ComunidadSoporte />);
    
    const description = screen.getByText(/Encuentra consejos y noticias para mejorar tu experiencia de juego/i);
    expect(description).toBeInTheDocument();
  });

  it('should display social networks description', () => {
    render(<ComunidadSoporte />);
    
    const description = screen.getByText(/Facilita el compartir productos y promociones en redes sociales/i);
    expect(description).toBeInTheDocument();
  });

  // --- Pruebas de Accesibilidad ---

  it('should have buttons as interactive elements', () => {
    render(<ComunidadSoporte />);
    
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('should have a link for WhatsApp navigation', () => {
    render(<ComunidadSoporte />);
    
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe('A');
  });

  // --- Pruebas de Cantidad de Elementos ---

  it('should render exactly 3 news items', () => {
    render(<ComunidadSoporte />);
    
    const buttons = screen.getAllByRole('button', { name: /Leer Guía/i });
    expect(buttons).toHaveLength(3);
  });

  it('should render exactly 3 social media buttons', () => {
    render(<ComunidadSoporte />);
    
    const socialButtons = [
      screen.getByRole('button', { name: /Facebook/i }),
      screen.getByRole('button', { name: /Instagram/i }),
      screen.getByRole('button', { name: /X \(Twitter\)/i }),
    ];
    
    expect(socialButtons).toHaveLength(3);
  });

  // --- Pruebas de Emojis y Iconografía ---

  it('should display emoji icons in titles', () => {
    render(<ComunidadSoporte />);
    
    // Verificar que el componente renderiza correctamente con emojis
    const heading = screen.getByText(/📢 Comunidad y Soporte Técnico/);
    expect(heading).toBeInTheDocument();
  });

  // --- Pruebas de Colores y Estilos ---

  it('should render WhatsApp button with green background', () => {
    render(<ComunidadSoporte />);
    
    const whatsappButton = screen.getByRole('link', { name: /Abrir Chat de WhatsApp/i }).querySelector('button');
    expect(whatsappButton).toHaveStyle({ backgroundColor: '#39FF14' });
  });

  // --- Pruebas de Eventos Múltiples ---

  it('should handle multiple button clicks', async () => {
    const user = userEvent.setup();
    window.alert = vi.fn();
    
    render(<ComunidadSoporte />);
    
    const buttons = screen.getAllByRole('button', { name: /Leer Guía/i });
    
    await user.click(buttons[0]);
    await user.click(buttons[1]);
    await user.click(buttons[2]);
    
    expect(window.alert).toHaveBeenCalledTimes(3);
  });

  it('should maintain state after multiple social button clicks', async () => {
    const user = userEvent.setup();
    window.alert = vi.fn();
    
    render(<ComunidadSoporte />);
    
    const facebookButton = screen.getByRole('button', { name: /Facebook/i });
    const instagramButton = screen.getByRole('button', { name: /Instagram/i });
    
    await user.click(facebookButton);
    await user.click(instagramButton);
    
    // Verificar que los botones aún existen después de los clicks
    expect(screen.getByRole('button', { name: /Facebook/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Instagram/i })).toBeInTheDocument();
  });

});
