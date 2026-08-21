import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

/**
 * Modal reutilizable para acciones que aún no existen (PDF, envío de correo,
 * generación de Excel, carga de documentos, registro de aceptación, etc.).
 */
export const FutureFeatureDialog = ({
  open,
  onOpenChange,
  titulo = "Función no disponible en esta etapa",
  mensaje = "Esta función se habilitará en la etapa de conexión con backend.",
  detalles = [],
  testId = "future-feature-dialog",
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent data-testid={testId} className="sm:max-w-lg">
      <DialogHeader>
        <div className="mb-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-200 bg-blue-50">
          <Info className="h-4 w-4 text-blue-700" aria-hidden="true" />
        </div>
        <DialogTitle className="font-display">{titulo}</DialogTitle>
        <DialogDescription>{mensaje}</DialogDescription>
      </DialogHeader>
      {detalles.length > 0 ? (
        <ul className="space-y-2 rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
          {detalles.map((d, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-700" />
              <span>{d}</span>
            </li>
          ))}
        </ul>
      ) : null}
      <DialogFooter>
        <Button
          data-testid="future-feature-close-button"
          onClick={() => onOpenChange(false)}
        >
          Entendido
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
