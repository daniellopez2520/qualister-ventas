# plan.md — Qualister – Gestión Comercial (Frontend Ventas)

## 1. Objectives
- Entregar un **prototipo frontend navegable** (sin backend, sin persistencia, sin integraciones) del módulo **Ventas** para “Qualister – Gestión Comercial”.
- Implementar **rutas, layout (sidebar/header), pantallas y componentes UI** en español, con datos **mock centralizados**.
- Cumplir restricciones: **sin BD/APIs/auth real/archivos reales/localStorage**, solo interacciones visuales.
- Diseño: **tema claro + sidebar azul oscuro**, estilo empresarial metrología. **Logo solo en /login**; sidebar con texto “Qualister”. Gráficas con **CSS puro**.

> POC no aplicable / omitir Fase 1 de POC: no hay integraciones externas ni backend.

## 2. Implementation Steps

### Phase 1 — Setup & Core Shell (No POC)
**User stories**
1. Como Usuario de Ventas, quiero iniciar sesión de forma simulada para acceder al módulo.
2. Como Usuario de Ventas, quiero ver una navegación consistente (sidebar + header) para ubicarme en el sistema.
3. Como Usuario de Ventas, quiero poder cerrar sesión para regresar a la pantalla de login.
4. Como Usuario de Ventas, quiero que la app sea responsive para usarla en desktop y móvil.
5. Como Usuario de Ventas, quiero ver etiquetas de “Prototipo/Dato de demostración” para entender que no es producción.

**Steps**
- Crear proyecto React + Vite, Tailwind, shadcn/ui, react-router-dom.
- Definir design tokens (colores, tipografía, espaciado) y componentes base (Button, Badge, Tabs, Sheet/Drawer, Dialog, Table wrappers).
- Implementar routing base:
  - `/login`
  - `/ventas/*` con layout protegido **solo por estado en memoria** (si no “logueado”, redirigir a /login).
- Crear layout Ventas:
  - Sidebar (contraíble desktop + menú móvil), items: Dashboard, Prospectos, Clientes, Seguimientos, Cotizaciones, Tarifario.
  - Header: título de pantalla, breadcrumbs, buscador visual, notificaciones visual, “Usuario de Ventas” + etiqueta “Ventas”, menú usuario con “Cerrar sesión”.
- Añadir assets: logo (solo login) desde URL proporcionada.

### Phase 2 — Mock Data & Reusable UI
**User stories**
1. Como Usuario de Ventas, quiero ver listas con datos de demostración coherentes para validar el flujo.
2. Como Usuario de Ventas, quiero filtrar/buscar visualmente para encontrar registros rápido.
3. Como Usuario de Ventas, quiero abrir paneles laterales/modales para altas/acciones sin salir de la pantalla.
4. Como Usuario de Ventas, quiero ver estados con colores consistentes para interpretar prioridad.
5. Como Usuario de Ventas, quiero navegar a pantallas de detalle desde tablas/acciones.

**Steps**
- Crear `/src/mocks/` (centralizado) con:
  - `prospectos.mock.ts` (~10–12)
  - `clientes.mock.ts` (~8)
  - `seguimientos.mock.ts` (~12)
  - `cotizaciones.mock.ts` (~10)
  - `tarifario.mock.ts` (~25)
  - `common.mock.ts` (usuarios, catálogos, estados, magnitudes: **Temperatura, Humedad, RF, Eléctrica**)
- Helpers UI:
  - `StatusBadge`, `PageHeader`, `Breadcrumbs`, `EmptyState`, `FiltersBar`, `DataTableShell` (sin lógica servidor).
- Convención: todo mock marcado como **“Dato de demostración”** y empresas tipo “Empresa Demo A/B”.

### Phase 3 — Screen Build-out (All routes working)

#### 3.1 Login `/login`
**User stories**
1. Como Usuario de Ventas, quiero ver el logo y campos de acceso en una pantalla profesional.
2. Como Usuario de Ventas, quiero mostrar/ocultar contraseña.
3. Como Usuario de Ventas, quiero “Recordarme” y “Olvidaste tu contraseña” como elementos visuales.
4. Como Usuario de Ventas, quiero entrar si correo y contraseña no están vacíos.
5. Como Usuario de Ventas, quiero ver indicador “Prototipo visual”.

**Steps**
- Pantalla centrada con logo + “Qualister - Laboratorio de Metrología” + subtítulo.
- Validación mínima (no vacío) y navegación a `/ventas/dashboard`.

#### 3.2 Dashboard `/ventas/dashboard`
**User stories**
1. Como Usuario de Ventas, quiero ver KPIs clave de ventas en tarjetas.
2. Como Usuario de Ventas, quiero un embudo visual para entender el pipeline.
3. Como Usuario de Ventas, quiero ver cotizaciones por estado en una gráfica simple.
4. Como Usuario de Ventas, quiero ver actividades recientes y próximos seguimientos.
5. Como Usuario de Ventas, quiero accesos rápidos a crear prospecto/seguimiento/cotización.

**Steps**
- Cards: nuevos, pendientes, vencidos, cotizaciones (borrador/enviadas/aceptadas/rechazadas/próximas a vencer), valor embudo, % conversión.
- Gráficas **CSS puro** (barras/embudo con divs).
- Listas: recientes + próximos seguimientos.

#### 3.3 Prospectos `/ventas/prospectos` + detalle `/ventas/prospectos/:id`
**User stories**
1. Como Usuario de Ventas, quiero alternar entre vista Tabla y Kanban/Embudo.
2. Como Usuario de Ventas, quiero filtrar por estado/fecha/magnitud/próximo seguimiento.
3. Como Usuario de Ventas, quiero crear un nuevo prospecto desde un panel lateral.
4. Como Usuario de Ventas, quiero abrir el detalle y ver pestañas organizadas.
5. Como Usuario de Ventas, quiero acciones (registrar seguimiento, crear cotización, convertir) como prototipo sin persistencia.

**Steps**
- Tabla con columnas requeridas + acciones (Ver detalle).
- Vista Kanban/Embudo (columnas por estado) drag visual opcional (sin persistencia) o solo distribución.
- Drawer “Nuevo prospecto” (form completo) -> al guardar: toast “Guardado temporal (demo)”.
- Detalle con tabs: Resumen, Contactos, Seguimientos, Documentos, Cotizaciones, Historial.
- Modales:
  - “Generar formato Excel” (explicativo, sin archivo)
  - “Cargar formato” (file picker muestra nombre)
  - “Convertir en cliente” / “Marcar no calificado” (confirmación visual)

#### 3.4 Clientes `/ventas/clientes` + detalle `/ventas/clientes/:id`
**User stories**
1. Como Usuario de Ventas, quiero ver clientes con estados comerciales claros.
2. Como Usuario de Ventas, quiero filtrar y buscar clientes.
3. Como Usuario de Ventas, quiero abrir detalle con pestañas para información comercial.
4. Como Usuario de Ventas, quiero ver cotizaciones relacionadas (mock).
5. Como Usuario de Ventas, quiero evitar ver módulos de finanzas.

**Steps**
- Tabla con columnas requeridas + filtros.
- Detalle tabs: Resumen, Información comercial, Contactos, Ubicaciones, Cotizaciones, Documentos, Actividades.

#### 3.5 Seguimientos `/ventas/seguimientos`
**User stories**
1. Como Usuario de Ventas, quiero ver seguimientos en Lista/Calendario/Línea de tiempo.
2. Como Usuario de Ventas, quiero filtrar por fecha/tipo/estado.
3. Como Usuario de Ventas, quiero crear un nuevo seguimiento con formulario.
4. Como Usuario de Ventas, quiero identificar vencidos y próximos con colores.
5. Como Usuario de Ventas, quiero navegar al prospecto/cliente desde un seguimiento.

**Steps**
- Tabs: Lista (tabla), Calendario (grid simple mensual/semanal visual), Timeline (vertical).
- Modal/Drawer “Nuevo seguimiento”.

#### 3.6 Tarifario `/ventas/tarifario`
**User stories**
1. Como Usuario de Ventas, quiero buscar por código o servicio.
2. Como Usuario de Ventas, quiero filtrar por magnitud/moneda/modalidad/estado.
3. Como Usuario de Ventas, quiero ver el tarifario organizado por magnitud.
4. Como Usuario de Ventas, quiero ver tipo de cambio demo con fuente futura.
5. Como Usuario de Ventas, quiero UI para nuevo/editar servicio sin guardar real.

**Steps**
- Tabla con campos requeridos + filtros.
- Tarjeta tipo de cambio: valor/fecha ejemplo + “Dato de demostración” + “Fuente futura: Banco de México”.
- Drawer “Nuevo servicio” y “Editar tarifa”.

#### 3.7 Cotizaciones `/ventas/cotizaciones`, nueva `/ventas/cotizaciones/nueva`, detalle `/ventas/cotizaciones/:id`
**User stories**
1. Como Usuario de Ventas, quiero listar cotizaciones y filtrar por estado/fecha/cliente/moneda.
2. Como Usuario de Ventas, quiero crear una cotización en un wizard de 5 pasos.
3. Como Usuario de Ventas, quiero seleccionar servicios por magnitud→servicio→variante del tarifario.
4. Como Usuario de Ventas, quiero ver cálculos locales (subtotal/descuento/impuestos/total) sin backend.
5. Como Usuario de Ventas, quiero una vista previa y botones que indiquen funciones futuras (PDF/Enviar).

**Steps**
- Tabla cotizaciones + acciones (ver, duplicar visual opcional, etc.).
- Wizard 5 pasos (estado en memoria):
  - Paso 1 seleccionar prospecto/cliente (mock)
  - Paso 2 config (moneda, fecha, vigencia, condiciones, lugar)
  - Paso 3 partidas desde tarifario (agregar/eliminar)
  - Paso 4 resumen (cálculos locales) + términos
  - Paso 5 preview profesional + botones muestran modal “se habilitará con backend”.
- Detalle cotización: datos generales, tipo de cambio demo, partidas, totales, historial visual.
- Sección “Evidencia de aceptación”: selector tipo, file picker (solo nombre), modal “Registrar aceptación” explicativo.

### Phase 4 — QA Pass (Frontend) + Fixes
**User stories**
1. Como Usuario de Ventas, quiero que ninguna ruta esté rota.
2. Como Usuario de Ventas, quiero que todos los botones principales abran su modal/pantalla.
3. Como Usuario de Ventas, quiero consistencia visual entre pantallas.
4. Como Usuario de Ventas, quiero que la app funcione en móvil sin romper layout.
5. Como Usuario de Ventas, quiero mensajes claros cuando una función es “futura”.

**Steps**
- Ejecutar `testing_agent` (solo frontend) para recorrido E2E: login→dashboard→cada sección→detalles→wizard.
- Revisar accesibilidad básica (contraste, focus visible), responsive, overflow en tablas.
- Ajustes finales de copy en español y etiquetas “demo/prototipo”.

## 3. Next Actions
- Inicializar proyecto (Vite + Tailwind + shadcn/ui) y configurar react-router-dom.
- Implementar layout Ventas (sidebar/header) y rutas base.
- Crear mocks centralizados y componentes reutilizables.
- Construir pantallas en el orden: Login → Dashboard → Prospectos (+ detalle) → Cotizaciones (lista+wizard+detalle) → Seguimientos → Clientes → Tarifario.
- Ejecutar testing_agent y corregir issues.

## 4. Success Criteria
- Solo existe perfil visible **Ventas** (“Usuario de Ventas”), sin selector ni otros roles.
- Login simulado: si campos no vacíos, navega a dashboard; “Cerrar sesión” regresa a login.
- Todas las rutas listadas funcionan y tienen navegación (ver detalle, volver, cancelar).
- Sidebar contraíble + menú móvil operativos; header consistente con breadcrumbs y elementos visuales.
- Dashboard incluye KPIs, embudo y barras por estado **con CSS**, listas y accesos rápidos.
- Prospectos con vista Tabla y Kanban/Embudo, filtros, drawer nuevo, detalle con tabs y modales de acciones.
- Clientes, Seguimientos (3 vistas), Tarifario y Cotizaciones (incl. wizard 5 pasos) completos visualmente.
- Datos mock centralizados en `/src/mocks` y marcados como demostración; sin localStorage/cookies.
- Botones “PDF/Enviar/Excel/Carga/Tipo de cambio” muestran mensajes de función futura; no hay integraciones.
- `testing_agent` pasa recorrido E2E sin errores de navegación ni pantallas rotas.

---

## ESTADO DE AVANCE (actualizado)

- [x] **Fase 1 — Setup & Core Shell**: tokens de diseño en `index.css`, `SesionProvider` (sesión simulada en memoria), `VentasLayout` (sidebar colapsable + Sheet móvil + topbar sticky con breadcrumbs/buscador/notificaciones/menú usuario), rutas completas en `App.js`.
- [x] **Fase 2 — Mocks & componentes reutilizables**: `/src/mocks/` (catalogos, tarifario, prospectos, clientes, seguimientos, cotizaciones, dashboard, README) + `components/common` (StatusBadge, PageHeader, DemoNotice/DemoTag, KpiCard, EmptyState, FutureFeatureDialog, FilePickerField) + `components/ventas` (ProspectoFormSheet, SeguimientoFormSheet, CotizacionPreview).
- [x] **Fase 3 — Pantallas**: Login, Dashboard (10 KPIs + embudo CSS + barras CSS + actividades + próximos seguimientos + accesos rápidos), Prospectos (tabla/Kanban + filtros + drawer 16 campos), Detalle de prospecto (6 pestañas + 7 acciones + modales Excel/carga/convertir/no calificado), Clientes + detalle (7 pestañas), Seguimientos (lista/calendario/timeline), Tarifario (agrupado + filtros + tarjeta FX demo + drawers), Cotizaciones (tabla + filtros), Wizard de 5 pasos, Detalle de cotización (5 pestañas + Evidencia de aceptación).
- [x] Verificación visual con screenshots (desktop 1920 y móvil 414): login, dashboard, prospectos tabla/Kanban, tarifario, wizard paso 3 y 5, menú móvil.
- [x] **Fase 4 — Testing E2E**: testing_agent_v3 iteración 1 → 100% frontend, 0 bugs (ver /app/test_reports/iteration_1.json). Verificación adicional propia: detalle de prospecto (modal Excel, convertir en cliente), detalle de cliente (pestañas), evidencia de aceptación en cotización.

### Notas
- Sesión en memoria: al recargar la página se regresa a `/login` (comportamiento esperado; no hay persistencia por requerimiento).
- Fecha de referencia del prototipo: `2025-03-14` (`hoyDemo` en `src/lib/format.js`).
