import React, { useMemo, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Plus,
  Search,
  LayoutGrid,
  Rows3,
  MoreHorizontal,
  Eye,
  CalendarPlus,
  FileText,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/common/PageHeader";
import { DemoNotice } from "@/components/common/DemoNotice";
import { StatusBadge } from "@/components/common/StatusBadge";
import { EmptyState } from "@/components/common/EmptyState";
import { ProspectoFormSheet } from "@/components/ventas/ProspectoFormSheet";
import { formatFecha, hoyDemo } from "@/lib/format";
import { PROSPECTOS, ESTADOS_PROSPECTO, MAGNITUDES } from "@/mocks";
import { toast } from "sonner";

const TODOS = "__todos__";

const Prospectos = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  // Estado temporal en memoria (sin persistencia).
  const [lista, setLista] = useState(PROSPECTOS);
  const [vista, setVista] = useState("tabla");
  const [busqueda, setBusqueda] = useState("");
  const [fEstado, setFEstado] = useState(TODOS);
  const [fMagnitud, setFMagnitud] = useState(TODOS);
  const [fSeguimiento, setFSeguimiento] = useState(TODOS);
  const [fDesde, setFDesde] = useState("");
  const [fHasta, setFHasta] = useState("");
  const [abrirForm, setAbrirForm] = useState(false);

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
    return lista.filter((p) => {
      if (q) {
        const texto = `${p.folio} ${p.nombreComercial} ${p.razonSocial} ${p.contacto} ${p.correo}`.toLowerCase();
        if (!texto.includes(q)) return false;
      }
      if (fEstado !== TODOS && p.estado !== fEstado) return false;
      if (fMagnitud !== TODOS && !(p.magnitudes || []).includes(fMagnitud)) return false;
      if (fDesde && p.fechaCreacion < fDesde) return false;
      if (fHasta && p.fechaCreacion > fHasta) return false;
      if (fSeguimiento === "vencido") {
        if (!p.proximoSeguimiento || p.proximoSeguimiento >= hoyDemo) return false;
      }
      if (fSeguimiento === "proximo") {
        if (!p.proximoSeguimiento || p.proximoSeguimiento < hoyDemo) return false;
      }
      if (fSeguimiento === "sin" && p.proximoSeguimiento) return false;
      return true;
    });
  }, [lista, busqueda, fEstado, fMagnitud, fSeguimiento, fDesde, fHasta]);

  const limpiarFiltros = () => {
    setBusqueda("");
    setFEstado(TODOS);
    setFMagnitud(TODOS);
    setFSeguimiento(TODOS);
    setFDesde("");
    setFHasta("");
  };

  const guardarProspecto = (form) => {
    const nuevo = {
      ...form,
      id: `P-TMP-${Date.now()}`,
      folio: `PRO-2025-T${lista.length + 1}`,
      estado: "Nuevo",
      vendedor: "Usuario de Ventas",
      fechaCreacion: hoyDemo,
      contactos: [
        {
          nombre: form.contacto,
          puesto: form.puesto,
          correo: form.correo,
          telefono: form.telefono,
          principal: true,
        },
      ],
      documentos: [],
      historial: [
        {
          fecha: hoyDemo,
          evento: "Prospecto creado (temporal)",
          detalle: "Alta desde el prototipo visual",
          usuario: "Usuario de Ventas",
        },
      ],
    };
    setLista((prev) => [nuevo, ...prev]);
    setAbrirForm(false);
    toast.success("Prospecto agregado temporalmente", {
      description: "No se guardó en ninguna base de datos. Se pierde al recargar la página.",
    });
  };

  const columnasKanban = ESTADOS_PROSPECTO.map((estado) => ({
    estado,
    items: filtrados.filter((p) => p.estado === estado),
  }));

  return (
    <div className="space-y-5">
      <PageHeader
        titulo="Prospectos"
        descripcion="Gestión visual del embudo de prospectos comerciales"
        acciones={
          <Button data-testid="prospectos-new-button" onClick={() => setAbrirForm(true)}>
            <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
            Nuevo prospecto
          </Button>
        }
      />

      <DemoNotice />

      <Card>
        <CardContent className="space-y-3 p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="relative w-full lg:max-w-sm">
              <Search
                className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <Input
                data-testid="prospectos-search-input"
                className="pl-8"
                placeholder="Buscar por folio, empresa o contacto…"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>

            <Tabs value={vista} onValueChange={setVista} className="w-auto">
              <TabsList data-testid="prospectos-view-toggle">
                <TabsTrigger value="tabla" data-testid="prospectos-view-tabla">
                  <Rows3 className="mr-2 h-4 w-4" aria-hidden="true" />
                  Tabla
                </TabsTrigger>
                <TabsTrigger value="kanban" data-testid="prospectos-view-kanban">
                  <LayoutGrid className="mr-2 h-4 w-4" aria-hidden="true" />
                  Embudo / Kanban
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 gap-3 border-t border-border pt-3 sm:grid-cols-2 xl:grid-cols-5">
            <div className="space-y-1.5">
              <Label className="text-xs">Estado</Label>
              <Select value={fEstado} onValueChange={setFEstado}>
                <SelectTrigger data-testid="prospectos-filter-estado">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={TODOS}>Todos los estados</SelectItem>
                  {ESTADOS_PROSPECTO.map((e) => (
                    <SelectItem key={e} value={e}>
                      {e}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Magnitud de interés</Label>
              <Select value={fMagnitud} onValueChange={setFMagnitud}>
                <SelectTrigger data-testid="prospectos-filter-magnitud">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={TODOS}>Todas las magnitudes</SelectItem>
                  {MAGNITUDES.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Próximo seguimiento</Label>
              <Select value={fSeguimiento} onValueChange={setFSeguimiento}>
                <SelectTrigger data-testid="prospectos-filter-seguimiento">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={TODOS}>Cualquiera</SelectItem>
                  <SelectItem value="proximo">Programado</SelectItem>
                  <SelectItem value="vencido">Vencido</SelectItem>
                  <SelectItem value="sin">Sin seguimiento</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Creado desde</Label>
              <Input
                type="date"
                data-testid="prospectos-filter-desde"
                value={fDesde}
                onChange={(e) => setFDesde(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Creado hasta</Label>
              <Input
                type="date"
                data-testid="prospectos-filter-hasta"
                value={fHasta}
                onChange={(e) => setFHasta(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="num text-xs text-muted-foreground" data-testid="prospectos-count">
              {filtrados.length} de {lista.length} prospectos
            </p>
            <Button
              variant="ghost"
              size="sm"
              data-testid="prospectos-filters-clear"
              onClick={limpiarFiltros}
            >
              <X className="mr-1 h-4 w-4" aria-hidden="true" />
              Limpiar filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {vista === "tabla" ? (
        filtrados.length === 0 ? (
          <EmptyState
            titulo="No hay prospectos con estos filtros"
            descripcion="Ajusta los criterios de búsqueda o limpia los filtros para ver los datos de demostración."
          />
        ) : (
          <Card>
            <div className="qlm-table-wrap scrollbar-thin">
              <Table data-testid="prospectos-table">
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="whitespace-nowrap">Folio</TableHead>
                    <TableHead className="whitespace-nowrap">Empresa</TableHead>
                    <TableHead className="whitespace-nowrap">Contacto principal</TableHead>
                    <TableHead className="whitespace-nowrap">Correo</TableHead>
                    <TableHead className="whitespace-nowrap">Teléfono</TableHead>
                    <TableHead className="whitespace-nowrap">Servicios de interés</TableHead>
                    <TableHead className="whitespace-nowrap">Vendedor</TableHead>
                    <TableHead className="whitespace-nowrap">Estado</TableHead>
                    <TableHead className="whitespace-nowrap">Próximo seguimiento</TableHead>
                    <TableHead className="whitespace-nowrap">Creación</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtrados.map((p) => (
                    <TableRow key={p.id} data-testid="prospectos-table-row" className="hover:bg-slate-50">
                      <TableCell className="font-mono text-xs font-medium text-slate-900">
                        {p.folio}
                      </TableCell>
                      <TableCell className="max-w-[200px]">
                        <button
                          type="button"
                          data-testid={`prospectos-row-link-${p.id}`}
                          onClick={() => navigate(`/ventas/prospectos/${p.id}`)}
                          className="truncate text-left text-sm font-medium text-blue-700 underline-offset-2 hover:underline"
                        >
                          {p.nombreComercial}
                        </button>
                        <p className="truncate text-xs text-muted-foreground">{p.razonSocial}</p>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-sm">{p.contacto}</TableCell>
                      <TableCell className="max-w-[180px] truncate text-sm">{p.correo}</TableCell>
                      <TableCell className="whitespace-nowrap font-mono text-xs">{p.telefono}</TableCell>
                      <TableCell className="max-w-[220px]">
                        <div className="flex flex-wrap gap-1">
                          {(p.magnitudes || []).map((m) => (
                            <span
                              key={m}
                              className="rounded bg-slate-100 px-1.5 py-0.5 text-[11px] text-slate-700"
                            >
                              {m}
                            </span>
                          ))}
                        </div>
                        <p className="truncate text-xs text-muted-foreground">
                          {(p.servicios || []).join(", ") || "—"}
                        </p>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-sm">{p.vendedor}</TableCell>
                      <TableCell>
                        <StatusBadge estado={p.estado} />
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-sm">
                        {p.proximoSeguimiento ? (
                          <span
                            className={
                              p.proximoSeguimiento < hoyDemo
                                ? "font-medium text-red-700"
                                : "text-slate-700"
                            }
                          >
                            {formatFecha(p.proximoSeguimiento)}
                          </span>
                        ) : (
                          "—"
                        )}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                        {formatFecha(p.fechaCreacion)}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              data-testid={`prospectos-row-actions-${p.id}`}
                              aria-label="Acciones"
                            >
                              <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onSelect={() => navigate(`/ventas/prospectos/${p.id}`)}>
                              <Eye className="mr-2 h-4 w-4" aria-hidden="true" />
                              Ver detalle
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onSelect={() => navigate("/ventas/seguimientos?nuevo=1")}
                            >
                              <CalendarPlus className="mr-2 h-4 w-4" aria-hidden="true" />
                              Registrar seguimiento
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onSelect={() => navigate("/ventas/cotizaciones/nueva")}
                            >
                              <FileText className="mr-2 h-4 w-4" aria-hidden="true" />
                              Crear cotización
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        )
      ) : (
        <div
          data-testid="prospectos-kanban-view"
          className="scrollbar-thin flex gap-3 overflow-x-auto pb-3"
        >
          {columnasKanban.map((col) => (
            <div
              key={col.estado}
              className="flex min-w-[280px] max-w-[300px] flex-col rounded-lg border border-border bg-white"
            >
              <div className="flex items-center justify-between border-b border-border bg-slate-50 px-3 py-2">
                <span className="truncate text-xs font-semibold uppercase tracking-wide text-slate-700">
                  {col.estado}
                </span>
                <span className="num rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                  {col.items.length}
                </span>
              </div>
              <div className="flex-1 space-y-2 p-2">
                {col.items.length === 0 ? (
                  <p className="rounded-md border border-dashed border-slate-200 p-3 text-center text-xs text-muted-foreground">
                    Sin prospectos
                  </p>
                ) : (
                  col.items.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      data-testid={`prospectos-kanban-card-${p.id}`}
                      onClick={() => navigate(`/ventas/prospectos/${p.id}`)}
                      className="w-full rounded-md border border-border bg-white p-3 text-left shadow-sm transition-shadow duration-200 hover:shadow-md"
                    >
                      <p className="font-mono text-[11px] text-muted-foreground">{p.folio}</p>
                      <p className="truncate text-sm font-medium text-slate-900">
                        {p.nombreComercial}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">{p.contacto}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-1">
                        {(p.magnitudes || []).map((m) => (
                          <span
                            key={m}
                            className="rounded bg-slate-100 px-1.5 py-0.5 text-[11px] text-slate-700"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                      {p.proximoSeguimiento ? (
                        <p className="mt-2 text-[11px] text-muted-foreground">
                          Seguimiento: {formatFecha(p.proximoSeguimiento)}
                        </p>
                      ) : null}
                    </button>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <ProspectoFormSheet
        open={abrirForm}
        onOpenChange={setAbrirForm}
        onGuardar={guardarProspecto}
      />
    </div>
  );
};

export default Prospectos;
