import { PerfilUsuario } from '../components/PerfilUsuario';
import { createSpyObj } from 'jasmine-core';

describe('PerfilUsuario Component', () => {
    let component;
    let mockService;

    beforeEach(() => {
        mockService = createSpyObj('UserService', ['getUser']);
        component = new PerfilUsuario(mockService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call getUser on init', () => {
        component.ngOnInit();
        expect(mockService.getUser).toHaveBeenCalled();
    });

    it('should set user data correctly', () => {
        const userData = { name: 'Tomas', age: 30 };
        mockService.getUser.and.returnValue(userData);
        component.ngOnInit();
        expect(component.user).toEqual(userData);
    });
});