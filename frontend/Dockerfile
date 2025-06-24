# Usa la imagen oficial de nginx ligera
FROM nginx:alpine

# Copia los archivos estáticos generados por vite al directorio que nginx sirve
COPY dist /usr/share/nginx/html

# Exponemos el puerto 80 para que sea accesible fuera del contenedor
EXPOSE 80

# Comando para arrancar nginx en primer plano (modo producción)
CMD ["nginx", "-g", "daemon off;"]
