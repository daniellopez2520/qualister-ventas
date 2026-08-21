import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Plus,
  Trash2,
  Save,
  FileDown,
  Send,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { PageHeader } from "@/components/common/PageHeader";
import { DemoNotice } from "@/components/common/DemoNotice";
import { FutureFeatureDialog } from "@/components/common/FutureFeatureDialog";
import { CotizacionPreview } from "@/components/ventas/CotizacionPreview";
import { formatMoneda, hoyDemo } from "@/lib/format";
import {
  PROSPECTOS,
  CLIENTES,
  TARIFARIO,
  MAGNITUDES,
  CONDICIONES_PAGO,
  LUGARES_SERVICIO,
  TERMINOS_DEMO,
  calcularTotales,
} from "@/mocks";
import { toast } from "sonner";

const PASOS = ["Cliente", "Configuración", "Servicios", "Resumen", "Vista previa"];

const CotizacionNueva = () => {
  const navigate = useNavigate();
  const [paso, setPaso] = useState(0);
  const [modalFutura, setModalFutura] = useState(false);
  const [mensajeFutura, setMensajeFutura] = useState("");

  // Estado temporal del asistente (sin persistencia).
  const [seleccion, setSeleccion] = useState("");
  const [config, setConfig] = useState({
    moneda: "MXN",
    fecha: hoyDemo,
    vigencia: "2025-04-13",
    condicionesPago: "Crédito 30 días",
    lugarServicio: "Laboratorio Qualister",
  });
  const [partidas, setPartidas] = useState([]);
  const [descuentoPct, setDescuentoPct] = useState(0);
  const [ivaPct, setIvaPct] = useState(16);
  const [notas, setNotas] = useState("Cotización de demostración generada en el prototipo visual.");

  // Selects escalonados del paso 3
  const [magnitud, setMagnitud] = useState("");
  const [servicio, setServicio] = useState("");
  const [variante, setVariante] = useState("");
  const [cantidad, setCantidad] = useState(1);

  const opciones = useMemo(
    () => [
      ...CLIENTES.map((c) => ({
        valor: `Cliente|${c.id}`,
        etiqueta: `Cliente · ${c.nombreComercial}`,
        nombre: c.nombreComercial,
        contacto: c.contacto,
        correo: c.correo,
        telefono: c.telefono,
        extra: `${c.codigo} · RFC ${c.rfc}`,
        estado: c.estado,
      })),
      ...PROSPECTOS.map((p) => ({
        valor: `Prospecto|${p.id}`,
        etiqueta: `Prospecto · ${p.nombreComercial}`,
        nombre: p.nombreComercial,
        contacto: p.contacto,
        correo: p.correo,
        telefono: p.telefono,
        extra: `${p.folio} · ${p.ciudad}, ${p.estadoRep}`,
        estado: p.estado,
      })),
    ],
    [],
  );

  const destino = opciones.find((o) => o.valor === seleccion);

  // Servicios disponibles según la magnitud seleccionada (datos mock del tarifario)
  const serviciosDeMagnitud = useMemo(
    () =>
      Array.from(
        new Set(TARIFARIO.filter((t) => t.magnitud === magnitud).map((t) => t.servicio)),
      ),
    [magnitud],
  );

  const variantesDeServicio = useMemo(
    () => TARIFARIO.filter((t) => t.magnitud === magnitud && t.servicio === servicio),
    [magnitud, servicio],
  );

  const tarifaSeleccionada = variantesDeServicio.find((t) => t.id === variante);

  const totales = calcularTotales(partidas, descuentoPct, ivaPct);

  const agregarPartida = () => {
    if (!tarifaSeleccionada) {
      toast.error("Selecciona magnitud, servicio y variante");
      return;
    }
    setPartidas((prev) => [
      ...prev,
      {
        codigo: tarifaSeleccionada.codigo,
        magnitud: tarifaSeleccionada.magnitud,
        servicio: tarifaSeleccionada.servicio,
        variante: tarifaSeleccionada.variante,
        descripcion: tarifaSeleccionada.descripcion,
        cantidad: Number(cantidad) || 1,
        precio:
          config.moneda === "MXN"
            ? tarifaSeleccionada.precioMXN
            : tarifaSeleccionada.precioUSD,
        tiempoEstimado: tarifaSeleccionada.tiempoEstimado,
      },
    ]);
    setVariante("");
    setCantidad(1);
    toast.success("Partida agregada (temporal)");
  };

  const cotizacionPreview = {
    folio: "COT-2025-BORRADOR",
    revision: 1,
    cliente: destino ? destino.nombre : "—",
    contacto: destino ? destino.contacto : "—",
    correo: destino ? destino.correo : "—",
    fecha: config.fecha,
    vigencia: config.vigencia,
    moneda: config.moneda,
    condicionesPago: config.condicionesPago,
    lugarServicio: config.lugarServicio,
    partidas,
    descuentoPct,
    ivaPct,
    notas,
  };

  const puedeAvanzar = () => {
    if (paso === 0) return Boolean(seleccion);
    if (paso === 2) return partidas.length > 0;
    return true;
  };

  const siguiente = () => {
    if (!puedeAvanzar()) {
      toast.error(
        paso === 0
          ? "Selecciona un prospecto o cliente para continuar"
          : "Agrega al menos una partida para continuar",
      );
      return;
    }
    setPaso((p) => Math.min(p + 1, PASOS.length - 1));
  };

  const abrirFutura = (mensaje) => {
    setMensajeFutura(mensaje);
    setModalFutura(true);
  };

  return (
    <div className="space-y-5">
      <Button
        variant="ghost"
        size="sm"
        className="-ml-2"
        data-testid="cotizacion-wizard-back-to-list"
        onClick={() => navigate("/ventas/cotizaciones")}
      >
        <ArrowLeft className="mr-1 h-4 w-4" aria-hidden="true" />
        Regresar a Cotizaciones
      </Button>

      <PageHeader
        titulo="Nueva cotización"
        descripcion="Asistente visual en cinco pasos. Los cálculos son locales y no se guardan."
        acciones={
          <Button
            variant="outline"
            data-testid="cotizacion-wizard-cancel-button"
            onClick={() => navigate("/ventas/cotizaciones")}
          >
            <X className="mr-2 h-4 w-4" aria-hidden="true" />
            Cancelar
          </Button>
        }
      />

      <DemoNotice />

      {/* Stepper */}
      <div
        data-testid="cotizacion-wizard-stepper"
        className="flex flex-col gap-2 rounded-lg border border-border bg-white p-3 sm:flex-row sm:items-center sm:gap-4"
      >
        {PASOS.map((p, i) => {
          const activo = i === paso;
          const hecho = i < paso;
          return (
            <button
              key={p}
              type="button"
              data-testid={`cotizacion-wizard-step-${i + 1}`}
              onClick={() => setPaso(i)}
              className="flex flex-1 items-center gap-2 text-left"
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition-colors duration-200 ${
                  activo
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : hecho
                      ? "border-green-600 bg-green-50 text-green-700"
                      : "border-slate-300 bg-white text-slate-600"
                }`}
              >
                {hecho ? <Check className="h-4 w-4" aria-hidden="true" /> : i + 1}
              </span>
              <span
                className={`truncate text-sm ${activo ? "font-semibold text-slate-900" : "text-slate-600"}`}
              >
                {p}
              </span>
            </button>
          );
        })}
      </div>

      {/* Paso 1: Cliente */}
      {paso === 0 ? (
        <Card data-testid="cotizacion-step-cliente">
          <CardHeader className="pb-3">
            <CardTitle className="font-display text-base">Paso 1 · Cliente o prospecto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="max-w-lg space-y-1.5">
              <Label>Seleccionar prospecto o cliente</Label>
              <Select value={seleccion} onValueChange={setSeleccion}>
                <SelectTrigger data-testid="cotizacion-select-cliente">
                  <SelectValue placeholder="Selecciona un registro de demostración" />
                </SelectTrigger>
                <SelectContent>
                  {opciones.map((o) => (
                    <SelectItem key={o.valor} value={o.valor}>
                      {o.etiqueta}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {destino ? (
              <div
                data-testid="cotizacion-cliente-datos"
                className="grid grid-cols-1 gap-4 rounded-md border border-border bg-slate-50 p-4 sm:grid-cols-2 lg:grid-cols-4"
              >
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Nombre</p>
                  <p className="text-sm font-medium text-slate-900">{destino.nombre}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Contacto</p>
                  <p className="text-sm text-slate-900">{destino.contacto}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Correo</p>
                  <p className="truncate text-sm text-slate-900">{destino.correo}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Teléfono</p>
                  <p className="font-mono text-sm text-slate-900">{destino.telefono}</p>
                </div>
                <div className="sm:col-span-2 lg:col-span-4">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Datos generales
                  </p>
                  <p className="text-sm text-slate-900">
                    {destino.extra} · Estado: {destino.estado}
                  </p>
                </div>
              </div>
            ) : (
              <p className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-muted-foreground">
                Selecciona un prospecto o cliente para ver su contacto y datos generales.
              </p>
            )}
          </CardContent>
        </Card>
      ) : null}

      {/* Paso 2: Configuración */}
      {paso === 1 ? (
        <Card data-testid="cotizacion-step-configuracion">
          <CardHeader className="pb-3">
            <CardTitle className="font-display text-base">Paso 2 · Configuración</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-1.5">
              <Label>Moneda</Label>
              <Select
                value={config.moneda}
                onValueChange={(v) => setConfig((c) => ({ ...c, moneda: v }))}
              >
                <SelectTrigger data-testid="cotizacion-config-moneda">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MXN">MXN · Peso mexicano</SelectItem>
                  <SelectItem value="USD">USD · Dólar estadounidense</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cot-fecha">Fecha</Label>
              <Input
                id="cot-fecha"
                type="date"
                data-testid="cotizacion-config-fecha"
                value={config.fecha}
                onChange={(e) => setConfig((c) => ({ ...c, fecha: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cot-vigencia">Vigencia</Label>
              <Input
                id="cot-vigencia"
                type="date"
                data-testid="cotizacion-config-vigencia"
                value={config.vigencia}
                onChange={(e) => setConfig((c) => ({ ...c, vigencia: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Condiciones de pago</Label>
              <Select
                value={config.condicionesPago}
                onValueChange={(v) => setConfig((c) => ({ ...c, condicionesPago: v }))}
              >
                <SelectTrigger data-testid="cotizacion-config-condiciones">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CONDICIONES_PAGO.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label>Lugar del servicio</Label>
              <Select
                value={config.lugarServicio}
                onValueChange={(v) => setConfig((c) => ({ ...c, lugarServicio: v }))}
              >
                <SelectTrigger data-testid="cotizacion-config-lugar">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LUGARES_SERVICIO.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {/* Paso 3: Servicios */}
      {paso === 2 ? (
        <div className="space-y-4" data-testid="cotizacion-step-servicios">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-base">
                Paso 3 · Agregar partidas (magnitud → servicio → variante)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
                <div className="space-y-1.5 md:col-span-3">
                  <Label>1. Magnitud</Label>
                  <Select
                    value={magnitud}
                    onValueChange={(v) => {
                      setMagnitud(v);
                      setServicio("");
                      setVariante("");
                    }}
                  >
                    <SelectTrigger data-testid="cotizacion-partida-magnitud">
                      <SelectValue placeholder="Selecciona" />
                    </SelectTrigger>
                    <SelectContent>
                      {MAGNITUDES.map((m) => (
                        <SelectItem key={m} value={m}>
                          {m}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5 md:col-span-4">
                  <Label>2. Servicio</Label>
                  <Select
                    value={servicio}
                    onValueChange={(v) => {
                      setServicio(v);
                      setVariante("");
                    }}
                    disabled={!magnitud}
                  >
                    <SelectTrigger data-testid="cotizacion-partida-servicio">
                      <SelectValue
                        placeholder={magnitud ? "Selecciona servicio" : "Elige una magnitud"}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {serviciosDeMagnitud.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5 md:col-span-3">
                  <Label>3. Variante o alcance</Label>
                  <Select value={variante} onValueChange={setVariante} disabled={!servicio}>
                    <SelectTrigger data-testid="cotizacion-partida-variante">
                      <SelectValue
                        placeholder={servicio ? "Selecciona variante" : "Elige un servicio"}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {variantesDeServicio.map((t) => (
                        <SelectItem key={t.id} value={t.id}>
                          {t.variante} · {t.modalidad}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <Label htmlFor="cot-cantidad">Cantidad</Label>
                  <Input
                    id="cot-cantidad"
                    type="number"
                    min={1}
                    data-testid="cotizacion-partida-cantidad"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                  />
                </div>
              </div>

              {tarifaSeleccionada ? (
                <div
                  data-testid="cotizacion-partida-detalle"
                  className="grid grid-cols-1 gap-3 rounded-md border border-blue-200 bg-blue-50/60 p-4 sm:grid-cols-3 lg:grid-cols-6"
                >
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Código</p>
                    <p className="font-mono text-sm font-medium text-slate-900">
                      {tarifaSeleccionada.codigo}
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      Descripción
                    </p>
                    <p className="text-sm text-slate-900">{tarifaSeleccionada.descripcion}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Precio</p>
                    <p className="num font-mono text-sm font-medium text-slate-900">
                      {formatMoneda(
                        config.moneda === "MXN"
                          ? tarifaSeleccionada.precioMXN
                          : tarifaSeleccionada.precioUSD,
                        config.moneda,
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Moneda</p>
                    <p className="text-sm text-slate-900">{config.moneda}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      Tiempo estimado
                    </p>
                    <p className="text-sm text-slate-900">{tarifaSeleccionada.tiempoEstimado}</p>
                  </div>
                </div>
              ) : null}

              <Button data-testid="cotizacion-partida-add" onClick={agregarPartida}>
                <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
                Agregar partida
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-base">
                Partidas agregadas ({partidas.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {partidas.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-muted-foreground">
                  Aún no hay partidas. Agrega al menos una para continuar.
                </p>
              ) : (
                <div className="qlm-table-wrap">
                  <Table data-testid="cotizacion-partidas-table">
                    <TableHeader>
                      <TableRow className="bg-slate-50">
                        <TableHead>Código</TableHead>
                        <TableHead>Servicio</TableHead>
                        <TableHead>Variante</TableHead>
                        <TableHead className="text-right">Cant.</TableHead>
                        <TableHead className="text-right">P. unitario</TableHead>
                        <TableHead className="text-right">Importe</TableHead>
                        <TableHead className="text-right">Quitar</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {partidas.map((p, i) => (
                        <TableRow key={`${p.codigo}-${i}`}>
                          <TableCell className="font-mono text-xs">{p.codigo}</TableCell>
                          <TableCell className="text-sm">{p.servicio}</TableCell>
                          <TableCell className="text-sm">{p.variante}</TableCell>
                          <TableCell className="num text-right text-sm">{p.cantidad}</TableCell>
                          <TableCell className="num text-right font-mono text-sm">
                            {formatMoneda(p.precio, config.moneda)}
                          </TableCell>
                          <TableCell className="num text-right font-mono text-sm">
                            {formatMoneda(p.cantidad * p.precio, config.moneda)}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              data-testid={`cotizacion-partida-remove-${i}`}
                              aria-label="Eliminar partida"
                              onClick={() =>
                                setPartidas((prev) => prev.filter((_, idx) => idx !== i))
                              }
                            >
                              <Trash2 className="h-4 w-4 text-red-600" aria-hidden="true" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ) : null}

      {/* Paso 4: Resumen */}
      {paso === 3 ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12" data-testid="cotizacion-step-resumen">
          <Card className="lg:col-span-8">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-base">Paso 4 · Resumen de partidas</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="qlm-table-wrap">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead>Código</TableHead>
                      <TableHead>Servicio</TableHead>
                      <TableHead className="text-right">Cant.</TableHead>
                      <TableHead className="text-right">P. unitario</TableHead>
                      <TableHead className="text-right">Importe</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {partidas.map((p, i) => (
                      <TableRow key={`${p.codigo}-r-${i}`}>
                        <TableCell className="font-mono text-xs">{p.codigo}</TableCell>
                        <TableCell className="text-sm">
                          {p.servicio}
                          <span className="block text-xs text-muted-foreground">{p.variante}</span>
                        </TableCell>
                        <TableCell className="num text-right text-sm">{p.cantidad}</TableCell>
                        <TableCell className="num text-right font-mono text-sm">
                          {formatMoneda(p.precio, config.moneda)}
                        </TableCell>
                        <TableCell className="num text-right font-mono text-sm">
                          {formatMoneda(p.cantidad * p.precio, config.moneda)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4 lg:col-span-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="font-display text-base">Totales (cálculo local)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="cot-desc">Descuento (%)</Label>
                    <Input
                      id="cot-desc"
                      type="number"
                      min={0}
                      max={100}
                      data-testid="cotizacion-resumen-descuento"
                      value={descuentoPct}
                      onChange={(e) => setDescuentoPct(Number(e.target.value) || 0)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="cot-iva">Impuestos (%)</Label>
                    <Input
                      id="cot-iva"
                      type="number"
                      min={0}
                      max={100}
                      data-testid="cotizacion-resumen-iva"
                      value={ivaPct}
                      onChange={(e) => setIvaPct(Number(e.target.value) || 0)}
                    />
                  </div>
                </div>
                <dl className="space-y-1 border-t border-border pt-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Subtotal</dt>
                    <dd className="num font-mono" data-testid="cotizacion-total-subtotal">
                      {formatMoneda(totales.subtotal, config.moneda)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Descuento</dt>
                    <dd className="num font-mono text-red-700">
                      -{formatMoneda(totales.descuento, config.moneda)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Impuestos</dt>
                    <dd className="num font-mono">
                      {formatMoneda(totales.impuestos, config.moneda)}
                    </dd>
                  </div>
                  <div className="flex justify-between border-t border-border pt-1">
                    <dt className="font-semibold">Total</dt>
                    <dd
                      className="num font-mono text-base font-semibold"
                      data-testid="cotizacion-total-final"
                    >
                      {formatMoneda(totales.total, config.moneda)}
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="font-display text-base">Notas y términos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Textarea
                  rows={3}
                  data-testid="cotizacion-resumen-notas"
                  value={notas}
                  onChange={(e) => setNotas(e.target.value)}
                />
                <ul className="space-y-1 text-xs text-slate-700">
                  {TERMINOS_DEMO.map((t) => (
                    <li key={t} className="flex gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-400" />
                      {t}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : null}

      {/* Paso 5: Vista previa */}
      {paso === 4 ? (
        <div className="space-y-4" data-testid="cotizacion-step-preview">
          <CotizacionPreview cotizacion={cotizacionPreview} />
          <div className="flex flex-wrap justify-center gap-2">
            <Button
              data-testid="cotizacion-wizard-save-draft-button"
              onClick={() =>
                abrirFutura(
                  "Esta función se habilitará en la etapa de conexión con backend. El borrador no se almacena.",
                )
              }
            >
              <Save className="mr-2 h-4 w-4" aria-hidden="true" />
              Guardar borrador
            </Button>
            <Button
              variant="outline"
              data-testid="cotizacion-wizard-generate-pdf-button"
              onClick={() =>
                abrirFutura(
                  "Esta función se habilitará en la etapa de conexión con backend. No se genera ningún archivo PDF.",
                )
              }
            >
              <FileDown className="mr-2 h-4 w-4" aria-hidden="true" />
              Generar PDF
            </Button>
            <Button
              variant="outline"
              data-testid="cotizacion-wizard-send-button"
              onClick={() =>
                abrirFutura(
                  "Esta función se habilitará en la etapa de conexión con backend. No se envía ningún correo.",
                )
              }
            >
              <Send className="mr-2 h-4 w-4" aria-hidden="true" />
              Enviar
            </Button>
          </div>
        </div>
      ) : null}

      {/* Navegación del asistente */}
      <div className="flex items-center justify-between rounded-lg border border-border bg-white p-3">
        <Button
          variant="outline"
          data-testid="cotizacion-wizard-prev-button"
          disabled={paso === 0}
          onClick={() => setPaso((p) => Math.max(p - 1, 0))}
        >
          <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
          Anterior
        </Button>
        <p className="num text-xs text-muted-foreground">
          Paso {paso + 1} de {PASOS.length}
        </p>
        <Button
          data-testid="cotizacion-wizard-next-button"
          disabled={paso === PASOS.length - 1}
          onClick={siguiente}
        >
          Siguiente
          <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
        </Button>
      </div>

      <FutureFeatureDialog
        open={modalFutura}
        onOpenChange={setModalFutura}
        mensaje={mensajeFutura}
        testId="cotizacion-wizard-future-dialog"
      />
    </div>
  );
};

export default CotizacionNueva;
