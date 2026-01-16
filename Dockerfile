# Imagen base (Node.js versión 18 en Alpine Linux - Versión ligera)
FROM node:18-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Instalar dependencias del sistema necesarias para la construcción
# (python3 y make g++ son a veces necesarios para compilar módulos nativos como node-gyp)
RUN apk add --no-cache python3 make g++

# Copiar archivos de definición de paquetes
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependencias de Node
RUN npm ci

# Copiar el código fuente completo
COPY . .

# Generar el Cliente de Prisma (Base de datos)
RUN npx prisma generate

# Construir la aplicación para producción
RUN npm run build

# Exponer el puerto 3000
EXPOSE 3000

# Iniciar la aplicación
CMD ["npm", "start"]
