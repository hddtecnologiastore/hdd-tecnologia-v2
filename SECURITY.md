# Security — HDD V2 (carpeta HDD)

Postura segura por defecto. No contiene secretos (sin tokens ni API keys).

- Headers: HSTS, CSP, X-Frame DENY, nosniff, Referrer strict, Permissions, COOP/CORP (`netlify.toml`, `server.js`).
- Traversal: `server.js` valida `fp.startsWith(ROOT)`.
- XSS: todo render con `esc()` en `app.js`; formularios rechazan `<>` y usan `encodeURIComponent` a WhatsApp.
- Validación: nombre solo letras 2-60, teléfono `9xxxxxxxx`, RUT módulo 11, `q` 100 chars allowlist.
- Sin secretos: `.env` ignorado; Google Places API key del proyecto original NO copiada (reviews locales en `data.js`).
- Reporte: contacto +56 9 6199 1725 / Av. Rodrigo de Araya 3076, Ñuñoa.
