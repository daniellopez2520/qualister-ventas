import React, { useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Pencil,
  CalendarPlus,
  FileText,
  FileSpreadsheet,
  Upload,
  UserCheck,
  Ban,
  Mail,
  Phone,
  Globe,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PageHeader } from "@/components/common/PageHeader";
import { DemoNotice, DemoTag } from "@/components/common/DemoNotice";
import { StatusBadge } from "@/components/common/StatusBadge";
import { EmptyState } from "@/components/common/EmptyState";
import { FutureFeatureDialog } from "@/components/common/FutureFeatureDialog";
import { FilePickerField } from "@/components/common/FilePickerField";
import { ProspectoFormSheet } from "@/components/ventas/ProspectoFormSheet";
import { SeguimientoFormSheet } from "@/components/ventas/SeguimientoFormSheet";
import { formatFecha, formatMoneda } from "@/lib/format";
import { PROSPECTOS, SEGUIMIENTOS, COTIZACIONES, calcularTotales } from "@/mocks";
import { toast } from "sonner";

const Campo = ({ label, valor, icon: Icon }) => (
  <div className="min-w-0">
    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
    <p className="flex items-center gap-1.5 truncate text-sm text-slate-900">
      {Icon ? <Icon className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden="true" /> : null}
      {valor || "—"}
    </p>
  </div>
);

const ProspectoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const base = PROSPECTOS.find((p) => p.id === id);

  const [prospecto, setProspecto] = useState(base);
  const [seguimientos, setSeguimientos] = useState(
    SEGUIMIENTOS.filter((s) => s.relacionId === id),
  );
  const [editar, setEditar] = useState(false);
  const [nuevoSeguimiento, setNuevoSeguimiento] = useState(false);
  const [modalExcel, setModalExcel] = useState(false);
  const [modalCarga, setModalCarga] = useState(false);
  const [modalConvertir, setModalConvertir] = useState(false);
  const [modalNoCalificado, setModalNoCalificado] = useState(false);

  const cotizaciones = useMemo(
    () => COTIZACIONES.filter((c) => c.relacionId === id),
    [id],
  );

  if (!base) {
    return (
      <div className="space-y-4">
        <EmptyState
          titulo="Prospecto no encontrado"
          descripcion="El identificador solicitado no existe en los datos de demostración."
          accion={
            <Button variant="outline" onClick={() => navigate("/ventas/prospectos")}>
              Volver a Prospectos
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <Button
          variant="ghost"
          size="sm"
          data-testid="prospecto-detalle-back-button"
          onClick={() => navigate("/ventas/prospectos")}
          className="-ml-2"
        >
          <ArrowLeft className="mr-1 h-4 w-4" aria-hidden="true" />
          Regresar a Prospectos
        </Button>
      </div>

      <PageHeader
        titulo={prospecto.nombreComercial}
        descripcion={`${prospecto.folio} · ${prospecto.razonSocial}`}
        acciones={<StatusBadge estado={prospecto.estado} testId="prospecto-detalle-estado" />}
      />

      <div className="flex flex-wrap gap-2" data-testid="prospecto-detalle-actions">
        <Button variant="outline" size="sm" data-testid="prospecto-action-editar" onClick={() => setEditar(true)}>
          <Pencil className="mr-2 h-4 w-4" aria-hidden="true" />
          Editar prospecto
        </Button>
        <Button variant="outline" size="sm" data-testid="prospecto-action-seguimiento" onClick={() => setNuevoSeguimiento(true)}>
          <CalendarPlus className="mr-2 h-4 w-4" aria-hidden="true" />
          Registrar seguimiento
        </Button>
        <Button variant="outline" size="sm" data-testid="prospecto-action-cotizacion" onClick={() => navigate("/ventas/cotizaciones/nueva")}>
          <FileText className="mr-2 h-4 w-4" aria-hidden="true" />
          Crear cotización
        </Button>
        <Button variant="outline" size="sm" data-testid="prospecto-action-excel" onClick={() => setModalExcel(true)}>
          <FileSpreadsheet className="mr-2 h-4 w-4" aria-hidden="true" />
          Generar formato Excel
        </Button>
        <Button variant="outline" size="sm" data-testid="prospecto-action-cargar" onClick={() => setModalCarga(true)}>
          <Upload className="mr-2 h-4 w-4" aria-hidden="true" />
          Cargar formato completado
        </Button>
        <Button variant="outline" size="sm" data-testid="prospecto-action-convertir" onClick={() => setModalConvertir(true)}>
          <UserCheck className="mr-2 h-4 w-4" aria-hidden="true" />
          Convertir en cliente
        </Button>
        <Button variant="outline" size="sm" data-testid="prospecto-action-no-calificado" onClick={() => setModalNoCalificado(true)}>
          <Ban className="mr-2 h-4 w-4" aria-hidden="true" />
          Marcar como no calificado
        </Button>
      </div>

      <DemoNotice />

      <Tabs defaultValue="resumen">
        <TabsList data-testid="prospecto-detalle-tabs" className="flex h-auto w-full flex-wrap justify-start">
          <TabsTrigger value="resumen" data-testid="prospecto-tab-resumen">Resumen</TabsTrigger>
          <TabsTrigger value="contactos" data-testid="prospecto-tab-contactos">Contactos</TabsTrigger>
          <TabsTrigger value="seguimientos" data-testid="prospecto-tab-seguimientos">Seguimientos</TabsTrigger>
          <TabsTrigger value="documentos" data-testid="prospecto-tab-documentos">Documentos</TabsTrigger>
          <TabsTrigger value="cotizaciones" data-testid="prospecto-tab-cotizaciones">Cotizaciones</TabsTrigger>
          <TabsTrigger value="historial" data-testid="prospecto-tab-historial">Historial</TabsTrigger>
        </TabsList>

        <TabsContent value="resumen" className="mt-4 space-y-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle className="font-display text-base">Información general</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Campo label="Contacto principal" valor={prospecto.contacto} />
                <Campo label="Puesto" valor={prospecto.puesto} />
                <Campo label="Correo" valor={prospecto.correo} icon={Mail} />
                <Campo label="Teléfono" valor={prospecto.telefono} icon={Phone} />
                <Campo label="Sitio web" valor={prospecto.sitioWeb} icon={Globe} />
                <Campo
                  label="Ubicación"
                  valor={[prospecto.ciudad, prospecto.estadoRep, prospecto.pais].filter(Boolean).join(", ")}
                  icon={MapPin}
                />
                <Campo label="Origen" valor={prospecto.origen} />
                <Campo label="Vendedor" valor={prospecto.vendedor} />
                <Campo label="Fecha de creación" valor={formatFecha(prospecto.fechaCreacion)} />
                <Campo label="Próxima acción" valor={prospecto.proximaAccion} />
                <Campo
                  label="Próximo seguimiento"
                  valor={prospecto.proximoSeguimiento ? formatFecha(prospecto.proximoSeguimiento) : "—"}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="font-display text-base">Interés comercial</CardTitle>
                <DemoTag />
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Magnitudes
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {(prospecto.magnitudes || []).map((m) => (
                      <span key={m} className="rounded bg-blue-50 px-2 py-0.5 text-xs text-blue-700 ring-1 ring-blue-200">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Servicios
                  </p>
                  <ul className="space-y-1 text-sm text-slate-800">
                    {(prospecto.servicios || []).map((s) => (
                      <li key={s} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-700" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Notas
                  </p>
                  <p className="text-sm text-slate-700">{prospecto.notas || "—"}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contactos" className="mt-4">
          <Card>
            <div className="qlm-table-wrap">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead>Nombre</TableHead>
                    <TableHead>Puesto</TableHead>
                    <TableHead>Correo</TableHead>
                    <TableHead>Teléfono</TableHead>
                    <TableHead>Principal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(prospecto.contactos || []).map((c) => (
                    <TableRow key={c.correo || c.nombre}>
                      <TableCell className="text-sm font-medium">{c.nombre}</TableCell>
                      <TableCell className="text-sm">{c.puesto || "—"}</TableCell>
                      <TableCell className="text-sm">{c.correo || "—"}</TableCell>
                      <TableCell className="font-mono text-xs">{c.telefono || "—"}</TableCell>
                      <TableCell>
                        {c.principal ? <StatusBadge estado="Activo" /> : <span className="text-sm text-muted-foreground">—</span>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="seguimientos" className="mt-4">
          {seguimientos.length === 0 ? (
            <EmptyState
              titulo="Sin seguimientos registrados"
              descripcion="Registra un seguimiento para verlo aquí (solo estado temporal)."
              accion={
                <Button size="sm" onClick={() => setNuevoSeguimiento(true)}>
                  Registrar seguimiento
                </Button>
              }
            />
          ) : (
            <Card>
              <div className="qlm-table-wrap">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead>Tipo</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Hora</TableHead>
                      <TableHead>Responsable</TableHead>
                      <TableHead>Resultado</TableHead>
                      <TableHead>Próxima acción</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {seguimientos.map((s) => (
                      <TableRow key={s.id}>
                        <TableCell><StatusBadge estado={s.tipo} /></TableCell>
                        <TableCell className="whitespace-nowrap text-sm">{formatFecha(s.fecha)}</TableCell>
                        <TableCell className="font-mono text-xs">{s.hora}</TableCell>
                        <TableCell className="text-sm">{s.responsable}</TableCell>
                        <TableCell className="text-sm">{s.resultado}</TableCell>
                        <TableCell className="text-sm">{s.proximaAccion}</TableCell>
                        <TableCell><StatusBadge estado={s.estado} /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="documentos" className="mt-4 space-y-4">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="font-display text-base">Documentos</CardTitle>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setModalExcel(true)}>
                  <FileSpreadsheet className="mr-2 h-4 w-4" aria-hidden="true" />
                  Generar formato Excel
                </Button>
                <Button size="sm" variant="outline" onClick={() => setModalCarga(true)}>
                  <Upload className="mr-2 h-4 w-4" aria-hidden="true" />
                  Cargar formato
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {(prospecto.documentos || []).length === 0 ? (
                <p className="px-4 py-6 text-center text-sm text-muted-foreground">
                  Sin documentos de demostración.
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead>Archivo</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {prospecto.documentos.map((d) => (
                      <TableRow key={d.nombre}>
                        <TableCell className="font-mono text-xs">{d.nombre}</TableCell>
                        <TableCell className="text-sm">{d.tipo}</TableCell>
                        <TableCell className="text-sm">{formatFecha(d.fecha)}</TableCell>
                        <TableCell><StatusBadge estado={d.estado} /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cotizaciones" className="mt-4">
          {cotizaciones.length === 0 ? (
            <EmptyState
              titulo="Sin cotizaciones relacionadas"
              descripcion="Este prospecto de demostración no tiene cotizaciones registradas."
              accion={
                <Button size="sm" onClick={() => navigate("/ventas/cotizaciones/nueva")}>
                  Crear cotización
                </Button>
              }
            />
          ) : (
            <Card>
              <div className="qlm-table-wrap">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead>Folio</TableHead>
                      <TableHead>Rev.</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Moneda</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cotizaciones.map((c) => {
                      const { total } = calcularTotales(c.partidas, c.descuentoPct, c.ivaPct);
                      return (
                        <TableRow key={c.id}>
                          <TableCell className="font-mono text-xs">{c.folio}</TableCell>
                          <TableCell className="num text-sm">{c.revision}</TableCell>
                          <TableCell className="text-sm">{formatFecha(c.fecha)}</TableCell>
                          <TableCell className="text-sm">{c.moneda}</TableCell>
                          <TableCell className="num text-right font-mono text-sm">
                            {formatMoneda(total, c.moneda)}
                          </TableCell>
                          <TableCell><StatusBadge estado={c.estado} /></TableCell>
                          <TableCell className="text-right">
                            <Button asChild size="sm" variant="ghost">
                              <Link to={`/ventas/cotizaciones/${c.id}`}>Ver</Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="historial" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <ol className="relative space-y-5 pl-6 before:absolute before:bottom-1 before:left-[5px] before:top-1 before:w-px before:bg-slate-200">
                {(prospecto.historial || []).map((h, i) => (
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
      </Tabs>

      {/* Paneles y modales */}
      <ProspectoFormSheet
        open={editar}
        onOpenChange={setEditar}
        inicial={prospecto}
        onGuardar={(form) => {
          setProspecto((p) => ({ ...p, ...form }));
          setEditar(false);
          toast.success("Cambios aplicados temporalmente", {
            description: "No se guardaron en ninguna base de datos.",
          });
        }}
      />

      <SeguimientoFormSheet
        open={nuevoSeguimiento}
        onOpenChange={setNuevoSeguimiento}
        relacionFija={{ tipo: "Prospecto", id: prospecto.id }}
        onGuardar={(s) => {
          setSeguimientos((prev) => [s, ...prev]);
          setNuevoSeguimiento(false);
          toast.success("Seguimiento agregado temporalmente");
        }}
      />

      <FutureFeatureDialog
        open={modalExcel}
        onOpenChange={setModalExcel}
        titulo="Generación del formato de alta en Excel"
        mensaje="Así funcionará el proceso cuando se conecte el backend. En esta etapa no se genera ningún archivo."
        detalles={[
          "1. El sistema tomará los datos del prospecto y del catálogo de servicios.",
          "2. Se generará un archivo Excel con el formato oficial de alta de cliente.",
          "3. El archivo quedará disponible para descarga y envío al contacto principal.",
          "4. Se registrará el evento en el historial del prospecto.",
        ]}
        testId="prospecto-modal-excel"
      />

      <Dialog open={modalCarga} onOpenChange={setModalCarga}>
        <DialogContent data-testid="prospecto-modal-carga" className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display">Cargar formato completado</DialogTitle>
            <DialogDescription>
              Puedes seleccionar un archivo para visualizar su nombre. No se sube ni se procesa en
              esta etapa.
            </DialogDescription>
          </DialogHeader>
          <FilePickerField
            label="Formato de alta completado"
            accept=".xlsx,.xls,.pdf"
            testId="prospecto-carga-file"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalCarga(false)}>
              Cancelar
            </Button>
            <Button
              data-testid="prospecto-carga-confirm"
              onClick={() => {
                setModalCarga(false);
                toast.info("Carga de documentos", {
                  description: "El almacenamiento de archivos se habilitará con el backend.",
                });
              }}
            >
              Continuar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={modalConvertir} onOpenChange={setModalConvertir}>
        <DialogContent data-testid="prospecto-modal-convertir">
          <DialogHeader>
            <DialogTitle className="font-display">Convertir en cliente</DialogTitle>
            <DialogDescription>
              Se simulará el cambio de estado a “Convertido en cliente” dentro del estado temporal
              del prototipo. El alta real del cliente se hará con el backend.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalConvertir(false)}>
              Cancelar
            </Button>
            <Button
              data-testid="prospecto-convertir-confirm"
              onClick={() => {
                setProspecto((p) => ({ ...p, estado: "Convertido en cliente" }));
                setModalConvertir(false);
                toast.success("Estado actualizado temporalmente");
              }}
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={modalNoCalificado} onOpenChange={setModalNoCalificado}>
        <DialogContent data-testid="prospecto-modal-no-calificado">
          <DialogHeader>
            <DialogTitle className="font-display">Marcar como no calificado</DialogTitle>
            <DialogDescription>
              El cambio se aplicará sólo en el estado temporal del prototipo visual.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalNoCalificado(false)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              data-testid="prospecto-no-calificado-confirm"
              onClick={() => {
                setProspecto((p) => ({ ...p, estado: "No calificado" }));
                setModalNoCalificado(false);
                toast.success("Estado actualizado temporalmente");
              }}
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProspectoDetalle;
