# iPeak Agency — Sitio web

Proyecto en Next.js 14 + TypeScript + TailwindCSS para captar leads y permitir pagos con Stripe.

## Setup local

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`.

## Variables de entorno

Crea un archivo `.env.local`:

```
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_PRICE_STARTER=price_...
STRIPE_PRICE_GROWTH=price_...
STRIPE_PRICE_SCALE=price_...

# Panel admin simple
ADMIN_TOKEN=tu_token_seguro

# Opcional: envío de email con Resend
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL="iPeak <no-reply@tu-dominio.com>"
CONTACT_TO_EMAIL=equipo@tu-dominio.com

# Opcional: CMS (Sanity)
SANITY_PROJECT_ID=xxxxx
SANITY_DATASET=production
SANITY_API_VERSION=2024-04-10
SANITY_READ_TOKEN=token_lectura
```

## Stripe Checkout (modo test)

1. En Stripe (modo test), crea 3 productos con sus precios: Starter, Growth y Scale.
2. Copia los `price_id` en `STRIPE_PRICE_STARTER`, `STRIPE_PRICE_GROWTH` y `STRIPE_PRICE_SCALE`.
3. Coloca las llaves `STRIPE_SECRET_KEY` y `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.
4. Prueba el flujo en `/checkout`.

El endpoint `/api/checkout` crea una sesión de Stripe Checkout con:

- Success: `/gracias?session_id={CHECKOUT_SESSION_ID}`
- Cancel: `/checkout?canceled=1`

Si Stripe no está configurado, el sitio funciona en modo demo.

## Edición de contenido

Los datos editables están en `data/`:

- `data/services.json`
- `data/clients.json`
- `data/testimonials.json`
- `data/pricing.json`
- `data/faq.json`

Los archivos en `src/data` solo tipan y exportan estos JSON.

## Administración (contenido e imágenes)

- Servicios, pricing, FAQs y testimonios: edita los JSON en `data/`.
- Logos e imágenes: súbelos a `public/` y referencia la ruta en `data/clients.json`.
- Para cambiar el orden, reordena el array en los JSON.
- Para agregar un servicio, añade un objeto en `data/services.json`.

### Panel simple de administración

1. Configura `ADMIN_TOKEN` en `.env.local`.
2. Entra a `/admin`.
3. Pega el token y edita el JSON.
4. Guarda y el contenido se actualiza sin redeploy.

## CMS (Sanity)

Si configuras `SANITY_PROJECT_ID` y `SANITY_DATASET`, el sitio lee desde Sanity.
Si no, usa los JSON en `data/`.

Contenido esperado en Sanity:

- `service`: `id`, `titleEs`, `titleEn`, `bulletsEs[]`, `bulletsEn[]`, `order`
- `client`: `id`, `name`, `logo` (imagen), `order`
- `testimonial`: `id`, `name`, `role`, `company`, `quote`, `order`
- `pricingPlan`: `id`, `name`, `subtitleEs`, `subtitleEn`, `features[]`, `note`, `highlight`, `order`
- `faqItem`: `id`, `question`, `answer`, `order`

## Deploy automático (GitHub Actions)

Se incluye `.github/workflows/deploy.yml`. Requiere secretos en GitHub:

- `SSH_HOST` (IP o dominio del server)
- `SSH_USER` (ej. ubuntu)
- `SSH_KEY` (llave privada)
- `SSH_PORT` (22)
- `APP_DIR` (ruta donde está el repo en el server)

El flujo ejecuta `git pull`, `npm install`, `npm run build` y reinicia PM2.

## Deploy

- Vercel: importa repo, agrega env vars y deploy.
- Lightsail: instala Node 20 + PM2 + Nginx, build y ejecuta.

## Endpoints

- `POST /api/contact` — valida y registra leads (opcional con Resend).
- `POST /api/checkout` — crea sesiones de Stripe Checkout.
