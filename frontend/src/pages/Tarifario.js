import React, { useMemo, useState } from "react";
import { Plus, Search, X, RefreshCcw, Pencil, Trash2, Landmark, Wrench } from "lucide-react";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { PageHeader } from "@/components/common/PageHeader";
import { DemoNotice, DemoTag } from "@/components/common/DemoNotice";
import { StatusBadge } from "@/components/common/StatusBadge";
import { EmptyState } from "@/components/common/EmptyState";
import { formatMoneda, formatFecha } from "@/lib/format";
import { MAGNITUDES, MODALIDADES, TIPO_CAMBIO_DEMO } from "@/mocks";
import { useTarifario } from "@/context/TarifarioContext";
import { toast } from "sonner";

const TODOS = "__todos__";
const ESTADOS_TARIFA = ["Activo", "En revisión", "Inactivo"];

const FORM_VACIO = {
  codigo: "",
  magnitud: "",
  equipo: "",
  variante: "",
  modalidad: "Laboratorio",
  precioMXN: "",
  precioUSD: "",
  tiempoEstimado: "",
  vigencia: "",
  estado: "Activo",
};

const TarifaFormSheet = ({ open, onOpenChange, tarifa, onGuardar }) => {
  const esEdicion = Boolean(tarifa);
  const [form, setForm] = useState(tarifa ? { ...FORM_VACIO, ...tarifa } : FORM_VACIO);
  const [errores, setErrores] = useState({});
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const validar = () => {
    const e = {};
    if (!form.codigo.trim()) e.codigo = "Requerido";
    if (!form.magnitud) e.magnitud = "Requerido";
    if (!form.equipo.trim()) e.equipo = "Requerido";
    if (form.precioMXN === "" || Number(form.precioMXN) < 0) e.precioMXN = "Requerido";
    setErrores(e);
    return Object.keys(e).length === 0;
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" data-testid="tarifa-form-sheet" className="flex w-full flex-col gap-0 p-0 sm:max-w-lg">
        <SheetHeader className="border-b px-5 py-4 text-left">
          <SheetTitle className="font-display">
            {esEdicion ? "Editar equipo del tarifario" : "Nuevo equipo"}
          </SheetTitle>
          <SheetDescription>
            El tarifario es exclusivamente de equipos. Los cambios se aplican durante esta sesión
            (no se guardan al recargar la página).
          </SheetDescription>
        </SheetHeader>
        <form
          className="flex min-h-0 flex-1 flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            if (!validar()) return;
            onGuardar(form);
          }}
        >
          <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
            <div className="space-y-1.5">
              <Label htmlFor="tf-codigo">Código</Label>
              <Input
                id="tf-codigo"
                data-testid="tarifa-form-codigo"
                value={form.codigo}
                onChange={(e) => set("codigo", e.target.value)}
                placeholder="QLM-XXX-000"
                aria-invalid={Boolean(errores.codigo)}
              />
              {errores.codigo ? (
                <p className="text-xs text-destructive">{errores.codigo}</p>
              ) : null}
            </div>
            <div className="space-y-1.5">
              <Label>Magnitud</Label>
              <Select value={form.magnitud} onValueChange={(v) => set("magnitud", v)}>
                <SelectTrigger data-testid="tarifa-form-magnitud" aria-invalid={Boolean(errores.magnitud)}>
                  <SelectValue placeholder="Selecciona magnitud" />
                </SelectTrigger>
                <SelectContent>
                  {MAGNITUDES.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errores.magnitud ? (
                <p className="text-xs text-destructive">{errores.magnitud}</p>
              ) : null}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tf-equipo">Equipo / instrumento</Label>
              <Input
                id="tf-equipo"
                data-testid="tarifa-form-equipo"
                value={form.equipo}
                onChange={(e) => set("equipo", e.target.value)}
                placeholder="Ej. Termómetro digital"
                aria-invalid={Boolean(errores.equipo)}
              />
              {errores.equipo ? (
                <p className="text-xs text-destructive">{errores.equipo}</p>
              ) : null}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tf-variante">Variante / alcance</Label>
              <Input
                id="tf-variante"
                data-testid="tarifa-form-variante"
                value={form.variante}
                onChange={(e) => set("variante", e.target.value)}
                placeholder="Ej. -30 °C a 100 °C"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Modalidad</Label>
                <Select value={form.modalidad} onValueChange={(v) => set("modalidad", v)}>
                  <SelectTrigger data-testid="tarifa-form-modalidad">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MODALIDADES.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Estado</Label>
                <Select value={form.estado} onValueChange={(v) => set("estado", v)}>
                  <SelectTrigger data-testid="tarifa-form-estado">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ESTADOS_TARIFA.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="tf-mxn">Precio MXN</Label>
                <Input
                  id="tf-mxn"
                  type="number"
                  data-testid="tarifa-form-precio-mxn"
                  value={form.precioMXN}
                  onChange={(e) => set("precioMXN", e.target.value)}
                  aria-invalid={Boolean(errores.precioMXN)}
                />
                {errores.precioMXN ? (
                  <p className="text-xs text-destructive">{errores.precioMXN}</p>
                ) : null}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="tf-usd">Precio USD</Label>
                <Input
                  id="tf-usd"
                  type="number"
                  data-testid="tarifa-form-precio-usd"
                  value={form.precioUSD}
                  onChange={(e) => set("precioUSD", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="tf-tiempo">Tiempo estimado</Label>
                <Input
                  id="tf-tiempo"
                  data-testid="tarifa-form-tiempo"
                  value={form.tiempoEstimado}
                  onChange={(e) => set("tiempoEstimado", e.target.value)}
                  placeholder="5 días hábiles"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="tf-vig">Vigencia</Label>
                <Input
                  id="tf-vig"
                  type="date"
                  data-testid="tarifa-form-vigencia"
                  value={form.vigencia}
                  onChange={(e) => set("vigencia", e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 border-t bg-white px-5 py-3">
            <Button type="button" variant="outline" data-testid="tarifa-form-cancel-button" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" data-testid="tarifa-form-submit-button">
              {esEdicion ? "Guardar cambios" : "Agregar equipo"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

const Tarifario = () => {
  const { tarifas, agregarTarifa, actualizarTarifa, eliminarTarifa } = useTarifario();
  const [busqueda, setBusqueda] = useState("");
  const [fMagnitud, setFMagnitud] = useState(TODOS);
  const [fModalidad, setFModalidad] = useState(TODOS);
  const [fEstado, setFEstado] = useState(TODOS);
  const [fMoneda, setFMoneda] = useState("MXN");
  const [nuevo, setNuevo] = useState(false);
  const [editando, setEditando] = useState(null);
  const [eliminar, setEliminar] = useState(null);

  const filtrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return tarifas.filter((t) => {
      if (q && !`${t.codigo} ${t.equipo} ${t.variante}`.toLowerCase().includes(q)) return false;
      if (fMagnitud !== TODOS && t.magnitud !== fMagnitud) return false;
      if (fModalidad !== TODOS && t.modalidad !== fModalidad) return false;
      if (fEstado !== TODOS && t.estado !== fEstado) return false;
      return true;
    });
  }, [tarifas, busqueda, fMagnitud, fModalidad, fEstado]);

  const agrupado = useMemo(() => {
    const mapa = {};
    filtrados.forEach((t) => {
      if (!mapa[t.magnitud]) mapa[t.magnitud] = {};
      if (!mapa[t.magnitud][t.equipo]) mapa[t.magnitud][t.equipo] = [];
      mapa[t.magnitud][t.equipo].push(t);
    });
    return mapa;
  }, [filtrados]);

  return (
    <div className="space-y-5">
      <PageHeader
        titulo="Tarifario"
        descripcion="Catálogo de equipos a calibrar, organizado por magnitud, equipo y variante o alcance"
        acciones={
          <Button data-testid="tarifario-new-service-button" onClick={() => setNuevo(true)}>
            <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
            Nuevo equipo
          </Button>
        }
      />

      <DemoNotice />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <Card className="lg:col-span-4" data-testid="tarifario-fx-card">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="font-display text-base">Tipo de cambio</CardTitle>
            <DemoTag />
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="num font-display text-3xl font-semibold text-slate-900">
              {TIPO_CAMBIO_DEMO.valor.toFixed(4)}
            </p>
            <p className="text-sm text-slate-700">{TIPO_CAMBIO_DEMO.moneda}</p>
            <div className="space-y-1 border-t border-border pt-2 text-xs text-muted-foreground">
              <p>Fecha de ejemplo: {formatFecha(TIPO_CAMBIO_DEMO.fecha)}</p>
              <p className="flex items-center gap-1.5">
                <Landmark className="h-3.5 w-3.5" aria-hidden="true" />
                Fuente futura: {TIPO_CAMBIO_DEMO.fuenteFutura}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              data-testid="tarifario-fx-refresh"
              onClick={() =>
                toast.info("Consulta de tipo de cambio", {
                  description:
                    "La conexión con Banco de México se habilitará en la etapa de backend.",
                })
              }
            >
              <RefreshCcw className="mr-2 h-4 w-4" aria-hidden="true" />
              Actualizar (no disponible)
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-8">
          <CardContent className="space-y-3 p-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              <div className="space-y-1.5 sm:col-span-2 xl:col-span-1">
                <Label className="text-xs">Búsqueda</Label>
                <div className="relative">
                  <Search
                    className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                    aria-hidden="true"
                  />
                  <Input
                    data-testid="tarifario-search-input"
                    className="pl-8"
                    placeholder="Código o equipo…"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Magnitud</Label>
                <Select value={fMagnitud} onValueChange={setFMagnitud}>
                  <SelectTrigger data-testid="tarifario-filter-magnitud">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={TODOS}>Todas</SelectItem>
                    {MAGNITUDES.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Modalidad</Label>
                <Select value={fModalidad} onValueChange={setFModalidad}>
                  <SelectTrigger data-testid="tarifario-filter-modalidad">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={TODOS}>Todas</SelectItem>
                    {MODALIDADES.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Estado</Label>
                <Select value={fEstado} onValueChange={setFEstado}>
                  <SelectTrigger data-testid="tarifario-filter-estado">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={TODOS}>Todos</SelectItem>
                    {ESTADOS_TARIFA.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Moneda destacada</Label>
                <Select value={fMoneda} onValueChange={setFMoneda}>
                  <SelectTrigger data-testid="tarifario-filter-moneda">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MXN">MXN</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="num text-xs text-muted-foreground" data-testid="tarifario-count">
                {filtrados.length} de {tarifas.length} equipos
              </p>
              <Button
                variant="ghost"
                size="sm"
                data-testid="tarifario-filters-clear"
                onClick={() => {
                  setBusqueda("");
                  setFMagnitud(TODOS);
                  setFModalidad(TODOS);
                  setFEstado(TODOS);
                  setFMoneda("MXN");
                }}
              >
                <X className="mr-1 h-4 w-4" aria-hidden="true" />
                Limpiar filtros
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {filtrados.length === 0 ? (
        <EmptyState
          titulo="No hay equipos con estos filtros"
          descripcion="Ajusta los filtros o agrega un nuevo equipo al tarifario."
        />
      ) : (
        <div className="space-y-4" data-testid="tarifario-groups">
          {Object.entries(agrupado).map(([magnitud, equipos]) => (
            <Card key={magnitud}>
              <CardHeader className="flex-row items-center justify-between space-y-0 border-b border-border pb-3">
                <CardTitle className="font-display text-base">Magnitud: {magnitud}</CardTitle>
                <span className="num text-xs text-muted-foreground">
                  {Object.values(equipos).flat().length} equipos
                </span>
              </CardHeader>
              <CardContent className="p-0">
                {Object.entries(equipos).map(([equipo, filas]) => (
                  <div key={equipo} className="border-b border-border last:border-b-0">
                    <p className="flex items-center gap-1.5 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
                      <Wrench className="h-3.5 w-3.5" aria-hidden="true" />
                      {equipo}
                    </p>
                    <div className="qlm-table-wrap scrollbar-thin">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="whitespace-nowrap">Código</TableHead>
                            <TableHead className="whitespace-nowrap">Variante / alcance</TableHead>
                            <TableHead className="whitespace-nowrap">Modalidad</TableHead>
                            <TableHead className="whitespace-nowrap text-right">
                              Precio MXN
                            </TableHead>
                            <TableHead className="whitespace-nowrap text-right">
                              Precio USD
                            </TableHead>
                            <TableHead className="whitespace-nowrap">Tiempo estimado</TableHead>
                            <TableHead className="whitespace-nowrap">Vigencia</TableHead>
                            <TableHead className="whitespace-nowrap">Estado</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filas.map((t) => (
                            <TableRow key={t.id} data-testid="tarifario-table-row" className="hover:bg-slate-50">
                              <TableCell className="font-mono text-xs font-medium">{t.codigo}</TableCell>
                              <TableCell className="text-sm">{t.variante || "—"}</TableCell>
                              <TableCell className="text-sm">{t.modalidad}</TableCell>
                              <TableCell
                                className={`num text-right font-mono text-sm ${
                                  fMoneda === "MXN" ? "font-semibold text-slate-900" : "text-muted-foreground"
                                }`}
                              >
                                {formatMoneda(t.precioMXN, "MXN", 0)}
                              </TableCell>
                              <TableCell
                                className={`num text-right font-mono text-sm ${
                                  fMoneda === "USD" ? "font-semibold text-slate-900" : "text-muted-foreground"
                                }`}
                              >
                                {formatMoneda(t.precioUSD, "USD", 0)}
                              </TableCell>
                              <TableCell className="whitespace-nowrap text-sm">{t.tiempoEstimado || "—"}</TableCell>
                              <TableCell className="whitespace-nowrap text-sm">
                                {t.vigencia ? formatFecha(t.vigencia) : "—"}
                              </TableCell>
                              <TableCell><StatusBadge estado={t.estado} /></TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    data-testid={`tarifario-edit-rate-${t.id}`}
                                    onClick={() => setEditando(t)}
                                  >
                                    <Pencil className="mr-1 h-3.5 w-3.5" aria-hidden="true" />
                                    Editar
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                                    data-testid={`tarifario-delete-rate-${t.id}`}
                                    onClick={() => setEliminar(t)}
                                    aria-label={`Eliminar ${t.equipo} ${t.variante}`}
                                  >
                                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {nuevo ? (
        <TarifaFormSheet
          open={nuevo}
          onOpenChange={setNuevo}
          onGuardar={(data) => {
            agregarTarifa(data);
            setNuevo(false);
            toast.success("Equipo agregado", {
              description: `${data.equipo} se agregó al tarifario (solo durante esta sesión).`,
            });
          }}
        />
      ) : null}

      {editando ? (
        <TarifaFormSheet
          open={Boolean(editando)}
          onOpenChange={(v) => !v && setEditando(null)}
          tarifa={editando}
          onGuardar={(data) => {
            actualizarTarifa(editando.id, data);
            setEditando(null);
            toast.success("Cambios guardados", {
              description: `${data.equipo} se actualizó en el tarifario (solo durante esta sesión).`,
            });
          }}
        />
      ) : null}

      <AlertDialog open={Boolean(eliminar)} onOpenChange={(v) => !v && setEliminar(null)}>
        <AlertDialogContent data-testid="tarifario-delete-dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar equipo del tarifario</AlertDialogTitle>
            <AlertDialogDescription>
              {eliminar
                ? `Se eliminará "${eliminar.equipo}${eliminar.variante ? ` · ${eliminar.variante}` : ""}" (${eliminar.codigo}). Esta acción solo afecta esta sesión.`
                : ""}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="tarifario-delete-cancel">Cancelar</AlertDialogCancel>
            <AlertDialogAction
              data-testid="tarifario-delete-confirm"
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (eliminar) {
                  eliminarTarifa(eliminar.id);
                  toast.success("Equipo eliminado", {
                    description: `${eliminar.equipo} se eliminó del tarifario (solo durante esta sesión).`,
                  });
                }
                setEliminar(null);
              }}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Tarifario;
