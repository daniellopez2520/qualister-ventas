import React from "react";
import { formatMoneda, formatFecha } from "@/lib/format";
import { TERMINOS_DEMO, calcularTotales, TIPO_CAMBIO_DEMO } from "@/mocks";

/**
 * Vista previa tipo documento de la cotización (solo visual, sin generación de PDF).
 */
export const CotizacionPreview = ({ cotizacion }) => {
  const {
    folio = "COT-2025-XXX",
    revision = 1,
    cliente = "—",
    contacto = "—",
    correo = "—",
    fecha,
    vigencia,
    moneda = "MXN",
    condicionesPago,
    lugarServicio,
    partidas = [],
    descuentoPct = 0,
    ivaPct = 16,
    notas,
  } = cotizacion || {};

  const { subtotal, descuento, impuestos, total } = calcularTotales(
    partidas,
    descuentoPct,
    ivaPct,
  );

  return (
    <div
      data-testid="cotizacion-preview"
      className="relative mx-auto max-w-[900px] rounded-lg border border-border bg-white shadow-sm"
    >
      <div className="flex flex-col gap-4 border-b border-border p-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-display text-lg font-semibold tracking-tight text-slate-900">
            Qualister - Laboratorio de Metrología
          </p>
          <p className="text-xs text-muted-foreground">
            Servicios de calibración · Temperatura · Humedad · RF · Eléctrica
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Documento de demostración · datos ficticios
          </p>
        </div>
        <div className="text-left sm:text-right">
          <p className="font-display text-base font-semibold text-slate-900">Cotización</p>
          <p className="font-mono text-sm text-slate-800">{folio}</p>
          <p className="text-xs text-muted-foreground">Revisión {revision}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 border-b border-border p-6 sm:grid-cols-2">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Cliente
          </p>
          <p className="text-sm font-medium text-slate-900">{cliente}</p>
          <p className="text-sm text-slate-700">{contacto}</p>
          <p className="text-sm text-slate-700">{correo}</p>
        </div>
        <div className="space-y-1 text-sm text-slate-700 sm:text-right">
          <p>
            <span className="text-muted-foreground">Fecha: </span>
            {formatFecha(fecha)}
          </p>
          <p>
            <span className="text-muted-foreground">Vigencia: </span>
            {formatFecha(vigencia)}
          </p>
          <p>
            <span className="text-muted-foreground">Moneda: </span>
            {moneda}
          </p>
          {moneda === "USD" ? (
            <p>
              <span className="text-muted-foreground">Tipo de cambio (demo): </span>
              {TIPO_CAMBIO_DEMO.valor.toFixed(4)}
            </p>
          ) : null}
          <p>
            <span className="text-muted-foreground">Condiciones: </span>
            {condicionesPago || "—"}
          </p>
          <p>
            <span className="text-muted-foreground">Lugar del servicio: </span>
            {lugarServicio || "—"}
          </p>
        </div>
      </div>

      <div className="p-6">
        <div className="qlm-table-wrap">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="py-2 pr-3">Código</th>
                <th className="py-2 pr-3">Descripción</th>
                <th className="py-2 pr-3 text-right">Cant.</th>
                <th className="py-2 pr-3 text-right">P. unitario</th>
                <th className="py-2 pr-3">Tiempo</th>
                <th className="py-2 text-right">Importe</th>
              </tr>
            </thead>
            <tbody>
              {partidas.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-sm text-muted-foreground">
                    Sin partidas agregadas.
                  </td>
                </tr>
              ) : (
                partidas.map((p, i) => (
                  <tr key={`${p.codigo}-${i}`} className="border-b border-border/70">
                    <td className="py-2 pr-3 font-mono text-xs">{p.codigo}</td>
                    <td className="py-2 pr-3">
                      <p className="text-slate-900">{p.servicio}</p>
                      <p className="text-xs text-muted-foreground">
                        {p.magnitud} · {p.variante || "Alcance estándar"}
                      </p>
                    </td>
                    <td className="num py-2 pr-3 text-right font-mono">{p.cantidad}</td>
                    <td className="num py-2 pr-3 text-right font-mono">
                      {formatMoneda(p.precio, moneda)}
                    </td>
                    <td className="py-2 pr-3 text-xs">{p.tiempoEstimado}</td>
                    <td className="num py-2 text-right font-mono">
                      {formatMoneda(Number(p.cantidad) * Number(p.precio), moneda)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-end">
          <dl className="w-full max-w-xs space-y-1 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="num font-mono">{formatMoneda(subtotal, moneda)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Descuento ({descuentoPct}%)</dt>
              <dd className="num font-mono text-red-700">-{formatMoneda(descuento, moneda)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Impuestos ({ivaPct}%)</dt>
              <dd className="num font-mono">{formatMoneda(impuestos, moneda)}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-1">
              <dt className="font-semibold text-slate-900">Total</dt>
              <dd className="num font-mono text-base font-semibold text-slate-900">
                {formatMoneda(total, moneda)}
              </dd>
            </div>
          </dl>
        </div>

        {notas ? (
          <div className="mt-5">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Notas
            </p>
            <p className="text-sm text-slate-700">{notas}</p>
          </div>
        ) : null}

        <div className="mt-5">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Términos y condiciones
          </p>
          <ul className="space-y-1 text-xs text-slate-700">
            {TERMINOS_DEMO.map((t) => (
              <li key={t} className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-400" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border px-6 py-3">
        <p className="text-xs text-muted-foreground">
          Qualister – Gestión Comercial · Vista previa visual
        </p>
        <span className="rounded border border-amber-200 bg-amber-50 px-1.5 py-0.5 text-[11px] font-medium text-amber-700">
          Prototipo visual
        </span>
      </div>
    </div>
  );
};
