import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const username = 'morci';          // tu usuario
  const password = 'morci';          // tu contraseña 

  const hashedPassword = await bcrypt.hash(password, 10);

  // Busca si ya existe
  const existing = await prisma.user.findUnique({ where: { username } });

  if (existing) {
    // Actualiza contraseña y rol
    await prisma.user.update({
      where: { username },
      data: { password: hashedPassword, role: 'ADMIN' },
    });
    console.log('Admin existente actualizado');
  } else {
    // Crea un admin nuevo
    const admin = await prisma.user.create({
      data: { username, password: hashedPassword, role: 'ADMIN' },
    });
    console.log('Admin creado:', admin);
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => { await prisma.$disconnect(); });
