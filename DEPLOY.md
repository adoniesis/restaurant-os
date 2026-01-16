# Guía de Despliegue - RestaurantOS

Esta guía te ayudará a desplegar RestaurantOS en un entorno de producción usando **Vercel**, que es la plataforma recomendada para Next.js.

## Prerrequisitos

1. Una cuenta en [Vercel](https://vercel.com).
2. Una cuenta en [GitHub](https://github.com), GitLab o Bitbucket donde alojar el código.
3. Una base de datos PostgreSQL (puedes usar Vercel Postgres, Neon, Supabase o Railway).

## Paso 1: Configurar la Base de Datos

Para producción, necesitas una base de datos PostgreSQL real.

1. Crea una base de datos en tu proveedor favorito.
2. Obtén la **Connection String** (URL de conexión). Debería verse como:
    `postgres://usuario:password@host:port/database?sslmode=require`

## Paso 2: Subir el Código a GitHub

1. Inicializa el repositorio si no lo has hecho:

    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```

2. Crea un nuevo repositorio en GitHub y sigue las instrucciones para subir tu código local.

## Paso 3: Desplegar en Vercel

1. Ve a tu dashboard de Vercel y haz clic en **"Add New..."** -> **"Project"**.
2. Importa tu repositorio de GitHub.
3. En la configuración del proyecto (**Configure Project**):
    * **Framework Preset**: Next.js (se detecta automático).
    * **Root Directory**: `./` (déjalo como está).
    * **Environment Variables**: Aquí es donde la magia ocurre. Debes agregar las variables de tu archivo `.env`.

    ### Variables de Entorno Requeridas

    | Nombre | Valor |
    | :--- | :--- |
    | `DATABASE_URL` | Tu conexión string de PostgreSQL (Paso 1) |
    | `NEXTAUTH_SECRET` | Un string aleatorio largo (genera uno con `openssl rand -base64 32`) |
    | `NEXTAUTH_URL` | La URL de tu dominio (ej: `https://tu-proyecto.vercel.app`) |

4. Haz clic en **Deploy**.

## Paso 4: Configuración Post-Despliegue

### Migraciones de Base de Datos

Vercel intentará construir tu proyecto. Para que la base de datos se sincronice, puedes agregar un script en `package.json` o ejecutarlo manualmente desde tu máquina local conectada a la BD de producción:

```bash
# Desde tu terminal local, apuntando a la BD de producción
npx prisma db push
```

_Nota: Asegúrate de cambiar temporalmente la `DATABASE_URL` en tu `.env` local o pasársela al comando._

### Dominios Personalizados (Multi-Tenant)

Para que los subdominios (ej: `ladelicia.tuapp.com`) funcionen:

1. En Vercel, ve a **Settings** -> **Domains**.
2. Agrega tu dominio principal (ej: `tuapp.com`).
3. Agrega un dominio wildcard: `*.tuapp.com`.
4. En tu proveedor de DNS, configura los registros CNAME/A según indique Vercel.

## Scripts de Utilidad

### Verificar Build Localmente

Antes de subir, es bueno verificar que todo compila:

```bash
npm run build
```

### Linting

Revisar errores de código:

```bash
npm run lint
```
