import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { TARIFARIO } from "@/mocks";

// Estado del TARIFARIO en memoria (solo durante la sesión).
// Permite crear, editar y eliminar EQUIPOS del tarifario sin base de datos ni
// almacenamiento persistente. Al recargar la página, los datos vuelven al mock inicial.
const TarifarioContext = createContext(null);

const generarId = () => `T-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

export const TarifarioProvider = ({ children }) => {
  // Copia profunda del mock para no mutar el arreglo original importado.
  const [tarifas, setTarifas] = useState(() => TARIFARIO.map((t) => ({ ...t })));

  const agregarTarifa = useCallback((data) => {
    const nueva = {
      ...data,
      id: generarId(),
      precioMXN: Number(data.precioMXN) || 0,
      precioUSD: Number(data.precioUSD) || 0,
      // Compatibilidad con el asistente de Cotizaciones (usa `servicio`).
      servicio: data.equipo,
    };
    setTarifas((prev) => [nueva, ...prev]);
    return nueva;
  }, []);

  const actualizarTarifa = useCallback((id, data) => {
    setTarifas((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              ...data,
              precioMXN: Number(data.precioMXN) || 0,
              precioUSD: Number(data.precioUSD) || 0,
              servicio: data.equipo,
            }
          : t,
      ),
    );
  }, []);

  const eliminarTarifa = useCallback((id) => {
    setTarifas((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const valor = useMemo(
    () => ({ tarifas, agregarTarifa, actualizarTarifa, eliminarTarifa }),
    [tarifas, agregarTarifa, actualizarTarifa, eliminarTarifa],
  );

  return <TarifarioContext.Provider value={valor}>{children}</TarifarioContext.Provider>;
};

export const useTarifario = () => {
  const ctx = useContext(TarifarioContext);
  if (!ctx) throw new Error("useTarifario debe usarse dentro de TarifarioProvider");
  return ctx;
};
