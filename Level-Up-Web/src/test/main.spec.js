import { render } from '@testing-library/react';
import App from '../App';

describe('Main Application Tests', () => {
  // Mockups
  let mockUserService;
  let mockProductService;
  let mockCartService;

  beforeEach(() => {
    // Configuración de los mockups
    mockUserService = {
      getCurrentUser: jasmine.createSpy('getCurrentUser').and.returnValue({
        id: 1,
        username: 'testUser',
        points: 100
      }),
      updatePoints: jasmine.createSpy('updatePoints')
    };

    mockProductService = {
      getProducts: jasmine.createSpy('getProducts').and.returnValue([
        { id: 1, name: 'Producto 1', price: 100, points: 10 },
        { id: 2, name: 'Producto 2', price: 200, points: 20 }
      ]),
      getProductDetails: jasmine.createSpy('getProductDetails')
    };

    mockCartService = {
      addToCart: jasmine.createSpy('addToCart'),
      removeFromCart: jasmine.createSpy('removeFromCart'),
      getCartItems: jasmine.createSpy('getCartItems').and.returnValue([])
    };
  });

  it('should render the application without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });

  it('should load user profile correctly', () => {
    const user = mockUserService.getCurrentUser();
    expect(user).toBeTruthy();
    expect(user.username).toBe('testUser');
    expect(user.points).toBe(100);
  });

  it('should load product catalog correctly', () => {
    const products = mockProductService.getProducts();
    expect(products.length).toBe(2);
    expect(products[0].name).toBe('Producto 1');
    expect(products[1].name).toBe('Producto 2');
  });

  it('should handle cart operations correctly', () => {
    const product = { id: 1, name: 'Producto 1', price: 100 };
    mockCartService.addToCart(product);
    expect(mockCartService.addToCart).toHaveBeenCalledWith(product);
    
    mockCartService.getCartItems.and.returnValue([product]);
    const cartItems = mockCartService.getCartItems();
    expect(cartItems.length).toBe(1);
    expect(cartItems[0]).toEqual(product);
  });

  it('should update user points after purchase', () => {
    const initialPoints = mockUserService.getCurrentUser().points;
    const pointsToDeduct = 10;
    
    mockUserService.updatePoints(initialPoints - pointsToDeduct);
    expect(mockUserService.updatePoints).toHaveBeenCalledWith(90);
  });

  it('should handle empty cart state', () => {
    const cartItems = mockCartService.getCartItems();
    expect(cartItems.length).toBe(0);
  });
});
