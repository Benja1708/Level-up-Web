
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Carrito from '../components/Carrito';
describe('Carrito Component', () => {
    let component;

    beforeEach(() => {
        // Configuración del mock
        it('debería mostrar el título del carrito', () => {
    render(<Carrito carrito={[]} onModificarCantidad={() => {}} />);
    expect(screen.getByText('🛒 Carrito de Compras')).toBeInTheDocument();
  });
        component = new Carrito();
    });

    it('debería crear el componente', () => {
        expect(component).toBeTruthy();
    });

    it('debería agregar un item al carrito', () => {
        const item = { id: 1, nombre: 'Producto 1', precio: 100 };
        component.agregarItem(item);
        expect(component.items.length).toBe(1);
        expect(component.items[0]).toEqual(item);
    });

    it('debería eliminar un item del carrito', () => {
        const item = { id: 1, nombre: 'Producto 1', precio: 100 };
        component.agregarItem(item);
        component.eliminarItem(item.id);
        expect(component.items.length).toBe(0);
    });

    it('debería calcular el total correctamente', () => {
        const item1 = { id: 1, nombre: 'Producto 1', precio: 100 };
        const item2 = { id: 2, nombre: 'Producto 2', precio: 200 };
        component.agregarItem(item1);
        component.agregarItem(item2);
        expect(component.calcularTotal()).toBe(300);
    });
});