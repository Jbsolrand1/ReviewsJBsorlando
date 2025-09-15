
# JBS Reviews – Deploy rápido

## 1) Subir a Git
Sube estos archivos al repo (no el ZIP):
- netlify.toml
- public/index.html
- public/success.html
- netlify/functions/listReviews.js
- netlify/functions/submission-created.js

## 2) Conectar en Netlify (Import from Git) y Deploy

## 3) Enviar 1 reseña de prueba
Netlify crea el form después del primer submit real (⭐≥4 + “Sí” recomendado).

## 4) Variables de entorno (Site settings → Environment variables)
- NETLIFY_FORM_ID = API ID del form (Forms → transport-reviews → Settings)
- NETLIFY_API_TOKEN = token personal (User settings → Applications → New token, scope: Forms:read)
- NOTIFY_TO_EMAIL = jbsserviceo@gmail.com
- (opcional) SENDGRID_API_KEY (para que envíe correo)
- (opcional) TWILIO_* y AUTO_REPLY_WHATSAPP=true

## 5) Redeploy limpio
Deploys → Clear cache and deploy.

## 6) Verificar
- /api/listReviews → debe devolver JSON
- Home muestra hasta 4 reseñas positivas
- success.html carga bien
