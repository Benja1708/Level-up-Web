import { App } from '../components/App';
import { createSpyObj } from 'jasmine-core';

describe('App Component', () => {
    let component;
    let mockService;

    beforeEach(() => {
        mockService = createSpyObj('SomeService', ['someMethod']);
        component = new App(mockService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call someMethod on init', () => {
        component.ngOnInit();
        expect(mockService.someMethod).toHaveBeenCalled();
    });

    it('should set data correctly', () => {
        const mockData = { key: 'value' };
        mockService.someMethod.and.returnValue(mockData);
        component.ngOnInit();
        expect(component.data).toEqual(mockData);
    });
});