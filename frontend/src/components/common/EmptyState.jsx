import React from "react";
import { Inbox } from "lucide-react";

export const EmptyState = ({ titulo = "Sin resultados", descripcion, accion, testId }) => (
  <div
    data-testid={testId || "empty-state"}
    className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 bg-white px-6 py-12 text-center"
  >
    <Inbox className="h-8 w-8 text-slate-400" aria-hidden="true" />
    <p className="text-sm font-medium text-slate-800">{titulo}</p>
    {descripcion ? <p className="max-w-md text-sm text-muted-foreground">{descripcion}</p> : null}
    {accion}
  </div>
);
