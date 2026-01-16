# 📘 Manuales de Usuario - RestaurantOS

Bienvenido a la documentación oficial de operación de la plataforma.

---

## 👑 Manual para Super Admin (Dueño de la Plataforma)

Como Super Admin, tu trabajo es gestionar el negocio SaaS: crear restaurantes, cobrar suscripciones y monitorear la salud global.

### 1. Acceso al Panel Global

* **URL**: `tudominio.com/admin`
* **Credenciales**: (Las que configures en la base de datos como rol `SUPER_ADMIN`).

### 2. Dashboard Global

![Dashboard Global](file:///C:/Users/adoni/.gemini/antigravity/brain/e7c5fa1f-7017-47e8-a02c-d2584215f202/admin_dashboard_stats_1768590098761.png)

* **Ingresos Totales**: Suma de todas las suscripciones vendidas.
* **Tenants Activos**: Número de restaurantes operando actualmente.
* **Feed de Actividad**: Te avisa si un nuevo restaurante se registró o si hubo un error de pago.

### 3. Crear un Nuevo Restaurante (Tenant)

1. Ve a la sección **Restaurantes** en el menú lateral.
2. Haz clic en el botón morado **"Nuevo Tenant"**.
3. Llena los datos:
    * **Nombre**: Ej: "Pizzería Don Juan".
    * **Slug/Dominio**: Ej: `pizzajuan` (esto creará `pizzajuan.tuplatadorma.com`).
    * **Plan**: Básico, Profesional o Empresarial.
4. El sistema enviará un correo al dueño del restaurante con sus credenciales.

---

## 👨‍🍳 Manual para Restaurantes (Tus Clientes)

Este manual es para entregar a los dueños de los restaurantes que contraten tu servicio.

### 1. Gestión de Pedidos (Kanban)

![Kanban Pedidos](file:///C:/Users/adoni/.gemini/antigravity/brain/e7c5fa1f-7017-47e8-a02c-d2584215f202/orders_page_kanban_1768586742133.png)
El corazón de tu cocina. Mueve las tarjetas de izquierda a derecha:

* **Nuevo**: Pedido recién llegado. Comienza a prepararlo.
* **En Preparación**: La cocina está trabajando en él.
* **Listo**: Empacado y esperando repartidor.
* **En Camino**: El repartidor salió. (Esto notifica al cliente por WhatsApp).

### 2. Configuración del Bot de WhatsApp

![Configuración Bot](file:///C:/Users/adoni/.gemini/antigravity/brain/e7c5fa1f-7017-47e8-a02c-d2584215f202/whatsapp_bot_config_simulator_1768589728971.png)
Automatiza tus respuestas:

1. Ve a **Marketing > Bot WhatsApp**.
2. Haz clic en **"Nuevo Flujo"**.
3. **Disparador**: Palabra clave (ej: "menu").
4. **Respuesta**: Lo que dirá el bot (ej: "Aquí tienes nuestro menú...").
5. Usa el **Simulador** a la derecha para probar antes de guardar.

### 3. Verificación de Pagos

![Pagos](file:///C:/Users/adoni/.gemini/antigravity/brain/e7c5fa1f-7017-47e8-a02c-d2584215f202/dashboard_pagos_view_1768589507524.png)
Cuando un cliente paga con Nequi/Daviplata:

1. El pago aparece como "Pendiente" con un icono amarillo.
2. Haz clic en **"Ver Comprobante"** para revisar la foto que subió el cliente.
3. Si el dinero llegó a tu banco, clic en **"Confirmar"**. El pedido pasará automáticamente a cocina.

---

## 📱 Guía para el Cliente Final (Comensal)

### ¿Cómo pedir?

1. Ingresa al link del restaurante (o escanea el QR en la mesa).
2. Navega el menú visual.
3. Agrega productos al carrito.
4. Elige **Pagar con QR** o Efectivo.
5. Recibirás confirmación por WhatsApp.
6. Sigue tu pedido en tiempo real en la página de **Tracking**.
    ![Tracking](file:///C:/Users/adoni/.gemini/antigravity/brain/e7c5fa1f-7017-47e8-a02c-d2584215f202/tracking_page_view_1768588514854.png)
