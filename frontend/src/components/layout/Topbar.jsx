import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Search, LogOut, Menu, ChevronRight, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { SidebarBrand, SidebarNav, SidebarFooter } from "@/components/layout/Sidebar";
import { useSesion } from "@/context/SesionContext";
import { toast } from "sonner";

const NOTIFICACIONES_DEMO = [
  { titulo: "3 seguimientos vencidos", detalle: "Revisa tu agenda comercial" },
  { titulo: "COT-2025-009 próxima a vencer", detalle: "Vigencia: 20 mar 2025" },
  { titulo: "Formato de alta recibido", detalle: "Telecom Demo" },
];

export const Topbar = ({ titulo, breadcrumbs = [] }) => {
  const { usuario, cerrarSesion } = useSesion();
  const navigate = useNavigate();
  const [menuMovil, setMenuMovil] = useState(false);

  const salir = () => {
    cerrarSesion();
    navigate("/login", { replace: true });
  };

  return (
    <header
      data-testid="topbar"
      className="sticky top-0 z-30 border-b border-border bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75"
    >
      <div className="flex h-14 items-center gap-3 px-4 sm:px-6">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          data-testid="sidebar-mobile-open-button"
          aria-label="Abrir menú"
          onClick={() => setMenuMovil(true)}
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </Button>

        <div className="min-w-0 flex-1">
          <h2
            data-testid="topbar-screen-title"
            className="truncate font-display text-sm font-semibold text-slate-900 sm:text-base"
          >
            {titulo}
          </h2>
          {breadcrumbs.length > 0 ? (
            <nav
              data-testid="topbar-breadcrumbs"
              aria-label="Ruta de navegación"
              className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex"
            >
              {breadcrumbs.map((bc, i) => (
                <span key={`${bc.label}-${i}`} className="flex items-center gap-1">
                  {i > 0 ? <ChevronRight className="h-3 w-3" aria-hidden="true" /> : null}
                  {bc.to ? (
                    <Link
                      to={bc.to}
                      className="hover:text-slate-900 hover:underline"
                      data-testid={`breadcrumb-link-${i}`}
                    >
                      {bc.label}
                    </Link>
                  ) : (
                    <span className="text-slate-700">{bc.label}</span>
                  )}
                </span>
              ))}
            </nav>
          ) : null}
        </div>

        <div className="hidden md:block">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <Input
              data-testid="topbar-global-search-input"
              className="h-9 w-56 pl-8 lg:w-72"
              placeholder="Buscar… (solo visual)"
              aria-label="Buscador general (solo visual)"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  toast.info("Buscador visual", {
                    description: "La búsqueda global se habilitará con el backend.",
                  });
                }
              }}
            />
          </div>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              data-testid="topbar-notifications-button"
              aria-label="Notificaciones"
            >
              <Bell className="h-5 w-5" aria-hidden="true" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-600" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0" data-testid="topbar-notifications-panel">
            <div className="border-b px-3 py-2">
              <p className="text-sm font-semibold text-slate-900">Notificaciones</p>
              <p className="text-xs text-muted-foreground">Contenido de demostración</p>
            </div>
            <ul className="divide-y">
              {NOTIFICACIONES_DEMO.map((n) => (
                <li key={n.titulo} className="px-3 py-2">
                  <p className="text-sm text-slate-800">{n.titulo}</p>
                  <p className="text-xs text-muted-foreground">{n.detalle}</p>
                </li>
              ))}
            </ul>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              data-testid="topbar-user-menu-button"
              className="flex items-center gap-2 rounded-md border border-transparent px-2 py-1.5 text-left transition-colors duration-200 hover:border-border hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--sidebar))] text-xs font-semibold text-white">
                {usuario.iniciales}
              </span>
              <span className="hidden leading-tight sm:block">
                <span className="block text-sm font-medium text-slate-900">{usuario.nombre}</span>
                <span className="block text-[11px] font-medium text-blue-700">{usuario.perfil}</span>
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <p className="text-sm font-medium">{usuario.nombre}</p>
              <p className="text-xs font-normal text-muted-foreground">{usuario.correo}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              data-testid="topbar-user-profile-item"
              onSelect={() =>
                toast.info("Perfil", { description: "Disponible en una etapa posterior." })
              }
            >
              <User className="mr-2 h-4 w-4" aria-hidden="true" />
              Mi perfil
            </DropdownMenuItem>
            <DropdownMenuItem
              data-testid="topbar-user-settings-item"
              onSelect={() =>
                toast.info("Preferencias", { description: "Disponible en una etapa posterior." })
              }
            >
              <Settings className="mr-2 h-4 w-4" aria-hidden="true" />
              Preferencias
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem data-testid="topbar-logout-button" onSelect={salir}>
              <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Sheet open={menuMovil} onOpenChange={setMenuMovil}>
        <SheetContent
          side="left"
          data-testid="sidebar-mobile-panel"
          className="w-72 border-r-0 bg-[hsl(var(--sidebar))] p-0 text-[hsl(var(--sidebar-foreground))]"
        >
          <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
          <div className="flex h-full flex-col">
            <SidebarBrand />
            <SidebarNav onNavigate={() => setMenuMovil(false)} />
            <SidebarFooter mostrarToggle={false} />
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};
