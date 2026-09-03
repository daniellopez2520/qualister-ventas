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

const crearEventoHistorial = (evento, detalle) => ({
  id: `H-${crypto.randomUUID()}`,
  fecha: new Date().toISOString(),
  usuario: "Usuario de Ventas",
  evento,
  detalle,
});

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
        crearEventoHistorial(
          "Prospecto creado",
          "Se registró el prospecto en el sistema.",
        ),
      ],
    };

    setProspectos((anteriores) => [nuevo, ...anteriores]);

    return nuevo;
  };

  const actualizarProspecto = (
    id,
    cambios,
    eventoHistorial = null,
  ) => {
  setProspectos((actuales) =>
    actuales.map((prospecto) => {
      if (prospecto.id !== id) {
        return prospecto;
      }

      const actualizado = {
        ...prospecto,
        ...cambios,
      };

      const agregarEvento = (registro) => {
        if (!eventoHistorial) {
          return registro;
        }

        return {
          ...registro,
          historial: [
            crearEventoHistorial(
              eventoHistorial.evento,
              eventoHistorial.detalle,
            ),
            ...(registro.historial || []),
          ],
        };
      };

      const modificaContacto = [
        "contacto",
        "puesto",
        "correo",
        "telefono",
      ].some((campo) =>
        Object.prototype.hasOwnProperty.call(cambios, campo),
      );

      if (!modificaContacto) {
        return agregarEvento(actualizado);
      }

      const contactos = prospecto.contactos || [];
      const indicePrincipal = contactos.findIndex(
        (contacto) => contacto.principal,
      );

      const contactoAnterior =
        indicePrincipal >= 0 ? contactos[indicePrincipal] : {};

      const contactoPrincipal = {
        ...contactoAnterior,
        id:
          contactoAnterior.id ||
          `CONT-${crypto.randomUUID()}`,
        nombre: actualizado.contacto || "",
        puesto: actualizado.puesto || "",
        correo: actualizado.correo || "",
        telefono: actualizado.telefono || "",
        principal: true,
      };

      return agregarEvento({
        ...actualizado,
        contactos:
          indicePrincipal >= 0
            ? contactos.map((contacto, indice) =>
              indice === indicePrincipal
                ? contactoPrincipal
                : contacto,
            )
            : [contactoPrincipal, ...contactos],
      });
    }),
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
