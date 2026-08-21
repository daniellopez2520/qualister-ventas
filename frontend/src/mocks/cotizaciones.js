// ⚠️ DATOS DE DEMOSTRACIÓN — cotizaciones ficticias.

export const COTIZACIONES = [
  {
    id: "Q-4001", folio: "COT-2025-001", revision: 1, tipoCliente: "Cliente", relacionId: "C-2001",
    cliente: "Cliente de Prueba", contacto: "Fernando Demo Ríos", correo: "fernando@clientedeprueba.mx",
    fecha: "2025-03-12", vigencia: "2025-04-11", moneda: "MXN", tipoCambio: 17.25,
    condicionesPago: "Crédito 30 días", lugarServicio: "Laboratorio Qualister",
    estado: "Enviada", responsable: "Usuario de Ventas", descuentoPct: 5, ivaPct: 16,
    notas: "Cotización de demostración. No representa una oferta real.",
    partidas: [
      { codigo: "QLM-TEM-001", magnitud: "Temperatura", servicio: "Calibración de termómetro digital", variante: "-30 °C a 100 °C", cantidad: 6, precio: 1450, tiempoEstimado: "5 días hábiles" },
      { codigo: "QLM-HUM-003", magnitud: "Humedad", servicio: "Calibración de datalogger HR/T", variante: "3 puntos", cantidad: 10, precio: 1320, tiempoEstimado: "5 días hábiles" },
    ],
    historial: [
      { fecha: "2025-03-12", evento: "Cotización creada", usuario: "Usuario de Ventas", detalle: "Revisión 1 (demo)" },
      { fecha: "2025-03-12", evento: "Enviada al cliente", usuario: "Usuario de Ventas", detalle: "Simulación de envío" },
    ],
    evidencias: [],
  },
  {
    id: "Q-4002", folio: "COT-2025-002", revision: 2, tipoCliente: "Cliente", relacionId: "C-2001",
    cliente: "Cliente de Prueba", contacto: "Adriana Demo Solis", correo: "calidad@clientedeprueba.mx",
    fecha: "2025-03-05", vigencia: "2025-04-04", moneda: "MXN", tipoCambio: 17.25,
    condicionesPago: "Crédito 30 días", lugarServicio: "Instalaciones del cliente",
    estado: "Aceptada por el cliente", responsable: "Usuario de Ventas", descuentoPct: 0, ivaPct: 16,
    notas: "Aceptación de demostración registrada de forma visual.",
    partidas: [
      { codigo: "QLM-HUM-005", magnitud: "Humedad", servicio: "Mapeo de humedad en almacén", variante: "Hasta 100 m²", cantidad: 1, precio: 9800, tiempoEstimado: "8 días hábiles" },
      { codigo: "QLM-TEM-006", magnitud: "Temperatura", servicio: "Mapeo térmico de cámara", variante: "9 sensores", cantidad: 1, precio: 12500, tiempoEstimado: "10 días hábiles" },
    ],
    historial: [
      { fecha: "2025-03-05", evento: "Cotización creada", usuario: "Usuario de Ventas", detalle: "Revisión 1 (demo)" },
      { fecha: "2025-03-07", evento: "Revisión 2 generada", usuario: "Usuario de Ventas", detalle: "Ajuste de alcance" },
      { fecha: "2025-03-10", evento: "Aceptada por el cliente", usuario: "Usuario de Ventas", detalle: "Evidencia de demostración" },
    ],
    evidencias: [{ tipo: "Orden de compra", archivo: "OC_demo_4521.pdf", descripcion: "Orden de compra de demostración", fecha: "2025-03-10" }],
  },
  {
    id: "Q-4003", folio: "COT-2025-003", revision: 1, tipoCliente: "Prospecto", relacionId: "P-1006",
    cliente: "Telecom Demo", contacto: "Hugo Demo Vargas", correo: "hugo@telecomdemo.mx",
    fecha: "2025-03-11", vigencia: "2025-03-25", moneda: "USD", tipoCambio: 17.25,
    condicionesPago: "Pago de contado", lugarServicio: "Laboratorio Qualister",
    estado: "Borrador", responsable: "Vendedor Demo 3", descuentoPct: 0, ivaPct: 16,
    notas: "Borrador de demostración.",
    partidas: [
      { codigo: "QLM-RF-005", magnitud: "RF", servicio: "Calibración de medidor de potencia RF", variante: "Sensor térmico", cantidad: 2, precio: 359, tiempoEstimado: "8 días hábiles" },
      { codigo: "QLM-RF-007", magnitud: "RF", servicio: "Verificación de atenuadores y cables", variante: "Hasta 6 GHz", cantidad: 4, precio: 168, tiempoEstimado: "4 días hábiles" },
    ],
    historial: [{ fecha: "2025-03-11", evento: "Cotización creada", usuario: "Vendedor Demo 3", detalle: "Borrador (demo)" }],
    evidencias: [],
  },
  {
    id: "Q-4004", folio: "COT-2025-004", revision: 1, tipoCliente: "Prospecto", relacionId: "P-1007",
    cliente: "Automotriz Demo Centro", contacto: "Silvia Demo Peña", correo: "silvia@autodemo.mx",
    fecha: "2025-03-03", vigencia: "2025-04-02", moneda: "MXN", tipoCambio: 17.25,
    condicionesPago: "Crédito 15 días", lugarServicio: "Mixto (laboratorio y sitio)",
    estado: "En negociación", responsable: "Usuario de Ventas", descuentoPct: 8, ivaPct: 16,
    notas: "Negociación de demostración por volumen.",
    partidas: [
      { codigo: "QLM-ELE-006", magnitud: "Eléctrica", servicio: "Calibración de calibrador de procesos", variante: "Multifunción", cantidad: 3, precio: 5600, tiempoEstimado: "9 días hábiles" },
      { codigo: "QLM-ELE-002", magnitud: "Eléctrica", servicio: "Calibración de multímetro digital", variante: "5 ½ dígitos", cantidad: 8, precio: 2350, tiempoEstimado: "6 días hábiles" },
    ],
    historial: [{ fecha: "2025-03-03", evento: "Cotización creada", usuario: "Usuario de Ventas", detalle: "Revisión 1 (demo)" }],
    evidencias: [],
  },
  {
    id: "Q-4005", folio: "COT-2025-005", revision: 1, tipoCliente: "Cliente", relacionId: "C-2005",
    cliente: "Empresa Demo F", contacto: "Lucía Demo Nava", correo: "lucia@empresademof.mx",
    fecha: "2025-03-08", vigencia: "2025-03-22", moneda: "USD", tipoCambio: 17.25,
    condicionesPago: "50% anticipo, 50% contra entrega", lugarServicio: "Laboratorio Qualister",
    estado: "Lista para enviar", responsable: "Usuario de Ventas", descuentoPct: 0, ivaPct: 16,
    notas: "Pendiente de envío (demostración).",
    partidas: [
      { codigo: "QLM-RF-002", magnitud: "RF", servicio: "Calibración de analizador de espectro", variante: "9 kHz a 26.5 GHz", cantidad: 1, precio: 951, tiempoEstimado: "15 días hábiles" },
    ],
    historial: [{ fecha: "2025-03-08", evento: "Cotización creada", usuario: "Usuario de Ventas", detalle: "Revisión 1 (demo)" }],
    evidencias: [],
  },
  {
    id: "Q-4006", folio: "COT-2025-006", revision: 3, tipoCliente: "Cliente", relacionId: "C-2003",
    cliente: "Empresa Demo D", contacto: "Norma Demo Gil", correo: "norma@empresademod.mx",
    fecha: "2025-02-14", vigencia: "2025-03-06", moneda: "USD", tipoCambio: 17.1,
    condicionesPago: "Pago de contado", lugarServicio: "Laboratorio Qualister",
    estado: "Vencida", responsable: "Usuario de Ventas", descuentoPct: 0, ivaPct: 16,
    notas: "Vigencia expirada (dato de demostración).",
    partidas: [
      { codigo: "QLM-RF-003", magnitud: "RF", servicio: "Calibración de generador de señales RF", variante: "100 kHz a 6 GHz", cantidad: 1, precio: 545, tiempoEstimado: "12 días hábiles" },
    ],
    historial: [{ fecha: "2025-02-14", evento: "Cotización creada", usuario: "Usuario de Ventas", detalle: "Revisión 1 (demo)" }],
    evidencias: [],
  },
  {
    id: "Q-4007", folio: "COT-2025-007", revision: 1, tipoCliente: "Cliente", relacionId: "C-2002",
    cliente: "Empresa Demo C", contacto: "Roberto Demo León", correo: "roberto@empresademoc.mx",
    fecha: "2025-03-10", vigencia: "2025-04-09", moneda: "MXN", tipoCambio: 17.25,
    condicionesPago: "Crédito 15 días", lugarServicio: "Instalaciones del cliente",
    estado: "Enviada", responsable: "Vendedor Demo 2", descuentoPct: 3, ivaPct: 16,
    notas: "Dato de demostración.",
    partidas: [
      { codigo: "QLM-ELE-005", magnitud: "Eléctrica", servicio: "Calibración de pinza amperimétrica", variante: "Hasta 1000 A", cantidad: 5, precio: 4200, tiempoEstimado: "5 días hábiles" },
    ],
    historial: [{ fecha: "2025-03-10", evento: "Cotización creada", usuario: "Vendedor Demo 2", detalle: "Revisión 1 (demo)" }],
    evidencias: [],
  },
  {
    id: "Q-4008", folio: "COT-2025-008", revision: 1, tipoCliente: "Prospecto", relacionId: "P-1004",
    cliente: "Industrias Demo Norte", contacto: "Ricardo Demo Luna", correo: "ricardo@demonorte.mx",
    fecha: "2025-02-25", vigencia: "2025-03-27", moneda: "MXN", tipoCambio: 17.2,
    condicionesPago: "Pago de contado", lugarServicio: "Instalaciones del cliente",
    estado: "Rechazada", responsable: "Usuario de Ventas", descuentoPct: 0, ivaPct: 16,
    notas: "Rechazada por presupuesto (demostración).",
    partidas: [
      { codigo: "QLM-TEM-007", magnitud: "Temperatura", servicio: "Mapeo térmico de cámara", variante: "15 sensores", cantidad: 1, precio: 18900, tiempoEstimado: "12 días hábiles" },
    ],
    historial: [
      { fecha: "2025-02-25", evento: "Cotización creada", usuario: "Usuario de Ventas", detalle: "Revisión 1 (demo)" },
      { fecha: "2025-03-04", evento: "Rechazada", usuario: "Usuario de Ventas", detalle: "Motivo: presupuesto (demo)" },
    ],
    evidencias: [],
  },
  {
    id: "Q-4009", folio: "COT-2025-009", revision: 1, tipoCliente: "Cliente", relacionId: "C-2008",
    cliente: "Empresa Demo I", contacto: "Alberto Demo Ponce", correo: "alberto@empresademoi.mx",
    fecha: "2025-03-06", vigencia: "2025-03-20", moneda: "MXN", tipoCambio: 17.25,
    condicionesPago: "Crédito 30 días", lugarServicio: "Laboratorio Qualister",
    estado: "Enviada", responsable: "Usuario de Ventas", descuentoPct: 0, ivaPct: 16,
    notas: "Próxima a vencer (dato de demostración).",
    partidas: [
      { codigo: "QLM-HUM-001", magnitud: "Humedad", servicio: "Calibración de higrómetro", variante: "20 % a 80 % HR", cantidad: 4, precio: 1980, tiempoEstimado: "6 días hábiles" },
      { codigo: "QLM-ELE-001", magnitud: "Eléctrica", servicio: "Calibración de multímetro digital", variante: "3 ½ dígitos", cantidad: 12, precio: 1250, tiempoEstimado: "5 días hábiles" },
    ],
    historial: [{ fecha: "2025-03-06", evento: "Cotización creada", usuario: "Usuario de Ventas", detalle: "Revisión 1 (demo)" }],
    evidencias: [],
  },
  {
    id: "Q-4010", folio: "COT-2025-010", revision: 1, tipoCliente: "Prospecto", relacionId: "P-1010",
    cliente: "Aeroespacial Demo", contacto: "Diego Demo Fuentes", correo: "diego@aerodemo.mx",
    fecha: "2025-01-20", vigencia: "2025-02-19", moneda: "USD", tipoCambio: 17.0,
    condicionesPago: "Pago de contado", lugarServicio: "Laboratorio Qualister",
    estado: "Cancelada", responsable: "Vendedor Demo 3", descuentoPct: 0, ivaPct: 16,
    notas: "Cancelada (dato de demostración).",
    partidas: [
      { codigo: "QLM-RF-004", magnitud: "RF", servicio: "Calibración de generador de señales RF", variante: "100 kHz a 20 GHz", cantidad: 1, precio: 1032, tiempoEstimado: "15 días hábiles" },
    ],
    historial: [{ fecha: "2025-01-20", evento: "Cotización creada", usuario: "Vendedor Demo 3", detalle: "Revisión 1 (demo)" }],
    evidencias: [],
  },
];

// Utilidades de cálculo local (sin persistencia, solo para el prototipo)
export const calcularTotales = (partidas = [], descuentoPct = 0, ivaPct = 16) => {
  const subtotal = partidas.reduce(
    (acc, p) => acc + Number(p.cantidad || 0) * Number(p.precio || 0),
    0,
  );
  const descuento = (subtotal * Number(descuentoPct || 0)) / 100;
  const base = subtotal - descuento;
  const impuestos = (base * Number(ivaPct || 0)) / 100;
  return { subtotal, descuento, base, impuestos, total: base + impuestos };
};
