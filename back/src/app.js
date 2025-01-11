import express from 'express';
import cors from 'cors';
import { json } from 'express';
import palindromeRoutes from './routes/palindrome.js';
import { errorHandler } from './middlewares/errorMiddleware.js';

export const app = express();

app.use(json());
app.use(
  cors({
    origin: "https://challenge-palindrome.vercel.app", // URL de tu frontend en Netlify
    methods: ["GET", "POST", "DELETE"], // Métodos permitidos
    allowedHeaders: ["Content-Type"], // Headers permitidos
  })
);

// Ruta de prueba para verificar que el servidor esté funcionando.
app.get('/ping', (req, res) => {
    res.json({
      "message": 'pong',
    });
  });

// Rutas de la aplicación
app.use('/api', palindromeRoutes);

// Middleware para manejar errores
app.use(errorHandler);
