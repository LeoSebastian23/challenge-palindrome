/**
 * HistoryList Component
 * Muestra el historial de palabras y frases verificadas, indicando si son palíndromos o no.
 * Muestra un mensaje de carga o cuando el historial esta vacio.
 */

'use client';

import { useState, useEffect } from 'react';

interface HistoryItem {
  text: string;
  isPalindrome: boolean;
}

interface HistoryListProps {
  history: HistoryItem[];
  onDelete: (text: string) => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ history, onDelete }) => {
  const [loading, setLoading] = useState(true); // Controla el estado de carga

  useEffect(() => {
    // Simulamos la carga con un pequeño retraso o solo cambiamos el estado cuando el historial cambia
    setLoading(false);
  }, [history]);

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">Historial</h3>

      {/* Mostrar mensaje si está cargando o no hay historial */}
      {loading || history.length === 0 ? (
        <p className="text-gray-600">
          {loading ? 'Cargando historial...' : 'Cada palabra o frase se mostrara en el historial.'}
        </p>
      ) : (
        <ul className="space-y-3">
          {/* Itera sobre el historial y muestra cada entrada */}
          {history.map((item, index) => (
            <li
              key={index}
              className={`bg-white p-4 rounded-lg shadow-md border-l-4 break-words ${
                item.isPalindrome ? 'border-green-500' : 'border-red-500'
              }`}
            >
              <strong className="text-lg font-bold">{item.text}</strong> -{' '}
              <span className={item.isPalindrome ? 'text-green-500' : 'text-red-500'}>
                {item.isPalindrome ? 'Es un palíndromo' : 'No es un palíndromo'}
              </span>
              <button
                onClick={() => onDelete(item.text)}
                className="ml-4 bg-red-500 hover:bg-red-700 text-white p-1 rounded-md"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistoryList;



