# RestaurantOS 🍔

**Plataforma SaaS para Gestión de Restaurantes y Pedidos por WhatsApp**

Bienvenido a RestaurantOS, la solución "Todo en Uno" diseñada para conquistar el mercado gastronómico de Latinoamérica.

## 🎯 ¿Qué es esto?

Es una plataforma que permite a múltiples restaurantes tener su propia página de pedidos (tipo Shopify/UberEats propio), recibir órdenes directamente en WhatsApp y gestionar su cocina y finanzas.

![Vista Previa](https://raw.githubusercontent.com/tu-usuario/restaurant-os/main/public/dashboard-preview.png)
*(Reemplaza este link con una captura real de tu dashboard)*

## 🚀 Módulos Incluidos (Todo 100% Funcional)

1. **Panel de Restaurante**:
    * Control total de ventas y pedidos.
    * Gestión de Carta/Menú con fotos y precios.
    * **Kanban de Cocina**: Pantalla para que el chef organice los pedidos.

2. **App para Clientes (Catálogo Web)**:
    * No requiere descargar App (es Web).
    * Carrito de compras que "recuerda" lo que pediste.
    * **Botón "Pedir por WhatsApp"**: Envía el pedido listo al chat del restaurante.

3. **Sistema de Pagos QR**:
    * Genera códigos QR de **Nequi, Daviplata y Bancolombia**.
    * El cliente sube la foto del comprobante y el restaurante lo valida.

4. **Bot de Atopiloto (WhatsApp)**:
    * Configura respuestas automáticas como "Hola", "Menú", "Dirección".
    * Incluye un **Simulador de Chat** para probar antes de activar.

5. **Panel Super Admin (Dueño del Negocio)**:
    * Crea y elimina restaurantes.
    * Mira cuánto dinero está generando toda la plataforma.

## 🛠️ Tecnología Debajo del Capó

* **Motor**: Next.js 14 (Lo más moderno y rápido de React).
* **Base de Datos**: PostgreSQL (Robusta y escalable).
* **Estilos**: Tailwind CSS (Diseño bonito y adaptable a móviles).
* **Lenguaje**: TypeScript (Código seguro y profesional).

## 🏁 ¿Cómo Arrancar el Proyecto?

### Requisitos

Necesitas tener instalado en tu computador:

* [Node.js](https://nodejs.org/es/) (Versión 18 o superior).

### Pasos de Instalación

1. **Descargar el código**:
    Abre tu terminal y ejecuta:

    ```bash
    git clone https://github.com/tu-usuario/restaurant-os.git
    cd restaurant-os
    ```

2. **Instalar librerías**:

    ```bash
    npm install
    ```

3. **Configurar Base de Datos**:
    Copia el archivo de configuración base:

    ```bash
    cp .env.example .env
    ```

    (Luego abre el archivo `.env` y pon los datos de tu base de datos PostgreSQL local o de la nube).

4. **Sincronizar la Base de Datos**:

    ```bash
    npx prisma db push
    ```

5. **¡Encender Motores!**:

    ```bash
    npm run dev
    ```

    Ahora abre tu navegador en: [http://localhost:3000](http://localhost:3000)

## 📚 Documentación Adicional

Hemos preparado manuales detallados para ti:

* 🌍 **[Guía de Despliegue en Internet](./GUIA_DESPLIEGUE.md)**: Cómo subir tu web a Vercel (Gratis).
* 📘 **[Manuales de Usuario](./MANUALES_USUARIO.md)**: Guías con fotos para ti y tus clientes.
* 🤖 **[Conexión WhatsApp API](./GUIA_WHATSAPP.md)**: Cómo conectar el bot a un número real.
* 🧪 **[Plan de Pruebas](./PLAN_PRUEBAS.md)**: Lista de chequeo para asegurarte que todo funciona.

## 📄 Licencia

Este proyecto es propiedad privada. Todos los derechos reservados.
