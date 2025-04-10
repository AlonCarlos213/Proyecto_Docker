# Imagen base oficial de Node.js
FROM node:latest

# Crear directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos de dependencias y luego instalar
COPY package*.json ./
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto que usa Express
EXPOSE 9000

# Comando para iniciar la aplicación
CMD ["node", "app.js"]
