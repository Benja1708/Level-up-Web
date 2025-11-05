import { Registro } from '../components/Registro';
import { createSpyObj } from 'jasmine-core';

describe('Registro Component', () => {
    let component;
    let mockService;

    beforeEach(() => {
        mockService = createSpyObj('UserService', ['registerUser']);
        component = new Registro(mockService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call registerUser on submit', () => {
        component.onSubmit();
        expect(mockService.registerUser).toHaveBeenCalled();
    });

    it('should handle registration success', () => {
        mockService.registerUser.and.returnValue(Promise.resolve({ success: true }));
        component.onSubmit();
        // Simulate async behavior
        component.registrationSuccess.then(response => {
            expect(response.success).toBeTrue();
        });
    });
});