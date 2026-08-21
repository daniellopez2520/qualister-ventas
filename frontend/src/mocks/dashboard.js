// ⚠️ DATOS DE DEMOSTRACIÓN — indicadores derivados de los mocks.
// Fecha de referencia del prototipo (para calcular vencidos / próximos a vencer).

import { PROSPECTOS } from "./prospectos";
import { SEGUIMIENTOS } from "./seguimientos";
import { COTIZACIONES, calcularTotales } from "./cotizaciones";

export const FECHA_REFERENCIA = "2025-03-14";

const dias = (a, b) =>
  Math.round((new Date(a) - new Date(b)) / (1000 * 60 * 60 * 24));

const estadosEmbudo = [
  "Nuevo",
  "Contactado",
  "En calificación",
  "Calificado",
  "En negociación",
  "Convertido en cliente",
];

export const getEmbudo = () =>
  estadosEmbudo.map((estado) => ({
    estado,
    cantidad: PROSPECTOS.filter((p) => p.estado === estado).length,
  }));

export const getCotizacionesPorEstado = () => {
  const mapa = {};
  COTIZACIONES.forEach((c) => {
    mapa[c.estado] = (mapa[c.estado] || 0) + 1;
  });
  return Object.entries(mapa).map(([estado, cantidad]) => ({ estado, cantidad }));
};

export const getValorEmbudo = () => {
  const abiertas = ["Borrador", "Lista para enviar", "Enviada", "En negociación"];
  return COTIZACIONES.filter((c) => abiertas.includes(c.estado)).reduce((acc, c) => {
    const { total } = calcularTotales(c.partidas, c.descuentoPct, c.ivaPct);
    return acc + (c.moneda === "USD" ? total * c.tipoCambio : total);
  }, 0);
};

export const getKpis = () => {
  const seguimientosVencidos = SEGUIMIENTOS.filter((s) => s.estado === "Vencido").length;
  const proximasAVencer = COTIZACIONES.filter(
    (c) =>
      ["Enviada", "Lista para enviar", "En negociación"].includes(c.estado) &&
      dias(c.vigencia, FECHA_REFERENCIA) >= 0 &&
      dias(c.vigencia, FECHA_REFERENCIA) <= 10,
  ).length;
  const aceptadas = COTIZACIONES.filter((c) => c.estado === "Aceptada por el cliente").length;
  const enviadas = COTIZACIONES.filter((c) => c.estado === "Enviada").length;
  const conversion = COTIZACIONES.length
    ? Math.round((aceptadas / COTIZACIONES.length) * 100)
    : 0;

  return {
    prospectosNuevos: PROSPECTOS.filter((p) => p.estado === "Nuevo").length,
    prospectosPendientes: PROSPECTOS.filter(
      (p) => p.proximoSeguimiento && dias(p.proximoSeguimiento, FECHA_REFERENCIA) >= 0,
    ).length,
    seguimientosVencidos,
    cotizacionesBorrador: COTIZACIONES.filter((c) => c.estado === "Borrador").length,
    cotizacionesEnviadas: enviadas,
    cotizacionesAceptadas: aceptadas,
    cotizacionesRechazadas: COTIZACIONES.filter((c) => c.estado === "Rechazada").length,
    cotizacionesPorVencer: proximasAVencer,
    valorEmbudo: getValorEmbudo(),
    conversion,
  };
};

export const ACTIVIDADES_RECIENTES = [
  { id: "A-1", fecha: "2025-03-12", tipo: "Correo", titulo: "Cotización COT-2025-001 enviada", detalle: "Cliente de Prueba", usuario: "Usuario de Ventas" },
  { id: "A-2", fecha: "2025-03-12", tipo: "Nota", titulo: "Prospecto Laboratorio Demo Sur creado", detalle: "Origen: Sitio web", usuario: "Usuario de Ventas" },
  { id: "A-3", fecha: "2025-03-11", tipo: "Visita", titulo: "Levantamiento de equipos", detalle: "Empresa Demo F", usuario: "Usuario de Ventas" },
  { id: "A-4", fecha: "2025-03-10", tipo: "Reunión", titulo: "Aceptación de COT-2025-002", detalle: "Cliente de Prueba", usuario: "Usuario de Ventas" },
  { id: "A-5", fecha: "2025-03-07", tipo: "Tarea", titulo: "Documentos pendientes", detalle: "Empresa Demo D", usuario: "Usuario de Ventas" },
];

export const getProximosSeguimientos = () =>
  SEGUIMIENTOS.filter((s) => s.estado === "Programado")
    .slice()
    .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
    .slice(0, 5);
