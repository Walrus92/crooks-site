// routes/contactMessages.ts
import express from "express";
import { PrismaClient } from "@prisma/client";
import { authenticateAdmin } from "../middlewares/authMiddleware";

const router = express.Router();
const prisma = new PrismaClient();

// Ruta para obtener todos los mensajes
router.get("/messages", authenticateAdmin, async (_req, res) => {
  try {
    const mensajes = await prisma.mensaje.findMany({
      orderBy: { enviadoEn: "desc" }, // los más recientes primero
    });
    res.json(mensajes);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener mensajes" });
  }
});

export default router;
