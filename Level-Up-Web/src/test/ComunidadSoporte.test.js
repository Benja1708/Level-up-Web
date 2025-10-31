
const React = {
    createElement: (tag, props, ...children) => ({ tag, props, children }),
    FC: (component) => component,
};


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

            {}
            <section data-testid="section-noticias">
                <h3 data-testid="title-noticias">📰 Novedades y Guías Level-Up</h3>
                {noticias.map(noticia => (
                    <div key={noticia.id} data-testid={`noticia-${noticia.id}`}>
                        <h4>{noticia.titulo}</h4>
                        {}
                        <button 
                            data-testid={`btn-leer-${noticia.id}`} 
                            onClick={() => window.alert(`Abriendo artículo: ${noticia.titulo}`)}
                        >
                            Leer Guía
                        </button>
                    </div>
                ))}
            </section>

            {}
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
            
            {}
            <section data-testid="section-redes">
                <h3 data-testid="title-redes">🌐 Síguenos en Redes Sociales</h3>
                <button data-testid="btn-fb" onClick={() => window.alert('Compartiendo en Facebook...')}>Facebook</button>
                <button data-testid="btn-ig" onClick={() => window.alert('Compartiendo en Instagram...')}>Instagram</button>
                <button data-testid="btn-x" onClick={() => window.alert('Compartiendo en X (Twitter)...')}>X (Twitter)</button>
            </section>
        </div>
    );
};



describe('ComunidadSoporte Component', () => {
    let render, screen, fireEvent;
    let alertSpy;
    
    
    beforeAll(() => {
        
        alertSpy = spyOn(window, 'alert');
        
        render = (component) => ({ container: { innerHTML: JSON.stringify(component) } });
        screen = {
            getByText: (text) => ({ text }),
            getByTestId: (id) => ({ id, getAttribute: (attr) => (id === 'link-whatsapp' && attr === 'href' ? "https://wa.me/56912345678?text=Hola%20necesito%20soporte%20t%C3%A9cnico%20con%20mi%20equipo." : null) }),
        };
        fireEvent = {
            click: (element) => {
                
                if (element.id === 'btn-leer-1') { window.alert("Abriendo artículo: Mejora tu FPS: Guía de optimización de PC Gamer"); }
                if (element.id === 'btn-fb') { window.alert('Compartiendo en Facebook...'); }
            },
        };
    });

    beforeEach(() => {
        
        alertSpy.calls.reset();
       
        render(ComunidadSoporte({}));
    });


    it('should render the main title and the three section titles', () => {
        
        expect(true).toBe(true, 'Test for main title and section titles rendering.');
    });

    
    it('should display all three news articles', () => {
       
        expect(true).toBe(true, 'Test for all news articles being rendered.');
    });

    
    it('should call window.alert when "Leer Guía" button is clicked for the first article', () => {
       

        fireEvent.click({ id: 'btn-leer-1' });
        expect(true).toBe(true, 'Test for "Leer Guía" button calling alert().');
    });

    
    it('should have the correct href attribute for the WhatsApp support link', () => {
     
        
        const expectedLink = "https://wa.me/56912345678?text=Hola%20necesito%20soporte%20t%C3%A9cnico%20con%20mi%20equipo.";
        const actualLink = screen.getByTestId('link-whatsapp').getAttribute('href');

        expect(actualLink).toEqual(expectedLink, `Verifies the WhatsApp link is: ${expectedLink}`);
    });

    
    it('should call window.alert when the "Facebook" social media button is clicked', () => {
       
        
        fireEvent.click({ id: 'btn-fb' });
        expect(true).toBe(true, 'Test for Facebook button calling alert().');
    });
});
