# Despliegue en Cloudflare Pages

El proyecto ha sido preparado para su despliegue en la red global de Cloudflare Pages utilizando `@cloudflare/next-on-pages`, lo cual permite ejecutar Next.js en el _Edge Runtime_ de forma extremadamente rápida.

## Comandos Útiles Locales

Se han configurado los siguientes scripts en el `package.json` para el desarrollo de esta integración:

- `npm run pages:build`: Compila la aplicación utilizando `@cloudflare/next-on-pages`, generando el directorio `.vercel/output/static` requerido.
- `npm run pages:preview`: Ejecuta el build y a continuación levanta un entorno local simulando Cloudflare Workers (usando Wrangler), permitiendo comprobar que todo el enrutado y las funciones en el _Edge_ (como la API del _ticker_) se comportan correctamente antes de publicar.

## Instrucciones para subir a Cloudflare Pages

Sigue estos pasos en el panel de control de Cloudflare:

1. Inicia sesión en tu cuenta de [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. En el menú lateral de la izquierda, dirígete a **Workers & Pages**.
3. Haz clic en el botón azul **Create application** (Crear aplicación) y selecciona la pestaña **Pages**.
4. Haz clic en **Connect to Git** (Conectar a Git). Cloudflare te pedirá autorización para acceder a tus repositorios en GitHub.
5. Selecciona el repositorio de tu proyecto (`personal-2` o el nombre correspondiente bajo tu cuenta de GitHub `Pasquii4`) y haz clic en **Begin setup**.
6. En la pantalla de **Set up builds and deployments** (Configurar compilaciones y despliegues), ajusta la configuración de la siguiente forma:
   - **Framework preset:** Selecciona `Next.js`.
   - **Build command:** Déjalo como `npx @cloudflare/next-on-pages` (o `npm run pages:build`).
   - **Build output directory:** Especifica `.vercel/output/static` (estrictamente necesario).
7. Despliega la sección **Environment variables (advanced)** y añade las siguientes variables del entorno del servidor:
   - Variable: `POLYGON_API_KEY` | Valor: _(Tu API Key del portal de Polygon.io)_
8. Finaliza haciendo clic en **Save and Deploy** (Guardar y Desplegar).

¡Listo! A partir de ahora el sistema de Cloudflare monitoreará automáticamente este repositorio (por ejemplo, en la rama `main`) y compilará la aplicación utilizando los recursos Edge de Cloudflare (y SSL gratuito, almacenamiento global en caché, protección DDoS activada nativamente).
