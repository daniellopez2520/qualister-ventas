import React from "react";
import { cn } from "@/lib/utils";

export const PageHeader = ({ titulo, descripcion, acciones, className, testId }) => (
  <div
    data-testid={testId || "page-header"}
    className={cn(
      "flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-end sm:justify-between",
      className,
    )}
  >
    <div className="min-w-0">
      <h1 className="font-display text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
        {titulo}
      </h1>
      {descripcion ? (
        <p className="mt-1 text-sm text-muted-foreground">{descripcion}</p>
      ) : null}
    </div>
    {acciones ? <div className="flex flex-wrap items-center gap-2">{acciones}</div> : null}
  </div>
);
