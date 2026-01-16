# 🧪 Plan Maestro de Pruebas (QA)

Antes de lanzar a producción ("Go Live"), ejecuta este protocolo de pruebas para asegurar que todo funciona perfectamente.

## Leyenda

* ✅ **Pasa**: Funciona como se espera.
* 🐞 **Bug**: Error encontrado.
* ⚠️ **Riesgo**: Funciona pero podría mejorar.

---

## 1. Pruebas de Sistema (Super Admin)

| ID | Prueba | Pasos | Resultado Esperado | Estado |
| :--- | :--- | :--- | :--- | :--- |
| SA-01 | Crear Tenant | Panel Admin > Nuevo Tenant > Llenar datos | Tenant creado, base de datos actualizada, email enviado (simulado) | ⬜ |
| SA-02 | Ver Métricas | Cargar Dashboard Admin | Los números coinciden con la BD | ⬜ |
| SA-03 | Listar Tenants | Ir a /admin/tenants | Lista carga paginada y filtros funcionan | ⬜ |

## 2. Pruebas de Restaurante (Tenant)

| ID | Prueba | Pasos | Resultado Esperado | Estado |
| :--- | :--- | :--- | :--- | :--- |
| TE-01 | Login Tenant | Ingresar credenciales | Acceso al dashboard correcto | ⬜ |
| TE-02 | Crear Producto | Menú > Nuevo Producto > Foto + Precio | Producto aparece en lista y catálogo público | ⬜ |
| TE-03 | Stock Agotado | Marcar producto como "Agotado" | En catálogo público aparece gris y no seleccionable | ⬜ |
| TE-04 | Flujo Bot | Crear flujo "test" -> respuesta "ok" | Simulador responde "ok" al escribir "test" | ⬜ |

## 3. Pruebas de Cliente Final (End User)

| ID | Prueba | Pasos | Resultado Esperado | Estado |
| :--- | :--- | :--- | :--- | :--- |
| CL-01 | Añadir al Carrito | Ir a catálogo móvil > Clic en "+" | Contador de carrito sube, total se actualiza | ⬜ |
| CL-02 | Checkout WhatsApp | Llenar carrito > Clic "Pedir por WhatsApp" | Abre WhatsApp con el mensaje pre-generado correcto | ⬜ |
| CL-03 | Pago QR | Checkout > Pagar > Elegir Nequi | Muestra QR correcto y temporizador | ⬜ |
| CL-04 | Tracking | Ir a link de rastreo | Muestra timeline. Ver cambios si cocina actualiza estado | ⬜ |

---

## 🔬 Caso de Uso Crítico: "El Pedido Perfecto"

Realiza este ciclo completo 3 veces seguidas:

1. **Cliente**: Entra al catálogo -> Pide Hamburguesa -> Selecciona envío -> Paga con QR (Simulado) -> Envía pedido.
2. **Restaurante**: Recibe alerta -> Verifica pago -> Mueve a "En Preparación".
3. **Cliente**: Refresca tracking -> Ve estado "Preparando".
4. **Restaurante**: Mueve a "En Camino".
5. **Cliente**: Recibe notificación (simudada) -> Ve datos del repartidor.

Si esto fluye sin errores 3 de 3 veces, **estás listo para producción**.
