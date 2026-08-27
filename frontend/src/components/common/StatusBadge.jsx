import React from "react";
import { cn } from "@/lib/utils";

const TONOS = {
  success: "bg-green-50 text-green-700 border-green-200",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  danger: "bg-red-50 text-red-700 border-red-200",
  info: "bg-blue-50 text-blue-700 border-blue-200",
  neutral: "bg-slate-100 text-slate-700 border-slate-200",
};

const MAPA = {
  // Prospectos
  "Nuevo": "info",
  "Contactado": "info",
  "En calificación": "warning",
  "Calificado": "success",
  "Formato de alta enviado": "warning",
  "Formato recibido": "success",
  "En negociación": "warning",
  "Convertido en cliente": "success",
  "No calificado": "neutral",
  "Perdido": "danger",
  // Clientes
  "Pendiente de información": "warning",
  "Pendiente de validación": "warning",
  "Activo": "success",
  "Bloqueado": "danger",
  "Inactivo": "neutral",
  // Cotizaciones
  "Borrador": "neutral",
  "Lista para enviar": "info",
  "Enviada": "info",
  "Aceptada por el cliente": "success",
  "Rechazada": "danger",
  "Vencida": "danger",
  "Cancelada": "neutral",
  // Seguimientos
  "Programado": "info",
  "Completado": "success",
  "Vencido": "danger",
  "Cancelado": "neutral",
  // Actividades
  "Llamada": "info",
  "Correo": "neutral",
  "Reunión": "info",
  "Visita": "warning",
  "Nota": "neutral",
  "Tarea": "warning",
  // Tarifario
  "En revisión": "warning",
};

export const tonoDeEstado = (estado) => MAPA[estado] || "neutral";

export const StatusBadge = ({ estado, className, testId }) => (
  <span
    data-testid={testId || "status-badge"}
    className={cn(
      "inline-flex items-center whitespace-nowrap rounded-full border px-2 py-0.5 text-xs font-medium",
      TONOS[tonoDeEstado(estado)],
      className,
    )}
  >
    {estado || "—"}
  </span>
);

export const BARRA_COLOR = {
  success: "bg-green-600",
  warning: "bg-amber-500",
  danger: "bg-red-600",
  info: "bg-blue-700",
  neutral: "bg-slate-500",
};
