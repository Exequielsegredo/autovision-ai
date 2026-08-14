# AutoVision AI V4 — Base inicial

Versión inicial de la plataforma para gestión y publicación de vehículos. Incluye una interfaz demostrativa de panel de administración y ficha pública, más la configuración base para Supabase.

## Inicio rápido

1. Instala Node.js 20 o superior.
2. En esta carpeta ejecuta `npm install`.
3. Copia `.env.example` como `.env` y completa las variables de Supabase. La URL debe ser `https://rebzpikwqxmwajdimfld.supabase.co`, sin el fragmento `/rest/v1/`.
4. Ejecuta `npm run dev`.

## Conectar Supabase

1. En Supabase abre **SQL Editor** y ejecuta el contenido de `supabase/schema.sql`.
2. En el archivo `.env`, coloca la URL de tu proyecto y tu clave publishable en `VITE_SUPABASE_ANON_KEY`.
3. La política de administración incluida es solo para desarrollo. Antes de publicar, se reemplazará por acceso mediante login de administradores.

## Estructura

- `src/pages/Dashboard.jsx`: panel administrativo e inventario.
- `src/pages/VehicleDetail.jsx`: ficha pública demostrativa.
- `src/lib/supabase.js`: cliente preparado para autenticación, base de datos y Storage.

## Próximos pasos de desarrollo

- Autenticación de administradores con Supabase Auth.
- Tablas y CRUD real de vehículos.
- Carga múltiple de imágenes a Supabase Storage.
- QR, enlace de WhatsApp y respuestas de AVA mediante un backend seguro.

> No incluyas una clave privada de OpenAI en el navegador. La integración de AVA debe usar una función de servidor.
