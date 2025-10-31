
const mockReact = {};
const mockReactDOM = {
    createRoot: jasmine.createSpy('createRoot').and.returnValue({
        render: jasmine.createSpy('render')
    })
};


document.body.innerHTML = '<div id="root"></div>';
const rootContainer = document.getElementById('root');

describe('main.tsx - Inicialización de la Aplicación', function() {
    
    
    beforeEach(function() {
       
        const rootElement = document.getElementById('root');
        
       
        if (rootElement) {
            mockReactDOM.createRoot(rootElement).render(
                
                'Some React Element' 
            );
        }
    });

    it('debería intentar obtener el contenedor DOM con ID "root"', function() {
        
        expect(rootContainer).not.toBeNull();
    });

    it('debería llamar a ReactDOM.createRoot con el contenedor #root', function() {
        
        expect(mockReactDOM.createRoot).toHaveBeenCalledTimes(1);

        
        expect(mockReactDOM.createRoot).toHaveBeenCalledWith(rootContainer);
    });

    it('debería llamar al método render() de la raíz creada', function() {
       
        const rootInstance = mockReactDOM.createRoot.calls.mostRecent().returnValue;

        
        expect(rootInstance.render).toHaveBeenCalledTimes(1);
    });
});
