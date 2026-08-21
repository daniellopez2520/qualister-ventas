import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MoreHorizontal, Eye, FileText, CalendarPlus, X } from "lucide-react";
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
import { formatFecha } from "@/lib/format";
import { CLIENTES, ESTADOS_CLIENTE, MAGNITUDES, VENDEDORES } from "@/mocks";

const TODOS = "__todos__";

const Clientes = () => {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");
  const [fEstado, setFEstado] = useState(TODOS);
  const [fMagnitud, setFMagnitud] = useState(TODOS);
  const [fVendedor, setFVendedor] = useState(TODOS);

  const filtrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return CLIENTES.filter((c) => {
      if (q) {
        const texto = `${c.codigo} ${c.nombreComercial} ${c.razonSocial} ${c.rfc} ${c.contacto} ${c.correo}`.toLowerCase();
        if (!texto.includes(q)) return false;
      }
      if (fEstado !== TODOS && c.estado !== fEstado) return false;
      if (fMagnitud !== TODOS && !(c.magnitudes || []).includes(fMagnitud)) return false;
      if (fVendedor !== TODOS && c.vendedor !== fVendedor) return false;
      return true;
    });
  }, [busqueda, fEstado, fMagnitud, fVendedor]);

  return (
    <div className="space-y-5">
      <PageHeader
        titulo="Clientes"
        descripcion="Cartera comercial del módulo de Ventas (sin información de Finanzas)"
      />

      <DemoNotice />

      <Card>
        <CardContent className="space-y-3 p-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Búsqueda</Label>
              <div className="relative">
                <Search
                  className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                />
                <Input
                  data-testid="clientes-search-input"
                  className="pl-8"
                  placeholder="Código, nombre, RFC o contacto…"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Estado</Label>
              <Select value={fEstado} onValueChange={setFEstado}>
                <SelectTrigger data-testid="clientes-filter-estado">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={TODOS}>Todos los estados</SelectItem>
                  {ESTADOS_CLIENTE.map((e) => (
                    <SelectItem key={e} value={e}>
                      {e}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Magnitud</Label>
              <Select value={fMagnitud} onValueChange={setFMagnitud}>
                <SelectTrigger data-testid="clientes-filter-magnitud">
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
              <Label className="text-xs">Vendedor</Label>
              <Select value={fVendedor} onValueChange={setFVendedor}>
                <SelectTrigger data-testid="clientes-filter-vendedor">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={TODOS}>Todos</SelectItem>
                  {VENDEDORES.map((v) => (
                    <SelectItem key={v} value={v}>
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="num text-xs text-muted-foreground" data-testid="clientes-count">
              {filtrados.length} de {CLIENTES.length} clientes
            </p>
            <Button
              variant="ghost"
              size="sm"
              data-testid="clientes-filters-clear"
              onClick={() => {
                setBusqueda("");
                setFEstado(TODOS);
                setFMagnitud(TODOS);
                setFVendedor(TODOS);
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
          titulo="No hay clientes con estos filtros"
          descripcion="Ajusta la búsqueda para ver los clientes de demostración."
        />
      ) : (
        <Card>
          <div className="qlm-table-wrap scrollbar-thin">
            <Table data-testid="clientes-table">
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="whitespace-nowrap">Código</TableHead>
                  <TableHead className="whitespace-nowrap">Nombre comercial</TableHead>
                  <TableHead className="whitespace-nowrap">Razón social</TableHead>
                  <TableHead className="whitespace-nowrap">RFC</TableHead>
                  <TableHead className="whitespace-nowrap">Contacto principal</TableHead>
                  <TableHead className="whitespace-nowrap">Correo</TableHead>
                  <TableHead className="whitespace-nowrap">Teléfono</TableHead>
                  <TableHead className="whitespace-nowrap">Estado</TableHead>
                  <TableHead className="whitespace-nowrap text-right">Cotiz. activas</TableHead>
                  <TableHead className="whitespace-nowrap">Última actividad</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtrados.map((c) => (
                  <TableRow key={c.id} data-testid="clientes-table-row" className="hover:bg-slate-50">
                    <TableCell className="font-mono text-xs font-medium">{c.codigo}</TableCell>
                    <TableCell className="max-w-[200px]">
                      <button
                        type="button"
                        data-testid={`clientes-row-link-${c.id}`}
                        onClick={() => navigate(`/ventas/clientes/${c.id}`)}
                        className="truncate text-left text-sm font-medium text-blue-700 underline-offset-2 hover:underline"
                      >
                        {c.nombreComercial}
                      </button>
                    </TableCell>
                    <TableCell className="max-w-[220px] truncate text-sm">{c.razonSocial}</TableCell>
                    <TableCell className="font-mono text-xs">{c.rfc}</TableCell>
                    <TableCell className="whitespace-nowrap text-sm">{c.contacto}</TableCell>
                    <TableCell className="max-w-[180px] truncate text-sm">{c.correo}</TableCell>
                    <TableCell className="whitespace-nowrap font-mono text-xs">{c.telefono}</TableCell>
                    <TableCell><StatusBadge estado={c.estado} /></TableCell>
                    <TableCell className="num text-right text-sm">{c.cotizacionesActivas}</TableCell>
                    <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                      {formatFecha(c.ultimaActividad)}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            data-testid={`clientes-row-actions-${c.id}`}
                            aria-label="Acciones"
                          >
                            <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onSelect={() => navigate(`/ventas/clientes/${c.id}`)}>
                            <Eye className="mr-2 h-4 w-4" aria-hidden="true" />
                            Ver detalle
                          </DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => navigate("/ventas/cotizaciones/nueva")}>
                            <FileText className="mr-2 h-4 w-4" aria-hidden="true" />
                            Crear cotización
                          </DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => navigate("/ventas/seguimientos?nuevo=1")}>
                            <CalendarPlus className="mr-2 h-4 w-4" aria-hidden="true" />
                            Registrar seguimiento
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
      )}
    </div>
  );
};

export default Clientes;
