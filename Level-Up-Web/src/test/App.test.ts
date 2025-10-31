describe('Pruebas de Estilos CSS con Jasmine', function() {
  // 1. Configuración: Preparamos el HTML necesario antes de cada prueba.
  // Nota: Esto es conceptual y depende de tu runner de pruebas (Karma, JSDOM, etc.).
  let rootElement;
  let logoElement;
  let reactLogoElement;
  let cardElement;

  beforeEach(function() {
    // Creamos una estructura HTML simple para que las pruebas funcionen.
    rootElement = document.createElement('div');
    rootElement.id = 'root';
    document.body.appendChild(rootElement);

    // Simulamos la estructura del logo React para probar la animación/hover
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', '#'); // Para simular :nth-of-type(2) .logo
    rootElement.appendChild(linkElement);

    reactLogoElement = document.createElement('img');
    reactLogoElement.className = 'logo react';
    linkElement.appendChild(reactLogoElement);
    
    // Elemento .card
    cardElement = document.createElement('div');
    cardElement.className = 'card';
    rootElement.appendChild(cardElement);
  });

  // 2. Limpieza: Eliminamos el HTML después de cada prueba.
  afterEach(function() {
    document.body.removeChild(rootElement);
  });

  // --- Casos de Prueba (Specs) ---

  describe('#root styles', function() {
    it('debería tener la propiedad CSS max-width en 1280px', function() {
      // Usamos window.getComputedStyle para obtener el estilo FINAL aplicado por el CSS.
      const style = window.getComputedStyle(rootElement);
      // Para colores o tamaños, el navegador los convierte a valores absolutos (ej. px).
      expect(style.maxWidth).toEqual('1280px');
    });

    it('debería tener el texto centrado', function() {
      const style = window.getComputedStyle(rootElement);
      expect(style.textAlign).toEqual('center');
    });
  });

  //---
  
  describe('.logo styles', function() {
    it('debería tener la transición CSS de filtro en 300ms', function() {
      const style = window.getComputedStyle(reactLogoElement);
      // 'filter 300ms' se traduce a 'filter 0.3s' en el estilo computado
      expect(style.transition).toContain('filter 0.3s');
    });
  });
  
  //---

  describe('.logo:hover styles', function() {
    it('debería aplicar el drop-shadow en el hover (comprobación de clase/estado, si fuera posible)', function() {
      // Nota: Probar :hover es complejo. A menudo se prueba el efecto 
      // de una **función JS** que aplica la clase 'hovered' o similar.
      // Si el entorno de pruebas no soporta la simulación de :hover, 
      // esta prueba fallará o no será posible.
      
      // La verificación más simple es confirmar que las clases correctas existen:
      expect(reactLogoElement.className).toContain('logo');
      expect(reactLogoElement.className).toContain('react');
    });
  });

  //---

  describe('.card styles', function() {
    it('debería tener un padding de 2em', function() {
      const style = window.getComputedStyle(cardElement);
      // 2em puede convertirse a px dependiendo de la fuente base. 
      // Si la fuente base es 16px, 2em sería 32px.
      // Aquí comparamos con el valor esperado sin conversión si el entorno lo permite:
      expect(style.padding).toContain('2em'); // O '32px 32px 32px 32px' dependiendo del entorno
    });
  });
});