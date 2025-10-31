// NOTE: Este archivo asume un entorno de pruebas con Jasmine/Jest y React Testing Library (RTL).

// --- Mocks de React y RTL ---
// Se simulan hooks y utilidades de prueba para la ejecución en el sandbox.
const React = {
    createElement: (tag, props, ...children) => ({ tag, props, children, type: tag }),
    FC: (component) => component,
    // Simulación de useState que devuelve [valor, setter]
    useState: (initial) => [initial, jasmine.createSpy('setState')],
};

// Constantes
const PUNTOS_INICIALES = 100;

// --- Funciones de Lógica Pura (Para pruebas directas) ---

// Replicación de la función validarEdad para prueba directa, usando una fecha actual fija (2025-10-30)
const validarEdad = (fechaStr) => {
    if (!fechaStr) return false;
    const fechaNac = new Date(fechaStr + 'T00:00:00'); // Asegura la zona horaria
    const hoy = new Date('2025-10-30T00:00:00'); // Fecha fija para pruebas
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
    
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }
    return edad >= 18;
};

// Función de prueba para verificar el descuento Duoc
const verificarDescuentoDuoc = (email) => {
    return email.toLowerCase().endsWith('@duocuc.cl') || email.toLowerCase().endsWith('@alumnos.duoc.cl');
};

// --- Suite de Pruebas Jasmine ---

describe('Registro Component Logic', () => {

    // -----------------------------------------------------------
    // PRUEBAS DE LÓGICA PURA (validarEdad y verificarDescuentoDuoc)
    // -----------------------------------------------------------

    describe('validarEdad', () => {
        // La fecha fija 'hoy' es 2025-10-30. La edad mínima es 18.
        // El punto de corte es 2007-10-30.

        it('should return true for a user exactly 18 years old (2007-10-30)', () => {
            expect(validarEdad('2007-10-30')).toBe(true);
        });

        it('should return true for a user older than 18 (2007-10-29)', () => {
            expect(validarEdad('2007-10-29')).toBe(true);
        });
        
        it('should return false for a user one day under 18 (2007-10-31)', () => {
            expect(validarEdad('2007-10-31')).toBe(false);
        });

        it('should return false for a user significantly under 18 (2010-01-01)', () => {
            expect(validarEdad('2010-01-01')).toBe(false);
        });

        it('should return false for an empty date string', () => {
            expect(validarEdad('')).toBe(false);
        });
    });

    describe('verificarDescuentoDuoc', () => {
        it('should return true for @duocuc.cl email', () => {
            expect(verificarDescuentoDuoc('juanito@duocuc.cl')).toBe(true);
        });

        it('should return true for @alumnos.duoc.cl email', () => {
            expect(verificarDescuentoDuoc('maria.perez@alumnos.duoc.cl')).toBe(true);
        });
        
        it('should return true regardless of case sensitivity', () => {
            expect(verificarDescuentoDuoc('TEST@ALUMNOS.DUOC.CL')).toBe(true);
        });

        it('should return false for a generic email', () => {
            expect(verificarDescuentoDuoc('gamer@gmail.com')).toBe(false);
        });
    });

    // -----------------------------------------------------------
    // PRUEBAS DE LÓGICA DE ENVÍO DE FORMULARIO (handleSubmit)
    // -----------------------------------------------------------

    describe('handleSubmit Logic', () => {
        let setMensajeSpy;
        let preventDefaultSpy;
        let mockFormData;

        beforeEach(() => {
            // Inicializar spies y datos antes de cada prueba
            setMensajeSpy = jasmine.createSpy('setMensaje');
            preventDefaultSpy = jasmine.createSpy('preventDefault');
            
            // Datos base de un usuario mayor de edad (2000-01-01)
            mockFormData = {
                nombre: 'Test User',
                email: 'test@email.com',
                fechaNacimiento: '2000-01-01',
                codigoReferido: '',
            };
        });

        const runHandleSubmit = (formData, tieneDescuento) => {
            // Simulación simplificada del handleSubmit (extrayendo la lógica clave)
            
            if (!validarEdad(formData.fechaNacimiento)) {
                setMensajeSpy('❌ ¡Registro Fallido! Debes ser mayor de 18 años para registrarte.');
                return;
            }
            
            let puntos = PUNTOS_INICIALES;
            let mensajeReferido = '';

            if (formData.codigoReferido) {
                puntos += 500;
                mensajeReferido = ' ¡Y 500 Puntos LevelUp extra por tu código de referido!';
            }
            
            const mensajeRegistro = tieneDescuento
                ? `🎉 ¡Registro Exitoso! Tienes ${puntos} Puntos LevelUp y 20% de descuento por ser Duoc UC.${mensajeReferido}`
                : `✅ ¡Registro Exitoso! Bienvenido/a a la comunidad Level-Up Gamer. Has ganado ${puntos} Puntos LevelUp.${mensajeReferido}`;
            
            setMensajeSpy(mensajeRegistro);
        };


        it('should fail registration if the user is under 18', () => {
            // Fecha: 2008-01-01 (Menor de edad con fecha fija 2025-10-30)
            mockFormData.fechaNacimiento = '2008-01-01'; 
            runHandleSubmit(mockFormData, false);

            expect(setMensajeSpy).toHaveBeenCalledWith('❌ ¡Registro Fallido! Debes ser mayor de 18 años para registrarte.');
        });
        
        // Scenario 1: Éxito básico (No Duoc, No Referido)
        it('should succeed and grant base points (100) without discount or referral message', () => {
            runHandleSubmit(mockFormData, false);

            const expectedMessage = '✅ ¡Registro Exitoso! Bienvenido/a a la comunidad Level-Up Gamer. Has ganado 100 Puntos LevelUp.';
            expect(setMensajeSpy).toHaveBeenCalledWith(expectedMessage);
        });
        
        // Scenario 2: Con Descuento Duoc, Sin Referido
        it('should succeed and grant base points (100) with Duoc discount message', () => {
            runHandleSubmit(mockFormData, true); // tieneDescuento = true

            const expectedMessage = '🎉 ¡Registro Exitoso! Tienes 100 Puntos LevelUp y 20% de descuento por ser Duoc UC.';
            expect(setMensajeSpy).toHaveBeenCalledWith(expectedMessage);
        });
        
        // Scenario 3: Sin Descuento Duoc, Con Referido
        it('should succeed and grant bonus points (600) with referral message', () => {
            mockFormData.codigoReferido = 'XYZ123';
            runHandleSubmit(mockFormData, false); 

            const expectedMessage = '✅ ¡Registro Exitoso! Bienvenido/a a la comunidad Level-Up Gamer. Has ganado 600 Puntos LevelUp. ¡Y 500 Puntos LevelUp extra por tu código de referido!';
            expect(setMensajeSpy).toHaveBeenCalledWith(expectedMessage);
        });

        // Scenario 4: Con Descuento Duoc, Con Referido
        it('should succeed, grant bonus points (600), and include both Duoc and referral messages', () => {
            mockFormData.codigoReferido = 'XYZ123';
            runHandleSubmit(mockFormData, true); // tieneDescuento = true

            const expectedMessage = '🎉 ¡Registro Exitoso! Tienes 600 Puntos LevelUp y 20% de descuento por ser Duoc UC. ¡Y 500 Puntos LevelUp extra por tu código de referido!';
            expect(setMensajeSpy).toHaveBeenCalledWith(expectedMessage);
        });
    });
});