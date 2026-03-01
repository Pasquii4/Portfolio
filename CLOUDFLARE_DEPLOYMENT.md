# Despliegue en Cloudflare Pages

El repositorio ya está configurado para desplegarse en Cloudflare Pages utilizando la integración oficial para Next.js de Cloudflare. Se han realizado los siguientes cambios en tu código:

1. **Scripts en `package.json`:** Se ha añadido el script `"pages:build": "npx @cloudflare/next-on-pages"`, el cual compilará la aplicación específicamente para ser ejecutada en la red de Cloudflare Workers.
2. **Dependencias:** Se instalaron `@cloudflare/next-on-pages` y `wrangler` como dependencias de desarrollo para asegurar la compatibilidad.
3. **Runtime Edge:** Se ajustó la API en `src/app/api/ticker/route.ts` añadiendo `export const runtime = 'edge';`. Como Cloudflare Pages ejecuta la lógica del servidor de Next.js en Workers, tus rutas API que necesiten Server-Side Rendering (SSR) o lógica de backend deben estar configuradas para usar el entorno 'Edge'.

## Próximos Pasos en el Panel de Cloudflare

Para que tu proyecto esté en línea, sigue estos pasos:

1. Inicia sesión en tu cuenta de **Cloudflare**.
2. Ve al menú lateral y haz clic en **Workers & Pages**.
3. Haz clic en el botón azul **Create application** y selecciona la pestaña **Pages**.
4. Selecciona **Connect to Git** y autoriza tu cuenta de GitHub si aún no lo has hecho.
5. Elige el repositorio **`personal-2`** y haz clic en **Begin setup**.
6. En la pantalla de configuración (Set up builds and deployments):
   - **Framework preset:** Selecciona `Next.js`.
   - **Build command:** Debería detectarlo automáticamente, o bien pon `npm run pages:build`.
   - **Build output directory:** Especifica `.vercel/output/static` (importante).
7. Despliega (Deploy) hacia abajo la sección **Environment variables (advanced)** y allí añade tus variables de entorno correspondientes.
   - Variable: `POLYGON_API_KEY`
   - Valor: (El valor de tu clave)
8. Haz clic en **Save and Deploy**.

¡Eso es todo! El sistema de Cloudflare Pages descargará tu proyecto, ejecutará el comando de compilación de forma óptima para su infraestructura Edge, y después de unos minutos te entregará la URL en vivo.

**Nota:** Cloudflare te brinda automáticamente certificados SSL robustos, enrutamiento mundial ultrarápido desde su caché global y protección nativa de nivel empresarial sin coste adicional.
