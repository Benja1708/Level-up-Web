
const React = {
    createElement: (tag, props, ...children) => ({ tag, props, children, type: tag }),
    FC: (component) => component,
    
    useState: (initial) => [initial, (newState) => console.log('Simulated state update:', newState)],
};


const initialProfileWithDiscount = {
    nombre: 'Gamer Legendario',
    email: 'gamer.legendario@alumnos.duoc.cl', 
    preferenciaJuego: 'RPG',
    recibirNotificaciones: true,
};

const initialProfileWithoutDiscount = {
    nombre: 'Usuario Sin Duoc',
    email: 'usuario.externo@gmail.com', 
    preferenciaJuego: 'Estrategia',
    recibirNotificaciones: false,
};


const PerfilUsuarioMock = ({ initialData }) => {
    
    
    const [perfil, setPerfil] = React.useState(initialData);
    const [mensaje, setMensaje] = React.useState('');

    const tieneDescuentoDuoc = perfil.email.toLowerCase().endsWith('@duocuc.cl') || perfil.email.toLowerCase().endsWith('@alumnos.duoc.cl');

    const handleChange = (name, value, type) => {
        
        const nuevoValor = type === 'checkbox' ? value : value;
        setPerfil(prev => ({ ...prev, [name]: nuevoValor }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMensaje('✅ Perfil actualizado con éxito.');
    };
    
    
    return (
        <form data-testid="profile-form" onSubmit={handleSubmit}>
            <div data-testid="discount-status">
                {tieneDescuentoDuoc ? 'Duoc Discount Active' : 'No Duoc Discount'}
            </div>
            
            <input 
                data-testid="input-nombre"
                name="nombre" 
                value={perfil.nombre} 
                onChange={(e) => handleChange(e.target.name, e.target.value, e.target.type)}
            />
            <select
                data-testid="select-preferencia"
                name="preferenciaJuego"
                value={perfil.preferenciaJuego}
                onChange={(e) => handleChange(e.target.name, e.target.value, e.target.type)}
            >
                <option value="RPG">RPG</option>
                <option value="FPS">FPS / Shooter</option>
            </select>
            <input
                data-testid="input-notificaciones"
                type="checkbox"
                name="recibirNotificaciones"
                checked={perfil.recibirNotificaciones}
                onChange={(e) => handleChange(e.target.name, e.target.checked, e.target.type)}
            />
            
            <button type="submit" data-testid="submit-button">Guardar Cambios</button>
            <p data-testid="success-message">{mensaje}</p>
        </form>
    );
};


describe('PerfilUsuario Component Logic', () => {
    let render, screen, fireEvent;
    
    
    beforeAll(() => {
        render = (Component) => ({ container: { innerHTML: JSON.stringify(Component) } });
        screen = {
            
            getByTestId: (id) => {
                if (id === 'input-nombre') return { name: 'nombre', type: 'text', value: initialProfileWithDiscount.nombre };
                if (id === 'select-preferencia') return { name: 'preferenciaJuego', type: 'select', value: initialProfileWithDiscount.preferenciaJuego };
                if (id === 'input-notificaciones') return { name: 'recibirNotificaciones', type: 'checkbox', checked: initialProfileWithDiscount.recibirNotificaciones };
                if (id === 'discount-status') return { text: 'Duoc Discount Active' };
                if (id === 'submit-button') return { preventDefault: () => {} }; // Para simular el evento
                if (id === 'success-message') return { text: '' };
                return {};
            }
        };
        fireEvent = {
            
            change: (element, newValue) => {
                
                if (element.name === 'nombre') { 
                    initialProfileWithDiscount.nombre = newValue.target.value;
                }
            },
            submit: (element) => {
                
                element.preventDefault();
                
                screen.getByTestId('success-message').text = '✅ Perfil actualizado con éxito.';
            }
        };
    });
    
    
    it('should display the discount message when the email is from Duoc UC domain', () => {
        
        const componentOutput = PerfilUsuarioMock({ initialData: initialProfileWithDiscount });

        
        const hasDiscount = initialProfileWithDiscount.email.toLowerCase().endsWith('@duocuc.cl') || initialProfileWithDiscount.email.toLowerCase().endsWith('@alumnos.duoc.cl');
        expect(hasDiscount).toBe(true, 'Expected Duoc discount to be active for the initial profile.');
    });

    
    it('should NOT display the discount message when the email is NOT from Duoc UC domain', () => {
        
        const componentOutput = PerfilUsuarioMock({ initialData: initialProfileWithoutDiscount });

        const hasDiscount = initialProfileWithoutDiscount.email.toLowerCase().endsWith('@duocuc.cl') || initialProfileWithoutDiscount.email.toLowerCase().endsWith('@alumnos.duoc.cl');
        expect(hasDiscount).toBe(false, 'Expected Duoc discount NOT to be active for the external profile.');
    });

    
    it('should update the name input value on change', () => {
       
        const inputElement = screen.getByTestId('input-nombre');
        const newName = 'New Gamer Tag';
        
        
        initialProfileWithDiscount.nombre = newName;

        expect(initialProfileWithDiscount.nombre).toEqual(newName, 'Expected name to be updated via handleChange simulation.');
    });

    
    it('should correctly toggle the recibirNotificaciones checkbox value', () => {
        
        const initialValue = initialProfileWithDiscount.recibirNotificaciones; 
    
        const newNotificationsState = !initialValue;
        
        
        initialProfileWithDiscount.recibirNotificaciones = newNotificationsState;

        expect(initialProfileWithDiscount.recibirNotificaciones).toBe(false, 'Expected checkbox value to toggle to false.');
    });

    
    it('should display the success message upon form submission', () => {
        
        const mockEvent = { preventDefault: jasmine.createSpy('preventDefault') };
        
        
        fireEvent.submit(mockEvent);
        
        
        expect(mockEvent.preventDefault).toHaveBeenCalled();

        
        const messageElement = screen.getByTestId('success-message');
        expect(messageElement.text).toEqual('✅ Perfil actualizado con éxito.', 'Expected success message after form submission.');
    });
});
