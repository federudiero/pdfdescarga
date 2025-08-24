import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* por si alguien entra a / sin que pegue el redirect del edge */}
        <Route path="/" element={<Navigate to="/ver" replace />} />
        <Route path="/ver" element={<App />} />
        {/* fallback: cualquier ruta → visor */}
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
