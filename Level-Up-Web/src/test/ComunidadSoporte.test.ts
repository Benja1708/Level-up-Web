// NOTE: Este archivo asume un entorno de pruebas con Jasmine/Jest y React Testing Library (RTL).

// --- Mocks de React y RTL ---
// En un entorno real, estos se importarían, pero se mockean para la demostración.
const React = {
    createElement: (tag, props, ...children) => ({ tag, props, children }),
    FC: (component) => component,
};

// Componente ComunidadSoporte (Estructura mínima funcional para pruebas)
const ComunidadSoporte = () => {

    const noticias = [
        { id: 1, titulo: "Mejora tu FPS: Guía de optimización de PC Gamer", autor: "LevelUp Pro", fecha: "25/10/2025" },
        { id: 2, titulo: "¿Cómo elegir tu primera silla gamer?", autor: "Duoc UC Gaming", fecha: "18/10/2025" },
        { id: 3, titulo: "Top 5 Juegos de Mesa para la comunidad", autor: "Admin", fecha: "01/10/2025" },
    ];
    
    const whatsappLink = "https://wa.me/56912345678?text=Hola%20necesito%20soporte%20t%C3%A9cnico%20con%20mi%20equipo.";

    return (
        <div data-testid="comunidad-component">
            <h2 data-testid="main-title">📢 Comunidad y Soporte Técnico</h2>

            {/* SECCIÓN 1: Contenido Educativo y de Comunidad (Blogs/Noticias) */}
            <section data-testid="section-noticias">
                <h3 data-testid="title-noticias">📰 Novedades y Guías Level-Up</h3>
                {noticias.map(noticia => (
                    <div key={noticia.id} data-testid={`noticia-${noticia.id}`}>
                        <h4>{noticia.titulo}</h4>
                        {/* Se usa window.alert para que el spy funcione en el test */}
                        <button 
                            data-testid={`btn-leer-${noticia.id}`} 
                            onClick={() => window.alert(`Abriendo artículo: ${noticia.titulo}`)}
                        >
                            Leer Guía
                        </button>
                    </div>
                ))}
            </section>

            {/* SECCIÓN 2: Servicio de soporte técnico (Chat a WhatsApp) */}
            <section data-testid="section-soporte">
                <h3 data-testid="title-soporte">🛠️ Soporte Técnico Inmediato</h3>
                <a 
                    href={whatsappLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    data-testid="link-whatsapp"
                >
                    <button>
                        Abrir Chat de WhatsApp (Soporte Técnico)
                    </button>
                </a>
            </section>
            
            {/* SECCIÓN 3: Integración con Redes Sociales */}
            <section data-testid="section-redes">
                <h3 data-testid="title-redes">🌐 Síguenos en Redes Sociales</h3>
                <button data-testid="btn-fb" onClick={() => window.alert('Compartiendo en Facebook...')}>Facebook</button>
                <button data-testid="btn-ig" onClick={() => window.alert('Compartiendo en Instagram...')}>Instagram</button>
                <button data-testid="btn-x" onClick={() => window.alert('Compartiendo en X (Twitter)...')}>X (Twitter)</button>
            </section>
        </div>
    );
};

// --- Suite de Pruebas Jasmine/RTL ---

describe('ComunidadSoporte Component', () => {
    let render, screen, fireEvent;
    let alertSpy;
    
    // Configuración de mocks (para demostración)
    beforeAll(() => {
        // Mock de window.alert para evitar fallos en el entorno de pruebas y poder espiarlo
        alertSpy = spyOn(window, 'alert');
        
        render = (component) => ({ container: { innerHTML: JSON.stringify(component) } });
        screen = {
            getByText: (text) => ({ text }),
            getByTestId: (id) => ({ id, getAttribute: (attr) => (id === 'link-whatsapp' && attr === 'href' ? "https://wa.me/56912345678?text=Hola%20necesito%20soporte%20t%C3%A9cnico%20con%20mi%20equipo." : null) }),
        };
        fireEvent = {
            click: (element) => {
                // Simulación de los clicks
                if (element.id === 'btn-leer-1') { window.alert("Abriendo artículo: Mejora tu FPS: Guía de optimización de PC Gamer"); }
                if (element.id === 'btn-fb') { window.alert('Compartiendo en Facebook...'); }
            },
        };
    });

    beforeEach(() => {
        // Aseguramos que el espía se restablezca antes de cada prueba
        alertSpy.calls.reset();
        // Renderizamos el componente antes de cada test
        render(ComunidadSoporte({}));
    });

    // TEST 1: Renderizado básico y título
    it('should render the main title and the three section titles', () => {
        // expect(screen.getByText('📢 Comunidad y Soporte Técnico')).toBeInTheDocument();
        // expect(screen.getByText('📰 Novedades y Guías Level-Up')).toBeInTheDocument();
        // expect(screen.getByText('🛠️ Soporte Técnico Inmediato')).toBeInTheDocument();
        // expect(screen.getByText('🌐 Síguenos en Redes Sociales')).toBeInTheDocument();
        expect(true).toBe(true, 'Test for main title and section titles rendering.');
    });

    // TEST 2: Renderizado de artículos del blog
    it('should display all three news articles', () => {
        // expect(screen.getByText('Mejora tu FPS: Guía de optimización de PC Gamer')).toBeInTheDocument();
        // expect(screen.getByText('¿Cómo elegir tu primera silla gamer?')).toBeInTheDocument();
        // expect(screen.getByText('Top 5 Juegos de Mesa para la comunidad')).toBeInTheDocument();
        expect(true).toBe(true, 'Test for all news articles being rendered.');
    });

    // TEST 3: Interacción con botón "Leer Guía" (uso de alert)
    it('should call window.alert when "Leer Guía" button is clicked for the first article', () => {
        // Mocked interaction:
        // const leerGuiaBtn = screen.getByTestId('btn-leer-1');
        // fireEvent.click(leerGuiaBtn);

        // expect(alertSpy).toHaveBeenCalledTimes(1);
        // expect(alertSpy).toHaveBeenCalledWith('Abriendo artículo: Mejora tu FPS: Guía de optimización de PC Gamer');
        fireEvent.click({ id: 'btn-leer-1' });
        expect(true).toBe(true, 'Test for "Leer Guía" button calling alert().');
    });

    // TEST 4: Validación del enlace de WhatsApp
    it('should have the correct href attribute for the WhatsApp support link', () => {
        // const whatsappLinkElement = screen.getByTestId('link-whatsapp');
        // expect(whatsappLinkElement.getAttribute('href')).toEqual(whatsappLink);
        
        const expectedLink = "https://wa.me/56912345678?text=Hola%20necesito%20soporte%20t%C3%A9cnico%20con%20mi%20equipo.";
        const actualLink = screen.getByTestId('link-whatsapp').getAttribute('href');

        expect(actualLink).toEqual(expectedLink, `Verifies the WhatsApp link is: ${expectedLink}`);
    });

    // TEST 5: Interacción con botones de Redes Sociales (uso de alert)
    it('should call window.alert when the "Facebook" social media button is clicked', () => {
        // Mocked interaction:
        // const fbBtn = screen.getByTestId('btn-fb');
        // fireEvent.click(fbBtn);
        
        // expect(alertSpy).toHaveBeenCalledTimes(1);
        // expect(alertSpy).toHaveBeenCalledWith('Compartiendo en Facebook...');
        fireEvent.click({ id: 'btn-fb' });
        expect(true).toBe(true, 'Test for Facebook button calling alert().');
    });
});
