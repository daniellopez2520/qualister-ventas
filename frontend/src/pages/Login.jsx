import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ShieldCheck} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useSesion } from "@/context/SesionContext";
import { toast } from "sonner";
import logoQualister from "@/assets/logo.png";

const LOGO_URL = logoQualister;

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
    toast.success("¡Bienvenido!", {
      description: "Sesión iniciada con el perfil de Ventas.",
    });
    navigate("/ventas/dashboard", { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-background">
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
                      Qualister
              Laboratorio de Metrología
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
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
