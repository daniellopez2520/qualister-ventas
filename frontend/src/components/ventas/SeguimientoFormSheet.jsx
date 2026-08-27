import React, { useState } from "react";
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
import {
  TIPOS_ACTIVIDAD,
  ESTADOS_SEGUIMIENTO,
  VENDEDORES,
  PROSPECTOS,
  CLIENTES,
} from "@/mocks";
import { hoyDemo } from "@/lib/format";
import { toast } from "sonner";

export const SeguimientoFormSheet = ({
  open,
  onOpenChange,
  onGuardar,
  relacionFija,
}) => {
  const [form, setForm] = useState({
    relacionRef: relacionFija ? `${relacionFija.tipo}|${relacionFija.id}` : "",
    tipo: "Llamada",
    fecha: hoyDemo,
    hora: "10:00",
    responsable: "Usuario de Ventas",
    resultado: "",
    proximaAccion: "",
    estado: "Programado",
    notas: "",
  });

  const set = (campo, valor) => setForm((f) => ({ ...f, [campo]: valor }));

  const opciones = [
    ...PROSPECTOS.map((p) => ({
      valor: `Prospecto|${p.id}`,
      etiqueta: `Prospecto · ${p.nombreComercial}`,
    })),
    ...CLIENTES.map((c) => ({
      valor: `Cliente|${c.id}`,
      etiqueta: `Cliente · ${c.nombreComercial}`,
    })),
  ];

  const guardar = (e) => {
    e.preventDefault();
    if (!form.relacionRef) {
      toast.error("Selecciona un prospecto o cliente");
      return;
    }
    const [tipoRel, idRel] = form.relacionRef.split("|");
    const nombre =
      tipoRel === "Prospecto"
        ? (PROSPECTOS.find((p) => p.id === idRel) || {}).nombreComercial
        : (CLIENTES.find((c) => c.id === idRel) || {}).nombreComercial;

    onGuardar({
      id: `S-TMP-${Date.now()}`,
      relacionTipo: tipoRel,
      relacionId: idRel,
      relacion: nombre || idRel,
      tipo: form.tipo,
      fecha: form.fecha,
      hora: form.hora,
      responsable: form.responsable,
      resultado: form.resultado || "—",
      proximaAccion: form.proximaAccion || "—",
      estado: form.estado,
      notas: form.notas,
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        data-testid="seguimiento-form-sheet"
        className="flex w-full flex-col gap-0 p-0 sm:max-w-lg"
      >
        <SheetHeader className="border-b px-5 py-4 text-left">
          <SheetTitle className="font-display">Nuevo seguimiento</SheetTitle>
          <SheetDescription>
            Registro visual: la información se mantiene sólo en memoria y se reinicia al recargar.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={guardar} className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
            <div className="space-y-1.5">
              <Label>Prospecto o cliente</Label>
              <Select
                value={form.relacionRef}
                onValueChange={(v) => set("relacionRef", v)}
                disabled={Boolean(relacionFija)}
              >
                <SelectTrigger data-testid="seguimiento-form-relacion">
                  <SelectValue placeholder="Selecciona" />
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

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Tipo de actividad</Label>
                <Select value={form.tipo} onValueChange={(v) => set("tipo", v)}>
                  <SelectTrigger data-testid="seguimiento-form-tipo">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TIPOS_ACTIVIDAD.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Estado</Label>
                <Select value={form.estado} onValueChange={(v) => set("estado", v)}>
                  <SelectTrigger data-testid="seguimiento-form-estado">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ESTADOS_SEGUIMIENTO.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="fecha">Fecha</Label>
                <Input
                  id="fecha"
                  type="date"
                  data-testid="seguimiento-form-fecha"
                  value={form.fecha}
                  onChange={(e) => set("fecha", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="hora">Hora</Label>
                <Input
                  id="hora"
                  type="time"
                  data-testid="seguimiento-form-hora"
                  value={form.hora}
                  onChange={(e) => set("hora", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Responsable</Label>
              <Select value={form.responsable} onValueChange={(v) => set("responsable", v)}>
                <SelectTrigger data-testid="seguimiento-form-responsable">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {VENDEDORES.map((v) => (
                    <SelectItem key={v} value={v}>
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="resultado">Resultado</Label>
              <Input
                id="resultado"
                data-testid="seguimiento-form-resultado"
                value={form.resultado}
                onChange={(e) => set("resultado", e.target.value)}
                placeholder="Ej. Solicitó cotización"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="proximaAccion">Próxima acción</Label>
              <Input
                id="proximaAccion"
                data-testid="seguimiento-form-proxima-accion"
                value={form.proximaAccion}
                onChange={(e) => set("proximaAccion", e.target.value)}
                placeholder="Ej. Enviar propuesta"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="notas-seg">Notas</Label>
              <Textarea
                id="notas-seg"
                rows={3}
                data-testid="seguimiento-form-notas"
                value={form.notas}
                onChange={(e) => set("notas", e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 border-t bg-white px-5 py-3">
            <Button
              type="button"
              variant="outline"
              data-testid="seguimiento-form-cancel-button"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" data-testid="seguimiento-form-submit-button">
              Guardar
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};
