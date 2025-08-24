import { useEffect, useRef } from 'react'


/**
* Página de descarga directa de un PDF ubicado en /public/material.pdf
* - Botón de descarga con atributo `download` (sugiere nombre de archivo)
* - Auto-descarga si la URL trae ?auto=1
*/
export default function App(){
const linkRef = useRef(null)


// Cambiá esta ruta si tu PDF tiene otro nombre o carpeta
const pdfHref = '/material.pdf'
const suggestedName = 'Clase.pdf'


useEffect(() => {
const params = new URLSearchParams(window.location.search)
if (params.get('auto') === '1' && linkRef.current) {
// dispara la descarga automáticamente al cargar
const t = setTimeout(() => linkRef.current.click(), 120)
return () => clearTimeout(t)
}
}, [])


return (
<div style={styles.wrap}>
<main style={styles.card} aria-label="Descarga de material en PDF">
<h1 style={styles.h1}>Descargar PDF de la clase</h1>
<p style={styles.sub}>Hacé clic en el botón para obtener el material en tu dispositivo.</p>


<a ref={linkRef} href={pdfHref} download={suggestedName} style={styles.cta}>
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
<path d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16" stroke="#041204" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
Descargar PDF
</a>


<p style={styles.hint}>Si tu navegador lo abre en el visor, usá clic derecho → “Guardar enlace como…”.
Para forzar descarga en todos los navegadores, este proyecto ya incluye <code>vercel.json</code> con <code>Content-Disposition: attachment</code>.</p>


<p style={styles.small}>Tip: añadí <code>?auto=1</code> a la URL para que la descarga empiece automáticamente.
Ej.: <code>https://tudominio.vercel.app/?auto=1</code></p>
</main>
</div>
)
}


const styles = {
wrap: { minHeight:'100dvh', display:'grid', placeItems:'center', background:'#0f172a', color:'#e5e7eb', padding:24 },
card: { width:'100%', maxWidth:560, background:'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))', border:'1px solid rgba(255,255,255,0.08)', borderRadius:20, padding:28, boxShadow:'0 10px 30px rgba(0,0,0,0.35)' },
h1: { margin:'0 0 8px', fontSize:28 },
sub: { margin:'0 0 20px', color:'#9ca3af' },
cta: { display:'inline-flex', alignItems:'center', gap:10, background:'#22c55e', color:'#041204', fontWeight:800, textDecoration:'none', padding:'14px 18px', borderRadius:14 },
hint: { marginTop:16, fontSize:14, color:'#9ca3af' },
small: { marginTop:8, fontSize:12, color:'#9ca3af' },
}