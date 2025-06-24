# Etapa 1: Build con Node.js
FROM node:22-alpine AS build

WORKDIR /app

# Copiamos package.json y package-lock.json (o yarn.lock)
COPY package*.json ./

# Instalamos dependencias
RUN npm ci

# Copiamos el resto del código fuente
COPY . .

# Construimos la app (generará la carpeta dist)
RUN npm run build

# Etapa 2: Servir con nginx
FROM nginx:alpine

# Copiamos los archivos estáticos generados a la carpeta de nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponemos el puerto 80
EXPOSE 80

# Ejecutamos nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
