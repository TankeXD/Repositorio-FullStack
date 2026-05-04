# 🚀 TaskFlow: Gestión de Proyectos Full-Stack

**TaskFlow** es una aplicación de gestión de proyectos estilo Kanban de alto rendimiento, diseñada para ser una pieza central en un portafolio profesional. Construida con las últimas tecnologías del ecosistema React, esta aplicación demuestra el dominio de arquitecturas Full-Stack modernas, persistencia de datos y diseño de interfaces premium.

![TaskFlow Preview](https://img.shields.io/badge/Status-Desarrollo_Completo-success?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-6.0-2D3748?style=for-the-badge&logo=prisma)

---

## ✨ Características Principales

- **Tablero Kanban Interactivo:** Interfaz dinámica con columnas para estados de tareas (Por Hacer, En Progreso, Completado).
- **Gestión Full-Stack:** Operaciones CRUD completas (Crear, Leer, Actualizar, Borrar) persistidas en base de datos.
- **Drag & Drop Nativo:** Movimiento fluido de tareas entre columnas mediante la API nativa de HTML5.
- **Diseño Premium (Glassmorphism):** Estética moderna con efectos de desenfoque, gradientes y un sistema de diseño basado en variables CSS puras.
- **Base de Datos Relacional:** Modelado de datos estructurado (Board -> Column -> Task) utilizando Prisma ORM.

---

## 🛠️ Stack Tecnológico

- **Frontend:** [Next.js](https://nextjs.org/) (App Router) y [React](https://reactjs.org/).
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) para robustez y seguridad de tipos.
- **Estilos:** Vanilla CSS con **CSS Modules** para evitar colisiones de estilos y mantener máxima flexibilidad.
- **Base de Datos:** [SQLite](https://www.sqlite.org/) (ideal para desarrollo local y despliegue rápido).
- **ORM:** [Prisma](https://www.prisma.io/) para el manejo tipado de la base de datos.

---

## 📁 Estructura del Proyecto

```text
├── prisma/               # Configuración de base de datos y esquema
│   ├── schema.prisma     # Definición de modelos (Board, Column, Task)
│   └── dev.db            # Base de datos local SQLite
├── src/
│   ├── app/              # Rutas principales y API Handlers
│   │   ├── api/          # Endpoints de la API (Boards y Tasks)
│   │   ├── globals.css   # Sistema de diseño y variables CSS
│   │   └── page.tsx      # Página de inicio del Tablero
│   ├── components/       # Componentes React reutilizables
│   ├── lib/              # Utilidades (Cliente de Prisma Singleton)
│   └── types/            # Definiciones de interfaces TypeScript
├── .env                  # Variables de entorno
└── package.json          # Dependencias y scripts
```

---

## 🚀 Instalación y Configuración

Sigue estos pasos para tener el proyecto corriendo localmente:

1. **Clonar el repositorio:**
   ```bash
   git clone <tu-url-de-github>
   cd TaskFlow
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar la base de datos:**
   Asegúrate de que el archivo `.env` tenga la ruta correcta:
   ```env
   DATABASE_URL="file:./prisma/dev.db"
   ```
   Luego, sincroniza el esquema:
   ```bash
   npx prisma db push
   ```

4. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 📘 Guía de Desarrollo

### Añadir nuevos modelos
Si deseas extender la funcionalidad (ej. añadir Etiquetas a las tareas):
1. Modifica `prisma/schema.prisma`.
2. Ejecuta `npx prisma db push` para actualizar la DB.
3. El cliente de Prisma se actualizará automáticamente con los nuevos tipos.

### Personalización de Estilos
El sistema de diseño está centralizado en `src/app/globals.css`. Puedes cambiar los colores de la marca, el radio de los bordes o las animaciones simplemente modificando las variables `:root`.

---

## 📄 Licencia

Este proyecto fue desarrollado como parte de un portafolio profesional. Siéntete libre de usarlo, aprender de él y mejorarlo.

---

Creado con ❤️ por [TankeXD]
