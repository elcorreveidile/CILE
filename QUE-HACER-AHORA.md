# 🚀 ¿Qué Hacer Ahora? - Guía Rápida

## ✅ Lo Que Ya Está Hecho

- ✅ Backend funcionando localmente
- ✅ Frontend configurado para usar tu API de Render
- ✅ Archivos actualizados: `register.html`, `index.html`, `dashboard.html`
- ✅ Código listo para producción

---

## 🎯 Los 3 Pasos que DEBES Hacer

### PASO 1: Configurar CORS en Render (5 minutos) ⚠️ CRÍTICO

Tu API en Render está dando "Access denied" porque falta configurar CORS.

**Acción:**
1. Ve a: https://dashboard.render.com
2. Selecciona tu servicio `intensivo3-api`
3. Haz clic en "Environment"
4. Agrega esta variable (o actualízala si existe):

```
CORS_ORIGIN=https://elcorreveidile.github.io
```

5. Haz clic en "Save Changes"
6. Espera 2-3 minutos mientras Render redespliegua

**Otras variables importantes:**
```
JWT_SECRET=tu-secreto-super-seguro-cambialo
NODE_ENV=production
DATABASE_PATH=./database/intensivo3.db
```

---

### PASO 2: Activar GitHub Pages (2 minutos)

**Acción:**
1. Ve a: https://github.com/elcorreveidile/CILE/settings/pages
2. En "Source", selecciona: **`main`** branch
3. En "Folder", selecciona: **`/ (root)`**
4. Haz clic en **Save**
5. Espera 1-2 minutos
6. GitHub te mostrará la URL, ejemplo: `https://elcorreveidile.github.io/CILE/`

---

### PASO 3: Inicializar Base de Datos en Render (2 minutos)

**Opción A - Usando Render Shell:**
1. En Render, ve a tu servicio
2. Haz clic en "Shell" (arriba a la derecha)
3. Ejecuta:
   ```bash
   npm run init-db
   ```

**Opción B - La BD se creará automáticamente** al primer registro de usuario.

---

## 🧪 Verificar que Funciona

### 1. Probar la API (debe responder JSON, no "Access denied"):
```
https://intensivo3-api.onrender.com/api
```

### 2. Probar el Frontend (debe cargar la página):
```
https://elcorreveidile.github.io/CILE/register.html
```

### 3. Probar el Registro:
- Abre la página de registro
- Llena el formulario
- Abre la consola del navegador (F12)
- Si hay errores de CORS, vuelve al PASO 1

---

## 🚨 Si Algo No Funciona

### API dice "Access denied"
→ Falta configurar CORS (PASO 1)

### GitHub Pages no carga
→ Espera 2 minutos más, o revisa que esté activado (PASO 2)

### Error de CORS en el navegador
→ Verifica que `CORS_ORIGIN` en Render sea EXACTAMENTE: `https://elcorreveidile.github.io`

---

## 📚 Documentación Completa

Lee `GUIA-DESPLIEGUE-PRODUCCION.md` para información detallada sobre:
- Configuración paso a paso
- Solución de problemas
- Variables de entorno completas
- Checklist de verificación

---

## 🎯 TL;DR - Hazlo en 10 Minutos

```bash
# 1. Configura CORS en Render (CORS_ORIGIN=https://elcorreveidile.github.io)
# 2. Activa GitHub Pages en Settings > Pages
# 3. Espera 2-3 minutos
# 4. Ve a: https://elcorreveidile.github.io/CILE/register.html
# 5. ¡Listo! 🎉
```

---

**Lo más importante:** CORS debe estar configurado correctamente en Render, o nada funcionará.
