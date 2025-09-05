# ========= STAGE 1: BUILD =========
FROM node:22-alpine AS build
WORKDIR /app

# Herramientas para compilar deps nativas (bcrypt, etc.)
RUN apk add --no-cache python3 make g++

# Instala deps con lockfile
COPY package*.json ./
RUN npm ci

# Copia código y compila TS
COPY . .
RUN npm run build

# Genera cliente de Prisma
RUN npx prisma generate

# Quita devDependencies para dejar node_modules "limpio" de prod
RUN npm prune --omit=dev

# ========= STAGE 2: RUNTIME =========
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production

# Prisma en Alpine necesita estas libs
RUN apk add --no-cache openssl libc6-compat

# Copiamos solo lo necesario desde build
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/dist ./dist

EXPOSE 3001
CMD ["node", "dist/server.js"]
