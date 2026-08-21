# Datos de demostración (MOCK)

**Ubicación única de todos los datos ficticios del prototipo.**

Este directorio contiene EXCLUSIVAMENTE datos de demostración usados por el
prototipo visual del módulo de Ventas de *Qualister – Gestión Comercial*.

- No existe base de datos, backend, API ni almacenamiento persistente.
- Ningún componente debe declarar datos ficticios propios: todo vive aquí.
- Para conectar la base de datos real, basta con reemplazar los `export` de
  estos archivos por llamadas al backend y eliminar este directorio.

## Archivos

| Archivo | Contenido |
|---|---|
| `catalogos.js` | Catálogos: magnitudes, servicios, estados, tipos de actividad, vendedores, condiciones de pago, tipo de cambio demo. |
| `tarifario.js` | ~25 servicios del tarifario (precios MXN/USD demo). |
| `prospectos.js` | 12 prospectos de demostración. |
| `clientes.js` | 8 clientes de demostración. |
| `seguimientos.js` | 12 seguimientos de demostración. |
| `cotizaciones.js` | 10 cotizaciones de demostración con partidas. |
| `dashboard.js` | KPIs, embudo, actividades recientes (derivados de los mocks anteriores). |
| `index.js` | Punto único de importación. |
