import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth';
import conciertosRoutes from './routes/conciertos';
import multimediaRoutes from './routes/multimedia';
import contactoRouter from "./routes/contacto";
import { log } from './utils/logger';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde /uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/conciertos', conciertosRoutes);
app.use('/api/multimedia', multimediaRoutes);
app.use("/api/contact", contactoRouter);

// Inicio del servidor
app.listen(PORT, () => {
  log(`Servidor corriendo en ${PORT}`);
});
