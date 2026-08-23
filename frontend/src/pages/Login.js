import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ShieldCheck, Gauge, Thermometer, Droplets, Radio, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useSesion } from "@/context/SesionContext";
import { toast } from "sonner";

const LOGO_URL =
  "https://customer-assets-m6fa6gv7.emergentagent.net/job_11bf0a6a-339d-4dcc-9ec3-a8c1b7be21c4/artifacts/94rgxyl8_logo%20qlm.png";

const MAGNITUDES_INFO = [
  { icon: Thermometer, label: "Temperatura" },
  { icon: Droplets, label: "Humedad" },
  { icon: Radio, label: "RF" },
  { icon: Zap, label: "Eléctrica" },
];

// Credenciales del perfil de Ventas (prototipo, sin backend).
const CREDENCIAL_DEMO = {
  correo: "ventas@qualister.mx",
  password: "ventas2025",
};

const Login = () => {
  const navigate = useNavigate();
  const { iniciarSesion } = useSesion();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [verPassword, setVerPassword] = useState(false);
  const [recordarme, setRecordarme] = useState(false);
  const [error, setError] = useState("");

  const enviar = (e) => {
    e.preventDefault();
    if (!correo.trim() || !password.trim()) {
      setError("Captura tu correo y contraseña para continuar.");
      return;
    }
    if (
      correo.trim().toLowerCase() !== CREDENCIAL_DEMO.correo ||
      password !== CREDENCIAL_DEMO.password
    ) {
      setError("Credenciales incorrectas. Usa el usuario y contraseña del perfil de Ventas.");
      return;
    }
    setError("");
    iniciarSesion();
    toast.success("Acceso simulado", {
      description: "Sesión iniciada con el perfil de Ventas.",
    });
    navigate("/ventas/dashboard", { replace: true });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background lg:flex-row">
      {/* Columna del formulario */}
      <div className="flex flex-1 items-center justify-center px-4 py-10 sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="mb-4 rounded-lg bg-[hsl(var(--sidebar))] p-3 shadow-sm">
              <img
                src={LOGO_URL}
                alt="Qualister - Laboratorio de Metrología"
                data-testid="login-logo"
                className="h-14 w-auto"
              />
            </div>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-slate-900">
              Qualister - Laboratorio de Metrología
            </h1>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <form onSubmit={enviar} className="space-y-4" noValidate>
              <div className="space-y-1.5">
                <Label htmlFor="correo">Correo electrónico</Label>
                <Input
                  id="correo"
                  type="email"
                  autoComplete="email"
                  data-testid="login-email-input"
                  placeholder="usuario@qualister.mx"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={verPassword ? "text" : "password"}
                    autoComplete="current-password"
                    data-testid="login-password-input"
                    placeholder="••••••••"
                    className="pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    data-testid="login-password-toggle-button"
                    aria-label={verPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    onClick={() => setVerPassword((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-slate-500 transition-colors duration-200 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {verPassword ? (
                      <EyeOff className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Eye className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                  <Checkbox
                    data-testid="login-remember-checkbox"
                    checked={recordarme}
                    onCheckedChange={(v) => setRecordarme(Boolean(v))}
                  />
                  Recordarme
                </label>
                <button
                  type="button"
                  data-testid="login-forgot-password-link"
                  onClick={() =>
                    toast.info("Recuperación de contraseña", {
                      description: "Se habilitará en la etapa de conexión con backend.",
                    })
                  }
                  className="text-sm font-medium text-blue-700 underline-offset-2 hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              {error ? (
                <Alert variant="destructive" data-testid="login-error-alert">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : null}

              <Button type="submit" className="w-full" data-testid="login-submit-button">
                Iniciar sesión
              </Button>
            </form>

            <div className="mt-5 flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden="true" />
              <p className="text-xs text-amber-800" data-testid="login-prototype-hint">
                <strong>Perfil de Ventas.</strong> Usuario:{" "}
                <strong>ventas@qualister.mx</strong> · Contraseña: <strong>ventas2025</strong>.
                Acceso simulado, sin autenticación real.
              </p>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Perfil disponible en esta etapa: <span className="font-medium text-slate-700">Ventas</span>
          </p>
        </div>
      </div>

      {/* Columna informativa (solo lg+) */}
      <div className="relative hidden w-[42%] flex-col justify-between bg-[hsl(var(--sidebar))] p-10 lg:flex">
        <div className="absolute inset-0 grid-texture opacity-40" aria-hidden="true" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-1.5">
            <Gauge className="h-4 w-4 text-[hsl(var(--sidebar-ring))]" aria-hidden="true" />
            <span className="text-xs font-medium uppercase tracking-wider text-slate-200">
              Metrología y calibración
            </span>
          </div>
          <h2 className="mt-6 max-w-sm font-display text-3xl font-semibold leading-tight text-white">
            Gestión comercial trazable para tu laboratorio
          </h2>
          <p className="mt-3 max-w-sm text-sm text-slate-300">
            Laboratorio de calibración y metrología: temperatura, humedad, RF y magnitudes
            eléctricas.
          </p>
        </div>

        <div className="relative">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-400">
            Magnitudes del alcance
          </p>
          <div className="grid grid-cols-2 gap-2">
            {MAGNITUDES_INFO.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2"
              >
                <Icon className="h-4 w-4 text-[hsl(var(--sidebar-ring))]" aria-hidden="true" />
                <span className="text-sm text-slate-200">{label}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-slate-400">
            Prototipo visual sin base de datos, backend ni integraciones externas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
