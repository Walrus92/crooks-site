# The Crooks - Web + Admin Panel + Backend

Este proyecto contiene:

- 🌐 Frontend público en `http://localhost:3001`
- 🛠️ Admin panel en `http://localhost:3002`
- 🔙 Backend en `http://localhost:3000`, usando SQLite y Prisma

---

## 🚀 Cómo arrancar

1. Clona el repo:
   ```bash
   git clone https://github.com/Walrus92/the-crooks.git
   cd the-crooks


2. Lanza todo con Docker:
   ```bash
   docker compose up --build

3. Accede a:

http://localhost:3001 — Frontend público

http://localhost:3002 — Panel de administración

http://localhost:3000/api — API REST del backend

🐳 Docker
Este proyecto usa Docker con tres contenedores:

crooks-backend: API con Express, SQLite y Prisma.

crooks-frontend: Web pública, empaquetada con Vite y servida con Nginx.

crooks-admin: Panel de administración, también con Vite + Nginx.

El backend usa un volumen persistente para mantener la base de datos SQLite.

