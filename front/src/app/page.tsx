/**
 * Home Component
 * Página principal que permite ingresar una frase, verificar si es un palíndromo,
 * y muestra el historial de verificaciones obtenidas del backend.
 */

"use client";

import { useState, useEffect } from "react";
import Input from "@/app/components/Input";
import HistoryList from "@/app/components/HistoryList";

type Result = {
  text: string;
  isPalindrome: boolean;
};

type HistoryItem = {
  text: string;
  isPalindrome: boolean;
}

const Home = () => {
  
  const [result, setResult] = useState<Result | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Cargar historial desde el backend
  const fetchHistory = async () => {
    try {
      const res = await fetch("https://challenge-palindrome.onrender.com/api/history");
      if (res.ok) setHistory(await res.json());
      else console.error("Error al obtener el historial");
    } catch (err) {
      console.error("Error al cargar el historial:", err);
    }
  };

  // Llama a fetchHistory una sola vez al montar el componente
  useEffect(() => {
    fetchHistory();
  }, []);

  // Maneja el resultado del input y actualiza el historial
  const handleResultSubmit = (data: Result | null) => {
    setResult(data);
    fetchHistory();
  };

  const handleDeleteAll = () => {
    fetch("https://challenge-palindrome.onrender.com/api/history", {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setHistory([]); // Limpiar el historial en el frontend
          alert("Historial eliminado con éxito");
        } else {
          return res.json().then((data) => alert(`Error: ${data.message}`));
        }
      })
      .catch((err) => alert("Error al eliminar el historial: " + err));
  };

    const handleDeleteItem = async (text: string) => {
      try {
        const res = await fetch(`https://challenge-palindrome.onrender.com/api/history/${text}`, {
          method: "DELETE",
        });
        if (res.ok) {
          setHistory((prevHistory) =>
            prevHistory.filter((item) => item.text !== text)
          );
          alert(`Ítem con el texto "${text}" eliminado con éxito`);
        } else {
          alert("Error al eliminar el ítem");
        }
      } catch (err) {
        alert("Error al eliminar el ítem");
      }
    };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-50 rounded-lg shadow-lg mt-6 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">
        Verificador de Palíndromos
      </h1>

      {/* Componente de entrada */}
      <Input onSubmit={handleResultSubmit} />

      {/* Muestra el resultado actual si existe */}
      {result && (
        <div className="w-full mt-4 p-4 text-center bg-blue-50 rounded-lg shadow-md border border-gray-300">
          <h3 className="text-2xl font-semibold mb-2">Resultado</h3>
          <p className="text-lg break-words">
            <span className="font-bold text-gray-700">{result.text}</span> -{" "}
            <span
              className={`${
                result.isPalindrome ? "text-green-500" : "text-red-500"
              } font-medium`}
            >
              {result.isPalindrome ? "Es un palíndromo" : "No es un palíndromo"}
            </span>
          </p>
        </div>
      )}
      {/* Botón para eliminar todo el historial */}
      <button
        onClick={handleDeleteAll}
        className="bg-red-700 text-white p-2 rounded-lg mt-4 hover:bg-red-600"
      >
        Eliminar todo el historial
      </button>

      {/* Componente del historial */}
      <div className="w-full">
        <HistoryList history={history} onDelete={handleDeleteItem}  />
      </div>
    </div>
  );
};

export default Home;
