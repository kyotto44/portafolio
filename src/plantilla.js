// Arma el HTML de cada idioma a partir de contenido.js. Corre en Node, dentro de
// vite.config.js, así que la página llega completa como HTML: sin JavaScript se lee
// todo y cada estación es un enlace normal a su andén.
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import {
  conocimientos,
  correo as correoReal,
  enlacesCorreo,
  formacion,
  github,
  lineas,
  linkedin,
  proyectos as proyectosReales,
  servicios,
  textos,
} from "./contenido.js";

const require = createRequire(import.meta.url);

// Íconos de Phosphor (peso bold), incrustados como SVG para no pedir archivos aparte.
const icono = (nombre) =>
  readFileSync(require.resolve(`@phosphor-icons/core/assets/bold/${nombre}-bold.svg`), "utf8").replace(
    "<svg ",
    '<svg class="icono" aria-hidden="true" focusable="false" '
  );

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

const nombreDe = (p, lang) => (typeof p.nombre === "string" ? p.nombre : p.nombre[lang]);

// Un proyecto nuevo puede llegar antes que su captura: en ese caso el andén muestra
// una placa con el nombre en vez de una imagen rota.
const tieneCaptura = (id) => existsSync(join(import.meta.dirname, "..", "public", "capturas", `${id}-720.webp`));

// El código de estación: W1…W6 en la línea Web, E1…E2 en Escritorio.
function calcularCodigos(lista) {
  const cuenta = {};
  return Object.fromEntries(
    lista.map((p) => {
      cuenta[p.linea] = (cuenta[p.linea] ?? 0) + 1;
      return [p.id, `${lineas[p.linea].codigo}${cuenta[p.linea]}`];
    })
  );
}

// Datos de la página que se está armando. render() los cambia por los de peor caso
// cuando se le piden (solo en desarrollo).
let proyectos = proyectosReales;
let correo = correoReal;
let codigos = calcularCodigos(proyectos);

const externo = () => `target="_blank" rel="noopener" `;
const nuevaPestana = (t) => `<span class="solo-lector"> ${esc(t.abreNueva)}</span>`;

function cabeza(lang) {
  const t = textos[lang];
  return `
    <title>${esc(t.titulo)}</title>
    <meta name="description" content="${esc(t.descripcion)}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${esc(t.titulo)}" />
    <meta property="og:description" content="${esc(t.descripcion)}" />
    <meta property="og:locale" content="${lang === "es" ? "es_CO" : "en_US"}" />
    <link rel="alternate" hreflang="es" href="/" />
    <link rel="alternate" hreflang="en" href="/en/" />
    <link rel="alternate" hreflang="x-default" href="/" />`;
}

function cabecera(lang) {
  const t = textos[lang];
  const otro = t.otroIdioma;
  return `
  <a class="saltar" href="#contenido">${esc(t.saltar)}</a>
  <header class="cabecera">
    <div class="envoltura cabecera__fila">
      <a class="marca" href="${lang === "es" ? "/" : "/en/"}">
        <span class="marca__placa" aria-hidden="true">SA</span>
        <span class="marca__nombre">Santiago Angarita</span>
      </a>
      <nav class="nav" aria-label="${esc(t.navEtiqueta)}">
        <ul class="nav__lista">
          <li class="nav__seccion"><a href="#proyectos">${esc(t.nav.proyectos)}</a></li>
          <li class="nav__seccion"><a href="#servicios">${esc(t.nav.servicios)}</a></li>
          <li class="nav__seccion"><a href="#ia">${esc(t.nav.ia)}</a></li>
          <li><a class="nav__idioma" href="${otro.href}" hreflang="${otro.lang}" lang="${otro.lang}">${icono("translate")}<span class="nav__idioma-largo">${esc(otro.etiqueta)}</span><span class="nav__idioma-corto" aria-hidden="true">${otro.corto}</span></a></li>
          <li><a href="#contacto">${esc(t.nav.contacto)}</a></li>
        </ul>
      </nav>
    </div>
  </header>`;
}

function estacion(p, lang, indice) {
  const t = textos[lang];
  const columna = p.linea === "web" ? indice + 1 : indice + 2;
  return `
          <li class="estacion" data-col="${columna}">
            <a class="estacion__enlace" href="#anden-${p.id}" data-estacion="${p.id}" title="${esc(nombreDe(p, lang))}">
              <span class="estacion__codigo">${codigos[p.id]}</span>
              <span class="estacion__punto" aria-hidden="true"></span>
              <span class="estacion__nombre"><span class="solo-lector">${esc(t.estacion)} ${codigos[p.id]}, </span>${esc(nombreDe(p, lang))}</span>
            </a>
          </li>`;
}

function mapa(lang) {
  const t = textos[lang];
  const web = proyectos.filter((p) => p.linea === "web");
  const escritorio = proyectos.filter((p) => p.linea === "escritorio");
  // Columnas del mapa: las que pida la línea más larga. Escritorio arranca una columna
  // después porque baja en diagonal desde el origen.
  const columnas = Math.max(web.length, escritorio.length + 1, 4);
  return `
      <div class="mapa" data-mapa>
        <div class="mapa__cabeza">
          <h2 class="mapa__titulo">${esc(t.mapaTitulo(proyectos.length))}</h2>
          <p class="mapa__ayuda">${esc(t.mapaAyuda)}</p>
          <ul class="mapa__leyenda" aria-hidden="true">
            <li><span class="placa placa--web">${esc(lineas.web[lang])}</span>${esc(t.leyendaWeb)}</li>
            <li><span class="placa placa--escritorio">${esc(lineas.escritorio[lang])}</span>${esc(t.leyendaEscritorio)}</li>
          </ul>
          <p class="solo-lector" role="status" data-anuncio></p>
        </div>
        <div class="mapa__red" data-n="${columnas}" data-fin-web="${web.length}" data-fin-escritorio="${escritorio.length + 1}">
          <span class="mapa__origen" aria-hidden="true"></span>
          <span class="mapa__trazo mapa__trazo--web" aria-hidden="true"><span class="mapa__recorrido" data-recorrido="web"></span></span>
          <span class="mapa__trazo mapa__trazo--diagonal" aria-hidden="true"><span class="mapa__recorrido" data-recorrido="diagonal"></span></span>
          <span class="mapa__trazo mapa__trazo--escritorio" aria-hidden="true"><span class="mapa__recorrido" data-recorrido="escritorio"></span></span>
          <div class="mapa__ramal">
            <span class="mapa__rotulo placa placa--web" aria-hidden="true">${esc(lineas.web[lang])}</span>
            <ol class="mapa__linea mapa__linea--web" aria-label="${esc(t.lineaWeb)}">${web.map((p, i) => estacion(p, lang, i)).join("")}
            </ol>
          </div>
          <div class="mapa__ramal">
            <span class="mapa__rotulo placa placa--escritorio" aria-hidden="true">${esc(lineas.escritorio[lang])}</span>
            <ol class="mapa__linea mapa__linea--escritorio" aria-label="${esc(t.lineaEscritorio)}">${escritorio.map((p, i) => estacion(p, lang, i)).join("")}
            </ol>
          </div>
        </div>
      </div>`;
}

function anden(p, lang, i) {
  const t = textos[lang];
  const nombre = nombreDe(p, lang);
  const previo = proyectos[(i - 1 + proyectos.length) % proyectos.length];
  const proximo = proyectos[(i + 1) % proyectos.length];
  // Las capturas de las apps salen de una imagen de 760 px: ese es su ancho real.
  const grande = p.anchoCaptura ?? 1280;
  // El sitio publicado va primero; si no hay sitio, el código toma su lugar.
  const botones = [
    p.url &&
      `<a class="boton boton--primario" href="${p.url}" ${externo(t)}>${esc(t.abrirSitio)}${icono("arrow-up-right")}${nuevaPestana(t)}</a>`,
    p.repo &&
      `<a class="boton ${p.url ? "boton--secundario" : "boton--primario"}" href="${p.repo}" ${externo(t)}>${icono("github-logo")}${esc(t.verRepo)}${nuevaPestana(t)}</a>`,
  ].filter(Boolean);
  const acciones = botones.length ? `<div class="acciones">\n            ${botones.join("\n            ")}\n            </div>` : "";

  return `
        <article class="anden anden--${p.linea}" id="anden-${p.id}" data-anden="${p.id}" aria-labelledby="titulo-${p.id}">
          ${
            !tieneCaptura(p.id)
              ? `<div class="anden__captura anden__captura--vacia" aria-hidden="true"><span>${esc(nombre)}</span></div>`
              : `<figure class="anden__captura">
            <img
              src="/capturas/${p.id}-720.webp"
              srcset="/capturas/${p.id}-720.webp 720w, /capturas/${p.id}-1280.webp ${grande}w"
              sizes="(min-width: 900px) 56vw, calc(100vw - 2rem)"
              width="1280" height="800"
              alt="${esc(t.capturaDe)} ${esc(nombre)}"
              ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}
              decoding="async" />
          </figure>`
          }
          <div class="anden__ficha">
            <div class="anden__cabeza">
              <h3 class="anden__titulo" id="titulo-${p.id}"><span class="placa placa--${p.linea} placa--grande">${codigos[p.id]}</span> ${esc(nombre)}</h3>
              <span class="placa placa--estado placa--${p.estado}">${esc(t.estados[p.estado])}</span>
            </div>
            <p class="anden__resumen">${esc(p.resumen[lang])}</p>
            <ul class="anden__datos">${p.datos[lang].map((d) => `<li>${esc(d)}</li>`).join("")}</ul>
            <ul class="anden__stack">${p.stack
              .split(" · ")
              .map((s) => `<li>${esc(s)}</li>`)
              .join("")}</ul>
            ${p.ficticio ? `<p class="anden__nota">${esc(t.ficticio)}</p>` : ""}
            ${acciones}
            <nav class="anden__pasos" aria-label="${esc(t.mapaTitulo(proyectos.length))}">
              <a href="#anden-${previo.id}" data-ir="${previo.id}">${icono("arrow-left")}<span><span class="anden__paso-etiqueta">${esc(t.anterior)}</span> ${esc(nombreDe(previo, lang))}</span></a>
              <a href="#anden-${proximo.id}" data-ir="${proximo.id}"><span><span class="anden__paso-etiqueta">${esc(t.siguiente)}</span> ${esc(nombreDe(proximo, lang))}</span>${icono("arrow-right")}</a>
            </nav>
          </div>
        </article>`;
}

function portada(lang) {
  const t = textos[lang];
  return `
    <section class="portada" aria-labelledby="nombre">
      <div class="envoltura portada__intro">
        <h1 class="portada__nombre" id="nombre">Santiago Angarita</h1>
        <div class="portada__lado">
          <p class="portada__entrada">${esc(t.entrada)}</p>
          <div class="acciones">
            <a class="boton boton--primario" href="#contacto">${esc(t.tengoProyecto)}${icono("arrow-right")}</a>
            <a class="boton boton--secundario" href="${github}" ${externo(t)}>${icono("github-logo")}${esc(t.verCodigo)}${nuevaPestana(t)}</a>
          </div>
        </div>
      </div>
      <div class="envoltura proyectos" id="proyectos">
        ${mapa(lang)}
        <div class="andenes">${proyectos.map((p, i) => anden(p, lang, i)).join("")}
        </div>
      </div>
    </section>`;
}

function seccionServicios(lang) {
  const t = textos[lang];
  return `
    <section class="seccion servicios" id="servicios" aria-labelledby="titulo-servicios">
      <div class="envoltura">
        <h2 class="seccion__titulo" id="titulo-servicios">${esc(t.serviciosTitulo)}</h2>
        <ul class="servicios__lista">${servicios
          .map(
            (s) => `
          <li class="servicio">
            <span class="ruta ruta--${s.linea}" aria-hidden="true">${s.codigo}</span>
            <h3 class="servicio__titulo">${esc(s.titulo[lang])}</h3>
            <p class="servicio__texto">${esc(s.texto[lang])}</p>
          </li>`
          )
          .join("")}
        </ul>
        <p class="servicios__remoto">${esc(t.remoto)}</p>
      </div>
    </section>`;
}

function seccionIA(lang) {
  const t = textos[lang];
  const p = t.iaPasos;
  // El esquema es geometría pura: una línea que se abre en tres vías paralelas y se vuelve
  // a unir. Hay una versión horizontal y otra vertical; el CSS muestra la que cabe.
  const vias = [
    ["codigo", p.codigo],
    ["pruebas", p.pruebas],
    ["revision", p.revision],
  ];
  return `
    <section class="seccion ia" id="ia" aria-labelledby="titulo-ia">
      <div class="envoltura">
        <h2 class="seccion__titulo" id="titulo-ia">${esc(t.iaTitulo)}</h2>
        <p class="seccion__texto">${esc(t.iaTexto)}</p>
        <figure class="esquema" data-esquema>
          <svg class="esquema__dibujo esquema__dibujo--ancho" viewBox="0 0 1000 320" aria-hidden="true">
            <path class="esquema__tronco" pathLength="1" d="M80 160 H300" />
            <path class="esquema__via" pathLength="1" d="M300 160 L400 60 H600 L700 160" />
            <path class="esquema__via" pathLength="1" d="M300 160 H700" />
            <path class="esquema__via" pathLength="1" d="M300 160 L400 260 H600 L700 160" />
            <path class="esquema__tronco" pathLength="1" d="M700 160 H920" />
            <circle class="esquema__parada" cx="80" cy="160" r="16" />
            <circle class="esquema__parada" cx="920" cy="160" r="16" />
            <circle class="esquema__cruce" cx="300" cy="160" r="11" />
            <circle class="esquema__cruce" cx="700" cy="160" r="11" />
          </svg>
          <svg class="esquema__dibujo esquema__dibujo--alto" viewBox="0 0 320 860" aria-hidden="true">
            <path class="esquema__tronco" pathLength="1" d="M160 40 V220" />
            <path class="esquema__via" pathLength="1" d="M160 220 L60 320 V540 L160 640" />
            <path class="esquema__via" pathLength="1" d="M160 220 V640" />
            <path class="esquema__via" pathLength="1" d="M160 220 L260 320 V540 L160 640" />
            <path class="esquema__tronco" pathLength="1" d="M160 640 V820" />
            <circle class="esquema__parada" cx="160" cy="40" r="16" />
            <circle class="esquema__parada" cx="160" cy="820" r="16" />
            <circle class="esquema__cruce" cx="160" cy="220" r="11" />
            <circle class="esquema__cruce" cx="160" cy="640" r="11" />
          </svg>
          <ol class="esquema__pasos">
            <li class="esquema__paso esquema__paso--inicio">${esc(p.inicio)}</li>
            ${vias
              .map(
                ([id, nombre]) =>
                  `<li class="esquema__paso esquema__paso--via esquema__paso--${id}"><span class="placa placa--web">${esc(nombre)}</span><span class="esquema__agente">${esc(p.agente)}</span></li>`
              )
              .join("\n            ")}
            <li class="esquema__paso esquema__paso--fin">${esc(p.fin)}</li>
          </ol>
        </figure>
        <ul class="principios">${t.iaPrincipios.map((x) => `<li>${icono("check")}${esc(x)}</li>`).join("")}</ul>
      </div>
    </section>`;
}

function seccionSaber(lang) {
  const t = textos[lang];
  return `
    <section class="seccion saber" id="saber" aria-labelledby="titulo-saber">
      <div class="envoltura">
        <h2 class="seccion__titulo" id="titulo-saber">${esc(t.saberTitulo)}</h2>
        <div class="saber__rejilla">${conocimientos
          .map(
            (c) => `
          <div class="saber__grupo">
            <h3 class="saber__titulo">${esc(c.titulo[lang])}</h3>
            <p>${esc(c.texto[lang])}</p>
          </div>`
          )
          .join("")}
        </div>
        <div class="formacion">
          <h3 class="formacion__titulo">${esc(t.formacionTitulo)}</h3>
          <ol class="formacion__linea">${formacion
            .map(
              (f) => `
            <li class="formacion__parada${f.terminado ? " formacion__parada--hecha" : ""}">
              <span class="formacion__punto" aria-hidden="true"></span>
              <span class="formacion__nombre">${esc(f.titulo[lang])}</span>
              <span class="formacion__lugar">${esc(f.lugar)}</span>
              <span class="formacion__estado">${esc(f.estado[lang])}</span>
            </li>`
            )
            .join("")}
          </ol>
        </div>
      </div>
    </section>`;
}

function seccionContacto(lang) {
  const t = textos[lang];
  const e = enlacesCorreo(lang, correo);
  return `
    <section class="contacto" id="contacto" aria-labelledby="titulo-contacto">
      <div class="envoltura contacto__in">
        <div class="contacto__firma">
          <img src="/foto/santiago-160.webp" srcset="/foto/santiago-160.webp 1x, /foto/santiago-320.webp 2x" width="160" height="160" alt="" loading="lazy" decoding="async" />
          <p><strong>Santiago Angarita</strong>${esc(t.firma)}</p>
        </div>
        <h2 class="contacto__titulo" id="titulo-contacto">${esc(t.contactoTitulo)}</h2>
        <p class="contacto__texto">${esc(t.contactoTexto)}</p>
        <a class="contacto__correo" href="${e.mailto}">${correo}</a>
        <div class="acciones">
          <a class="boton boton--claro" href="${e.gmail}" ${externo(t)}>${icono("envelope-simple")}${esc(t.abrirGmail)}${nuevaPestana(t)}</a>
          <a class="boton boton--contorno" href="${e.mailto}">${esc(t.usarApp)}</a>
          <button class="boton boton--contorno" type="button" data-copiar="${correo}" data-ok="${esc(t.copiado)}" data-error="${esc(t.copiarError)}" hidden><span class="copiar__iconos">${icono("copy")}${icono("check")}</span><span data-copiar-texto>${esc(t.copiar)}</span></button>
          <a class="boton boton--contorno" href="${github}" ${externo(t)}>${icono("github-logo")}${esc(t.verCodigo)}${nuevaPestana(t)}</a>
          <a class="boton boton--contorno" href="${linkedin}" ${externo(t)}>${icono("linkedin-logo")}LinkedIn${nuevaPestana(t)}</a>
        </div>
        <p class="contacto__estado" role="status" data-copiar-estado></p>
      </div>
    </section>`;
}

function pie(lang) {
  const t = textos[lang];
  const otro = t.otroIdioma;
  return `
  <footer class="pie">
    <div class="envoltura pie__fila">
      <p>Santiago Angarita · <a href="${github}" ${externo(t)}>GitHub${nuevaPestana(t)}</a> · <a href="${linkedin}" ${externo(t)}>LinkedIn${nuevaPestana(t)}</a></p>
      <p class="pie__nota">${esc(t.pie)}</p>
      <p><a href="${otro.href}" hreflang="${otro.lang}" lang="${otro.lang}">${esc(otro.etiqueta)}</a></p>
    </div>
  </footer>`;
}

export function render(lang, datos = {}) {
  proyectos = datos.proyectos ?? proyectosReales;
  correo = datos.correo ?? correoReal;
  codigos = calcularCodigos(proyectos);
  return {
    cabeza: cabeza(lang),
    cuerpo: `${cabecera(lang)}
  <main id="contenido">${portada(lang)}${seccionServicios(lang)}${seccionIA(lang)}${seccionSaber(lang)}${seccionContacto(lang)}
  </main>${pie(lang)}`,
  };
}
