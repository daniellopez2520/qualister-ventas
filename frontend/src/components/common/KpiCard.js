import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const KpiCard = ({
  titulo,
  valor,
  nota,
  icon: Icon,
  tono = "neutral",
  testId,
}) => {
  const acento = {
    info: "text-blue-700 bg-blue-50 border-blue-200",
    success: "text-green-700 bg-green-50 border-green-200",
    warning: "text-amber-700 bg-amber-50 border-amber-200",
    danger: "text-red-700 bg-red-50 border-red-200",
    neutral: "text-slate-700 bg-slate-100 border-slate-200",
  }[tono];

  return (
    <Card
      data-testid={testId}
      className="border-border shadow-sm transition-shadow duration-200 hover:shadow-md"
    >
      <CardContent className="flex items-start justify-between gap-3 p-4">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {titulo}
          </p>
          <p className="num mt-1 font-display text-2xl font-semibold text-slate-900">{valor}</p>
          {nota ? <p className="mt-1 text-xs text-muted-foreground">{nota}</p> : null}
        </div>
        {Icon ? (
          <span
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-md border",
              acento,
            )}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
        ) : null}
      </CardContent>
    </Card>
  );
};
