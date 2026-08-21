import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Plus, Search, X, List, CalendarDays, GitCommitVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/common/PageHeader";
import { DemoNotice } from "@/components/common/DemoNotice";
import { StatusBadge } from "@/components/common/StatusBadge";
import { EmptyState } from "@/components/common/EmptyState";
import { SeguimientoFormSheet } from "@/components/ventas/SeguimientoFormSheet";
import { formatFecha, formatFechaLarga } from "@/lib/format";
import { SEGUIMIENTOS, TIPOS_ACTIVIDAD, ESTADOS_SEGUIMIENTO } from "@/mocks";
import { toast } from "sonner";

const TODOS = "__todos__";
const DIAS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

// Calendario visual simple del mes de referencia del prototipo (marzo 2025).
const construirMes = (anio, mes) => {
  const primero = new Date(anio, mes, 1);
  const inicio = (primero.getDay() + 6) % 7; // lunes = 0
  const diasEnMes = new Date(anio, mes + 1, 0).getDate();
  const celdas = [];
  for (let i = 0; i < inicio; i += 1) celdas.push(null);
  for (let d = 1; d <= diasEnMes; d += 1) {
    celdas.push(
      `${anio}-${String(mes + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
    );
  }
  return celdas;
};

const Seguimientos = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [lista, setLista] = useState(SEGUIMIENTOS);
  const [busqueda, setBusqueda] = useState("");
  const [fTipo, setFTipo] = useState(TODOS);
  const [fEstado, setFEstado] = useState(TODOS);
  const [fDesde, setFDesde] = useState("");
  const [fHasta, setFHasta] = useState("");
  const [abrirForm, setAbrirForm] = useState(false);
  const [diaSeleccionado, setDiaSeleccionado] = useState("2025-03-18");

  useEffect(() => {
    if (searchParams.get("nuevo") === "1") {
      setAbrirForm(true);
      const next = new URLSearchParams(searchParams);
      next.delete("nuevo");
      setSearchParams(next, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const filtrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return lista.filter((s) => {
      if (q && !`${s.relacion} ${s.responsable} ${s.proximaAccion}`.toLowerCase().includes(q))
        return false;
      if (fTipo !== TODOS && s.tipo !== fTipo) return false;
      if (fEstado !== TODOS && s.estado !== fEstado) return false;
      if (fDesde && s.fecha < fDesde) return false;
      if (fHasta && s.fecha > fHasta) return false;
      return true;
    });
  }, [lista, busqueda, fTipo, fEstado, fDesde, fHasta]);

  const celdas = construirMes(2025, 2);
  const delDia = filtrados.filter((s) => s.fecha === diaSeleccionado);

  const timeline = useMemo(
    () => filtrados.slice().sort((a, b) => new Date(b.fecha) - new Date(a.fecha)),
    [filtrados],
  );

  return (
    <div className="space-y-5">
      <PageHeader
        titulo="Seguimientos"
        descripcion="Agenda comercial visual: lista, calendario y línea de tiempo"
        acciones={
          <Button data-testid="seguimientos-new-button" onClick={() => setAbrirForm(true)}>
            <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
            Nuevo seguimiento
          </Button>
        }
      />

      <DemoNotice />

      <Card>
        <CardContent className="space-y-3 p-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
            <div className="space-y-1.5 xl:col-span-1">
              <Label className="text-xs">Búsqueda</Label>
              <div className="relative">
                <Search
                  className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                />
                <Input
                  data-testid="seguimientos-search-input"
                  className="pl-8"
                  placeholder="Prospecto, cliente o responsable…"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Tipo de actividad</Label>
              <Select value={fTipo} onValueChange={setFTipo}>
                <SelectTrigger data-testid="seguimientos-filter-tipo">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={TODOS}>Todos los tipos</SelectItem>
                  {TIPOS_ACTIVIDAD.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Estado</Label>
              <Select value={fEstado} onValueChange={setFEstado}>
                <SelectTrigger data-testid="seguimientos-filter-estado">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={TODOS}>Todos los estados</SelectItem>
                  {ESTADOS_SEGUIMIENTO.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Desde</Label>
              <Input
                type="date"
                data-testid="seguimientos-filter-desde"
                value={fDesde}
                onChange={(e) => setFDesde(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Hasta</Label>
              <Input
                type="date"
                data-testid="seguimientos-filter-hasta"
                value={fHasta}
                onChange={(e) => setFHasta(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="num text-xs text-muted-foreground" data-testid="seguimientos-count">
              {filtrados.length} de {lista.length} seguimientos
            </p>
            <Button
              variant="ghost"
              size="sm"
              data-testid="seguimientos-filters-clear"
              onClick={() => {
                setBusqueda("");
                setFTipo(TODOS);
                setFEstado(TODOS);
                setFDesde("");
                setFHasta("");
              }}
            >
              <X className="mr-1 h-4 w-4" aria-hidden="true" />
              Limpiar filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="lista">
        <TabsList data-testid="seguimientos-view-tabs">
          <TabsTrigger value="lista" data-testid="seguimientos-view-lista">
            <List className="mr-2 h-4 w-4" aria-hidden="true" />
            Lista
          </TabsTrigger>
          <TabsTrigger value="calendario" data-testid="seguimientos-view-calendario">
            <CalendarDays className="mr-2 h-4 w-4" aria-hidden="true" />
            Calendario
          </TabsTrigger>
          <TabsTrigger value="timeline" data-testid="seguimientos-view-timeline">
            <GitCommitVertical className="mr-2 h-4 w-4" aria-hidden="true" />
            Línea de tiempo
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lista" className="mt-4">
          {filtrados.length === 0 ? (
            <EmptyState
              titulo="No hay seguimientos con estos filtros"
              descripcion="Ajusta los filtros para ver los datos de demostración."
            />
          ) : (
            <Card>
              <div className="qlm-table-wrap scrollbar-thin">
                <Table data-testid="seguimientos-table">
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead className="whitespace-nowrap">Prospecto / Cliente</TableHead>
                      <TableHead className="whitespace-nowrap">Tipo</TableHead>
                      <TableHead className="whitespace-nowrap">Fecha</TableHead>
                      <TableHead className="whitespace-nowrap">Hora</TableHead>
                      <TableHead className="whitespace-nowrap">Responsable</TableHead>
                      <TableHead className="whitespace-nowrap">Resultado</TableHead>
                      <TableHead className="whitespace-nowrap">Próxima acción</TableHead>
                      <TableHead className="whitespace-nowrap">Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtrados.map((s) => (
                      <TableRow key={s.id} data-testid="seguimientos-table-row" className="hover:bg-slate-50">
                        <TableCell className="max-w-[220px]">
                          <p className="truncate text-sm font-medium text-slate-900">{s.relacion}</p>
                          <p className="text-xs text-muted-foreground">{s.relacionTipo}</p>
                        </TableCell>
                        <TableCell><StatusBadge estado={s.tipo} /></TableCell>
                        <TableCell className="whitespace-nowrap text-sm">{formatFecha(s.fecha)}</TableCell>
                        <TableCell className="font-mono text-xs">{s.hora}</TableCell>
                        <TableCell className="whitespace-nowrap text-sm">{s.responsable}</TableCell>
                        <TableCell className="max-w-[180px] truncate text-sm">{s.resultado}</TableCell>
                        <TableCell className="max-w-[180px] truncate text-sm">{s.proximaAccion}</TableCell>
                        <TableCell><StatusBadge estado={s.estado} /></TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            variant="ghost"
                            data-testid={`seguimientos-row-goto-${s.id}`}
                            onClick={() =>
                              navigate(
                                s.relacionTipo === "Prospecto"
                                  ? `/ventas/prospectos/${s.relacionId}`
                                  : `/ventas/clientes/${s.relacionId}`,
                              )
                            }
                          >
                            Ver ficha
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="calendario" className="mt-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            <Card className="lg:col-span-7" data-testid="seguimientos-calendar">
              <CardHeader className="pb-3">
                <CardTitle className="font-display text-base">Marzo 2025 (mes de demostración)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 text-center">
                  {DIAS.map((d) => (
                    <div key={d} className="pb-1 text-xs font-semibold uppercase text-muted-foreground">
                      {d}
                    </div>
                  ))}
                  {celdas.map((iso, i) => {
                    if (!iso) return <div key={`v-${i}`} />;
                    const items = filtrados.filter((s) => s.fecha === iso);
                    const activo = iso === diaSeleccionado;
                    return (
                      <button
                        key={iso}
                        type="button"
                        data-testid={`calendar-day-${iso}`}
                        onClick={() => setDiaSeleccionado(iso)}
                        className={`flex min-h-[62px] flex-col items-center gap-1 rounded-md border p-1 transition-colors duration-200 ${
                          activo
                            ? "border-blue-600 bg-blue-50"
                            : "border-slate-200 bg-white hover:bg-slate-50"
                        }`}
                      >
                        <span className="num text-xs font-semibold text-slate-800">
                          {Number(iso.slice(-2))}
                        </span>
                        {items.length > 0 ? (
                          <span className="num rounded-full bg-blue-700 px-1.5 text-[10px] font-semibold text-white">
                            {items.length}
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-5">
              <CardHeader className="pb-3">
                <CardTitle className="font-display text-base">
                  {formatFechaLarga(diaSeleccionado)}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {delDia.length === 0 ? (
                  <p className="px-4 py-8 text-center text-sm text-muted-foreground">
                    No hay seguimientos programados para esta fecha.
                  </p>
                ) : (
                  <ul className="divide-y">
                    {delDia.map((s) => (
                      <li key={s.id} className="px-4 py-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-slate-900">{s.relacion}</p>
                            <p className="text-xs text-muted-foreground">
                              {s.hora} · {s.responsable}
                            </p>
                            <p className="text-xs text-slate-700">{s.proximaAccion}</p>
                          </div>
                          <div className="flex shrink-0 flex-col items-end gap-1">
                            <StatusBadge estado={s.tipo} />
                            <StatusBadge estado={s.estado} />
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="mt-4">
          <Card data-testid="seguimientos-timeline">
            <CardContent className="pt-6">
              {timeline.length === 0 ? (
                <p className="py-6 text-center text-sm text-muted-foreground">
                  No hay actividades para mostrar.
                </p>
              ) : (
                <ol className="relative space-y-6 pl-6 before:absolute before:bottom-2 before:left-[5px] before:top-2 before:w-px before:bg-slate-200">
                  {timeline.map((s) => (
                    <li key={s.id} className="relative">
                      <span className="absolute -left-6 top-1 h-3 w-3 rounded-full border-2 border-white bg-blue-700" />
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="num text-xs font-semibold text-slate-500">
                          {formatFecha(s.fecha)} · {s.hora}
                        </span>
                        <StatusBadge estado={s.tipo} />
                        <StatusBadge estado={s.estado} />
                      </div>
                      <p className="mt-1 text-sm font-medium text-slate-900">{s.relacion}</p>
                      <p className="text-sm text-slate-700">
                        Resultado: {s.resultado} · Próxima acción: {s.proximaAccion}
                      </p>
                      <p className="text-xs text-muted-foreground">Responsable: {s.responsable}</p>
                    </li>
                  ))}
                </ol>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <SeguimientoFormSheet
        open={abrirForm}
        onOpenChange={setAbrirForm}
        onGuardar={(s) => {
          setLista((prev) => [s, ...prev]);
          setAbrirForm(false);
          toast.success("Seguimiento agregado temporalmente", {
            description: "No se guardó en ninguna base de datos.",
          });
        }}
      />
    </div>
  );
};

export default Seguimientos;
