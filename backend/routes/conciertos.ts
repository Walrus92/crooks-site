import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateAdmin } from '../middlewares/authMiddleware';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (_req, res) => {
  const conciertos = await prisma.concierto.findMany({
    orderBy: { fecha: 'asc' },
  });
  res.json(conciertos);
});

router.post('/', authenticateAdmin, async (req, res) => {
  const { fecha, lugar, ciudad, descripcion } = req.body;
  if (!fecha || !lugar || !ciudad) {
    res.status(400).json({ error: 'Faltan datos obligatorios' });
  } else {
    try {
      const nuevo = await prisma.concierto.create({
        data: {
          fecha: new Date(fecha),
          lugar,
          ciudad,
          descripcion,
        },
      });
      res.status(201).json(nuevo);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear concierto' });
    }
  }
});

router.put('/:id', authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  const { fecha, lugar, ciudad, descripcion } = req.body;
  if (!id) {
    res.status(400).json({ error: 'ID requerido' });
  } else {
    try {
      const actualizado = await prisma.concierto.update({
        where: { id: Number(id) },
        data: {
          fecha: new Date(fecha),
          lugar,
          ciudad,
          descripcion,
        },
      });
      res.json(actualizado);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar concierto' });
    }
  }
});

router.delete('/:id', authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ error: 'ID requerido' });
  } else {
    try {
      await prisma.concierto.delete({
        where: { id: Number(id) },
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error al borrar concierto' });
    }
  }
});

export default router;
