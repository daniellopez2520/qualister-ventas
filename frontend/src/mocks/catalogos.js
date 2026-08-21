// ⚠️ DATOS DE DEMOSTRACIÓN — no son datos reales de operación.

export const USUARIO_DEMO = {
  nombre: "Usuario de Ventas",
  perfil: "Ventas",
  correo: "ventas.demo@qualister.mx",
  iniciales: "UV",
};

export const MAGNITUDES = ["Temperatura", "Humedad", "RF", "Eléctrica"];

// Magnitud -> Servicios -> Variantes / alcances
export const SERVICIOS_POR_MAGNITUD = {
  Temperatura: [
    {
      servicio: "Calibración de termómetro digital",
      variantes: ["-30 °C a 100 °C", "0 °C a 300 °C", "100 °C a 600 °C"],
    },
    {
      servicio: "Calibración de baño térmico",
      variantes: ["3 puntos", "5 puntos"],
    },
    {
      servicio: "Mapeo térmico de cámara",
      variantes: ["9 sensores", "15 sensores"],
    },
  ],
  Humedad: [
    {
      servicio: "Calibración de higrómetro",
      variantes: ["20 % a 80 % HR", "10 % a 95 % HR"],
    },
    {
      servicio: "Calibración de datalogger HR/T",
      variantes: ["3 puntos", "5 puntos"],
    },
    {
      servicio: "Mapeo de humedad en almacén",
      variantes: ["Hasta 100 m²", "Hasta 500 m²"],
    },
  ],
  RF: [
    {
      servicio: "Calibración de analizador de espectro",
      variantes: ["9 kHz a 3 GHz", "9 kHz a 26.5 GHz"],
    },
    {
      servicio: "Calibración de generador de señales RF",
      variantes: ["100 kHz a 6 GHz", "100 kHz a 20 GHz"],
    },
    {
      servicio: "Calibración de medidor de potencia RF",
      variantes: ["Sensor térmico", "Sensor de diodo"],
    },
    {
      servicio: "Verificación de atenuadores y cables",
      variantes: ["Hasta 6 GHz", "Hasta 18 GHz"],
    },
  ],
  Eléctrica: [
    {
      servicio: "Calibración de multímetro digital",
      variantes: ["3 ½ dígitos", "5 ½ dígitos", "6 ½ dígitos"],
    },
    {
      servicio: "Calibración de fuente de alimentación",
      variantes: ["CD hasta 60 V", "CD hasta 300 V"],
    },
    {
      servicio: "Calibración de pinza amperimétrica",
      variantes: ["Hasta 200 A", "Hasta 1000 A"],
    },
    {
      servicio: "Calibración de calibrador de procesos",
      variantes: ["mA / mV", "Multifunción"],
    },
  ],
};

export const MODALIDADES = ["Laboratorio", "En sitio", "Remoto"];

export const ESTADOS_PROSPECTO = [
  "Nuevo",
  "Contactado",
  "En calificación",
  "Calificado",
  "Formato de alta enviado",
  "Formato recibido",
  "En negociación",
  "Convertido en cliente",
  "No calificado",
  "Perdido",
];

export const ESTADOS_CLIENTE = [
  "Pendiente de información",
  "Pendiente de validación",
  "Activo",
  "Bloqueado",
  "Inactivo",
];

export const ESTADOS_COTIZACION = [
  "Borrador",
  "Lista para enviar",
  "Enviada",
  "En negociación",
  "Aceptada por el cliente",
  "Rechazada",
  "Vencida",
  "Cancelada",
];

export const TIPOS_ACTIVIDAD = [
  "Llamada",
  "Correo",
  "Reunión",
  "Visita",
  "Nota",
  "Tarea",
];

export const ESTADOS_SEGUIMIENTO = [
  "Programado",
  "Completado",
  "Vencido",
  "Cancelado",
];

export const ORIGENES_PROSPECTO = [
  "Sitio web",
  "Referencia",
  "Feria industrial",
  "Llamada en frío",
  "Campaña de correo",
  "Cliente existente",
];

export const VENDEDORES = [
  "Usuario de Ventas",
  "Vendedor Demo 2",
  "Vendedor Demo 3",
];

export const PAISES = ["México", "Estados Unidos", "Colombia"];

export const ESTADOS_REPUBLICA = [
  "Aguascalientes",
  "Baja California",
  "Ciudad de México",
  "Estado de México",
  "Guanajuato",
  "Jalisco",
  "Nuevo León",
  "Querétaro",
  "San Luis Potosí",
];

export const CONDICIONES_PAGO = [
  "Pago de contado",
  "Crédito 15 días",
  "Crédito 30 días",
  "50% anticipo, 50% contra entrega",
];

export const LUGARES_SERVICIO = [
  "Laboratorio Qualister",
  "Instalaciones del cliente",
  "Mixto (laboratorio y sitio)",
];

export const TIPOS_EVIDENCIA = [
  "Orden de compra",
  "Correo de aceptación",
  "Cotización firmada",
  "Contrato",
  "Otro",
];

// Tipo de cambio: valor de ejemplo. NO se consulta ninguna fuente externa.
export const TIPO_CAMBIO_DEMO = {
  valor: 17.25,
  moneda: "MXN/USD",
  fecha: "2025-03-14",
  fuenteFutura: "Banco de México (pendiente de integración)",
  etiqueta: "Dato de demostración",
};

export const TERMINOS_DEMO = [
  "Precios expresados antes de IVA.",
  "Vigencia de la cotización sujeta a la fecha indicada.",
  "Los servicios se realizan conforme a los métodos internos del laboratorio.",
  "El certificado de calibración se entrega en formato digital.",
  "Documento de demostración: no constituye una oferta comercial real.",
];
