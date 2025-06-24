import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
const JWT_EXPIRES_IN = '2h';

// Registro
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ error: 'Faltan datos' });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      await prisma.user.create({
        data: { username, password: hashedPassword, role: 'admin' },
      });
      res.status(201).json({ message: 'Usuario creado' });
    } catch (error) {
      res.status(400).json({ error: 'Usuario ya existe o error' });
    }
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({ where: { username } });

  if (!user) {
    res.status(401).json({ error: 'Credenciales inválidas' });
  } else {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Credenciales inválidas' });
    } else {
      const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      });
      res.json({ token });
    }
  }
});

export default router;
