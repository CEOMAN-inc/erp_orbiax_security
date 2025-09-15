# ---- Etapa 1: Construcción (Build) ----
# Usamos una imagen oficial de Node.js como base para construir la aplicación
FROM node:18-alpine as builder

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instalamos las dependencias del proyecto
RUN npm install

# Copiamos el resto de los archivos del proyecto al contenedor
COPY . .

# Construimos la aplicación para producción. Esto generará la carpeta /app/build
RUN npm run build

# ---- Etapa 2: Servidor (Serve) ----
# Usamos una imagen de Nginx súper ligera para servir los archivos estáticos
FROM nginx:1.25-alpine

# Copiamos los archivos estáticos construidos en la etapa anterior a la carpeta de Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Copiamos nuestro archivo de configuración personalizado para Nginx
# Este archivo es clave para que el enrutamiento de React funcione correctamente
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponemos el puerto 80, que es el puerto por defecto de Nginx
EXPOSE 80

# El comando por defecto para iniciar Nginx cuando el contenedor se inicie
CMD ["nginx", "-g", "daemon off;"]