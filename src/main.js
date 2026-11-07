// Interacción del portafolio. Todo es mejora: sin este archivo, cada estación es un
// enlace a su andén y todos los andenes se ven uno debajo del otro.

const mapa = document.querySelector("[data-mapa]");
const enlaces = [...document.querySelectorAll("[data-estacion]")];
const andenes = new Map([...document.querySelectorAll("[data-anden]")].map((a) => [a.dataset.anden, a]));
const recorridos = Object.fromEntries(
  [...document.querySelectorAll("[data-recorrido]")].map((r) => [r.dataset.recorrido, r])
);
const anchoMapa = window.matchMedia("(min-width: 56rem)");

let elegido = null;

// En celular cada línea es una franja: el tramo va de su primera estación a la elegida.
function dibujarRecorridoFranja() {
  for (const linea of document.querySelectorAll(".mapa__linea")) {
    const estaciones = [...linea.querySelectorAll(".estacion")];
    const centro = (li) => li.offsetLeft + li.offsetWidth / 2;
    const indice = estaciones.findIndex((li) => li.querySelector(`[data-estacion="${elegido}"]`));
    const largo = centro(estaciones.at(-1)) - centro(estaciones[0]);
    const fraccion = indice < 0 || largo <= 0 ? 0 : (centro(estaciones[indice]) - centro(estaciones[0])) / largo;
    linea.style.setProperty("--recorrido", fraccion);
  }
}

// Pinta el tramo de línea desde el origen hasta la estación elegida.
function dibujarRecorrido() {
  if (!elegido) return;
  if (!anchoMapa.matches) return dibujarRecorridoFranja();
  const enlace = enlaces.find((e) => e.dataset.estacion === elegido);
  const red = enlace.closest(".mapa__red").getBoundingClientRect();
  const punto = enlace.querySelector(".estacion__punto").getBoundingClientRect();
  const centro = punto.left + punto.width / 2 - red.left;
  const esWeb = enlace.closest(".mapa__linea--web") !== null;

  // offsetLeft y offsetWidth ignoran la escala: así la medida sirve aunque el trazo
  // todavía se esté dibujando.
  const fraccion = (recorrido) => {
    const trazo = recorrido.parentElement;
    return Math.min(1, Math.max(0, (centro - trazo.offsetLeft) / trazo.offsetWidth));
  };

  recorridos.web.style.scale = `${esWeb ? fraccion(recorridos.web) : 0} 1`;
  recorridos.diagonal.style.scale = `${esWeb ? 0 : 1} 1`;
  recorridos.escritorio.style.scale = `${esWeb ? 0 : fraccion(recorridos.escritorio)} 1`;
}

function elegir(id, { porTeclado = false, enfocar = false } = {}) {
  if (!andenes.has(id)) return;
  elegido = id;

  for (const enlace of enlaces) {
    if (enlace.dataset.estacion === id) enlace.setAttribute("aria-current", "true");
    else enlace.removeAttribute("aria-current");
  }
  for (const [clave, anden] of andenes) anden.classList.toggle("anden--activo", clave === id);

  // Las acciones de teclado no se animan: el recorrido salta directo a la estación.
  mapa.classList.toggle("mapa--teclado", porTeclado);
  dibujarRecorrido();

  if (enfocar) andenes.get(id).querySelector("h3").focus({ preventScroll: true });
}

// Avisa al lector de pantalla qué andén quedó abierto, porque cambia más abajo en la página.
const anuncio = document.querySelector("[data-anuncio]");
function anunciar(id) {
  const enlace = enlaces.find((e) => e.dataset.estacion === id);
  if (anuncio && enlace) anuncio.textContent = enlace.querySelector(".estacion__nombre").textContent;
}

function cambiarHash(id) {
  history.replaceState(null, "", `#anden-${id}`);
}

if (mapa && enlaces.length) {
  for (const enlace of enlaces) {
    enlace.addEventListener("click", (evento) => {
      evento.preventDefault();
      // detail es 0 cuando el clic viene de Enter o Espacio.
      elegir(enlace.dataset.estacion, { porTeclado: evento.detail === 0 });
      anunciar(enlace.dataset.estacion);
      cambiarHash(enlace.dataset.estacion);
      // En celular, el andén queda debajo de la franja: se acerca si no se ve.
      if (!anchoMapa.matches) {
        const anden = andenes.get(enlace.dataset.estacion);
        if (anden.getBoundingClientRect().top > window.innerHeight * 0.8) {
          anden.scrollIntoView({ block: "start" });
        }
      }
    });
  }

  // Anterior y siguiente dentro de cada andén.
  for (const paso of document.querySelectorAll("[data-ir]")) {
    paso.addEventListener("click", (evento) => {
      evento.preventDefault();
      const id = paso.dataset.ir;
      elegir(id, { porTeclado: evento.detail === 0, enfocar: true });
      cambiarHash(id);
      const enlace = enlaces.find((e) => e.dataset.estacion === id);
      enlace.scrollIntoView({ block: "nearest", inline: "nearest" });
    });
  }

  // Los títulos de los andenes reciben el foco al cambiar de estación con anterior/siguiente.
  for (const anden of andenes.values()) anden.querySelector("h3").setAttribute("tabindex", "-1");

  const desdeHash = location.hash.replace("#anden-", "");
  elegir(andenes.has(desdeHash) ? desdeHash : enlaces[0].dataset.estacion);

  // En celular, si el enlace trae una estación que no se ve en la franja, la centra.
  if (!anchoMapa.matches) {
    const red = mapa.querySelector(".mapa__red");
    const estacion = enlaces.find((e) => e.dataset.estacion === elegido).closest(".estacion");
    const caja = red.getBoundingClientRect();
    const punto = estacion.getBoundingClientRect();
    red.scrollLeft += punto.left - caja.left - (caja.width - punto.width) / 2;
  }
  requestAnimationFrame(() => document.querySelector(".andenes").classList.add("andenes--vivos"));

  new ResizeObserver(() => {
    mapa.classList.add("mapa--teclado");
    dibujarRecorrido();
  }).observe(mapa);
}

// El esquema de IA se dibuja la primera vez que entra en pantalla.
const esquema = document.querySelector("[data-esquema]");
if (esquema) {
  const observador = new IntersectionObserver(
    (entradas) => {
      if (entradas.some((e) => e.isIntersecting)) {
        esquema.classList.add("esquema--visible");
        observador.disconnect();
      }
    },
    { threshold: 0.35 }
  );
  observador.observe(esquema);
}

// Copiar el correo. El botón solo aparece si el navegador permite copiar.
const copiar = document.querySelector("[data-copiar]");
if (copiar && navigator.clipboard) {
  const estado = document.querySelector("[data-copiar-estado]");
  const texto = copiar.querySelector("[data-copiar-texto]");
  const original = texto.textContent;
  let espera;
  copiar.hidden = false;
  copiar.addEventListener("click", async () => {
    clearTimeout(espera);
    try {
      await navigator.clipboard.writeText(copiar.dataset.copiar);
      texto.textContent = copiar.dataset.ok;
      estado.textContent = copiar.dataset.ok;
      copiar.dataset.copiado = "";
    } catch {
      estado.textContent = copiar.dataset.error;
    }
    espera = setTimeout(() => {
      delete copiar.dataset.copiado;
      texto.textContent = original;
      estado.textContent = "";
    }, 2400);
  });
}
