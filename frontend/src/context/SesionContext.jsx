import React, { createContext, useContext, useMemo, useState } from "react";
import { USUARIO_DEMO } from "@/mocks";

// Sesión SIMULADA en memoria. No usa localStorage, cookies ni backend.
// Al recargar la página la sesión se reinicia (comportamiento esperado del prototipo).
const SesionContext = createContext(null);

export const SesionProvider = ({ children }) => {
  const [autenticado, setAutenticado] = useState(false);

  const valor = useMemo(
    () => ({
      autenticado,
      usuario: USUARIO_DEMO,
      iniciarSesion: () => setAutenticado(true),
      cerrarSesion: () => setAutenticado(false),
    }),
    [autenticado],
  );

  return <SesionContext.Provider value={valor}>{children}</SesionContext.Provider>;
};

export const useSesion = () => {
  const ctx = useContext(SesionContext);
  if (!ctx) throw new Error("useSesion debe usarse dentro de SesionProvider");
  return ctx;
};
