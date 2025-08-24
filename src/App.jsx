import React, { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "pdfjs-dist/web/pdf_viewer.css";

// ✅ Worker para Vite: lo importamos como Web Worker y lo registramos
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

// ⬇️ Elige UNA de las dos formas:

// A) PDF dentro de src/ (Vite lo empaqueta y devuelve una URL)
import pdfFile from "./material.pdf";

// B) Si lo dejas en public/material.pdf, usa:
// const pdfFile = "/material.pdf";

import audioUrl from "./audio.mp3";

export default function App() {
  const [numPages, setNumPages] = useState(null);
  const [page, setPage] = useState(1);
  const [scale, setScale] = useState(1.2);

  const audioRef = useRef(null);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.muted = true; // autoplay permitido solo en mute
    a.autoplay = true;
    a.play().catch(() => {});
  }, []);

  return (
    <div style={styles.page}>
      <h1 style={styles.h1}>Material de la clase</h1>

      <div style={styles.toolbar}>
        <button style={styles.btnMini} onClick={() => setScale(s => Math.max(0.5, s - 0.1))}>−</button>
        <span style={styles.toolbarText}>Zoom</span>
        <button style={styles.btnMini} onClick={() => setScale(s => Math.min(3, s + 0.1))}>＋</button>

        <div style={{ width: 16 }} />

        <button style={styles.btnMini} disabled={page <= 1} onClick={() => setPage(p => p - 1)}>‹</button>
        <span style={styles.toolbarText}>{page} / {numPages ?? "…"}</span>
        <button style={styles.btnMini} disabled={!numPages || page >= numPages} onClick={() => setPage(p => p + 1)}>›</button>
      </div>

      <div style={styles.viewerWrap}>
        <Document
          file={pdfFile}
          onLoadSuccess={({ numPages }) => { setNumPages(numPages); setPage(1); }}
          loading={<div style={styles.loading}>Cargando PDF…</div>}
          error={<div style={styles.loading}>No se pudo cargar el PDF.</div>}
        >
          <Page
            pageNumber={page}
            scale={scale}
             renderAnnotationLayer={true}   // ✅ necesario para que los links sean clickeables
  renderTextLayer={false}   
            loading={<div style={styles.loading}>Cargando página…</div>}
            error={<div style={styles.loading}>Error al renderizar.</div>}
          />
        </Document>
      </div>

      <div style={styles.audioRow}>
        <audio ref={audioRef} controls src={audioUrl} style={{ width: "100%" }} />
        {!soundOn && (
          <button
            onClick={async () => {
              const a = audioRef.current;
              if (!a) return;
              a.muted = false;
              try { await a.play(); setSoundOn(true); } catch {}
            }}
            style={styles.btnSecondary}
          >
            🔊 Activar sonido
          </button>
        )}
      </div>

      <div style={styles.actions}>
        {/* descarga directa sin headers extra si lo importás desde src */}
        <a href={pdfFile} download="Clase.pdf" style={styles.btn}>Descargar PDF</a>
        
      </div>
    </div>
  );
}

const styles = {
  page: { maxWidth: 980, margin: "24px auto", padding: "0 16px", fontFamily: "system-ui, sans-serif" },
  h1: { margin: "0 0 16px" },
  toolbar: { display: "flex", alignItems: "center", gap: 8, marginBottom: 8 },
  toolbarText: { fontSize: 14, color: "#374151" },
  btnMini: { 
    padding: "6px 10px", 
    borderRadius: 8, 
    border: "1px solid #d1d5db", 
    background: "#f3f4f6", 
    fontWeight: 700,
    color: "#111827"          // 👉 texto oscuro visible
  },
  viewerWrap: { border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden", padding: 8, display: "grid", placeItems: "center" },
  loading: { padding: 16, color: "#6b7280", fontSize: 14 },
  audioRow: { marginTop: 12, display: "grid", gap: 8 },
  actions: { marginTop: 16 },
  btn: { 
    display: "inline-block", 
    padding: "10px 14px", 
    borderRadius: 10, 
    background: "#111827", 
    color: "#ffffff",         // 👉 texto blanco sobre fondo oscuro
    textDecoration: "none", 
    fontWeight: 700 
  },
  btnSecondary: { 
    padding: "8px 12px", 
    borderRadius: 10, 
    background: "#e5e7eb", 
    border: "1px solid #d1d5db", 
    fontWeight: 700,
    color: "#111827"          // 👉 texto oscuro sobre fondo claro
  },
};
