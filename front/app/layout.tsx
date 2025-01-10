/**
 * RootLayout Component
 * Define la estructura principal de la página, incluyendo el encabezado, el contenido principal y el pie de página.
 * Se encarga de aplicar el estilo global y de renderizar el contenido hijo (children) en el layout.
 */

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Challenge Palindrome",
  description: "Palindrome Checker",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <header className="bg-blue-500 p-4 shadow-md">
          <h1 className="text-2xl text-white font-bold text-center">
          Challenge Palindrome Checker
          </h1>
        </header>

        <main className="flex flex-col min-h-screen p-6 flex-grow">
          <div className="max-w-3xl mx-auto w-full">{children}</div>
        </main>

        <footer className="bg-blue-500 p-4 mt-auto">
          <p className="text-white text-center">
            Desarrollado por Leonardo Sebastian
          </p>
        </footer>
      </body>
    </html>
  );
}



