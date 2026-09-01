import React, { createContext, useContext, useEffect, useState } from "react";
import {
  cargarProspectos,
  guardarProspectos,
} from "@/services/prospectosStorage";

const ProspectosContext = createContext(null);

const obtenerFechaActual = () => {
  const hoy = new Date();
  const anio = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const dia = String(hoy.getDate()).padStart(2, "0");

  return `${anio}-${mes}-${dia}`;
};

const generarFolio = (prospectos) => {
  const anio = new Date().getFullYear();
  const prefijo = `PRO-${anio}-`;

  const numeros = prospectos
    .map((prospecto) => prospecto.folio)
    .filter((folio) => folio?.startsWith(prefijo))
    .map((folio) => Number(folio.replace(prefijo, "")))
    .filter((numero) => Number.isFinite(numero));

  const siguiente = Math.max(0, ...numeros) + 1;

  return `${prefijo}${String(siguiente).padStart(4, "0")}`;
};

export const ProspectosProvider = ({ children }) => {
  const [prospectos, setProspectos] = useState(cargarProspectos);

  useEffect(() => {
    guardarProspectos(prospectos);
  }, [prospectos]);

  const obtenerProspecto = (id) => {
    return prospectos.find((prospecto) => prospecto.id === id);
  };

  const crearProspecto = (form) => {
    const fechaActual = obtenerFechaActual();

    const nuevo = {
      ...form,
      id: `P-${crypto.randomUUID()}`,
      folio: generarFolio(prospectos),
      estado: "Nuevo",
      vendedor: "Usuario de Ventas",
      fechaCreacion: fechaActual,
      contactos: [
        {
          nombre: form.contacto,
          puesto: form.puesto,
          correo: form.correo,
          telefono: form.telefono,
          principal: true,
        },
      ],
      documentos: [],
      historial: [
        {
          fecha: fechaActual,
          evento: "Prospecto creado",
          detalle: "Alta desde el módulo de Ventas",
          usuario: "Usuario de Ventas",
        },
      ],
    };

    setProspectos((anteriores) => [nuevo, ...anteriores]);

    return nuevo;
  };

  const actualizarProspecto = (id, cambios) => {
    setProspectos((anteriores) =>
      anteriores.map((prospecto) =>
        prospecto.id === id
          ? { ...prospecto, ...cambios }
          : prospecto,
      ),
    );
  };

  return (
    <ProspectosContext.Provider
      value={{
        prospectos,
        obtenerProspecto,
        crearProspecto,
        actualizarProspecto,
      }}
    >
      {children}
    </ProspectosContext.Provider>
  );
};

export const useProspectos = () => {
  const contexto = useContext(ProspectosContext);

  if (!contexto) {
    throw new Error(
      "useProspectos debe utilizarse dentro de ProspectosProvider",
    );
  }

  return contexto;
};