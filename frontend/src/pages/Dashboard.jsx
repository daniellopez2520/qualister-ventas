import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Target,
  CalendarClock,
  AlertTriangle,
  FileEdit,
  Send,
  CheckCircle2,
  XCircle,
  Timer,
  Wallet,
  Percent,
  Plus,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/common/PageHeader";
import { DemoNotice, DemoTag } from "@/components/common/DemoNotice";
import { KpiCard } from "@/components/common/KpiCard";
import { StatusBadge, tonoDeEstado, BARRA_COLOR } from "@/components/common/StatusBadge";
import { formatMoneda, formatFecha } from "@/lib/format";
import {
  getKpis,
  getEmbudo,
  getCotizacionesPorEstado,
  ACTIVIDADES_RECIENTES,
  getProximosSeguimientos,
} from "@/mocks";

const Dashboard = () => {
  const navigate = useNavigate();
  const kpis = getKpis();
  const embudo = getEmbudo();
  const porEstado = getCotizacionesPorEstado();
  const proximos = getProximosSeguimientos();

  const maxEmbudo = Math.max(...embudo.map((e) => e.cantidad), 1);
  const maxEstado = Math.max(...porEstado.map((e) => e.cantidad), 1);

  const tarjetas = [
    { titulo: "Prospectos nuevos", valor: kpis.prospectosNuevos, nota: "Sin primer contacto", icon: Target, tono: "info", testId: "kpi-prospectos-nuevos" },
    { titulo: "Pendientes de seguimiento", valor: kpis.prospectosPendientes, nota: "Con fecha programada", icon: CalendarClock, tono: "warning", testId: "kpi-prospectos-pendientes" },
    { titulo: "Seguimientos vencidos", valor: kpis.seguimientosVencidos, nota: "Requieren atención", icon: AlertTriangle, tono: "danger", testId: "kpi-seguimientos-vencidos" },
    { titulo: "Cotizaciones en borrador", valor: kpis.cotizacionesBorrador, nota: "Sin enviar", icon: FileEdit, tono: "neutral", testId: "kpi-cotizaciones-borrador" },
    { titulo: "Cotizaciones enviadas", valor: kpis.cotizacionesEnviadas, nota: "En espera de respuesta", icon: Send, tono: "info", testId: "kpi-cotizaciones-enviadas" },
    { titulo: "Cotizaciones aceptadas", valor: kpis.cotizacionesAceptadas, nota: "Con evidencia registrada", icon: CheckCircle2, tono: "success", testId: "kpi-cotizaciones-aceptadas" },
    { titulo: "Cotizaciones rechazadas", valor: kpis.cotizacionesRechazadas, nota: "Motivo registrado", icon: XCircle, tono: "danger", testId: "kpi-cotizaciones-rechazadas" },
    { titulo: "Próximas a vencer", valor: kpis.cotizacionesPorVencer, nota: "Vigencia ≤ 10 días", icon: Timer, tono: "warning", testId: "kpi-cotizaciones-por-vencer" },
    { titulo: "Valor del embudo", valor: formatMoneda(kpis.valorEmbudo, "MXN", 0), nota: "Cotizaciones abiertas", icon: Wallet, tono: "info", testId: "kpi-valor-embudo" },
    { titulo: "Conversión", valor: `${kpis.conversion}%`, nota: "Aceptadas / totales", icon: Percent, tono: "success", testId: "kpi-conversion" },
  ];

  return (
    <div className="space-y-5">
      <PageHeader
        titulo="Dashboard"
        descripcion="Resumen comercial del módulo de Ventas · Usuario de Ventas"
        acciones={
          <>
            <Button
              data-testid="dashboard-quick-new-prospecto"
              onClick={() => navigate("/ventas/prospectos?nuevo=1")}
            >
              <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
              Nuevo prospecto
            </Button>
            <Button
              variant="outline"
              data-testid="dashboard-quick-new-seguimiento"
              onClick={() => navigate("/ventas/seguimientos?nuevo=1")}
            >
              <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
              Nuevo seguimiento
            </Button>
            <Button
              variant="outline"
              data-testid="dashboard-quick-new-cotizacion"
              onClick={() => navigate("/ventas/cotizaciones/nueva")}
            >
              <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
              Nueva cotización
            </Button>
          </>
        }
      />

      <section
        data-testid="dashboard-kpis"
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5"
      >
        {tarjetas.map((t) => (
          <KpiCard key={t.titulo} {...t} />
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <Card className="lg:col-span-7" data-testid="dashboard-funnel-chart">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="font-display text-base">Embudo de ventas</CardTitle>
            <DemoTag />
          </CardHeader>
          <CardContent className="space-y-2">
            {embudo.map((e) => {
              const pct = Math.max((e.cantidad / maxEmbudo) * 100, 6);
              return (
                <div key={e.estado} className="relative h-10 overflow-hidden rounded-md border border-blue-200 bg-blue-50">
                  <div
                    className="absolute inset-y-0 left-0 bg-blue-600/25"
                    style={{ width: `${pct}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-between px-3">
                    <span className="text-sm font-medium text-slate-800">{e.estado}</span>
                    <span className="num text-sm font-semibold text-slate-900">{e.cantidad}</span>
                  </div>
                </div>
              );
            })}
            <p className="pt-1 text-xs text-muted-foreground">
              Distribución de prospectos de demostración por etapa comercial.
            </p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-5" data-testid="dashboard-quote-status-bars">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="font-display text-base">Cotizaciones por estado</CardTitle>
            <DemoTag />
          </CardHeader>
          <CardContent className="space-y-3">
            {porEstado.map((e) => (
              <div key={e.estado} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-700">{e.estado}</span>
                  <span className="num font-semibold text-slate-900">{e.cantidad}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className={`h-full rounded-full ${BARRA_COLOR[tonoDeEstado(e.estado)]}`}
                    style={{ width: `${(e.cantidad / maxEstado) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card data-testid="dashboard-recent-activities">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="font-display text-base">Actividades recientes</CardTitle>
            <DemoTag />
          </CardHeader>
          <CardContent className="p-0">
            <ul className="divide-y">
              {ACTIVIDADES_RECIENTES.map((a) => (
                <li key={a.id} className="flex items-start justify-between gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-900">{a.titulo}</p>
                    <p className="text-xs text-muted-foreground">
                      {a.detalle} · {a.usuario}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <StatusBadge estado={a.tipo} />
                    <span className="text-xs text-muted-foreground">{formatFecha(a.fecha)}</span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card data-testid="dashboard-next-followups">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="font-display text-base">Próximos seguimientos</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              data-testid="dashboard-goto-seguimientos"
              onClick={() => navigate("/ventas/seguimientos")}
            >
              Ver todos
              <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="divide-y">
              {proximos.map((s) => (
                <li key={s.id} className="flex items-start justify-between gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-900">{s.relacion}</p>
                    <p className="text-xs text-muted-foreground">
                      {s.proximaAccion} · {s.responsable}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <StatusBadge estado={s.tipo} />
                    <span className="num text-xs text-muted-foreground">
                      {formatFecha(s.fecha)} {s.hora}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Dashboard;
