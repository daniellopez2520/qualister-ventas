import {
  LayoutDashboard,
  Target,
  Building2,
  CalendarClock,
  FileText,
  Tags,
} from "lucide-react";

// Navegación Única del perfil VENTAS (no existen otros perfiles en esta etapa).
export const NAV_ITEMS = [
  { label: "Dashboard", to: "/ventas/dashboard", icon: LayoutDashboard, testId: "sidebar-nav-dashboard" },
  { label: "Prospectos", to: "/ventas/prospectos", icon: Target, testId: "sidebar-nav-prospectos" },
  { label: "Clientes", to: "/ventas/clientes", icon: Building2, testId: "sidebar-nav-clientes" },
  { label: "Seguimientos", to: "/ventas/seguimientos", icon: CalendarClock, testId: "sidebar-nav-seguimientos" },
  { label: "Cotizaciones", to: "/ventas/cotizaciones", icon: FileText, testId: "sidebar-nav-cotizaciones" },
  { label: "Tarifario", to: "/ventas/tarifario", icon: Tags, testId: "sidebar-nav-tarifario" },
];
