// ⚠️ DATOS DE DEMOSTRACIÓN — tarifario ficticio de EQUIPOS de ejemplo.
// El tarifario es exclusivamente de EQUIPO/INSTRUMENTO a calibrar (no de servicios completos).
// Nota: el campo `servicio` se mantiene igual a `equipo` únicamente para compatibilidad
// con el asistente de Cotizaciones (que aún usa la nomenclatura anterior).

export const TARIFARIO = [
  { id: "T-001", codigo: "QLM-TEM-001", magnitud: "Temperatura", equipo: "Termómetro digital", servicio: "Termómetro digital", variante: "-30 °C a 100 °C", modalidad: "Laboratorio", precioMXN: 1450, precioUSD: 84, tiempoEstimado: "5 días hábiles", vigencia: "2025-12-31", estado: "Activo", descripcion: "Calibración de ejemplo para termómetro digital en rango bajo." },
  { id: "T-004", codigo: "QLM-TEM-004", magnitud: "Temperatura", equipo: "Baño térmico", servicio: "Baño térmico", variante: "3 puntos", modalidad: "En sitio", precioMXN: 3400, precioUSD: 197, tiempoEstimado: "3 días hábiles", vigencia: "2025-12-31", estado: "Activo", descripcion: "Calibración en sitio de baño térmico, ejemplo." },
  { id: "T-008", codigo: "QLM-HUM-001", magnitud: "Humedad", equipo: "Higrómetro", servicio: "Higrómetro", variante: "20 % a 80 % HR", modalidad: "Laboratorio", precioMXN: 1980, precioUSD: 115, tiempoEstimado: "6 días hábiles", vigencia: "2025-12-31", estado: "Activo", descripcion: "Calibración de higrómetro de ejemplo." },
  { id: "T-010", codigo: "QLM-HUM-003", magnitud: "Humedad", equipo: "Datalogger HR/T", servicio: "Datalogger HR/T", variante: "3 puntos", modalidad: "Laboratorio", precioMXN: 1320, precioUSD: 77, tiempoEstimado: "5 días hábiles", vigencia: "2026-03-31", estado: "Activo", descripcion: "Calibración de datalogger de demostración." },
  { id: "T-014", codigo: "QLM-RF-001", magnitud: "RF", equipo: "Analizador de espectro", servicio: "Analizador de espectro", variante: "9 kHz a 3 GHz", modalidad: "Laboratorio", precioMXN: 8600, precioUSD: 499, tiempoEstimado: "10 días hábiles", vigencia: "2025-12-31", estado: "Activo", descripcion: "Calibración de analizador de espectro, ejemplo." },
  { id: "T-021", codigo: "QLM-ELE-001", magnitud: "Eléctrica", equipo: "Multímetro digital", servicio: "Multímetro digital", variante: "3 ½ dígitos", modalidad: "Laboratorio", precioMXN: 1250, precioUSD: 73, tiempoEstimado: "5 días hábiles", vigencia: "2025-12-31", estado: "Activo", descripcion: "Calibración de multímetro de ejemplo." },
  { id: "T-024", codigo: "QLM-ELE-004", magnitud: "Eléctrica", equipo: "Fuente de alimentación", servicio: "Fuente de alimentación", variante: "CD hasta 60 V", modalidad: "Laboratorio", precioMXN: 2100, precioUSD: 122, tiempoEstimado: "6 días hábiles", vigencia: "2026-04-30", estado: "Activo", descripcion: "Calibración de fuente de CD, ejemplo." },
];
