# Guía Completa de Despliegue en Producción

## 🎯 Tu Situación Actual

Tienes:
- ✅ **API Backend en Render:** https://intensivo3-api.onrender.com
- ✅ **Repositorio en GitHub:** https://github.com/elcorreveidile/CILE
- ✅ **Código frontend listo** (ahora configurado para usar la API de Render)

---

## 📝 Cambios Realizados (Ya Completados)

He actualizado estos archivos para que usen tu API de Render:

### ✅ Archivos Modificados:
1. **`register.html`** - Agregada meta tag con URL de API
2. **`index.html`** - Agregada meta tag con URL de API (para login)
3. **`dashboard.html`** - Agregada meta tag con URL de API

Todos ahora incluyen:
```html
<meta name="api-base-url" content="https://intensivo3-api.onrender.com">
```

---

## 🔧 PASO 1: Configurar Variables de Entorno en Render

### Lo Más Importante: CORS

Tu API en Render está respondiendo **"Access denied"** porque falta configurar CORS correctamente.

### Acciones en Render:

1. **Ve a tu dashboard de Render:** https://dashboard.render.com

2. **Selecciona tu servicio** `intensivo3-api`

3. **Ve a "Environment" (Variables de Entorno)**

4. **Agrega/Actualiza estas variables:**

```env
PORT=3000
NODE_ENV=production
JWT_SECRET=intensivo3-clm-ugr-secret-production-2024-CAMBIAR-ESTO-POR-ALGO-SEGURO
JWT_EXPIRE=7d
DATABASE_PATH=./database/intensivo3.db
CORS_ORIGIN=https://elcorreveidile.github.io,https://intensivo3-api.onrender.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### ⚠️ MUY IMPORTANTE: CORS_ORIGIN

**Debes poner la URL EXACTA de tu GitHub Pages.** Por ejemplo:
- Si tu GitHub Pages es: `https://elcorreveidile.github.io/CILE`
- Tu CORS_ORIGIN debe incluir: `https://elcorreveidile.github.io`

```env
CORS_ORIGIN=https://elcorreveidile.github.io
```

O si tienes múltiples dominios:
```env
CORS_ORIGIN=https://elcorreveidile.github.io,https://www.tudominio.com
```

5. **Haz clic en "Save Changes"**

6. **Render automáticamente redesplegará tu API** (tarda ~2-5 minutos)

---

## 🌐 PASO 2: Activar GitHub Pages

### 2.1 Ir a Configuración de GitHub

1. Ve a tu repositorio: https://github.com/elcorreveidile/CILE
2. Haz clic en **Settings** (arriba a la derecha)
3. En el menú lateral izquierdo, haz clic en **Pages**

### 2.2 Configurar GitHub Pages

1. **Source:** Selecciona la rama `main` (o la rama que quieras publicar)
2. **Folder:** Selecciona `/ (root)`
3. Haz clic en **Save**

### 2.3 Esperar a que se despliegue

GitHub Pages tarda unos 1-2 minutos en desplegarse. Verás un mensaje como:

```
✅ Your site is live at https://elcorreveidile.github.io/CILE/
```

Copia esa URL, la necesitarás.

---

## 🔄 PASO 3: Actualizar CORS en Render (Otra Vez)

Ahora que sabes la URL exacta de GitHub Pages, actualiza el CORS:

1. Ve a Render > Environment
2. Actualiza `CORS_ORIGIN` con la URL EXACTA de GitHub Pages
3. Ejemplo:
   ```env
   CORS_ORIGIN=https://elcorreveidile.github.io
   ```
4. Guarda y espera el redespliegue (~2 minutos)

---

## 🗄️ PASO 4: Inicializar la Base de Datos en Render

Render necesita tener la base de datos creada. Hay dos opciones:

### Opción A: Usando Render Shell (Recomendado)

1. En tu dashboard de Render, ve a tu servicio
2. Haz clic en **Shell** (arriba a la derecha)
3. Ejecuta:
   ```bash
   npm run init-db
   ```
4. Deberías ver:
   ```
   ✓ Base de datos inicializada correctamente
   ✓ Todas las tablas han sido creadas
   ✓ Datos de ejemplo insertados
   ```

### Opción B: La Base de Datos se Creará Automáticamente

Si tu código está configurado para crear la BD automáticamente al primer uso, no necesitas hacer nada.

---

## ✅ PASO 5: Verificar que Todo Funciona

### 5.1 Probar la API

Abre tu navegador y ve a:
```
https://intensivo3-api.onrender.com/api
```

Deberías ver una respuesta JSON como:
```json
{
  "success": true,
  "message": "API Intensivo 3 - CLM UGR",
  "version": "1.0.0",
  "endpoints": {
    "auth": {
      "register": "POST /api/auth/register",
      "login": "POST /api/auth/login",
      ...
    }
  }
}
```

Si ves **"Access denied"**, el problema es CORS. Revisa el PASO 1 y 3.

### 5.2 Probar el Frontend

1. Ve a tu GitHub Pages: `https://elcorreveidile.github.io/CILE/register.html`
2. Abre la consola del navegador (F12)
3. Intenta registrar un usuario
4. Revisa la consola para ver si hay errores de CORS

---

## 🚨 Solución de Problemas Comunes

### Error: "Access denied" en la API

**Causa:** CORS no configurado correctamente

**Solución:**
1. Verifica que `CORS_ORIGIN` en Render tenga la URL correcta de GitHub Pages
2. No incluyas la barra final `/` en la URL
3. Espera a que Render redespliegue (2-5 minutos)
4. Limpia la caché del navegador

### Error: "Failed to fetch" o "Network error"

**Causa:** La API no está respondiendo o está caída

**Solución:**
1. Verifica que tu servicio de Render esté activo (no suspendido)
2. Los planes gratuitos de Render se duermen después de 15 min de inactividad
3. La primera petición puede tardar 30-60 segundos mientras "despierta"

### Error: "404 Not Found" en GitHub Pages

**Causa:** GitHub Pages no está activado o la página no existe

**Solución:**
1. Verifica que GitHub Pages esté activado (PASO 2)
2. Asegúrate de estar en la rama correcta
3. Espera 1-2 minutos para que GitHub Pages se actualice

### Error de CORS en la consola del navegador

**Mensaje típico:**
```
Access to fetch at 'https://intensivo3-api.onrender.com/api/auth/register'
from origin 'https://elcorreveidile.github.io' has been blocked by CORS policy
```

**Solución:**
1. El `CORS_ORIGIN` en Render DEBE incluir `https://elcorreveidile.github.io`
2. NO uses `http://` (GitHub Pages usa HTTPS)
3. Guarda los cambios y espera el redespliegue

---

## 📊 Checklist Final

Usa este checklist para verificar que todo está configurado:

### Backend (Render)
- [ ] Variables de entorno configuradas (especialmente `CORS_ORIGIN`)
- [ ] `CORS_ORIGIN` incluye la URL exacta de GitHub Pages (HTTPS)
- [ ] JWT_SECRET cambiado a algo seguro para producción
- [ ] Base de datos inicializada (`npm run init-db`)
- [ ] API responde en: https://intensivo3-api.onrender.com/api

### Frontend (GitHub Pages)
- [ ] GitHub Pages activado en Settings > Pages
- [ ] Rama correcta seleccionada (main)
- [ ] Archivos HTML tienen la meta tag de API
- [ ] URL de GitHub Pages funciona: https://elcorreveidile.github.io/CILE/

### Integración
- [ ] Formulario de registro se puede abrir: https://elcorreveidile.github.io/CILE/register.html
- [ ] No hay errores de CORS en la consola del navegador (F12)
- [ ] El registro de usuario funciona correctamente
- [ ] El login funciona correctamente

---

## 🎓 Próximos Pasos

Una vez que todo funcione:

1. **Prueba el sistema completo:**
   - Registra un usuario de prueba
   - Haz login
   - Navega por el dashboard

2. **Documenta las URLs importantes:**
   - Frontend: https://elcorreveidile.github.io/CILE/
   - API: https://intensivo3-api.onrender.com/api
   - Registro: https://elcorreveidile.github.io/CILE/register.html

3. **Comparte con tus usuarios:**
   - Envía el enlace de registro
   - Proporciona instrucciones claras

4. **Monitoreo:**
   - Render te permite ver logs en tiempo real
   - Usa la consola del navegador para depurar errores del frontend

---

## 📞 Soporte Adicional

Si después de seguir todos estos pasos algo no funciona:

1. **Revisa los logs de Render:**
   - Ve a tu servicio en Render
   - Haz clic en "Logs"
   - Busca errores en rojo

2. **Revisa la consola del navegador:**
   - Abre DevTools (F12)
   - Ve a la pestaña "Console"
   - Busca errores en rojo
   - Ve a la pestaña "Network" para ver las peticiones HTTP

3. **Verifica las URLs:**
   - Meta tag en HTML debe coincidir con la URL de Render
   - CORS_ORIGIN en Render debe coincidir con la URL de GitHub Pages
   - Ambas URLs deben usar HTTPS

---

**Última actualización:** 2025-11-05
**Configuración completada:** ✅ Frontend configurado, ⏳ Pendiente configuración de Render
