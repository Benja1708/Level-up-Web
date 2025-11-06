import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import ComunidadSoporte from '../components/ComunidadSoporte';
import '@testing-library/jest-dom';
describe('ComunidadSoporte Component', () => {
  // Mock de window.alert
  beforeEach(() => {
   global.alert = vn.fn();
  });

  it('should render the component title', () => {
    render(<ComunidadSoporte />);
    expect(screen.getByText('📢 Comunidad y Soporte Técnico')).toBeInTheDocument();
  });

  it('should render all news articles', () => {
    render(<ComunidadSoporte />);
    const mockNoticias = [
      "Mejora tu FPS: Guía de optimización de PC Gamer",
      "¿Cómo elegir tu primera silla gamer?",
      "Top 5 Juegos de Mesa para la comunidad"
    ];

    mockNoticias.forEach(titulo => {
      expect(screen.getByText(titulo)).toBeInTheDocument();
    });
  });

  it('should show alert when clicking Read Guide button', () => {
    render(<ComunidadSoporte />);
    const firstReadButton = screen.getAllByText('Leer Guía')[0];
    fireEvent.click(firstReadButton);
    
    expect(global.alert).toHaveBeenCalledWith(
      'Abriendo artículo: Mejora tu FPS: Guía de optimización de PC Gamer'
    );
  });

  it('should render WhatsApp support button with correct link', () => {
    render(<ComunidadSoporte />);
    const whatsappButton = screen.getByText('Abrir Chat de WhatsApp (Soporte Técnico)');
    const whatsappLink = whatsappButton.closest('a');
    
    expect(whatsappButton).toBeInTheDocument();
    expect(whatsappLink).toHaveAttribute(
      'href',
      'https://wa.me/56912345678?text=Hola%20necesito%20soporte%20t%C3%A9cnico%20con%20mi%20equipo.'
    );
  });

  it('should show alerts when clicking social media buttons', () => {
    render(<ComunidadSoporte />);
    const socialButtons = ['Facebook', 'Instagram', 'X (Twitter)'];

    socialButtons.forEach(network => {
      const button = screen.getByText(network);
      fireEvent.click(button);
      expect(global.alert).toHaveBeenCalledWith(`Compartiendo en ${network}...`);
    });
  });

  // Test de estilos
  it('should apply correct styles to main container', () => {
    render(<ComunidadSoporte />);
    const container = screen.getByText('📢 Comunidad y Soporte Técnico').closest('div');
    
    expect(container).toHaveStyle({
      backgroundColor: '#111',
      color: '#FFFFFF',
      border: '1px solid #1E90FF'
    });
  });
});
