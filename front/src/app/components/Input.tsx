/**
 * Input Component
 * Permite al usuario ingresar una palabra o frase, valida la entrada para asegurarse de que solo contenga letras, números y espacios.
 * Envia la entrada al servidor para verificar si es un palíndromo y maneja errores de validación.
 */

'use client';

import { useState } from 'react';

// Definimos los tipos de las props
interface InputProps {
  onSubmit: (data: { text: string; isPalindrome: boolean }) => void;
}

const Input: React.FC<InputProps> = ({ onSubmit }) => {
  const [input, setInput] = useState<string>(''); // Almacena el valor del input
  const [error, setError] = useState<string | null>(null); // Almacena mensajes de error

  // Maneja los cambios en el input, permitiendo solo letras, números y espacios
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Filtra caracteres no alfanuméricos, pero permite acentos y caracteres con tilde
    const sanitizedValue = value.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚ\s]/g, ''); 
  
    setInput(sanitizedValue);
  
    
    // Si se eliminaron caracteres no válidos, muestra un error
    if (value !== sanitizedValue) {
      setError('Solo se permiten letras, números y espacios.');
    } else {
      setError(null); // Si no hay caracteres no permitidos, limpia el error
    }
  };

  // Maneja el submit del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Resetea cualquier error previo

    // Verifica si el input no está vacío
    if (input.trim() === '') {
      setError('El campo no puede estar vacío.');
      return;
    }

    try {
      // Envia la solicitud al servidor
      const response = await fetch('https://challenge-palindrome.onrender.com/api/palindrome', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      });

      // Si la respuesta no es exitosa, lanza un error
      if (!response.ok) {
        throw new Error('Error al verificar el palíndromo');
      }

      // Si todo va bien, obtiene los datos y los pasa al padre
      const data = await response.json();
      onSubmit(data);

      // Limpia el campo de input después de enviar
      setInput('');
    } catch (err: any) {
      // Maneja cualquier error durante la solicitud
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <div className="flex flex-col sm:flex-row items-center">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Ingresa una palabra o frase"
          className="w-full sm:w-72 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="mt-4 sm:mt-0 sm:ml-4 w-full sm:w-auto bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Verificar
        </button>
      </div>

      {/* Muestra el error si hay alguno */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </form>
  );
};

export default Input;




