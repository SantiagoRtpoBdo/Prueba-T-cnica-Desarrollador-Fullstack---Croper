# Prueba Técnica - Fullstack (NestJS + React)

Este proyecto consiste en una aplicación **CRUD de productos**, con autenticación básica y un frontend en React.

## Tecnologías
- Backend: NestJS + MongoDB + JWT
- Frontend: React + Vite + Redux Toolkit + TailwindCSS
- Autenticación: JWT
- Documentación API: Swagger

---

## Requisitos previos
- Node.js (v18+)
- MongoDB en ejecución (local o en la nube)
- npm

---

## Backend (NestJS)

1. Clonar el repo y entrar a la carpeta:
    cd backend
2. Instalar dependencias:
    npm install
3. Crear un archivo .env con:
    MONGO_URI= stringconexionmongodb
    JWT_SECRET= super_secret_key
    JWT_EXPIRES= 1h
4. Ejecutar el servidor:
    npm run start:dev
5. Swagger disponible en: http://localhost:3000/api
    Credenciales iniciales:
        usuario: admin
        contraseña: 123456

---

## Frontend (React)

1. Entrar a la carpeta:
    cd frontend
2. Instalar dependencias:
    npm install
3. Ejecutar el frontend:
    npm run dev

---

Nota: Este proyecto está dividido en backend y frontend.
Para probarlo, se debe iniciar primero el backend (npm run start:dev, en la carpeta backend) y luego el frontend (npm run dev, en la carpeta frontend).