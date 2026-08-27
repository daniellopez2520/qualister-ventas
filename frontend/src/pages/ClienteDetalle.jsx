import React, { useMemo } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone, Globe, MapPin, FileText, CalendarPlus } from "lucide-react";
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
import { PageHeader } from "@/components/common/PageHeader";
import { DemoNotice, DemoTag } from "@/components/common/DemoNotice";
import { StatusBadge } from "@/components/common/StatusBadge";
import { EmptyState } from "@/components/common/EmptyState";
import { formatFecha, formatMoneda } from "@/lib/format";
import { CLIENTES, COTIZACIONES, SEGUIMIENTOS, calcularTotales } from "@/mocks";

const Campo = ({ label, valor, icon: Icon }) => (
  <div className="min-w-0">
    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
    <p className="flex items-center gap-1.5 truncate text-sm text-slate-900">
      {Icon ? <Icon className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden="true" /> : null}
      {valor || "—"}
    </p>
  </div>
);

const ClienteDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const cliente = CLIENTES.find((c) => c.id === id);

  const cotizaciones = useMemo(() => COTIZACIONES.filter((c) => c.relacionId === id), [id]);
  const seguimientos = useMemo(() => SEGUIMIENTOS.filter((s) => s.relacionId === id), [id]);

  if (!cliente) {
    return (
      <EmptyState
        titulo="Cliente no encontrado"
        descripcion="El identificador solicitado no existe en los datos de demostración."
        accion={
          <Button variant="outline" onClick={() => navigate("/ventas/clientes")}>
            Volver a Clientes
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-5">
      <Button
        variant="ghost"
        size="sm"
        data-testid="cliente-detalle-back-button"
        onClick={() => navigate("/ventas/clientes")}
        className="-ml-2"
      >
        <ArrowLeft className="mr-1 h-4 w-4" aria-hidden="true" />
        Regresar a Clientes
      </Button>

      <PageHeader
        titulo={cliente.nombreComercial}
        descripcion={`${cliente.codigo} · ${cliente.razonSocial} · RFC ${cliente.rfc}`}
        acciones={
          <>
            <StatusBadge estado={cliente.estado} testId="cliente-detalle-estado" />
            <Button
              size="sm"
              variant="outline"
              data-testid="cliente-action-cotizacion"
              onClick={() => navigate("/ventas/cotizaciones/nueva")}
            >
              <FileText className="mr-2 h-4 w-4" aria-hidden="true" />
              Crear cotización
            </Button>
            <Button
              size="sm"
              variant="outline"
              data-testid="cliente-action-seguimiento"
              onClick={() => navigate("/ventas/seguimientos?nuevo=1")}
            >
              <CalendarPlus className="mr-2 h-4 w-4" aria-hidden="true" />
              Registrar seguimiento
            </Button>
          </>
        }
      />

      <DemoNotice texto="Información de demostración. Este módulo no muestra facturas, pagos ni cuentas por cobrar (área de Finanzas)." />

      <Tabs defaultValue="resumen">
        <TabsList data-testid="cliente-detalle-tabs" className="flex h-auto w-full flex-wrap justify-start">
          <TabsTrigger value="resumen" data-testid="cliente-tab-resumen">Resumen</TabsTrigger>
          <TabsTrigger value="comercial" data-testid="cliente-tab-comercial">Información comercial</TabsTrigger>
          <TabsTrigger value="contactos" data-testid="cliente-tab-contactos">Contactos</TabsTrigger>
          <TabsTrigger value="ubicaciones" data-testid="cliente-tab-ubicaciones">Ubicaciones</TabsTrigger>
          <TabsTrigger value="cotizaciones" data-testid="cliente-tab-cotizaciones">Cotizaciones</TabsTrigger>
          <TabsTrigger value="documentos" data-testid="cliente-tab-documentos">Documentos</TabsTrigger>
          <TabsTrigger value="actividades" data-testid="cliente-tab-actividades">Actividades</TabsTrigger>
        </TabsList>

        <TabsContent value="resumen" className="mt-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle className="font-display text-base">Datos generales</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Campo label="Contacto principal" valor={cliente.contacto} />
                <Campo label="Puesto" valor={cliente.puesto} />
                <Campo label="Correo" valor={cliente.correo} icon={Mail} />
                <Campo label="Teléfono" valor={cliente.telefono} icon={Phone} />
                <Campo label="Sitio web" valor={cliente.sitioWeb} icon={Globe} />
                <Campo label="Giro" valor={cliente.giro} />
                <Campo label="Vendedor asignado" valor={cliente.vendedor} />
                <Campo label="Última actividad" valor={formatFecha(cliente.ultimaActividad)} />
                <Campo label="Cotizaciones activas" valor={String(cliente.cotizacionesActivas)} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="font-display text-base">Magnitudes contratadas</CardTitle>
                <DemoTag />
              </CardHeader>
              <CardContent className="flex flex-wrap gap-1">
                {(cliente.magnitudes || []).map((m) => (
                  <span key={m} className="rounded bg-blue-50 px-2 py-0.5 text-xs text-blue-700 ring-1 ring-blue-200">
                    {m}
                  </span>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="comercial" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-base">Información comercial</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Campo label="Condiciones de pago" valor={cliente.condicionesPago} />
              <Campo label="Moneda preferente" valor={cliente.moneda} />
              <Campo label="Línea de crédito (referencia)" valor={cliente.limiteCredito} />
              <Campo label="RFC" valor={cliente.rfc} />
              <Campo label="Razón social" valor={cliente.razonSocial} />
              <Campo label="Estado del cliente" valor={cliente.estado} />
            </CardContent>
          </Card>
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
                  {(cliente.contactos || []).map((c) => (
                    <TableRow key={c.correo || c.nombre}>
                      <TableCell className="text-sm font-medium">{c.nombre}</TableCell>
                      <TableCell className="text-sm">{c.puesto}</TableCell>
                      <TableCell className="text-sm">{c.correo}</TableCell>
                      <TableCell className="font-mono text-xs">{c.telefono}</TableCell>
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

        <TabsContent value="ubicaciones" className="mt-4">
          {(cliente.ubicaciones || []).length === 0 ? (
            <EmptyState titulo="Sin ubicaciones registradas" descripcion="Datos de demostración." />
          ) : (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              {cliente.ubicaciones.map((u) => (
                <Card key={u.nombre}>
                  <CardContent className="space-y-1 p-4">
                    <p className="text-sm font-semibold text-slate-900">{u.nombre}</p>
                    <p className="flex items-start gap-1.5 text-sm text-slate-700">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden="true" />
                      {u.direccion}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {u.tipo} · Contacto: {u.contacto}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="cotizaciones" className="mt-4">
          {cotizaciones.length === 0 ? (
            <EmptyState
              titulo="Sin cotizaciones relacionadas"
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
                      <TableHead>Vigencia</TableHead>
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
                          <TableCell className="text-sm">{formatFecha(c.vigencia)}</TableCell>
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

        <TabsContent value="documentos" className="mt-4">
          {(cliente.documentos || []).length === 0 ? (
            <EmptyState titulo="Sin documentos" descripcion="Datos de demostración." />
          ) : (
            <Card>
              <div className="qlm-table-wrap">
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
                    {cliente.documentos.map((d) => (
                      <TableRow key={d.nombre}>
                        <TableCell className="font-mono text-xs">{d.nombre}</TableCell>
                        <TableCell className="text-sm">{d.tipo}</TableCell>
                        <TableCell className="text-sm">{formatFecha(d.fecha)}</TableCell>
                        <TableCell><StatusBadge estado={d.estado === "Validado" ? "Activo" : d.estado} /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="actividades" className="mt-4 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-base">Actividades registradas</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y">
                {(cliente.actividades || []).map((a, i) => (
                  <li key={`${a.fecha}-${i}`} className="flex items-start justify-between gap-3 px-4 py-3">
                    <div>
                      <p className="text-sm text-slate-900">{a.detalle}</p>
                      <p className="text-xs text-muted-foreground">{a.usuario}</p>
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

          {seguimientos.length > 0 ? (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="font-display text-base">Seguimientos relacionados</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead>Tipo</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Responsable</TableHead>
                      <TableHead>Próxima acción</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {seguimientos.map((s) => (
                      <TableRow key={s.id}>
                        <TableCell><StatusBadge estado={s.tipo} /></TableCell>
                        <TableCell className="text-sm">{formatFecha(s.fecha)} {s.hora}</TableCell>
                        <TableCell className="text-sm">{s.responsable}</TableCell>
                        <TableCell className="text-sm">{s.proximaAccion}</TableCell>
                        <TableCell><StatusBadge estado={s.estado} /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ) : null}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClienteDetalle;
