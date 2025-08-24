import React, { useEffect, useRef, useState } from "react";
import audioUrl from "./audio.mp3";

export default function App() {
  const audioRef = useRef(null);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    // Autoplay permitido solo en mute por políticas del navegador
    const a = audioRef.current;
    if (!a) return;
    a.muted = true;
    a.autoplay = true;
    a.play().catch(() => {});
  }, []);

  const enableSound = async () => {
    const a = audioRef.current;
    if (!a) return;
    a.muted = false;
    try { await a.play(); setSoundOn(true); } catch {}
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.h1}>Material de la clase</h1>

      <div style={styles.viewerWrap}>
        <iframe title="PDF" src="/material.pdf#view=FitH" style={styles.viewer} />
      </div>

      <div style={styles.audioRow}>
        <audio ref={audioRef} controls src={audioUrl} style={{ width: "100%" }}>
          Tu navegador no soporta la etiqueta <code>audio</code>.
        </audio>
        {!soundOn && (
          <button onClick={enableSound} style={styles.btnSecondary}>
            🔊 Activar sonido
          </button>
        )}
      </div>

      <div style={styles.actions}>
        <a href="/material-dl.pdf" style={styles.btn}>Descargar PDF</a>
      </div>
    </div>
  );
}

const styles = {
  page: { maxWidth: 980, margin: "24px auto", padding: "0 16px", fontFamily: "system-ui, sans-serif" },
  h1: { margin: "0 0 16px" },
  viewerWrap: { border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" },
  viewer: { width: "100%", height: "80vh", border: "none" },
  audioRow: { marginTop: 12, display: "grid", gap: 8 },
  actions: { marginTop: 16 },
  btn: { display: "inline-block", padding: "10px 14px", borderRadius: 10, background: "#111827", color: "#fff", textDecoration: "none", fontWeight: 700 },
  btnSecondary: { padding: "8px 12px", borderRadius: 10, background: "#e5e7eb", border: "1px solid #d1d5db", fontWeight: 700 }
};
