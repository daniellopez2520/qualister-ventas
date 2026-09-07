import ExcelJS from "exceljs";

const TEMPLATE_URL = "/templates/formato-alta-clientes-qlm.xlsx";

const convertirATexto = (valor) => {
  if (valor === null || valor === undefined) {
    return "";
  }

  return String(valor).trim();
};

const descargarArchivo = (contenido, nombreArchivo) => {
  const blob = new Blob([contenido], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const url = URL.createObjectURL(blob);
  const enlace = document.createElement("a");

  enlace.href = url;
  enlace.download = nombreArchivo;

  document.body.appendChild(enlace);
  enlace.click();
  enlace.remove();

  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

export const generarFormatoAltaExcel = async (prospecto) => {
  const respuesta = await fetch(TEMPLATE_URL);

  if (!respuesta.ok) {
    throw new Error("No se pudo cargar la plantilla de alta de clientes.");
  }

  const plantilla = await respuesta.arrayBuffer();

  const libro = new ExcelJS.Workbook();
  await libro.xlsx.load(plantilla);

  const hoja = libro.getWorksheet("Hoja1");

  if (!hoja) {
    throw new Error("No se encontró la hoja principal de la plantilla.");
  }

  const ubicacion = [
    prospecto.ciudad,
    prospecto.estadoRep,
    prospecto.pais,
  ]
    .filter(Boolean)
    .join(", ");

  const fechaActual = new Intl.DateTimeFormat("es-MX").format(new Date());

  // Información general
  hoja.getCell("S6").value = fechaActual;
  hoja.getCell("H10").value = convertirATexto(prospecto.razonSocial);
  hoja.getCell("H20").value = convertirATexto(prospecto.sitioWeb);
  hoja.getCell("H27").value = ubicacion;

  // Contacto principal colocado provisionalmente como contacto de Metrología
  hoja.getCell("J34").value = convertirATexto(prospecto.contacto);
  hoja.getCell("R34").value = convertirATexto(prospecto.puesto);
  hoja.getCell("J35").value = convertirATexto(prospecto.telefono);
  hoja.getCell("J36").value = convertirATexto(prospecto.correo);

  const archivoGenerado = await libro.xlsx.writeBuffer();

  const folio = convertirATexto(prospecto.folio) || "sin-folio";
  const folioSeguro = folio.replace(/[\\/:*?"<>|]/g, "-");

  descargarArchivo(
    archivoGenerado,
    `Formato-alta-${folioSeguro}.xlsx`,
  );
};