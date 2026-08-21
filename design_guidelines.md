{
  "product": {
    "name": "Qualister – Gestión Comercial",
    "module": "Ventas (prototipo visual)",
    "language": "es-MX",
    "principles": [
      "Empresarial, moderno, limpio; alta densidad de información sin saturación",
      "Tema claro con barra lateral azul oscuro (ancla visual)",
      "Sin backend/APIs/persistencia: todo mock en /src/mocks (NO localStorage/cookies)",
      "Micro-interacciones sobrias (150–220ms), sin animaciones innecesarias",
      "Accesibilidad AA: contraste, focus visible, targets táctiles",
      "Todos los elementos interactivos y de info clave llevan data-testid (kebab-case)"
    ],
    "prototype_labels": {
      "visual_prototype": "Prototipo visual",
      "demo_data": "Dato de demostración"
    }
  },

  "design_personality": {
    "keywords": ["precisión", "confianza", "orden", "claridad", "metrología"],
    "visual_metaphors": [
      "líneas finas tipo retícula/medición",
      "chips de estado discretos",
      "documentos con apariencia de ‘hoja’ para vista previa de cotización"
    ],
    "do": [
      "Usar bordes 1px y sombras suaves para separar capas",
      "Usar grises fríos para fondos y divisores",
      "Usar color solo para estados y acciones primarias"
    ],
    "avoid": [
      "Gradientes grandes o saturados",
      "Tarjetas gigantes con mucho aire (se requiere densidad)",
      "UI genérica tipo plantilla (centrado excesivo, colores por defecto)"
    ]
  },

  "typography": {
    "fonts": {
      "heading": {
        "family": "Space Grotesk",
        "google_fonts": "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap",
        "usage": "Títulos de pantalla, KPIs, encabezados de secciones"
      },
      "body": {
        "family": "Inter",
        "google_fonts": "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
        "usage": "Tablas, formularios, texto general"
      },
      "mono": {
        "family": "IBM Plex Mono",
        "google_fonts": "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap",
        "usage": "Folios, códigos, RFC, montos alineados"
      }
    },
    "scale_tailwind": {
      "h1": "text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight",
      "h2": "text-base md:text-lg font-medium text-muted-foreground",
      "section_title": "text-sm font-semibold tracking-wide text-foreground",
      "kpi_value": "text-2xl md:text-3xl font-semibold tabular-nums",
      "table": "text-sm",
      "small": "text-xs text-muted-foreground"
    },
    "numbers": {
      "rule": "Usar tabular-nums en KPIs, totales y columnas numéricas",
      "tailwind": "[font-variant-numeric:tabular-nums]"
    }
  },

  "color_system": {
    "notes": [
      "Paleta restringida: azul corporativo/azul oscuro/blanco/gris claro + verde/amarillo/rojo para estados.",
      "Sidebar toma el azul oscuro del logo (aprox #121A26).",
      "Evitar gradientes salvo decorativos mínimos (<=20% viewport)."
    ],
    "brand_hex": {
      "navy_950": "#121A26",
      "navy_900": "#162235",
      "blue_600": "#2563EB",
      "blue_700": "#1D4ED8",
      "slate_50": "#F8FAFC",
      "slate_100": "#F1F5F9",
      "slate_200": "#E2E8F0",
      "slate_300": "#CBD5E1",
      "slate_600": "#475569",
      "slate_800": "#1F2937",
      "success_600": "#16A34A",
      "warning_600": "#D97706",
      "danger_600": "#DC2626"
    },
    "css_tokens_hsl": {
      "apply_in": "/app/frontend/src/index.css (:root) — light theme only",
      "tokens": {
        "--background": "210 40% 98%",
        "--foreground": "222 47% 11%",

        "--card": "0 0% 100%",
        "--card-foreground": "222 47% 11%",

        "--popover": "0 0% 100%",
        "--popover-foreground": "222 47% 11%",

        "--primary": "221 83% 53%",
        "--primary-foreground": "210 40% 98%",

        "--secondary": "210 40% 96%",
        "--secondary-foreground": "222 47% 11%",

        "--muted": "210 40% 96%",
        "--muted-foreground": "215 16% 35%",

        "--accent": "210 40% 96%",
        "--accent-foreground": "222 47% 11%",

        "--destructive": "0 84% 55%",
        "--destructive-foreground": "210 40% 98%",

        "--border": "214 32% 91%",
        "--input": "214 32% 91%",
        "--ring": "221 83% 53%",

        "--radius": "0.6rem",

        "--sidebar": "210 28% 11%",
        "--sidebar-foreground": "210 40% 96%",
        "--sidebar-muted": "210 22% 18%",
        "--sidebar-muted-foreground": "215 20% 78%",
        "--sidebar-border": "210 22% 18%",
        "--sidebar-ring": "221 83% 60%",

        "--state-success": "142 71% 35%",
        "--state-warning": "32 95% 44%",
        "--state-danger": "0 84% 55%",
        "--state-info": "221 83% 53%"
      }
    },
    "allowed_gradients": {
      "rule": "Solo decorativo, <=20% viewport, nunca en áreas de lectura.",
      "examples": [
        "bg-[radial-gradient(60%_60%_at_20%_0%,rgba(37,99,235,0.10)_0%,rgba(37,99,235,0)_60%)]",
        "after:absolute after:inset-0 after:bg-[linear-gradient(135deg,rgba(37,99,235,0.08),rgba(18,26,38,0)_55%)]"
      ]
    }
  },

  "layout_and_grid": {
    "app_shell": {
      "structure": "Sidebar (izquierda) + Topbar + Content",
      "sidebar_width": {
        "expanded": "w-64",
        "collapsed": "w-[72px]"
      },
      "content_max_width": "max-w-[1400px] (solo para páginas tipo documento; tablas pueden ser full-width)",
      "page_padding": "px-4 sm:px-6 lg:px-8 py-4",
      "section_spacing": "space-y-4 md:space-y-6",
      "grid": {
        "dashboard": "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4",
        "two_column": "grid grid-cols-1 lg:grid-cols-12 gap-4",
        "left_main": "lg:col-span-8",
        "right_aside": "lg:col-span-4"
      }
    },
    "responsive_rules": [
      "Tablas: overflow-x-auto + sticky header opcional; en móvil permitir ‘card rows’ para 10+ columnas.",
      "Sidebar: desktop colapsable; móvil usar Sheet desde la izquierda.",
      "Topbar: breadcrumbs se ocultan en xs; buscador pasa a icono + popover en xs."
    ]
  },

  "component_paths": {
    "shadcn_ui": {
      "button": "/app/frontend/src/components/ui/button.jsx",
      "card": "/app/frontend/src/components/ui/card.jsx",
      "table": "/app/frontend/src/components/ui/table.jsx",
      "tabs": "/app/frontend/src/components/ui/tabs.jsx",
      "badge": "/app/frontend/src/components/ui/badge.jsx",
      "breadcrumb": "/app/frontend/src/components/ui/breadcrumb.jsx",
      "dropdown_menu": "/app/frontend/src/components/ui/dropdown-menu.jsx",
      "sheet": "/app/frontend/src/components/ui/sheet.jsx",
      "drawer": "/app/frontend/src/components/ui/drawer.jsx",
      "dialog": "/app/frontend/src/components/ui/dialog.jsx",
      "select": "/app/frontend/src/components/ui/select.jsx",
      "checkbox": "/app/frontend/src/components/ui/checkbox.jsx",
      "input": "/app/frontend/src/components/ui/input.jsx",
      "textarea": "/app/frontend/src/components/ui/textarea.jsx",
      "separator": "/app/frontend/src/components/ui/separator.jsx",
      "scroll_area": "/app/frontend/src/components/ui/scroll-area.jsx",
      "calendar": "/app/frontend/src/components/ui/calendar.jsx",
      "popover": "/app/frontend/src/components/ui/popover.jsx",
      "tooltip": "/app/frontend/src/components/ui/tooltip.jsx",
      "sonner": "/app/frontend/src/components/ui/sonner.jsx"
    },
    "icons": {
      "library": "lucide-react",
      "rule": "No emojis. Usar iconos consistentes (16px/18px en tablas; 20px en topbar)."
    }
  },

  "components_spec": {
    "login": {
      "layout": "Split subtle: izquierda formulario, derecha panel informativo (solo md+). En móvil: una columna.",
      "logo_usage": "Usar SOLO el logo adjunto en /login. En sidebar usar texto 'Qualister'.",
      "background": "bg-slate-50 con overlay radial azul muy suave (<=20% viewport)",
      "form": {
        "fields": ["Correo", "Contraseña", "Mostrar/Ocultar"],
        "remember": "Checkbox visual (no persistir)",
        "forgot": "Link visual",
        "cta": "Botón primario 'Iniciar sesión'",
        "prototype_hint": "Badge/label discreto 'Prototipo visual'"
      },
      "data_testids": {
        "email": "login-email-input",
        "password": "login-password-input",
        "toggle_password": "login-password-toggle-button",
        "remember": "login-remember-checkbox",
        "forgot": "login-forgot-password-link",
        "submit": "login-submit-button"
      }
    },

    "sidebar": {
      "style": "Azul oscuro sólido, bordes sutiles, tipografía clara.",
      "container_classes": "bg-[hsl(var(--sidebar))] text-[hsl(var(--sidebar-foreground))] border-r border-[hsl(var(--sidebar-border))]",
      "nav_item": {
        "base": "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-[hsl(var(--sidebar-muted-foreground))] hover:text-[hsl(var(--sidebar-foreground))] hover:bg-[hsl(var(--sidebar-muted))]",
        "active": "bg-[hsl(var(--sidebar-muted))] text-[hsl(var(--sidebar-foreground))] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]",
        "active_indicator": "before:w-1 before:rounded-full before:bg-[hsl(var(--sidebar-ring))] before:content-['']"
      },
      "collapse": {
        "desktop": "Botón icon-only en footer del sidebar; colapsa a 72px.",
        "mobile": "Sheet desde izquierda con overlay; cerrar al navegar."
      },
      "items": ["Dashboard", "Prospectos", "Clientes", "Seguimientos", "Cotizaciones", "Tarifario"],
      "data_testids": {
        "toggle": "sidebar-collapse-toggle",
        "mobile_open": "sidebar-mobile-open-button",
        "nav_dashboard": "sidebar-nav-dashboard",
        "nav_prospectos": "sidebar-nav-prospectos",
        "nav_clientes": "sidebar-nav-clientes",
        "nav_seguimientos": "sidebar-nav-seguimientos",
        "nav_cotizaciones": "sidebar-nav-cotizaciones",
        "nav_tarifario": "sidebar-nav-tarifario"
      }
    },

    "topbar": {
      "elements": [
        "Título de pantalla + breadcrumbs",
        "Buscador general (visual)",
        "Notificaciones (visual)",
        "Usuario de Ventas + badge 'Ventas'",
        "Menú usuario + Cerrar sesión"
      ],
      "classes": "sticky top-0 z-30 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b",
      "search": {
        "desktop": "Input con icono (Command-like) placeholder 'Buscar…' (solo visual)",
        "mobile": "Icon button abre Popover con input"
      },
      "data_testids": {
        "search": "topbar-global-search-input",
        "notifications": "topbar-notifications-button",
        "user_menu": "topbar-user-menu-button",
        "logout": "topbar-logout-button"
      }
    },

    "kpi_card": {
      "use": "Dashboard",
      "component": "Card",
      "layout": "Título pequeño + valor grande + delta/nota + icono discreto",
      "classes": "rounded-[var(--radius)] border bg-card shadow-sm",
      "kpi_value_classes": "text-2xl md:text-3xl font-semibold [font-variant-numeric:tabular-nums]",
      "micro": "Hover: border a primary/20 + shadow-md (sin transform global)",
      "data_testids": {
        "example": "kpi-prospectos-nuevos-card"
      }
    },

    "dense_table": {
      "goals": ["escaneable", "compacta", "acciones claras"],
      "pattern": {
        "toolbar": "Fila superior con búsqueda + filtros (Select/Popover) + botón primario",
        "table": "Table shadcn con header sticky opcional",
        "row": "hover:bg-slate-50",
        "cell": "py-2 px-3 align-middle whitespace-nowrap",
        "numeric": "text-right font-mono tabular-nums",
        "truncate": "max-w-[220px] truncate",
        "actions": "DropdownMenu con 3–6 acciones"
      },
      "mobile": {
        "rule": "Si >8 columnas: ofrecer toggle 'Tabla'/'Tarjetas' o convertir a cards en xs.",
        "card_row": "border rounded-md p-3 bg-white shadow-sm"
      },
      "data_testids": {
        "search": "table-search-input",
        "filters": "table-filters-button",
        "row": "table-row",
        "row_action": "table-row-actions-button"
      }
    },

    "status_badges": {
      "base": "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border",
      "colors": {
        "success": "bg-green-50 text-green-700 border-green-200",
        "warning": "bg-amber-50 text-amber-700 border-amber-200",
        "danger": "bg-red-50 text-red-700 border-red-200",
        "info": "bg-blue-50 text-blue-700 border-blue-200",
        "neutral": "bg-slate-50 text-slate-700 border-slate-200"
      },
      "prospecto_estados": {
        "Nuevo": "info",
        "Contactado": "info",
        "En calificación": "warning",
        "Calificado": "success",
        "Formato de alta enviado": "warning",
        "Formato recibido": "success",
        "En negociación": "warning",
        "Convertido en cliente": "success",
        "No calificado": "neutral",
        "Perdido": "danger"
      },
      "cliente_estados": {
        "Pendiente de información": "warning",
        "Pendiente de validación": "warning",
        "Activo": "success",
        "Bloqueado": "danger",
        "Inactivo": "neutral"
      },
      "cotizacion_estados": {
        "Borrador": "neutral",
        "Lista para enviar": "info",
        "Enviada": "info",
        "En negociación": "warning",
        "Aceptada por el cliente": "success",
        "Rechazada": "danger",
        "Vencida": "danger",
        "Cancelada": "neutral"
      },
      "actividad_tipos": {
        "Llamada": "info",
        "Correo": "neutral",
        "Reunión": "info",
        "Visita": "warning",
        "Nota": "neutral",
        "Tarea": "warning"
      }
    },

    "filters": {
      "components": ["Select", "Popover", "Command (opcional para búsqueda en listas)", "Badge (chips activos)"],
      "pattern": "Filtros en Popover con Apply/Clear; chips activos debajo del toolbar.",
      "chips": "inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-xs",
      "data_testids": {
        "open": "filters-open-button",
        "clear": "filters-clear-button",
        "apply": "filters-apply-button"
      }
    },

    "drawer_forms": {
      "use": ["Nuevo prospecto (16 campos)", "Nuevo seguimiento", "Nuevo servicio/tarifa"],
      "component": "Drawer (mobile-first) o Sheet (si se prefiere) — mantener consistente",
      "layout": "Header fijo + ScrollArea para campos + footer con acciones",
      "field_grid": "grid grid-cols-1 md:grid-cols-2 gap-3",
      "footer": "flex items-center justify-end gap-2 border-t bg-background/80 backdrop-blur p-3",
      "data_testids": {
        "open_new_prospect": "prospectos-new-button",
        "drawer": "drawer-form",
        "submit": "drawer-form-submit-button",
        "cancel": "drawer-form-cancel-button"
      }
    },

    "prospectos_kanban": {
      "style": "Columnas compactas con contador + ScrollArea horizontal",
      "container": "flex gap-3 overflow-x-auto pb-2",
      "column": "min-w-[280px] max-w-[320px] rounded-lg border bg-white",
      "column_header": "flex items-center justify-between px-3 py-2 border-b bg-slate-50",
      "card": "rounded-md border bg-white p-3 shadow-sm hover:shadow-md",
      "micro": "Drag real NO requerido; solo visual. Hover en card muestra acciones rápidas (icon buttons).",
      "data_testids": {
        "toggle": "prospectos-view-toggle",
        "kanban": "prospectos-kanban-view"
      }
    },

    "tabs_record_detail": {
      "use": ["Detalle prospecto", "Detalle cliente"],
      "pattern": "Header con identidad + acciones; Tabs debajo; contenido con secciones.",
      "tabs_classes": "sticky top-[56px] bg-background/80 backdrop-blur border-b",
      "data_testids": {
        "tabs": "record-detail-tabs",
        "tab": "record-detail-tab"
      }
    },

    "dashboard_css_charts": {
      "funnel": {
        "implementation": "Divs apilados con widths decrecientes + labels a la derecha; usar CSS clamp para alturas.",
        "classes": "space-y-2",
        "bar": "h-10 rounded-md bg-blue-600/15 border border-blue-600/20 relative overflow-hidden",
        "fill": "absolute inset-y-0 left-0 bg-blue-600/35",
        "label": "absolute inset-0 flex items-center justify-between px-3 text-sm"
      },
      "status_bars": {
        "implementation": "Barras horizontales por estado (cotizaciones) con ancho proporcional.",
        "row": "flex items-center gap-3",
        "track": "h-2 flex-1 rounded-full bg-slate-200 overflow-hidden",
        "fill": "h-full rounded-full",
        "fill_colors": {
          "neutral": "bg-slate-500",
          "info": "bg-blue-600",
          "warning": "bg-amber-500",
          "danger": "bg-red-600",
          "success": "bg-green-600"
        }
      },
      "data_testids": {
        "funnel": "dashboard-funnel-chart",
        "bars": "dashboard-quote-status-bars"
      }
    },

    "seguimientos_views": {
      "list": "Tabla densa + filtros",
      "calendar": {
        "component": "Calendar (shadcn)",
        "pattern": "Calendario a la izquierda + lista del día a la derecha (md+). En móvil: calendario arriba, lista abajo."
      },
      "timeline": {
        "pattern": "Línea vertical con puntos por actividad; chips de estado; CTA 'Nuevo seguimiento' fijo en header.",
        "classes": "relative pl-6 before:absolute before:left-2 before:top-0 before:bottom-0 before:w-px before:bg-slate-200",
        "item": "relative pb-6",
        "dot": "absolute left-[3px] top-1 h-3 w-3 rounded-full bg-blue-600"
      },
      "data_testids": {
        "view_tabs": "seguimientos-view-tabs",
        "new": "seguimientos-new-button"
      }
    },

    "cotizaciones_wizard": {
      "steps": [
        "Cliente",
        "Configuración",
        "Servicios",
        "Resumen",
        "Vista previa"
      ],
      "stepper": {
        "pattern": "Stepper horizontal (md+) y vertical compacto (xs).",
        "classes": "flex items-center gap-2",
        "step": "flex items-center gap-2",
        "dot": "h-7 w-7 rounded-full border flex items-center justify-center text-sm font-semibold",
        "active": "border-blue-600 text-blue-700 bg-blue-50",
        "done": "border-green-600 text-green-700 bg-green-50",
        "todo": "border-slate-300 text-slate-600 bg-white"
      },
      "services_step": {
        "pattern": "Selects escalonados (magnitud→servicio→variante) + tabla de partidas.",
        "line_item_row": "grid grid-cols-1 md:grid-cols-12 gap-2 items-end",
        "add_button": "Button variant=default",
        "remove": "Button variant=ghost size=icon"
      },
      "preview": {
        "document_shell": "max-w-[900px] mx-auto bg-white border shadow-sm rounded-lg",
        "header": "p-6 border-b",
        "body": "p-6 space-y-4",
        "table": "w-full text-sm",
        "watermark": "Etiqueta pequeña 'Prototipo visual' en esquina inferior derecha"
      },
      "cta_buttons": {
        "primary": "Guardar borrador",
        "secondary": "Generar PDF (modal: función futura)",
        "tertiary": "Enviar (modal: función futura)"
      },
      "data_testids": {
        "stepper": "cotizacion-wizard-stepper",
        "next": "cotizacion-wizard-next-button",
        "back": "cotizacion-wizard-back-button",
        "save_draft": "cotizacion-wizard-save-draft-button",
        "generate_pdf": "cotizacion-wizard-generate-pdf-button",
        "send": "cotizacion-wizard-send-button"
      }
    },

    "cotizacion_detail": {
      "header": "Folio + revisión + badge estado + acciones (Dropdown)",
      "evidence_section": {
        "pattern": "Card con Select tipo evidencia + file picker (solo nombre) + descripción + fecha + botón registrar (modal explicativo)",
        "data_testids": {
          "type": "cotizacion-evidence-type-select",
          "file": "cotizacion-evidence-file-input",
          "submit": "cotizacion-evidence-submit-button"
        }
      }
    },

    "tarifario": {
      "grouping": "Magnitud > Servicio > Variante (accordion/collapsible opcional)",
      "fx_card": {
        "content": "Tipo de cambio demo + fecha + etiqueta 'Fuente futura: Banco de México' + 'Dato de demostración'",
        "classes": "rounded-lg border bg-white p-4",
        "data_testids": {
          "card": "tarifario-fx-card"
        }
      },
      "data_testids": {
        "new_service": "tarifario-new-service-button",
        "edit_rate": "tarifario-edit-rate-button"
      }
    },

    "toasts_and_modals": {
      "toasts": {
        "library": "sonner",
        "use_cases": [
          "Login simulado exitoso",
          "Acción no disponible (función futura)",
          "Archivo seleccionado (solo nombre)"
        ]
      },
      "future_function_modal_copy": {
        "title": "Función no disponible en esta etapa",
        "body": "Esta acción se habilitará en la etapa de conexión con backend.",
        "tone": "discreto, profesional"
      }
    }
  },

  "motion_and_microinteractions": {
    "timings": {
      "fast": "150ms",
      "normal": "200ms",
      "slow": "220ms"
    },
    "rules": [
      "No usar transition: all",
      "Transicionar solo color/border-color/background-color/box-shadow/opacity",
      "Respetar prefers-reduced-motion"
    ],
    "examples": {
      "button": "transition-colors duration-200",
      "card_hover": "transition-shadow duration-200 hover:shadow-md",
      "sidebar_item": "transition-colors duration-200"
    }
  },

  "states": {
    "empty": {
      "pattern": "Card con icono lineal + texto + CTA",
      "copy_examples": {
        "prospectos": "No hay prospectos con estos filtros.",
        "seguimientos": "No hay seguimientos programados para esta fecha."
      }
    },
    "loading": {
      "pattern": "Skeleton en tablas (3–6 filas) y KPIs",
      "component": "Skeleton"
    },
    "disabled": {
      "pattern": "Botones de funciones futuras: mantener habilitados pero abren modal explicativo (mejor que disabled para prototipo)."
    },
    "errors": {
      "pattern": "Alert (shadcn) para validaciones de formulario (solo visual)."
    }
  },

  "accessibility": {
    "focus": "Usar ring visible: focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2",
    "contrast": "Texto principal sobre blanco/gray debe ser slate-800+; en sidebar usar foreground claro.",
    "touch_targets": "Mínimo 40px alto en móvil para botones principales",
    "keyboard": "DropdownMenu, Dialog, Sheet, Tabs ya accesibles por shadcn; no romper con wrappers"
  },

  "images": {
    "logo_login": {
      "category": "login",
      "description": "Logo Qualister (solo en /login)",
      "url": "https://customer-assets-m6fa6gv7.emergentagent.net/job_11bf0a6a-339d-4dcc-9ec3-a8c1b7be21c4/artifacts/94rgxyl8_logo%20qlm.png"
    },
    "decorative": [
      {
        "category": "background_texture",
        "description": "No usar fotos; preferir textura/grain CSS. Si se requiere imagen, usar patrón técnico sutil (líneas/retícula).",
        "url": ""
      }
    ]
  },

  "implementation_notes_js": {
    "react": {
      "files": "Proyecto usa .js (no .tsx). Mantener componentes en JS.",
      "routing": "react-router-dom v7; rutas exactas según PRD.",
      "mock_data": "Centralizar en /app/frontend/src/mocks/*.js y exportar arrays/objects."
    },
    "data_testid_rule": {
      "convention": "kebab-case, describe rol (no apariencia)",
      "examples": [
        "prospectos-new-button",
        "cotizaciones-table-row-actions-button",
        "wizard-stepper-next-button"
      ]
    }
  },

  "instructions_to_main_agent": [
    "Actualizar /frontend/src/index.css tokens (:root) con los HSL propuestos y agregar tokens de sidebar.",
    "Eliminar estilos CRA default en App.css (logo spin) y evitar .App { text-align:center }.",
    "Implementar AppShell: Sidebar colapsable + Sheet móvil + Topbar sticky.",
    "Usar shadcn/ui para todos los controles (Select, Tabs, Dialog, Drawer/Sheet, Calendar, Table, Badge).",
    "Implementar badges de estado con mapeos exactos (prospectos/clientes/cotizaciones/actividades).",
    "Charts del dashboard: embudo y barras con divs (CSS puro) usando clases indicadas.",
    "Wizard de cotización: stepper + 5 pasos + vista previa tipo documento; botones PDF/Enviar abren modal 'Función no disponible'.",
    "Asegurar data-testid en: navegación, botones principales, inputs, filtros, acciones de fila, tabs, stepper, modales."
  ]
}

---

<General UI UX Design Guidelines>  
    - You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms
    - You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text
   - NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json

 **GRADIENT RESTRICTION RULE**
NEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc
NEVER use dark gradients for logo, testimonial, footer etc
NEVER let gradients cover more than 20% of the viewport.
NEVER apply gradients to text-heavy content or reading areas.
NEVER use gradients on small UI elements (<100px width).
NEVER stack multiple gradient layers in the same viewport.

**ENFORCEMENT RULE:**
    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors

**How and where to use:**
   • Section backgrounds (not content backgrounds)
   • Hero section header content. Eg: dark to light to dark color
   • Decorative overlays and accent elements only
   • Hero section with 2-3 mild color
   • Gradients creation can be done for any angle say horizontal, vertical or diagonal

- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**

</Font Guidelines>

- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. 
   
- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.

- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.
   
- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly
    Eg: - if it implies playful/energetic, choose a colorful scheme
           - if it implies monochrome/minimal, choose a black–white/neutral scheme

**Component Reuse:**
	- Prioritize using pre-existing components from src/components/ui when applicable
	- Create new components that match the style and conventions of existing components when needed
	- Examine existing components to understand the project's component patterns before creating new ones

**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component

**Best Practices:**
	- Use Shadcn/UI as the primary component library for consistency and accessibility
	- Import path: ./components/[component-name]

**Export Conventions:**
	- Components MUST use named exports (export const ComponentName = ...)
	- Pages MUST use default exports (export default function PageName() {...})

**Toasts:**
  - Use `sonner` for toasts"
  - Sonner component are located in `/app/src/components/ui/sonner.tsx`

Use 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals.
</General UI UX Design Guidelines>
