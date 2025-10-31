// __tests__/Registro.spec.tsx o Registro.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Registro from './Registro'; // Importación del componente en la misma carpeta// Helper para calcular una fecha de nacimiento válida (mayor de 18)
// Calcula la fecha de hace 19 años
const getValidBirthDate = (): string => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 19);
  // Formato YYYY-MM-DD para el input type="date"
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Helper para calcular una fecha de nacimiento NO válida (menor de 18)
// Calcula la fecha de hace 17 años
const getInvalidBirthDate = (): string => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 17);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

  describe('Registro', () => {
  // Configuración antes de cada prueba
  beforeEach(() => {
    // Renderizamos el componente antes de cada prueba (similar a setUp en otras librerías)
    render(<Registro />);
  });

  // --- Pruebas de Renderizado e Inicialización ---
  it('1. El componente debe renderizar correctamente y mostrar el título', () => {
    // screen.getByText busca elementos por su texto.
    expect(screen.getByText('Únete a Level-Up Gamer')).toBeInTheDocument();
  });

  // --- Pruebas de Lógica de Formulario ---
  it('2. El estado del input de Nombre debe actualizarse correctamente', () => {
    const nameInput = screen.getByPlaceholderText('Nombre Completo') as HTMLInputElement;
    const testName = 'Alice Smith';

    // Disparamos un evento de cambio
    fireEvent.change(nameInput, { target: { value: testName } });

    // Verificamos que el valor del input haya cambiado
    expect(nameInput.value).toBe(testName);
  });

  it('3. Debe mostrar el mensaje de descuento para correos @duocuc.cl', () => {
    const emailInput = screen.getByPlaceholderText(/correo@duocuc.cl/i);
    
    fireEvent.change(emailInput, { target: { value: 'test@duocuc.cl' } });

    // Verifica que el mensaje de descuento esté visible
    expect(screen.getByText(/¡Correo Duoc detectado! Descuento 20% de por vida aplicado./i)).toBeInTheDocument();
  });
  
  it('4. Debe mostrar el mensaje de descuento para correos @alumnos.duoc.cl', () => {
    const emailInput = screen.getByPlaceholderText(/correo@duocuc.cl/i);
    
    fireEvent.change(emailInput, { target: { value: 'test@alumnos.duoc.cl' } });

    // Verifica que el mensaje de descuento esté visible
    expect(screen.getByText(/¡Correo Duoc detectado! Descuento 20% de por vida aplicado./i)).toBeInTheDocument();
  });

  // --- Pruebas de Validación de Edad ---
  it('5. El registro debe FALLAR si el usuario es menor de 18 años', () => {
    const submitButton = screen.getByRole('button', { name: /Registrarse/i });
    
    // 1. Ingresar una fecha de nacimiento NO válida
    const dateInput = screen.getByLabelText('Fecha de Nacimiento:') as HTMLInputElement;
    fireEvent.change(dateInput, { target: { value: getInvalidBirthDate() } });

    // 2. Intentar enviar el formulario
    fireEvent.click(submitButton);

    // 3. Verificar el mensaje de error
    expect(screen.getByText(/❌ ¡Registro Fallido! Debes ser mayor de 18 años/i)).toBeInTheDocument();
  });
  
  it('6. El registro debe ser EXITOSO si el usuario es mayor de 18 años', () => {
    const submitButton = screen.getByRole('button', { name: /Registrarse/i });
    
    // 1. Llenar el formulario con datos válidos
    fireEvent.change(screen.getByPlaceholderText('Nombre Completo'), { target: { value: 'Valid User' } });
    fireEvent.change(screen.getByPlaceholderText(/correo@duocuc.cl/i), { target: { value: 'user@gmail.com' } });
    const dateInput = screen.getByLabelText('Fecha de Nacimiento:') as HTMLInputElement;
    fireEvent.change(dateInput, { target: { value: getValidBirthDate() } });

    // 2. Intentar enviar el formulario
    fireEvent.click(submitButton);

    // 3. Verificar el mensaje de éxito (con 100 puntos iniciales)
    // PUNTOS_INICIALES = 100
    expect(screen.getByText(/✅ ¡Registro Exitoso! Bienvenido\/a a la comunidad Level-Up Gamer. Has ganado 100 Puntos LevelUp./i)).toBeInTheDocument();
  });

  // --- Pruebas de Casos de Éxito Combinados ---
  it('7. El registro exitoso debe incluir puntos extra por código de referido', () => {
    const submitButton = screen.getByRole('button', { name: /Registrarse/i });
    
    // 1. Llenar el formulario
    fireEvent.change(screen.getByPlaceholderText('Nombre Completo'), { target: { value: 'Ref User' } });
    fireEvent.change(screen.getByPlaceholderText(/correo@duocuc.cl/i), { target: { value: 'user@hotmail.com' } });
    const dateInput = screen.getByLabelText('Fecha de Nacimiento:') as HTMLInputElement;
    fireEvent.change(dateInput, { target: { value: getValidBirthDate() } });
    
    // 2. Añadir código de referido
    fireEvent.change(screen.getByPlaceholderText('Código de Referido (Opcional)'), { target: { value: 'XYZ123' } });

    // 3. Enviar
    fireEvent.click(submitButton);

    // 4. Verificar mensaje (100 iniciales + 500 referido = 600)
    expect(screen.getByText(/Has ganado 600 Puntos LevelUp/i)).toBeInTheDocument();
    expect(screen.getByText(/¡Y 500 Puntos LevelUp extra por tu código de referido!/i)).toBeInTheDocument();
  });

  it('8. El registro debe incluir DESCUENTO Duoc y PUNTOS de Referido', () => {
    const submitButton = screen.getByRole('button', { name: /Registrarse/i });
    
    // 1. Llenar el formulario
    fireEvent.change(screen.getByPlaceholderText('Nombre Completo'), { target: { value: 'Duoc Ref User' } });
    fireEvent.change(screen.getByPlaceholderText(/correo@duocuc.cl/i), { target: { value: 'alguno@duocuc.cl' } });
    const dateInput = screen.getByLabelText('Fecha de Nacimiento:') as HTMLInputElement;
    fireEvent.change(dateInput, { target: { value: getValidBirthDate() } });
    
    // 2. Añadir código de referido
    fireEvent.change(screen.getByPlaceholderText('Código de Referido (Opcional)'), { target: { value: 'DUOCREF' } });

    // 3. Enviar
    fireEvent.click(submitButton);

    // 4. Verificar mensaje (Debe ser el de Duoc y tener 600 puntos)
    expect(screen.getByText(/🎉 ¡Registro Exitoso! Tienes 600 Puntos LevelUp y 20% de descuento por ser Duoc UC./i)).toBeInTheDocument();
    expect(screen.getByText(/¡Y 500 Puntos LevelUp extra por tu código de referido!/i)).toBeInTheDocument();
  });
});