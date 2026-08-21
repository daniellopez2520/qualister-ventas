import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { SesionProvider } from "@/context/SesionContext";
import { TarifarioProvider } from "@/context/TarifarioContext";
import VentasLayout from "@/components/layout/VentasLayout";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Prospectos from "@/pages/Prospectos";
import ProspectoDetalle from "@/pages/ProspectoDetalle";
import Clientes from "@/pages/Clientes";
import ClienteDetalle from "@/pages/ClienteDetalle";
import Seguimientos from "@/pages/Seguimientos";
import Cotizaciones from "@/pages/Cotizaciones";
import CotizacionNueva from "@/pages/CotizacionNueva";
import CotizacionDetalle from "@/pages/CotizacionDetalle";
import Tarifario from "@/pages/Tarifario";

function App() {
  return (
    <SesionProvider>
      <TarifarioProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/ventas" element={<VentasLayout />}>
              <Route index element={<Navigate to="/ventas/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="prospectos" element={<Prospectos />} />
              <Route path="prospectos/:id" element={<ProspectoDetalle />} />
              <Route path="clientes" element={<Clientes />} />
              <Route path="clientes/:id" element={<ClienteDetalle />} />
              <Route path="seguimientos" element={<Seguimientos />} />
              <Route path="cotizaciones" element={<Cotizaciones />} />
              <Route path="cotizaciones/nueva" element={<CotizacionNueva />} />
              <Route path="cotizaciones/:id" element={<CotizacionDetalle />} />
              <Route path="tarifario" element={<Tarifario />} />
            </Route>
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
          <Toaster position="top-right" richColors />
        </BrowserRouter>
      </TarifarioProvider>
    </SesionProvider>
  );
}

export default App;
