import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  MAGNITUDES,
  ORIGENES_PROSPECTO,
  PAISES,
  ESTADOS_REPUBLICA,
  SERVICIOS_POR_MAGNITUD,
} from "@/mocks";
import { toast } from "sonner";

const VACIO = {
  nombreComercial: "",
  razonSocial: "",
  contacto: "",
  puesto: "",
  correo: "",
  telefono: "",
  sitioWeb: "",
  pais: "México",
  estadoRep: "",
  ciudad: "",
  origen: "",
  magnitudes: [],
  servicios: [],
  proximaAccion: "",
  proximoSeguimiento: "",
  notas: "",
};

const prepararFormulario = (inicial) => ({
  ...VACIO,
  ...(inicial || {}),
  magnitudes: [...(inicial?.magnitudes || [])],
  servicios: [...(inicial?.servicios || [])],
});

export const ProspectoFormSheet = ({ open, onOpenChange, onGuardar, inicial }) => {
  const [form, setForm] = useState(() => prepararFormulario(inicial));
  const esEdicion = Boolean(inicial);
  useEffect(() => {
    if (open) {
      setForm(prepararFormulario(inicial));
    }
  }, [open, inicial]);

  const set = (campo, valor) => setForm((f) => ({ ...f, [campo]: valor }));

  const toggleLista = (campo, valor) =>
    setForm((f) => ({
      ...f,
      [campo]: f[campo].includes(valor)
        ? f[campo].filter((v) => v !== valor)
        : [...f[campo], valor],
    }));

  const serviciosDisponibles = form.magnitudes.flatMap((m) =>
    (SERVICIOS_POR_MAGNITUD[m] || []).map((s) => s.servicio),
  );

  const guardar = (e) => {
    e.preventDefault();
    if (!form.nombreComercial.trim() || !form.contacto.trim()) {
      toast.error("Faltan datos", {
        description: "Captura al menos el nombre comercial y el contacto principal.",
      });
      return;
    }
    onGuardar(form);
    setForm(prepararFormulario());
  };

  const cancelar = () => {
    setForm(prepararFormulario(inicial));
    onOpenChange(false);
  };

  const cambiarApertura = (abierto) => {
    if (!abierto) {
      setForm(prepararFormulario(inicial));
    }

    onOpenChange(abierto);
  };

  return (
    <Sheet open={open} onOpenChange={cambiarApertura}>
      <SheetContent
        side="right"
        data-testid="prospecto-form-sheet"
        className="flex w-full flex-col gap-0 p-0 sm:max-w-xl"
      >
        <SheetHeader className="border-b px-5 py-4 text-left">
          <SheetTitle className="font-display">
            {esEdicion ? "Editar prospecto" : "Nuevo prospecto"}
          </SheetTitle>
          <SheetDescription>
            {esEdicion
              ? "Actualiza la informacion comercial del prospecto."
              : "Captura la informacion comerciial del nuevo prospecto."}
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={guardar} className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 overflow-y-auto px-5 py-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="space-y-1.5 md:col-span-2">
                <Label htmlFor="nombreComercial">Nombre comercial *</Label>
                <Input
                  id="nombreComercial"
                  data-testid="prospecto-form-nombre-comercial"
                  value={form.nombreComercial}
                  onChange={(e) => set("nombreComercial", e.target.value)}
                  placeholder="Empresa Demo Z"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <Label htmlFor="razonSocial">Razón social</Label>
                <Input
                  id="razonSocial"
                  data-testid="prospecto-form-razon-social"
                  value={form.razonSocial}
                  onChange={(e) => set("razonSocial", e.target.value)}
                  placeholder="Empresa Demo Z, S.A. de C.V."
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="contacto">Contacto principal *</Label>
                <Input
                  id="contacto"
                  data-testid="prospecto-form-contacto"
                  value={form.contacto}
                  onChange={(e) => set("contacto", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="puesto">Puesto</Label>
                <Input
                  id="puesto"
                  data-testid="prospecto-form-puesto"
                  value={form.puesto}
                  onChange={(e) => set("puesto", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="correo">Correo</Label>
                <Input
                  id="correo"
                  type="email"
                  data-testid="prospecto-form-correo"
                  value={form.correo}
                  onChange={(e) => set("correo", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  data-testid="prospecto-form-telefono"
                  value={form.telefono}
                  onChange={(e) => set("telefono", e.target.value)}
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <Label htmlFor="sitioWeb">Sitio web</Label>
                <Input
                  id="sitioWeb"
                  data-testid="prospecto-form-sitio-web"
                  value={form.sitioWeb}
                  onChange={(e) => set("sitioWeb", e.target.value)}
                  placeholder="www.ejemplo.mx"
                />
              </div>

              <div className="space-y-1.5">
                <Label>País</Label>
                <Select value={form.pais} onValueChange={(v) => set("pais", v)}>
                  <SelectTrigger data-testid="prospecto-form-pais">
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent>
                    {PAISES.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Estado</Label>
                <Select value={form.estadoRep} onValueChange={(v) => set("estadoRep", v)}>
                  <SelectTrigger data-testid="prospecto-form-estado-rep">
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent>
                    {ESTADOS_REPUBLICA.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ciudad">Ciudad</Label>
                <Input
                  id="ciudad"
                  data-testid="prospecto-form-ciudad"
                  value={form.ciudad}
                  onChange={(e) => set("ciudad", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Origen del prospecto</Label>
                <Select value={form.origen} onValueChange={(v) => set("origen", v)}>
                  <SelectTrigger data-testid="prospecto-form-origen">
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent>
                    {ORIGENES_PROSPECTO.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Magnitudes de interés</Label>
                <div className="flex flex-wrap gap-3 rounded-md border border-border bg-slate-50 p-3">
                  {MAGNITUDES.map((m) => (
                    <label
                      key={m}
                      className="flex cursor-pointer items-center gap-2 text-sm text-slate-700"
                    >
                      <Checkbox
                        data-testid={`prospecto-form-magnitud-${m}`}
                        checked={form.magnitudes.includes(m)}
                        onCheckedChange={() => toggleLista("magnitudes", m)}
                      />
                      {m}
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Servicios de interés</Label>
                {serviciosDisponibles.length === 0 ? (
                  <p className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-3 text-xs text-muted-foreground">
                    Selecciona al menos una magnitud para ver los servicios disponibles.
                  </p>
                ) : (
                  <div className="space-y-2 rounded-md border border-border bg-slate-50 p-3">
                    {serviciosDisponibles.map((s) => (
                      <label
                        key={s}
                        className="flex cursor-pointer items-start gap-2 text-sm text-slate-700"
                      >
                        <Checkbox
                          checked={form.servicios.includes(s)}
                          onCheckedChange={() => toggleLista("servicios", s)}
                        />
                        {s}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="proximaAccion">Próxima acción</Label>
                <Input
                  id="proximaAccion"
                  data-testid="prospecto-form-proxima-accion"
                  value={form.proximaAccion}
                  onChange={(e) => set("proximaAccion", e.target.value)}
                  placeholder="Llamada de presentación"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="proximoSeguimiento">Fecha de seguimiento</Label>
                <Input
                  id="proximoSeguimiento"
                  type="date"
                  data-testid="prospecto-form-fecha-seguimiento"
                  value={form.proximoSeguimiento}
                  onChange={(e) => set("proximoSeguimiento", e.target.value)}
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <Label htmlFor="notas">Notas</Label>
                <Textarea
                  id="notas"
                  rows={3}
                  data-testid="prospecto-form-notas"
                  value={form.notas}
                  onChange={(e) => set("notas", e.target.value)}
                  placeholder="Comentarios internos (no se almacenan)."
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 border-t bg-white px-5 py-3">
            <Button
              type="button"
              variant="outline"
              data-testid="prospecto-form-cancel-button"
              onClick={cancelar}
            >
              Cancelar
            </Button>
            <Button type="submit" data-testid="prospecto-form-submit-button">
              Guardar
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};
