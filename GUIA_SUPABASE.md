# ⚡ Guía de Activación: Supabase (PostgreSQL)

Esta guía te permitirá pasar de la base de datos de "juguete" (SQLite) a una base de datos **profesional en la nube** (PostgreSQL) usando Supabase. Esto es obligatorio para que tu web en Vercel guarde datos reales.

---

## Paso 1: Crear Proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta (o entra con GitHub).
2. Haz clic en **"New Project"**.
3. Elige tu organización (o crea una).
4. Llena los datos:
    * **Name:** `Restaurant-OS`
    * **Database Password:** ¡Créala y GUÁRDALA! La necesitarás ya mismo.
    * **Region:** Elige `East US` o la más cercana a tus clientes.
5. Dale a **"Create new project"**. Espera unos minutos a que termine de configurar.

---

## Paso 2: Obtener las "Llaves" de Conexión

Una vez creado el proyecto:

1. Ve al menú lateral izquierdo → ícono de engranaje **(Project Settings)**.
2. Ve a **"Database"**.
3. Busca la sección **"Connection parameters"**.
    * Ahí verás `Host`, `User`, `Port`, etc.
4. Pero para facilitarlo, baja a **"Connection string"** → Pestaña **"URI"**.
    * Verás algo como: `postgresql://postgres.[ref]:[password]...`

### 🔴 IMPORTANTE: Necesitas DOS variables

Supabase usa dos modos de conexión (Transaction y Session). Copia los datos en un bloc de notas así:

**VARIABLE 1: `DATABASE_URL` (Puerto 6543 - Transaction Mode)**
Copia el link URI y asegúrate de añadir `?pgbouncer=true` al final y usa el puerto 6543.
Ejemplo:
`postgres://postgres.abcdef:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true`

**VARIABLE 2: `DIRECT_URL` (Puerto 5432 - Session Mode)**
Es el mismo link, pero con el puerto 5432 y SIN `?pgbouncer=true`.
Ejemplo:
`postgres://postgres.abcdef:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres`

*(Reemplaza `[PASSWORD]` con la clave que creaste en el paso 1).*

---

## Paso 3: Conectar Vercel con Supabase

1. Ve a tu proyecto en **Vercel** (`restaurant-os`).
2. Ve a la pestaña **Settings** → **Environment Variables**.
3. Añade estas dos nuevas variables:

| Key (Nombre) | Value (Valor) |
| :--- | :--- |
| `DATABASE_URL` | *(Pega el link del puerto 6543 con pgbouncer)* |
| `DIRECT_URL` | *(Pega el link del puerto 5432 normal)* |

1. Dale "Save".

---

## Paso 4: Instalar la Base de Datos (Migración)

Ahora tenemos que "crear" las tablas (Usuarios, Pedidos, etc.) en esa base de datos vacía de Supabase.

**Opción A: Desde tu computador (Recomendado)**

1. Abre tu archivo `.env` en tu carpeta `restaurant-saas`.
2. Pega las variables `DATABASE_URL` y `DIRECT_URL` con tus datos de Supabase.
3. Abre la terminal en la carpeta y escribe:

    ```bash
    npx prisma db push
    ```

    *(Si sale un check verde 🚀, ¡ya tienes base de datos en la nube!)*.

**Opción B: Que lo haga Vercel**
Esto requiere configurar el `build command` en Vercel, pero la Opción A es más segura y rápida por ahora.

---

## Paso 5: Redesplegar

Para que Vercel tome los cambios de las variables:

1. Ve a la pestaña **Deployments** en Vercel.
2. Selecciona el último despliegue (o haz uno nuevo con un cambio en Git).
3. Dale a los 3 puntos (...) → **Redeploy**.

¡Listo! Ahora tu aplicación `restaurant-os` está conectada a una base de datos PostgreSQL real y persistente.
