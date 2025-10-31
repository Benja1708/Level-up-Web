// Importamos el código que queremos probar. 
// Nota: En un entorno de prueba real (como Jest/Vitest), esto importaría el archivo TS/JSX.
// Aquí, para mantenerlo autocontenido, simularemos la importación.

// Simulamos los módulos de React y ReactDOM que tu código usa.
// Esto debe ejecutarse antes de importar el archivo main.tsx
const mockReact = {};
const mockReactDOM = {
    createRoot: jasmine.createSpy('createRoot').and.returnValue({
        render: jasmine.createSpy('render')
    })
};

// Simulamos la existencia del elemento DOM '#root'
document.body.innerHTML = '<div id="root"></div>';
const rootContainer = document.getElementById('root');

describe('main.tsx - Inicialización de la Aplicación', function() {
    
    // El beforeEach es donde ejecutamos el código de inicialización, 
    // simulando lo que hace tu archivo main.tsx
    beforeEach(function() {
        // Ejecución simulada de la lógica de main.tsx:
        // 1. Obtener el elemento 'root'
        const rootElement = document.getElementById('root');
        
        // 2. Renderizar la aplicación
        if (rootElement) {
            mockReactDOM.createRoot(rootElement).render(
                // Aquí va el JSX simulado (<React.StrictMode><App/></React.StrictMode>)
                // No necesitamos el contenido exacto, solo saber que se llama a render.
                'Some React Element' 
            );
        }
    });

    it('debería intentar obtener el contenedor DOM con ID "root"', function() {
        // Assert: Comprobamos si el contenedor existe. 
        // Aunque no es una función de Jasmine que lo llama, es una verificación del entorno.
        expect(rootContainer).not.toBeNull();
    });

    it('debería llamar a ReactDOM.createRoot con el contenedor #root', function() {
        // Assert: Verificamos que 'createRoot' fue llamado una vez
        expect(mockReactDOM.createRoot).toHaveBeenCalledTimes(1);

        // Assert: Verificamos que 'createRoot' fue llamado con el elemento DOM correcto
        expect(mockReactDOM.createRoot).toHaveBeenCalledWith(rootContainer);
    });

    it('debería llamar al método render() de la raíz creada', function() {
        // ARRANCAR (Arrange): Obtenemos la instancia de la raíz que devolvió createRoot
        const rootInstance = mockReactDOM.createRoot.calls.mostRecent().returnValue;

        // AFIRMAR (Assert): Verificamos que el método render fue invocado
        expect(rootInstance.render).toHaveBeenCalledTimes(1);
    });
});
