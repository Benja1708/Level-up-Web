import { PuntosLevelUp } from '../components/PuntosLevelUp';
import { createSpyObj } from 'jasmine-core';

describe('PuntosLevelUp Component', () => {
    let component;
    let mockService;

    beforeEach(() => {
        mockService = createSpyObj('PointsService', ['getPoints']);
        component = new PuntosLevelUp(mockService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call getPoints on init', () => {
        component.ngOnInit();
        expect(mockService.getPoints).toHaveBeenCalled();
    });

    it('should set points correctly', () => {
        const pointsData = { points: 100 };
        mockService.getPoints.and.returnValue(pointsData);
        component.ngOnInit();
        expect(component.points).toEqual(pointsData);
    });
});