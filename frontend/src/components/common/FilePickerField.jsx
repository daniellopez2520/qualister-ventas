import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Paperclip, FileText } from "lucide-react";
import { toast } from "sonner";

/**
 * Selector de archivo SOLO visual: muestra el nombre del archivo elegido
 * localmente. No sube, no lee ni procesa el archivo.
 */
export const FilePickerField = ({
  label = "Archivo",
  accept,
  testId = "file-picker",
  ayuda = "El archivo no se sube ni se procesa en esta etapa.",
  onArchivoSeleccionado,
}) => {
  const inputRef = useRef(null);
  const [nombre, setNombre] = useState("");

  const handleChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setNombre(file.name);
    if (onArchivoSeleccionado) onArchivoSeleccionado(file.name);
    toast.info("Archivo seleccionado (solo visual)", { description: file.name });
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-slate-800">{label}</p>
      <div className="flex flex-wrap items-center gap-2 rounded-md border border-dashed border-slate-300 bg-slate-50 p-3">
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          data-testid={`${testId}-input`}
          onChange={handleChange}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          data-testid={`${testId}-button`}
          onClick={() => inputRef.current && inputRef.current.click()}
        >
          <Paperclip className="mr-2 h-4 w-4" aria-hidden="true" />
          Seleccionar archivo
        </Button>
        {nombre ? (
          <span
            data-testid={`${testId}-filename`}
            className="inline-flex items-center gap-1 rounded border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700"
          >
            <FileText className="h-3 w-3" aria-hidden="true" />
            {nombre}
          </span>
        ) : (
          <span className="text-xs text-muted-foreground">Ningún archivo seleccionado</span>
        )}
      </div>
      <p className="text-xs text-muted-foreground">{ayuda}</p>
    </div>
  );
};
