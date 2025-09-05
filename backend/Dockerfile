# ========= STAGE 1: BUILD =========
FROM node:22-alpine AS build
WORKDIR /app

RUN apk add --no-cache python3 make g++ 

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ========= STAGE 2: RUNTIME =========
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production

# Prisma en Alpine suele necesitar estas libs
RUN apk add --no-cache openssl libc6-compat

COPY package*.json ./
RUN npm ci --omit=dev

# Copiamos solo lo necesario
COPY prisma ./prisma
RUN npx prisma generate

COPY --from=build /app/dist ./dist

EXPOSE 3001
CMD ["node", "dist/server.js"]
