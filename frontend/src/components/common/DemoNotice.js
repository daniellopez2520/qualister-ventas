import React from "react";
import { cn } from "@/lib/utils";
import { FlaskConical } from "lucide-react";

/** Etiqueta discreta reutilizable para identificar datos ficticios. */
export const DemoTag = ({ texto = "Dato de demostración", className, testId }) => (
  <span
    data-testid={testId || "demo-tag"}
    className={cn(
      "inline-flex items-center gap-1 rounded border border-amber-200 bg-amber-50 px-1.5 py-0.5 text-[11px] font-medium text-amber-700",
      className,
    )}
  >
    <FlaskConical className="h-3 w-3" aria-hidden="true" />
    {texto}
  </span>
);

/** Aviso de prototipo para encabezados de pantalla. */
export const DemoNotice = ({
  texto = "Los datos mostrados son de demostración. Esta pantalla es un prototipo visual sin base de datos ni backend.",
  className,
}) => (
  <div
    data-testid="demo-notice"
    className={cn(
      "flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50/70 px-3 py-2 text-xs text-amber-800",
      className,
    )}
  >
    <FlaskConical className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
    <span>{texto}</span>
  </div>
);
