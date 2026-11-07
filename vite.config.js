import { resolve } from "node:path";
import { defineConfig } from "vite";
import { render } from "./src/plantilla.js";

// Cada página HTML trae dos marcas, <!--cabeza--> y <!--cuerpo-->, que se llenan aquí
// con el idioma de su <html lang>. Así el contenido vive una sola vez en src/contenido.js
// y las dos versiones llegan como HTML completo, sin depender de JavaScript.
const paginas = () => ({
  name: "paginas-por-idioma",
  async transformIndexHtml(html, ctx) {
    const lang = html.match(/<html lang="(\w+)"/)?.[1] ?? "es";
    // Solo en desarrollo: ?datos=peor arma la página con los datos de peor caso.
    const peor = Boolean(ctx.server) && /[?&]datos=peor\b/.test(ctx.originalUrl ?? "");
    const datos = peor ? await import("./src/contenido-peor.js") : null;
    const { cabeza, cuerpo } = render(lang, peor ? { proyectos: datos.proyectosPeor, correo: datos.correoPeor } : {});
    const conmutador = ctx.server ? conmutadorDatos(peor) : "";
    return html.replace("<!--cabeza-->", cabeza).replace("<!--cuerpo-->", cuerpo + conmutador);
  },
});

// Conmutador de desarrollo entre datos reales y peor caso. Nunca llega al build.
const conmutadorDatos = (peor) => `
<div style="position:fixed;bottom:12px;left:50%;translate:-50% 0;z-index:99;display:flex;gap:2px;padding:3px;background:#d4d4d4;border-radius:999px;font:600 12px system-ui">
  <a href="?" style="padding:6px 12px;border-radius:999px;text-decoration:none;color:#111;${peor ? "" : "background:#fff"}">Demo data</a>
  <a href="?datos=peor" style="padding:6px 12px;border-radius:999px;text-decoration:none;color:#111;${peor ? "background:#fff" : ""}">Worst case</a>
</div>`;

export default defineConfig({
  plugins: [paginas()],
  build: {
    target: "es2022",
    cssMinify: true,
    // Nada se incrusta como data: la CSP solo permite imágenes y fuentes del propio sitio.
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        es: resolve(import.meta.dirname, "index.html"),
        en: resolve(import.meta.dirname, "en/index.html"),
      },
    },
  },
});
