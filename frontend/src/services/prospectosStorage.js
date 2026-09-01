import { PROSPECTOS } from "@/mocks";

const CLAVE_PROSPECTOS = "qualister.prospectos.v1";

export const cargarProspectos = () => {
  try {
    const guardados = localStorage.getItem(CLAVE_PROSPECTOS);

    if (!guardados) {
      return [...PROSPECTOS];
    }

    const datos = JSON.parse(guardados);

    return Array.isArray(datos) ? datos : [...PROSPECTOS];
  } catch (error) {
    console.error("No se pudieron cargar los prospectos:", error);
    return [...PROSPECTOS];
  }
};

export const guardarProspectos = (prospectos) => {
  try {
    localStorage.setItem(CLAVE_PROSPECTOS, JSON.stringify(prospectos));
  } catch (error) {
    console.error("No se pudieron guardar los prospectos:", error);
  }
};