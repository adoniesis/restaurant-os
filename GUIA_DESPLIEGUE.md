# 🚀 Guía Maestra de Despliegue: RestaurantOS

Esta guía te llevará paso a paso para poner tu plataforma en internet.

## 1. Recomendación de Infraestructura

Para una plataforma moderna construida con **Next.js 14** (como esta), los hostings tradicionales (cPanel, GoDaddy Shared, Hostinger Shared) **NO SIRVEN** directamente, porque solo soportan PHP/HTML estático. Necesitas un entorno que soporte **Node.js**.

### ✅ La Opción Recomendada: Vercel + Neon/Railway

* **Vercel**: Creadores de Next.js. Es la opción más rápida, segura y gratuita para empezar. Se encarga del Frontend y la API.
* **Neon (o Railway)**: Para la base de datos PostgreSQL.

### ❌ Opciones NO Recomendadas (para este stack)

* **GoDaddy/Hostinger (Planes Web Hosting básico)**: No soportan Node.js persistente o es muy complejo de configurar.
* **AWS EC2 (Raw)**: Demasiada configuración manual (Linux, seguridad, Nginx, SSL) para empezar. Solo recomendado si tienes un equipo DevOps.

---

## 2. Paso a Paso: Despliegue en Vercel (Gratis para empezar)

### Fase A: Preparar la Base de Datos (PostgreSQL)

Recomendamos usar **Neon.tech** (Gratis y excelente para Postgres) o **Supabase**.

1. Crea una cuenta en [Neon.tech](https://neon.tech).
2. Crea un nuevo proyecto llamado `restaurant-os`.
3. Copia el **Connection String** que te dan. Se ve así:
    `postgres://usuario:password@ep-mid-123.aws.neon.tech/restaurant-os?sslmode=require`
4. Guarda este string, lo necesitarás.

### Fase B: Subir tu Código a GitHub

Si aún no has subido tu código:

1. Ve a [GitHub.com](https://github.com) y crea un repositorio llamado `restaurant-os`.
2. Sube tu código (puedes usar GitHub Desktop o terminal).

### Fase C: Conectar Vercel

1. Ve a [Vercel.com](https://vercel.com) y regístrate con tu cuenta de GitHub.
2. Haz clic en **"Add New Project"**.
3. Selecciona tu repositorio `restaurant-os`.
4. En la sección **Environment Variables**, agrega las siguientes claves (copia los valores de tu `.env` local, pero usa la URL de Neon para la base de datos):

    | Variable | Valor |
    | :--- | :--- |
    | `DATABASE_URL` | La URL que copiaste de Neon/Supabase (Fase A) |
    | `NEXTAUTH_SECRET` | Un código secreto largo (genera uno nuevo) |
    | `NEXTAUTH_URL` | `https://tu-proyecto.vercel.app` (Vercel te dará esta URL al desplegar, o pon tu dominio final) |

5. Haz clic en **Deploy**.
6. ¡Listo! Vercel construirá tu app y te dará un link (ej: `restaurant-os.vercel.app`).

### Fase D: Configurar Dominios (Tu Marca)

Si compraste tu dominio en GoDaddy/Hostinger:

1. En Vercel, ve a **Settings** > **Domains**.
2. Escribe tu dominio (ej: `mirestaurante.com`).
3. Vercel te dará unos registros DNS (tipo A y CNAME).
4. Ve a tu panel de GoDaddy/Hostinger, busca "Administrar DNS" y agrega esos registros.
5. En 24h tu dominio estará activo con SSL (candadito) automático.

---

## 3. Arquitectura del Sistema

```mermaid
graph TD
    User((Usuario/Cliente)) -->|HTTPS| Vercel[Vercel (Frontend + API)]
    Vercel -->|Consultas SQL| DB[(Base de Datos PostgreSQL)]
    Vercel -->|Mensajes| Meta[WhatsApp Cloud API]
    Vercel -->|Pagos| Wompi[Pasarela Wompi]
    
    subgraph "Infraestructura Cloud"
        Vercel
        DB
    end
```
