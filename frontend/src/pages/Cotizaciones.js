import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, X, MoreHorizontal, Eye, Copy, FileDown } from "lucide-react";
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
import { PageHeader } from "@/components/common/PageHeader";
import { DemoNotice } from "@/components/common/DemoNotice";
import { StatusBadge } from "@/components/common/StatusBadge";
import { EmptyState } from "@/components/common/EmptyState";
import { FutureFeatureDialog } from "@/components/common/FutureFeatureDialog";
import { formatFecha, formatMoneda } from "@/lib/format";
import { COTIZACIONES, ESTADOS_COTIZACION, calcularTotales } from "@/mocks";

const TODOS = "__todos__";

const Cotizaciones = () => {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");
  const [fEstado, setFEstado] = useState(TODOS);
  const [fMoneda, setFMoneda] = useState(TODOS);
  const [fCliente, setFCliente] = useState(TODOS);
  const [fDesde, setFDesde] = useState("");
  const [fHasta, setFHasta] = useState("");
  const [modalFutura, setModalFutura] = useState(false);

  const clientes = useMemo(
    () => Array.from(new Set(COTIZACIONES.map((c) => c.cliente))),
    [],
  );

  const filtrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return COTIZACIONES.filter((c) => {
      if (q && !`${c.folio} ${c.cliente} ${c.contacto} ${c.responsable}`.toLowerCase().includes(q))
        return false;
      if (fEstado !== TODOS && c.estado !== fEstado) return false;
      if (fMoneda !== TODOS && c.moneda !== fMoneda) return false;
      if (fCliente !== TODOS && c.cliente !== fCliente) return false;
      if (fDesde && c.fecha < fDesde) return false;
      if (fHasta && c.fecha > fHasta) return false;
      return true;
    });
  }, [busqueda, fEstado, fMoneda, fCliente, fDesde, fHasta]);

  return (
    <div className="space-y-5">
      <PageHeader
        titulo="Cotizaciones"
        descripcion="Listado visual de cotizaciones comerciales"
        acciones={
          <Button
            data-testid="cotizaciones-new-button"
            onClick={() => navigate("/ventas/cotizaciones/nueva")}
          >
            <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
            Nueva cotización
          </Button>
        }
      />

      <DemoNotice />

      <Card>
        <CardContent className="space-y-3 p-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-6">
            <div className="space-y-1.5 xl:col-span-2">
              <Label className="text-xs">Búsqueda</Label>
              <div className="relative">
                <Search
                  className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                />
                <Input
                  data-testid="cotizaciones-search-input"
                  className="pl-8"
                  placeholder="Folio, cliente o responsable…"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Estado</Label>
              <Select value={fEstado} onValueChange={setFEstado}>
                <SelectTrigger data-testid="cotizaciones-filter-estado">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={TODOS}>Todos</SelectItem>
                  {ESTADOS_COTIZACION.map((e) => (
                    <SelectItem key={e} value={e}>
                      {e}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Moneda</Label>
              <Select value={fMoneda} onValueChange={setFMoneda}>
                <SelectTrigger data-testid="cotizaciones-filter-moneda">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={TODOS}>Todas</SelectItem>
                  <SelectItem value="MXN">MXN</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Cliente / prospecto</Label>
              <Select value={fCliente} onValueChange={setFCliente}>
                <SelectTrigger data-testid="cotizaciones-filter-cliente">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={TODOS}>Todos</SelectItem>
                  {clientes.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1.5">
                <Label className="text-xs">Desde</Label>
                <Input
                  type="date"
                  data-testid="cotizaciones-filter-desde"
                  value={fDesde}
                  onChange={(e) => setFDesde(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Hasta</Label>
                <Input
                  type="date"
                  data-testid="cotizaciones-filter-hasta"
                  value={fHasta}
                  onChange={(e) => setFHasta(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="num text-xs text-muted-foreground" data-testid="cotizaciones-count">
              {filtrados.length} de {COTIZACIONES.length} cotizaciones
            </p>
            <Button
              variant="ghost"
              size="sm"
              data-testid="cotizaciones-filters-clear"
              onClick={() => {
                setBusqueda("");
                setFEstado(TODOS);
                setFMoneda(TODOS);
                setFCliente(TODOS);
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

      {filtrados.length === 0 ? (
        <EmptyState
          titulo="No hay cotizaciones con estos filtros"
          descripcion="Ajusta los filtros para ver las cotizaciones de demostración."
        />
      ) : (
        <Card>
          <div className="qlm-table-wrap scrollbar-thin">
            <Table data-testid="cotizaciones-table">
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="whitespace-nowrap">Folio</TableHead>
                  <TableHead className="whitespace-nowrap text-right">Rev.</TableHead>
                  <TableHead className="whitespace-nowrap">Prospecto / Cliente</TableHead>
                  <TableHead className="whitespace-nowrap">Fecha</TableHead>
                  <TableHead className="whitespace-nowrap">Vigencia</TableHead>
                  <TableHead className="whitespace-nowrap">Moneda</TableHead>
                  <TableHead className="whitespace-nowrap text-right">Total</TableHead>
                  <TableHead className="whitespace-nowrap">Estado</TableHead>
                  <TableHead className="whitespace-nowrap">Responsable</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtrados.map((c) => {
                  const { total } = calcularTotales(c.partidas, c.descuentoPct, c.ivaPct);
                  return (
                    <TableRow key={c.id} data-testid="cotizaciones-table-row" className="hover:bg-slate-50">
                      <TableCell>
                        <button
                          type="button"
                          data-testid={`cotizaciones-row-link-${c.id}`}
                          onClick={() => navigate(`/ventas/cotizaciones/${c.id}`)}
                          className="font-mono text-xs font-medium text-blue-700 underline-offset-2 hover:underline"
                        >
                          {c.folio}
                        </button>
                      </TableCell>
                      <TableCell className="num text-right text-sm">{c.revision}</TableCell>
                      <TableCell className="max-w-[220px]">
                        <p className="truncate text-sm font-medium text-slate-900">{c.cliente}</p>
                        <p className="text-xs text-muted-foreground">
                          {c.tipoCliente} · {c.contacto}
                        </p>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-sm">{formatFecha(c.fecha)}</TableCell>
                      <TableCell className="whitespace-nowrap text-sm">{formatFecha(c.vigencia)}</TableCell>
                      <TableCell className="text-sm">{c.moneda}</TableCell>
                      <TableCell className="num whitespace-nowrap text-right font-mono text-sm font-semibold">
                        {formatMoneda(total, c.moneda)}
                      </TableCell>
                      <TableCell><StatusBadge estado={c.estado} /></TableCell>
                      <TableCell className="whitespace-nowrap text-sm">{c.responsable}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              data-testid={`cotizaciones-row-actions-${c.id}`}
                              aria-label="Acciones"
                            >
                              <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onSelect={() => navigate(`/ventas/cotizaciones/${c.id}`)}>
                              <Eye className="mr-2 h-4 w-4" aria-hidden="true" />
                              Ver detalle
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => setModalFutura(true)}>
                              <Copy className="mr-2 h-4 w-4" aria-hidden="true" />
                              Duplicar / nueva revisión
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => setModalFutura(true)}>
                              <FileDown className="mr-2 h-4 w-4" aria-hidden="true" />
                              Generar PDF
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}

      <FutureFeatureDialog
        open={modalFutura}
        onOpenChange={setModalFutura}
        testId="cotizaciones-future-dialog"
      />
    </div>
  );
};

export default Cotizaciones;
