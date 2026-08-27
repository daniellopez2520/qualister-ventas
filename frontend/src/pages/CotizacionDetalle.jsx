import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, FileDown, Send, Copy, CheckCircle2 } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/common/PageHeader";
import { DemoNotice, DemoTag } from "@/components/common/DemoNotice";
import { StatusBadge } from "@/components/common/StatusBadge";
import { EmptyState } from "@/components/common/EmptyState";
import { FutureFeatureDialog } from "@/components/common/FutureFeatureDialog";
import { FilePickerField } from "@/components/common/FilePickerField";
import { CotizacionPreview } from "@/components/ventas/CotizacionPreview";
import { formatFecha, formatMoneda, hoyDemo } from "@/lib/format";
import {
  COTIZACIONES,
  calcularTotales,
  TIPOS_EVIDENCIA,
  TIPO_CAMBIO_DEMO,
  CONDICIONES_PAGO,
} from "@/mocks";

const Dato = ({ label, valor, mono }) => (
  <div className="min-w-0">
    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
    <p className={`truncate text-sm text-slate-900 ${mono ? "font-mono" : ""}`}>{valor || "—"}</p>
  </div>
);

const CotizacionDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const cot = COTIZACIONES.find((c) => c.id === id);

  const [modalFutura, setModalFutura] = useState(false);
  const [mensajeFutura, setMensajeFutura] = useState("");
  const [detallesFutura, setDetallesFutura] = useState([]);
  const [tipoEvidencia, setTipoEvidencia] = useState(TIPOS_EVIDENCIA[0]);
  const [descEvidencia, setDescEvidencia] = useState("");
  const [fechaAceptacion, setFechaAceptacion] = useState(hoyDemo);
  const [archivoEvidencia, setArchivoEvidencia] = useState("");

  if (!cot) {
    return (
      <EmptyState
        titulo="Cotización no encontrada"
        descripcion="El identificador solicitado no existe en los datos de demostración."
        accion={
          <Button variant="outline" onClick={() => navigate("/ventas/cotizaciones")}>
            Volver a Cotizaciones
          </Button>
        }
      />
    );
  }

  const totales = calcularTotales(cot.partidas, cot.descuentoPct, cot.ivaPct);

  const abrirFutura = (mensaje, detalles = []) => {
    setMensajeFutura(mensaje);
    setDetallesFutura(detalles);
    setModalFutura(true);
  };

  return (
    <div className="space-y-5">
      <Button
        variant="ghost"
        size="sm"
        className="-ml-2"
        data-testid="cotizacion-detalle-back-button"
        onClick={() => navigate("/ventas/cotizaciones")}
      >
        <ArrowLeft className="mr-1 h-4 w-4" aria-hidden="true" />
        Regresar a Cotizaciones
      </Button>

      <PageHeader
        titulo={`${cot.folio} · Revisión ${cot.revision}`}
        descripcion={`${cot.tipoCliente}: ${cot.cliente} · Responsable: ${cot.responsable}`}
        acciones={
          <>
            <StatusBadge estado={cot.estado} testId="cotizacion-detalle-estado" />
            <Button
              size="sm"
              variant="outline"
              data-testid="cotizacion-detalle-pdf-button"
              onClick={() =>
                abrirFutura(
                  "La generación de PDF se habilitará en la etapa de conexión con backend.",
                )
              }
            >
              <FileDown className="mr-2 h-4 w-4" aria-hidden="true" />
              Generar PDF
            </Button>
            <Button
              size="sm"
              variant="outline"
              data-testid="cotizacion-detalle-send-button"
              onClick={() =>
                abrirFutura("El envío por correo se habilitará en la etapa de conexión con backend.")
              }
            >
              <Send className="mr-2 h-4 w-4" aria-hidden="true" />
              Enviar
            </Button>
            <Button
              size="sm"
              variant="outline"
              data-testid="cotizacion-detalle-revision-button"
              onClick={() =>
                abrirFutura("La creación de nuevas revisiones se habilitará con el backend.")
              }
            >
              <Copy className="mr-2 h-4 w-4" aria-hidden="true" />
              Nueva revisión
            </Button>
          </>
        }
      />

      <DemoNotice />

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="font-display text-base">Datos generales</CardTitle>
          <DemoTag />
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Dato label="Folio" valor={cot.folio} mono />
          <Dato label="Revisión" valor={String(cot.revision)} />
          <Dato label="Estado" valor={cot.estado} />
          <Dato label={cot.tipoCliente} valor={cot.cliente} />
          <Dato label="Contacto" valor={cot.contacto} />
          <Dato label="Correo" valor={cot.correo} />
          <Dato label="Fecha" valor={formatFecha(cot.fecha)} />
          <Dato label="Vigencia" valor={formatFecha(cot.vigencia)} />
          <Dato label="Moneda" valor={cot.moneda} />
          <Dato
            label="Tipo de cambio mostrado"
            valor={`${cot.tipoCambio.toFixed(4)} (demostración)`}
            mono
          />
          <Dato label="Condiciones de pago" valor={cot.condicionesPago} />
          <Dato label="Lugar del servicio" valor={cot.lugarServicio} />
        </CardContent>
      </Card>

      <Tabs defaultValue="servicios">
        <TabsList data-testid="cotizacion-detalle-tabs" className="flex h-auto w-full flex-wrap justify-start">
          <TabsTrigger value="servicios" data-testid="cotizacion-tab-servicios">Servicios y totales</TabsTrigger>
          <TabsTrigger value="condiciones" data-testid="cotizacion-tab-condiciones">Condiciones</TabsTrigger>
          <TabsTrigger value="evidencia" data-testid="cotizacion-tab-evidencia">Evidencia de aceptación</TabsTrigger>
          <TabsTrigger value="historial" data-testid="cotizacion-tab-historial">Historial</TabsTrigger>
          <TabsTrigger value="documento" data-testid="cotizacion-tab-documento">Vista previa</TabsTrigger>
        </TabsList>

        <TabsContent value="servicios" className="mt-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            <Card className="lg:col-span-8">
              <CardHeader className="pb-3">
                <CardTitle className="font-display text-base">Servicios cotizados</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="qlm-table-wrap">
                  <Table data-testid="cotizacion-partidas-detalle">
                    <TableHeader>
                      <TableRow className="bg-slate-50">
                        <TableHead>Código</TableHead>
                        <TableHead>Servicio</TableHead>
                        <TableHead>Variante</TableHead>
                        <TableHead>Tiempo</TableHead>
                        <TableHead className="text-right">Cant.</TableHead>
                        <TableHead className="text-right">P. unitario</TableHead>
                        <TableHead className="text-right">Importe</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cot.partidas.map((p, i) => (
                        <TableRow key={`${p.codigo}-${i}`}>
                          <TableCell className="font-mono text-xs">{p.codigo}</TableCell>
                          <TableCell className="text-sm">{p.servicio}</TableCell>
                          <TableCell className="text-sm">{p.variante}</TableCell>
                          <TableCell className="whitespace-nowrap text-xs">{p.tiempoEstimado}</TableCell>
                          <TableCell className="num text-right text-sm">{p.cantidad}</TableCell>
                          <TableCell className="num text-right font-mono text-sm">
                            {formatMoneda(p.precio, cot.moneda)}
                          </TableCell>
                          <TableCell className="num text-right font-mono text-sm">
                            {formatMoneda(p.cantidad * p.precio, cot.moneda)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-4">
              <CardHeader className="pb-3">
                <CardTitle className="font-display text-base">Totales</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Subtotal</dt>
                    <dd className="num font-mono">{formatMoneda(totales.subtotal, cot.moneda)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Descuento ({cot.descuentoPct}%)</dt>
                    <dd className="num font-mono text-red-700">
                      -{formatMoneda(totales.descuento, cot.moneda)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Impuestos ({cot.ivaPct}%)</dt>
                    <dd className="num font-mono">{formatMoneda(totales.impuestos, cot.moneda)}</dd>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2">
                    <dt className="font-semibold">Total</dt>
                    <dd className="num font-mono text-base font-semibold">
                      {formatMoneda(totales.total, cot.moneda)}
                    </dd>
                  </div>
                  {cot.moneda === "USD" ? (
                    <div className="flex justify-between border-t border-border pt-2 text-xs text-muted-foreground">
                      <dt>Equivalente MXN (demo)</dt>
                      <dd className="num font-mono">
                        {formatMoneda(totales.total * cot.tipoCambio, "MXN", 0)}
                      </dd>
                    </div>
                  ) : null}
                </dl>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="condiciones" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-base">Condiciones comerciales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Dato label="Condiciones de pago" valor={cot.condicionesPago} />
                <Dato label="Lugar del servicio" valor={cot.lugarServicio} />
                <Dato
                  label="Tipo de cambio de referencia"
                  valor={`${TIPO_CAMBIO_DEMO.valor.toFixed(4)} · ${formatFecha(TIPO_CAMBIO_DEMO.fecha)}`}
                  mono
                />
              </div>
              <div>
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Notas
                </p>
                <p className="text-sm text-slate-700">{cot.notas}</p>
              </div>
              <div>
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Catálogo de condiciones disponibles
                </p>
                <div className="flex flex-wrap gap-1">
                  {CONDICIONES_PAGO.map((c) => (
                    <span
                      key={c}
                      className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-700"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evidencia" className="mt-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            <Card className="lg:col-span-7" data-testid="cotizacion-evidencia-card">
              <CardHeader className="pb-3">
                <CardTitle className="font-display text-base">Evidencia de aceptación</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Tipo de evidencia</Label>
                  <Select value={tipoEvidencia} onValueChange={setTipoEvidencia}>
                    <SelectTrigger data-testid="cotizacion-evidence-type-select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TIPOS_EVIDENCIA.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <FilePickerField
                  label="Documento PDF de respaldo"
                  accept=".pdf"
                  testId="cotizacion-evidence-file"
                  ayuda="Sólo se muestra el nombre del archivo. No se sube ni se valida en esta etapa."
                  onArchivoSeleccionado={setArchivoEvidencia}
                />

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label htmlFor="ev-desc">Descripción</Label>
                    <Textarea
                      id="ev-desc"
                      rows={3}
                      data-testid="cotizacion-evidence-description"
                      value={descEvidencia}
                      onChange={(e) => setDescEvidencia(e.target.value)}
                      placeholder="Ej. Orden de compra recibida por correo (demostración)."
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="ev-fecha">Fecha de aceptación</Label>
                    <Input
                      id="ev-fecha"
                      type="date"
                      data-testid="cotizacion-evidence-date"
                      value={fechaAceptacion}
                      onChange={(e) => setFechaAceptacion(e.target.value)}
                    />
                  </div>
                </div>

                <Button
                  data-testid="cotizacion-evidence-submit-button"
                  onClick={() =>
                    abrirFutura(
                      "La validación y el almacenamiento de la evidencia de aceptación se implementarán posteriormente.",
                      [
                        `Tipo de evidencia: ${tipoEvidencia}`,
                        `Archivo seleccionado: ${archivoEvidencia || "ninguno"}`,
                        `Fecha de aceptación: ${formatFecha(fechaAceptacion)}`,
                        "El archivo no se sube ni se conserva en esta etapa del prototipo.",
                      ],
                    )
                  }
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" aria-hidden="true" />
                  Registrar aceptación
                </Button>
              </CardContent>
            </Card>

            <Card className="lg:col-span-5">
              <CardHeader className="pb-3">
                <CardTitle className="font-display text-base">Evidencias registradas</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {(cot.evidencias || []).length === 0 ? (
                  <p className="px-4 py-8 text-center text-sm text-muted-foreground">
                    Sin evidencias de demostración para esta cotización.
                  </p>
                ) : (
                  <ul className="divide-y">
                    {cot.evidencias.map((e) => (
                      <li key={e.archivo} className="px-4 py-3">
                        <p className="text-sm font-medium text-slate-900">{e.tipo}</p>
                        <p className="font-mono text-xs text-slate-700">{e.archivo}</p>
                        <p className="text-xs text-muted-foreground">
                          {e.descripcion} · {formatFecha(e.fecha)}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="historial" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <ol className="relative space-y-5 pl-6 before:absolute before:bottom-1 before:left-[5px] before:top-1 before:w-px before:bg-slate-200">
                {(cot.historial || []).map((h, i) => (
                  <li key={`${h.fecha}-${i}`} className="relative">
                    <span className="absolute -left-6 top-1 h-3 w-3 rounded-full border-2 border-white bg-blue-700" />
                    <p className="text-sm font-medium text-slate-900">{h.evento}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatFecha(h.fecha)} · {h.usuario} · {h.detalle}
                    </p>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documento" className="mt-4">
          <CotizacionPreview cotizacion={cot} />
        </TabsContent>
      </Tabs>

      <FutureFeatureDialog
        open={modalFutura}
        onOpenChange={setModalFutura}
        mensaje={mensajeFutura}
        detalles={detallesFutura}
        testId="cotizacion-detalle-future-dialog"
      />
    </div>
  );
};

export default CotizacionDetalle;
