import express from "express";
import nodemailer from "nodemailer";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const { email, message } = req.body;
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  if (!email || !message) {
     res.status(400).json({ error: "Faltan datos" });
  }

  // ⏱️ 5 minutos de cooldown por IP
  const haceCincoMinutos = new Date(Date.now() - 5 * 60 * 1000);

  const mensajesRecientes = await prisma.mensaje.findFirst({
    where: {
      ip: String(ip),
      enviadoEn: {
        gte: haceCincoMinutos,
      },
    },
  });

  if (mensajesRecientes) {
     res.status(429).json({
      error: "Solo puedes enviar un mensaje cada 5 minutos. Espera un poco.",
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Web The Crooks" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `Mensaje nuevo de ${email}`,
      text: message,
    });

    // Guardar mensaje (opcional)
    await prisma.mensaje.create({
      data: {
        email,
        contenido: message,
        ip: String(ip),
      },
    });

     res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error al enviar correo:", err);
     res.status(500).json({ error: "No se pudo enviar el correo" });
  }
});

export default router;
