import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/nav";
import { PanelLeftClose, PanelLeftOpen, Gauge } from "lucide-react";
import { USUARIO_DEMO } from "@/mocks";

export const SidebarNav = ({ colapsado = false, onNavigate }) => (
  <nav className="flex-1 space-y-1 px-2 py-3" aria-label="Navegación de Ventas">
    {NAV_ITEMS.map((item) => {
      const Icon = item.icon;
      return (
        <NavLink
          key={item.to}
          to={item.to}
          data-testid={item.testId}
          onClick={onNavigate}
          title={colapsado ? item.label : undefined}
          className={({ isActive }) =>
            cn(
              "group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors duration-200",
              "text-[hsl(var(--sidebar-muted-foreground))] hover:bg-[hsl(var(--sidebar-muted))] hover:text-[hsl(var(--sidebar-foreground))]",
              "focus-visible:ring-2 focus-visible:ring-[hsl(var(--sidebar-ring))]",
              isActive &&
                "bg-[hsl(var(--sidebar-muted))] text-[hsl(var(--sidebar-foreground))] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]",
              colapsado && "justify-center px-0",
            )
          }
        >
          {({ isActive }) => (
            <>
              {isActive ? (
                <span className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-[hsl(var(--sidebar-ring))]" />
              ) : null}
              <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
              {!colapsado ? <span className="truncate">{item.label}</span> : null}
            </>
          )}
        </NavLink>
      );
    })}
  </nav>
);

export const SidebarBrand = ({ colapsado = false }) => (
  <div
    className={cn(
      "flex h-14 items-center gap-2 border-b border-[hsl(var(--sidebar-border))] px-4",
      colapsado && "justify-center px-0",
    )}
  >
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5">
      <Gauge className="h-4 w-4 text-[hsl(var(--sidebar-ring))]" aria-hidden="true" />
    </span>
    {!colapsado ? (
      <div className="min-w-0 leading-tight">
        <p className="font-display text-sm font-semibold tracking-wide text-white">Qualister</p>
        <p className="truncate text-[11px] text-[hsl(var(--sidebar-muted-foreground))]">
          Gestión Comercial
        </p>
      </div>
    ) : null}
  </div>
);

export const SidebarFooter = ({ colapsado = false, onToggle, mostrarToggle = true }) => (
  <div className="border-t border-[hsl(var(--sidebar-border))] p-2">
    {!colapsado ? (
      <div className="mb-2 rounded-md bg-[hsl(var(--sidebar-muted))] px-3 py-2">
        <p className="text-[11px] uppercase tracking-wider text-[hsl(var(--sidebar-muted-foreground))]">
          Perfil activo
        </p>
        <p className="text-sm font-medium text-white">{USUARIO_DEMO.perfil}</p>
      </div>
    ) : null}
    {mostrarToggle ? (
      <button
        type="button"
        data-testid="sidebar-collapse-toggle"
        onClick={onToggle}
        className={cn(
          "flex w-full items-center gap-2 rounded-md px-3 py-2 text-xs font-medium text-[hsl(var(--sidebar-muted-foreground))] transition-colors duration-200 hover:bg-[hsl(var(--sidebar-muted))] hover:text-white",
          colapsado && "justify-center px-0",
        )}
        aria-label={colapsado ? "Expandir menú" : "Contraer menú"}
      >
        {colapsado ? (
          <PanelLeftOpen className="h-4 w-4" aria-hidden="true" />
        ) : (
          <>
            <PanelLeftClose className="h-4 w-4" aria-hidden="true" />
            <span>Contraer menú</span>
          </>
        )}
      </button>
    ) : null}
  </div>
);

export const Sidebar = ({ colapsado, onToggle }) => (
  <aside
    data-testid="sidebar-desktop"
    className={cn(
      "sticky top-0 hidden h-screen shrink-0 flex-col border-r border-[hsl(var(--sidebar-border))] bg-[hsl(var(--sidebar))] lg:flex",
      colapsado ? "w-[72px]" : "w-64",
    )}
  >
    <SidebarBrand colapsado={colapsado} />
    <SidebarNav colapsado={colapsado} />
    <SidebarFooter colapsado={colapsado} onToggle={onToggle} />
  </aside>
);
