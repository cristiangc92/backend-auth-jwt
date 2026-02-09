# 🔐 Backend Auth con JWT

Backend desarrollado en **Node.js + Express** que implementa un sistema de autenticación utilizando **JWT (JSON Web Tokens)** y **PostgreSQL**.  
El proyecto incluye registro de usuarios con contraseñas hasheadas y está preparado para escalar a funcionalidades más avanzadas.

---

## 🚀 Tecnologías utilizadas

- Node.js
- Express
- PostgreSQL
- pg
- bcrypt
- jsonwebtoken
- dotenv
- nodemon

---

## 📦 Instalación

Clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/backend-auth-jwt.git
cd backend-auth-jwt
```

Instalar dependencias:
```bash
npm install
```

## 🔑 Variables de entorno
Crear un archivo .env en la raíz del proyecto con las siguientes variables:

```bash
PORT=3000
DATABASE_URL=postgres://usuario:password@localhost:5432/auth_db
JWT_SECRET=super_secret_key
```

⚠️ El archivo .env no debe subirse al repositorio.

## ▶️ Ejecución del proyecto
Modo desarrollo:

```bash
npm run dev
``` 

Modo producción:

```bash
npm start
```

Servidor corriendo en:

```bash
http://localhost:3000
```

## 📌 Endpoints disponibles
### 📝 Registro de usuario
```bash
POST /api/auth/register
```

Body (JSON):
```json
{
  "email": "usuario@email.com",
  "password": "123456"
}
```

Respuesta exitosa:
```json
{
  "message": "Usuario registrado correctamente",
  "user": {
    "id": 1,
    "email": "usuario@email.com"
  }
}
```

## 🗂️ Estructura del proyecto
```bash
src/
│
├── app.js
├── server.js
│
├── db/
│   └── index.js
│
├── controllers/
│   └── auth.controller.js
│
├── routes/
│   └── auth.routes.js
│
└── middlewares/
```

## 🔒 Seguridad implementada
- Contraseñas hasheadas con bcrypt
- Validaciones básicas de datos
- Uso de variables de entorno
- Arquitectura modular (routes / controllers / db)

## 👨‍💻 Autor
Cristian Gabriel Cacciolatti
Backend Developer

