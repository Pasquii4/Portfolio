<div align="center">

# Pau Pascual · Portfolio

**Backend & FinTech Developer — Barcelona**

[![Live](https://img.shields.io/badge/🌐_Live-portfolio--cw4.pages.dev-00ff88?style=for-the-badge)](https://portfolio-cw4.pages.dev)
[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
[![Cloudflare Pages](https://img.shields.io/badge/Deployed_on-Cloudflare_Pages-F38020?style=for-the-badge&logo=cloudflare)](https://pages.cloudflare.com)

</div>

---

## Sobre el proyecto

Portfolio personal con estética **terminal / Bloomberg** desarrollado con Next.js 15 App Router, TypeScript y Tailwind CSS. Diseñado para mostrar mis proyectos y habilidades como desarrollador backend especializado en ecosistemas FinTech.

El portfolio incluye un **terminal interactivo funcional** donde el visitante puede ejecutar comandos para explorar la información de forma diferente a un portfolio tradicional.

---

## Características

- **Terminal interactivo** — ejecuta comandos (`help`, `projects`, `skills`, `contact`...)
- **Ticker en tiempo real** — barra estilo Bloomberg con precios de activos
- **Animaciones fluidas** — transiciones con Framer Motion
- **Visualizaciones 3D** — efectos con React Three Fiber + Drei
- **Partículas** — fondo animado con tsparticles
- **Dark mode** — tema oscuro por defecto con next-themes
- **Totalmente responsivo** — adaptado a todos los dispositivos
- **Despliegue en el edge** — Cloudflare Pages con `@cloudflare/next-on-pages`

---

## Secciones

| Sección | Descripción |
|---|---|
| `#dashboard` | Hero con introducción, terminal interactivo y live ticker |
| `#stack` | Habilidades técnicas con barras de progreso animadas |
| `#projects` | Proyectos destacados y proyectos académicos |
| `#about` | Información personal, formación y objetivos |
| `#contact` | Links a email, LinkedIn y GitHub |

---

## Stack Tecnológico

### Frontend
- **React** 19.2.3
- **Next.js** 16.1.6 (App Router)
- **TypeScript** 5
- **Tailwind CSS** 4
- **Framer Motion** 12 — animaciones
- **React Three Fiber** + **@react-three/drei** — 3D
- **tsparticles** — efectos de partículas
- **Lucide React** — iconografía
- **React Icons** — iconos adicionales
- **React Fast Marquee** — ticker animado
- **next-themes** — gestión de temas

### Deploy
- **Cloudflare Pages** via `@cloudflare/next-on-pages`
- **Wrangler** para preview y deploy local

---

## Estructura del proyecto

```
Portfolio/
├── public/             # Assets estáticos
├── src/
│   ├── app/            # App Router de Next.js (layout, page, globals)
│   ├── components/     # Componentes React reutilizables
│   ├── data/           # Datos estáticos (proyectos, skills)
│   ├── hooks/          # Custom hooks
│   ├── types/          # Definiciones TypeScript
│   └── utils/          # Funciones auxiliares
├── next.config.ts
├── tailwind.config.*
├── tsconfig.json
└── cloudflare_deploy.md
```

---

## Instalación y desarrollo local

### Prerrequisitos

- Node.js >= 18
- npm

### Pasos

```bash
# Clonar el repositorio
git clone https://github.com/Pasquii4/Portfolio.git
cd Portfolio

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## Scripts disponibles

```bash
npm run dev          # Servidor de desarrollo (Next.js)
npm run build        # Build de producción
npm run start        # Iniciar servidor de producción
npm run lint         # ESLint
npm run pages:build  # Build para Cloudflare Pages
npm run pages:preview # Preview local con Wrangler
```

---

## Deploy en Cloudflare Pages

Este proyecto usa `@cloudflare/next-on-pages` para adaptar Next.js al entorno de Cloudflare Workers.

```bash
# Build y deploy
npm run pages:build
npx wrangler pages deploy
```

Consulta [`cloudflare_deploy.md`](./cloudflare_deploy.md) para instrucciones detalladas.

---

## Proyectos destacados en el portfolio

### Trading Scanner
Sistema de análisis de mercados en tiempo real con latencia inferior a 300ms.
- **Stack**: FastAPI · WebSockets · PostgreSQL · Python

### Bet Tracker
Aplicación de seguimiento y análisis de apuestas deportivas con estadísticas avanzadas.
- **Stack**: React · FastAPI · PostgreSQL

### Tu Espacio Ideal
Plataforma inmobiliaria con búsqueda inteligente y recomendaciones personalizadas.
- **Stack**: Next.js · Supabase · TypeScript

### RL Boosting ES
Servicio web para boosting competitivo en Rocket League con sistema de pedidos.
- **Stack**: React · Node.js

---

## Contacto

- **Email**: [pascualpau04@gmail.com](mailto:pascualpau04@gmail.com)
- **LinkedIn**: [linkedin.com/in/pau-pascual](https://linkedin.com/in/pau-pascual)
- **GitHub**: [github.com/Pasquii4](https://github.com/Pasquii4)
- **Portfolio**: [portfolio-cw4.pages.dev](https://portfolio-cw4.pages.dev)

---

<div align="center">

Hecho con Next.js · Desplegado en Cloudflare Pages

</div>
