import React, { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { useSesion } from "@/context/SesionContext";
import { PROSPECTOS, CLIENTES, COTIZACIONES } from "@/mocks";

const resolverPantalla = (pathname) => {
  const base = [{ label: "Ventas" }];
  const partes = pathname.split("/").filter(Boolean); // ["ventas", seccion, id?]
  const seccion = partes[1] || "";
  const id = partes[2] || "";

  if (seccion === "dashboard") {
    return { titulo: "Dashboard de Ventas", breadcrumbs: [...base, { label: "Dashboard" }] };
  }

  if (seccion === "prospectos") {
    if (id) {
      const p = PROSPECTOS.find((x) => x.id === id);
      return {
        titulo: `Prospecto ${p ? p.folio : id}`,
        breadcrumbs: [
          ...base,
          { label: "Prospectos", to: "/ventas/prospectos" },
          { label: p ? p.nombreComercial : id },
        ],
      };
    }
    return { titulo: "Prospectos", breadcrumbs: [...base, { label: "Prospectos" }] };
  }

  if (seccion === "clientes") {
    if (id) {
      const c = CLIENTES.find((x) => x.id === id);
      return {
        titulo: `Cliente ${c ? c.codigo : id}`,
        breadcrumbs: [
          ...base,
          { label: "Clientes", to: "/ventas/clientes" },
          { label: c ? c.nombreComercial : id },
        ],
      };
    }
    return { titulo: "Clientes", breadcrumbs: [...base, { label: "Clientes" }] };
  }

  if (seccion === "seguimientos") {
    return { titulo: "Seguimientos", breadcrumbs: [...base, { label: "Seguimientos" }] };
  }

  if (seccion === "cotizaciones") {
    if (id === "nueva") {
      return {
        titulo: "Nueva cotización",
        breadcrumbs: [
          ...base,
          { label: "Cotizaciones", to: "/ventas/cotizaciones" },
          { label: "Nueva" },
        ],
      };
    }
    if (id) {
      const q = COTIZACIONES.find((x) => x.id === id);
      return {
        titulo: `Cotización ${q ? q.folio : id}`,
        breadcrumbs: [
          ...base,
          { label: "Cotizaciones", to: "/ventas/cotizaciones" },
          { label: q ? q.folio : id },
        ],
      };
    }
    return { titulo: "Cotizaciones", breadcrumbs: [...base, { label: "Cotizaciones" }] };
  }

  if (seccion === "tarifario") {
    return { titulo: "Tarifario", breadcrumbs: [...base, { label: "Tarifario" }] };
  }

  return { titulo: "Ventas", breadcrumbs: base };
};

const VentasLayout = () => {
  const { autenticado } = useSesion();
  const location = useLocation();
  const [colapsado, setColapsado] = useState(false);

  if (!autenticado) {
    return <Navigate to="/login" replace />;
  }

  const { titulo, breadcrumbs } = resolverPantalla(location.pathname);

  return (
    <div className="qlm-shell flex bg-background">
      <Sidebar colapsado={colapsado} onToggle={() => setColapsado((v) => !v)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar titulo={titulo} breadcrumbs={breadcrumbs} />
        <main className="min-w-0 flex-1 px-4 py-5 sm:px-6 lg:px-8">
          <Outlet />
        </main>
        <footer className="border-t border-border px-4 py-3 text-xs text-muted-foreground sm:px-6 lg:px-8">
          Qualister – Gestión Comercial · Prototipo visual del módulo de Ventas · Sin base de datos
          ni backend
        </footer>
      </div>
    </div>
  );
};

export default VentasLayout;
