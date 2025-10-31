
const React = {
    createElement: (tag, props, ...children) => ({ tag, props, children, type: tag }),
    FC: (component) => component,
  
};


const NIVELES = [
    { nombre: "Novato", puntosRequeridos: 0, beneficio: "Acceso a descuentos del 5%" },
    { nombre: "Avanzado", puntosRequeridos: 1000, beneficio: "Descuento del 10% y Acceso a preventas" },
    { nombre: "Elite", puntosRequeridos: 5000, beneficio: "Descuento del 15% y Envío Gratuito" },
    { nombre: "Leyenda", puntosRequeridos: 10000, beneficio: "Descuento del 20%, Producto de Regalo anual" },
];

const PuntosLevelUpMock = ({ puntosActuales }) => {
    
    
    const nivelActual = NIVELES.slice().reverse().find(n => puntosActuales >= n.puntosRequeridos) || NIVELES[0];
    const nivelesSuperiores = NIVELES.filter(n => n.puntosRequeridos > nivelActual.puntosRequeridos);
    const siguienteNivel = nivelesSuperiores.length > 0 ? nivelesSuperiores[0] : null;

    const puntosFaltantes = siguienteNivel ? siguienteNivel.puntosRequeridos - puntosActuales : 0;
    
    return (
        <div data-testid="level-up-component">
            <div data-testid="puntos-actuales">{puntosActuales}</div>
            <div data-testid="nivel-actual-nombre">{nivelActual.nombre}</div>
            <div data-testid="nivel-actual-beneficio">{nivelActual.beneficio}</div>
            <div data-testid="siguiente-nivel-nombre">{siguienteNivel ? siguienteNivel.nombre : 'MAX'}</div>
            <div data-testid="puntos-faltantes">{puntosFaltantes}</div>
            
            {siguienteNivel && <p data-testid="proximo-nivel-visible">Visible</p>}
            {!siguienteNivel && <p data-testid="proximo-nivel-invisible">Invisible</p>}
        </div>
    );
};



describe('PuntosLevelUp Component Logic (Gamification)', () => {
    let render, screen;
    
    
    beforeAll(() => {
        
        render = (Component) => ({ container: { innerHTML: JSON.stringify(Component) } });
        
        screen = {
            getByTestId: (id) => ({ 
                text: (function() {
                    
                    return null;
                })()
            }),
        };
    });

    
    const verifyLevel = (puntos, expectedLevel, expectedNext, expectedNeeded, isNextVisible) => {
        const output = PuntosLevelUpMock({ puntosActuales: puntos });
        
        
        const currentLevel = output.children.find(c => c.props['data-testid'] === 'nivel-actual-nombre').children[0];
        const nextLevel = output.children.find(c => c.props['data-testid'] === 'siguiente-nivel-nombre').children[0];
        const needed = parseInt(output.children.find(c => c.props['data-testid'] === 'puntos-faltantes').children[0]);
        const nextVisibility = !!output.children.find(c => c.props['data-testid'] === 'proximo-nivel-visible');
        
        expect(currentLevel).toEqual(expectedLevel, `Puntos ${puntos}: Nivel actual debe ser ${expectedLevel}`);
        expect(nextLevel).toEqual(expectedNext, `Puntos ${puntos}: Nivel siguiente debe ser ${expectedNext}`);
        expect(needed).toEqual(expectedNeeded, `Puntos ${puntos}: Puntos faltantes deben ser ${expectedNeeded}`);
        expect(nextVisibility).toEqual(isNextVisible, `Puntos ${puntos}: Visibilidad del próximo nivel debe ser ${isNextVisible}`);
    };

    
    it('should correctly place user at Novato level when having 0 points', () => {
        verifyLevel(0, "Novato", "Avanzado", 1000, true);
    });

   
    it('should correctly place user at Avanzado level and calculate points needed for Elite', () => {
        
        verifyLevel(4500, "Avanzado", "Elite", 500, true); 
    });

    
    it('should correctly place user at Elite level when reaching exactly 5000 points', () => {
        
        verifyLevel(5000, "Elite", "Leyenda", 5000, true); // 10000 - 5000 = 5000
    });

    
    it('should correctly place user at Leyenda level and hide the "Próximo Nivel" section', () => {
        
        verifyLevel(10000, "Leyenda", "MAX", 0, false); 
    });

    
    it('should maintain Leyenda level and hide "Próximo Nivel" section even with surplus points', () => {
        
        verifyLevel(15000, "Leyenda", "MAX", 0, false);
    });
});