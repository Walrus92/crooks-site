import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';
import { authenticateAdmin } from '../middlewares/authMiddleware';

const router = express.Router();
const prisma = new PrismaClient();

// Configuración de multer
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (_req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueName + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.get('/', async (_req, res) => {
  try {
    const archivos = await prisma.multimedia.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(archivos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener multimedia' });
  }
});

router.post('/', authenticateAdmin, upload.array('archivo'), async (req, res) => {
  const archivos = req.files as Express.Multer.File[];
  if (!archivos || archivos.length === 0) {
    res.status(400).json({ error: 'No se subió ningún archivo' });
  } else {

    try {
      const nuevos = await Promise.all(
        archivos.map(async (archivo: { filename: any; mimetype: any; path: any; }) => {
          await prisma.multimedia.create({
            data: {
              filename: archivo.filename,
              mimetype: archivo.mimetype,
              path: archivo.path,
            },
          });
        })
      );
      res.status(201).json(nuevos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al subir multimedia' });
    }
  }
});


router.delete('/:id', authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ error: 'ID requerido' });
  } else {
    try {
      const multimedia = await prisma.multimedia.findUnique({ where: { id: Number(id) } });
      if (!multimedia) {
        res.status(404).json({ error: 'Multimedia no encontrada' });
      } else {
        const filePath = path.join('uploads', multimedia.filename);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error eliminando archivo físico:', err);
          }
        });

        await prisma.multimedia.delete({ where: { id: Number(id) } });
        res.status(204).send();
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al borrar multimedia' });
    }
  }
});

export default router;
