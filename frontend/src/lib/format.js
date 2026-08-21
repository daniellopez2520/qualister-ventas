// Utilidades de formato para el prototipo (sin dependencias de backend).

export const formatMoneda = (valor, moneda = "MXN", decimales = 2) => {
  const num = Number(valor || 0);
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: moneda,
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  }).format(num);
};

export const formatNumero = (valor) =>
  new Intl.NumberFormat("es-MX").format(Number(valor || 0));

const MESES = [
  "ene", "feb", "mar", "abr", "may", "jun",
  "jul", "ago", "sep", "oct", "nov", "dic",
];

export const formatFecha = (iso) => {
  if (!iso) return "—";
  const [y, m, d] = String(iso).split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${String(d).padStart(2, "0")} ${MESES[m - 1]} ${y}`;
};

export const formatFechaLarga = (iso) => {
  if (!iso) return "—";
  const [y, m, d] = String(iso).split("-").map(Number);
  const nombres = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
  ];
  if (!y || !m || !d) return iso;
  return `${d} de ${nombres[m - 1]} de ${y}`;
};

export const diasEntre = (a, b) =>
  Math.round((new Date(a) - new Date(b)) / (1000 * 60 * 60 * 24));

export const hoyDemo = "2025-03-14";
