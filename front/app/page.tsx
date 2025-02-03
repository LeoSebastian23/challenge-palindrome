"use client";

import { useState, useEffect } from "react";
import Input from "../components/Input";
import HistoryList from "../components/HistoryList";

type Result = {
  text: string;
  isPalindrome: boolean;
};

type HistoryItem = {
  text: string;
  isPalindrome: boolean;
};

const Home = () => {
  const [result, setResult] = useState<Result | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  // Cargar historial desde el backend con indicador de carga
  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://challenge-palindrome.onrender.com/api/history");
      if (res.ok) setHistory(await res.json());
      else console.error("Error al obtener el historial");
    } catch (err) {
      console.error("Error al cargar el historial:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // Maneja el resultado del input y actualiza el historial
  const handleResultSubmit = (data: Result | null) => {
    setResult(data);
    fetchHistory();
  };

  const handleDeleteAll = () => {
    setLoadingDelete(true);
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
      .catch((err) => alert("Error al eliminar el historial: " + err))
      .finally(() => setLoadingDelete(false));
  };

  const handleDeleteItem = async (text: string) => {
    setLoadingDelete(true);
    try {
      const res = await fetch(`https://challenge-palindrome.onrender.com/api/history/${text}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setHistory((prevHistory) => prevHistory.filter((item) => item.text !== text));
        alert(`Ítem con el texto "${text}" eliminado con éxito`);
      } else {
        alert("Error al eliminar el ítem");
      }
    } catch (err) {
      alert("Error al eliminar el ítem");
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-slate-800 rounded-lg shadow-lg mt-6 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Verificador de Palíndromos
      </h1>

      {/* Componente de entrada */}
      <Input onSubmit={handleResultSubmit} />

      {/* Muestra el resultado actual si existe */}
      {result && (
        <div className="w-full mt-4 p-4 text-center bg-slate-900 rounded-lg shadow-md border border-gray-900">
          <h3 className="text-2xl font-semibold mb-2">Resultado:</h3>
          <p className="text-lg break-words">
            <span className="font-bold text-neutral-300">{result.text}</span> -{" "}
            <span className={`font-medium ${result.isPalindrome ? "text-green-500" : "text-red-500"}`}>
              {result.isPalindrome ? "Es un palíndromo" : "No es un palíndromo"}
            </span>
          </p>
        </div>
      )}

      {/* Botón para eliminar todo el historial con loading */}
      <button
        onClick={handleDeleteAll}
        disabled={loadingDelete}
        className={`bg-red-700 text-white p-2 rounded-lg mt-4 hover:bg-red-600 flex items-center ${
          loadingDelete ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loadingDelete ? (
          <>
            <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            Eliminando...
          </>
        ) : (
          "Eliminar todo el historial"
        )}
      </button>

      {/* Sección del historial con indicador de carga */}
      <div className="w-full mt-4">
        {loading ? (
          <div className="text-center text-gray-300">
            <p>⏳ Esperando conexión con el servidor...</p>
            <p className="text-sm italic text-gray-400">Al estar desplegado en un servidor gratuito, puede tardar un momento</p>
            <div className="mt-2 flex justify-center">
              <svg className="animate-spin h-6 w-6 text-gray-300" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
            </div>
          </div>
        ) : (
          <HistoryList history={history} onDelete={handleDeleteItem} />
        )}
      </div>
    </div>
  );
};

export default Home;

