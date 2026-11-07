// Todo el texto del sitio en un solo lugar, en español y en inglés.
// Las cifras salen del README de kyotto44 y de los CAMBIOS.md de cada proyecto:
// si una cifra cambia allá, se cambia aquí. No se agregan cifras que no estén publicadas.

export const correo = "kyottondea@gmail.com";
export const github = "https://github.com/kyotto44";
export const linkedin = "https://www.linkedin.com/in/santiago-angarita-vergara-05623234b";

const asunto = { es: "Proyecto desde el portafolio", en: "Project from the portfolio" };

export const enlacesCorreo = (lang, direccion = correo) => ({
  gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${direccion}&su=${encodeURIComponent(asunto[lang])}`,
  mailto: `mailto:${direccion}?subject=${encodeURIComponent(asunto[lang])}`,
});

// Líneas del mapa. "web" va en azul, "escritorio" en tinta.
export const lineas = {
  web: { es: "Web", en: "Web", codigo: "W" },
  escritorio: { es: "Escritorio", en: "Desktop", codigo: "E" },
};

export const proyectos = [
  {
    id: "contraluz",
    nombre: "Contraluz",
    linea: "web",
    estado: "en-linea",
    url: "https://contraluz-bogota.netlify.app",
    repo: "https://github.com/kyotto44/contraluz",
    stack: "Vite · JavaScript",
    ficticio: true,
    resumen: {
      es: "Discoteca ficticia de techno y house en Bogotá. Agenda, residentes y reservas; la puerta del club se cruza sola al bajar.",
      en: "A fictional techno and house club in Bogotá. Line-up, residents and bookings; the club door opens by itself as you scroll.",
    },
    datos: {
      es: ["98 en Lighthouse", "Funciona sin JavaScript", "CSP estricta y HTTPS"],
      en: ["98 on Lighthouse", "Works without JavaScript", "Strict CSP and HTTPS"],
    },
  },
  {
    id: "paramo",
    nombre: "Páramo",
    linea: "web",
    estado: "en-linea",
    url: "https://paramo-kyotto44.netlify.app",
    repo: "https://github.com/kyotto44/paramo",
    stack: "Vite · JavaScript",
    ficticio: true,
    resumen: {
      es: "Hamburguesería ficticia de Tunja. La carta se filtra, el horario dice en vivo si está abierto y las reservas llegan por formulario.",
      en: "A fictional burger place in Tunja. The menu filters, the opening hours say live whether it is open, and bookings arrive by form.",
    },
    datos: {
      es: ["Carta con filtros", "Horario en vivo", "Reservas en línea"],
      en: ["Filterable menu", "Live opening hours", "Online bookings"],
    },
  },
  {
    id: "templvm",
    nombre: "Templvm",
    linea: "web",
    estado: "en-linea",
    url: "https://templvm-kyotto44.netlify.app",
    repo: "https://github.com/kyotto44/templvm",
    stack: "Bootstrap 5 · JavaScript",
    resumen: {
      es: "La historia de la Orden del Temple, seis de sus castillos y una tienda de demostración con carrito.",
      en: "The history of the Knights Templar, six of their castles and a demo shop with a cart.",
    },
    datos: {
      es: ["Seis castillos", "Carrito de compras", "Tienda de demostración"],
      en: ["Six castles", "Shopping cart", "Demo shop"],
    },
  },
  {
    id: "pitlane",
    nombre: "PitLane",
    linea: "web",
    estado: "en-linea",
    url: "https://pitlane-kyotto44.netlify.app",
    repo: "https://github.com/kyotto44/pitlane",
    stack: "HTML · CSS · JavaScript",
    resumen: {
      es: "Portal de Fórmula 1 de diez páginas: pilotos, clasificación, escuderías, circuitos y un club de fans con formularios que validan.",
      en: "A ten-page Formula 1 portal: drivers, standings, teams, circuits and a fan club with forms that validate.",
    },
    datos: {
      es: ["Imágenes de 7,1 MB a 0,8 MB", "Menú para celular", "Tabla ordenable con teclado"],
      en: ["Images from 7.1 MB to 0.8 MB", "Mobile menu", "Keyboard-sortable table"],
    },
  },
  {
    id: "matchpoint",
    nombre: "MatchPoint",
    linea: "web",
    estado: "en-linea",
    url: "https://matchpoint-kyotto44.netlify.app",
    repo: "https://github.com/kyotto44/matchpoint",
    stack: "HTML · Tailwind CSS",
    resumen: {
      es: "Resultados, calendario y posiciones de cuatro ligas de fútbol europeo.",
      en: "Results, fixtures and standings for four European football leagues.",
    },
    datos: {
      es: ["Cuatro ligas", "Resultados y calendario", "Tabla de posiciones"],
      en: ["Four leagues", "Results and fixtures", "League tables"],
    },
  },
  {
    id: "tactica",
    nombre: { es: "Táctica y ejecución", en: "Tactics and execution" },
    linea: "web",
    estado: "en-linea",
    url: "https://landing-cs-kyotto44.netlify.app",
    repo: "https://github.com/kyotto44/landing-cs",
    stack: "HTML · CSS",
    resumen: {
      es: "Cómo se construye software, contado como una ronda de Counter-Strike: estrategia, roles, proceso y herramientas.",
      en: "How software gets built, told as a round of Counter-Strike: strategy, roles, process and tools.",
    },
    datos: {
      es: ["Una sola página", "Estrategia y roles", "Proceso por etapas"],
      en: ["Single page", "Strategy and roles", "Step-by-step process"],
    },
  },
  {
    id: "sanrafa",
    nombre: "SanRafa",
    linea: "escritorio",
    estado: "solo-codigo",
    repo: "https://github.com/kyotto44/sanrafa-app",
    stack: "Java · JavaFX · SQLite",
    anchoCaptura: 760,
    resumen: {
      es: "App de escritorio para un hospital: pacientes, citas e historias clínicas, con validaciones en cada formulario. Proyecto académico.",
      en: "A desktop app for a hospital: patients, appointments and medical records, with validation on every form. Academic project.",
    },
    datos: {
      es: ["46 pruebas automáticas", "Validaciones en cada formulario", "Base de datos SQLite"],
      en: ["46 automated tests", "Validation on every form", "SQLite database"],
    },
  },
  {
    id: "dashboard",
    nombre: { es: "Talento humano", en: "Human resources" },
    linea: "escritorio",
    estado: "solo-codigo",
    repo: "https://github.com/kyotto44/dashboard-gobernacion",
    stack: "Java · JavaFX · MySQL",
    anchoCaptura: 760,
    resumen: {
      es: "Lleva las vacaciones, los permisos y los retiros del personal de una gobernación. Corre con MySQL o en modo demostración.",
      en: "Tracks leave, permits and retirements for the staff of a regional government. Runs on MySQL or in demo mode.",
    },
    datos: {
      es: ["48 pruebas automáticas", "MySQL con JDBI", "Modo demostración"],
      en: ["48 automated tests", "MySQL with JDBI", "Demo mode"],
    },
  },
];

export const servicios = [
  {
    codigo: "W",
    linea: "web",
    titulo: { es: "Sitios web y landings", en: "Websites and landing pages" },
    texto: {
      es: "Rápidos, accesibles y seguros, pensados primero para el celular. Te los entrego publicados y listos para usar.",
      en: "Fast, accessible and secure, designed for phones first. I hand them over live and ready to use.",
    },
  },
  {
    codigo: "E",
    linea: "escritorio",
    titulo: { es: "Apps de escritorio", en: "Desktop apps" },
    texto: {
      es: "Java con base de datos, formularios que validan lo que escribe la gente y pruebas automáticas que lo comprueban.",
      en: "Java with a database, forms that check what people type, and automated tests that prove it works.",
    },
  },
  {
    codigo: "M",
    linea: "mejora",
    titulo: { es: "Mejorar tu sitio", en: "Improve your site" },
    texto: {
      es: "Más rápido y liviano, usable con teclado y lector de pantalla, y con los errores y la seguridad al día.",
      en: "Faster and lighter, usable with a keyboard and a screen reader, with bugs fixed and security up to date.",
    },
  },
];

export const conocimientos = [
  {
    titulo: { es: "Java y escritorio", en: "Java and desktop" },
    texto: {
      es: "JavaFX con FXML y hojas de estilo, capas con MySQL o datos en memoria, records, LocalDate y JUnit 5.",
      en: "JavaFX with FXML and stylesheets, layers over MySQL or in-memory data, records, LocalDate and JUnit 5.",
    },
  },
  {
    titulo: { es: "Bases de datos", en: "Databases" },
    texto: {
      es: "MySQL con JDBI y SQLite con JDBC. Consultas con PreparedStatement, llaves foráneas y transacciones.",
      en: "MySQL with JDBI and SQLite with JDBC. PreparedStatement queries, foreign keys and transactions.",
    },
  },
  {
    titulo: { es: "Desarrollo web", en: "Web development" },
    texto: {
      es: "HTML semántico, CSS moderno, JavaScript sin frameworks con Vite, Tailwind y Bootstrap.",
      en: "Semantic HTML, modern CSS, framework-free JavaScript with Vite, Tailwind and Bootstrap.",
    },
  },
  {
    titulo: { es: "Accesibilidad", en: "Accessibility" },
    texto: {
      es: "Contraste WCAG AA, uso completo con teclado, ARIA donde hace falta y respeto por el movimiento reducido.",
      en: "WCAG AA contrast, full keyboard use, ARIA where it is needed and respect for reduced motion.",
    },
  },
  {
    titulo: { es: "Rendimiento", en: "Performance" },
    texto: {
      es: "Imágenes WebP con srcset. PitLane pasó de 7,1 MB a 0,8 MB en imágenes y Contraluz tiene 98 en Lighthouse.",
      en: "WebP images with srcset. PitLane went from 7.1 MB to 0.8 MB of images and Contraluz scores 98 on Lighthouse.",
    },
  },
  {
    titulo: { es: "Seguridad", en: "Security" },
    texto: {
      es: "Cabeceras CSP y HTTPS, contraseñas fuera del código y ningún dato real en los repositorios.",
      en: "CSP headers and HTTPS, passwords kept out of the code and no real data in the repositories.",
    },
  },
];

export const formacion = [
  {
    titulo: { es: "Técnico en Sistemas", en: "Systems Technician" },
    lugar: "SENA",
    estado: { es: "Completado", en: "Completed" },
    terminado: true,
  },
  {
    titulo: { es: "Ingeniería de Sistemas", en: "Systems Engineering" },
    lugar: "Universidad Santo Tomás",
    estado: { es: "En curso", en: "In progress" },
    terminado: false,
  },
];

// Números en letra para el título del mapa; desde trece se escriben en cifras.
const palabras = {
  es: ["Cero", "Un", "Dos", "Tres", "Cuatro", "Cinco", "Seis", "Siete", "Ocho", "Nueve", "Diez", "Once", "Doce"],
  en: ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"],
};

// Textos de interfaz. Cada clave existe en los dos idiomas.
export const textos = {
  es: {
    titulo: "Santiago Angarita · Sitios web y apps de escritorio",
    descripcion:
      "Portafolio de Santiago Angarita: sitios web publicados y apps de escritorio en Java con pruebas automáticas. Trabajo remoto.",
    saltar: "Saltar al contenido",
    nav: { proyectos: "Proyectos", servicios: "Servicios", ia: "Cómo trabajo", contacto: "Contacto" },
    tengoProyecto: "Tengo un proyecto",
    leyendaWeb: "sitios publicados",
    leyendaEscritorio: "apps con pruebas",
    otroIdioma: { etiqueta: "English", corto: "EN", href: "/en/", lang: "en" },
    navEtiqueta: "Principal",
    entrada:
      "Estudiante de Ingeniería de Sistemas. Hago sitios web y apps de escritorio, y todo lo que ves aquí está publicado.",
    verCodigo: "Ver mi código",
    mapaTitulo: (n) => `${palabras.es[n] ?? n} proyectos en dos líneas`,
    mapaAyuda: "Elige una estación para ver el proyecto.",
    lineaWeb: "Línea Web, sitios publicados",
    lineaEscritorio: "Línea Escritorio, apps con pruebas",
    estacion: "Estación",
    estados: { "en-linea": "En línea", "solo-codigo": "Solo código" },
    abrirSitio: "Abrir sitio",
    verRepo: "Ver código",
    ficticio: "Negocio ficticio, hecho para el portafolio.",
    siguiente: "Siguiente",
    anterior: "Anterior",
    capturaDe: "Captura de",
    serviciosTitulo: "En qué te puedo ayudar",
    remoto: "Trabajo de forma remota, desde cualquier lugar.",
    iaTitulo: "Cómo trabajo con IA",
    iaTexto:
      "Pongo varios agentes de IA a trabajar al mismo tiempo: uno en el código, otro en las pruebas, otro revisando. Yo planeo, reviso cada cambio y decido qué se queda.",
    iaPasos: {
      inicio: "Planifico y divido el trabajo",
      codigo: "Código",
      pruebas: "Pruebas",
      revision: "Revisión",
      agente: "Agente de IA",
      fin: "Verifico y decido qué se queda",
    },
    iaPrincipios: ["Doy contexto", "Divido el trabajo", "Verifico todo", "Cuido lo publicado"],
    saberTitulo: "Lo que sé hacer",
    formacionTitulo: "Formación",
    contactoTitulo: "¿Tienes un proyecto en mente?",
    firma: "Cada mensaje lo leo y lo respondo yo.",
    contactoTexto:
      "Cuéntame qué necesitas y lo hablamos. Si buscas talento para tu equipo, abre cualquier repositorio: todo el código está ahí.",
    abrirGmail: "Abrir en Gmail",
    usarApp: "Usar mi app de correo",
    copiar: "Copiar correo",
    copiado: "Correo copiado",
    copiarError: "No se pudo copiar. Selecciona el correo y cópialo a mano.",
    pie: "Contraluz y Páramo son negocios ficticios, hechos como piezas de portafolio.",
    abreNueva: "(abre en otra pestaña)",
  },
  en: {
    titulo: "Santiago Angarita · Websites and desktop apps",
    descripcion:
      "Portfolio of Santiago Angarita: live websites and Java desktop apps with automated tests. Available for remote work.",
    saltar: "Skip to content",
    nav: { proyectos: "Projects", servicios: "Services", ia: "How I work", contacto: "Contact" },
    tengoProyecto: "I have a project",
    leyendaWeb: "live sites",
    leyendaEscritorio: "tested apps",
    otroIdioma: { etiqueta: "Español", corto: "ES", href: "/", lang: "es" },
    navEtiqueta: "Main",
    entrada:
      "Systems Engineering student. I build websites and desktop apps, and everything you see here is live.",
    verCodigo: "See my code",
    mapaTitulo: (n) => `${palabras.en[n] ?? n} projects on two lines`,
    mapaAyuda: "Pick a station to see the project.",
    lineaWeb: "Web line, live sites",
    lineaEscritorio: "Desktop line, tested apps",
    estacion: "Station",
    estados: { "en-linea": "Live", "solo-codigo": "Code only" },
    abrirSitio: "Open site",
    verRepo: "View code",
    ficticio: "A fictional business, made for the portfolio.",
    siguiente: "Next",
    anterior: "Previous",
    capturaDe: "Screenshot of",
    serviciosTitulo: "How I can help",
    remoto: "I work remotely, from anywhere.",
    iaTitulo: "How I work with AI",
    iaTexto:
      "I put several AI agents to work at the same time: one on the code, one on the tests, one reviewing. I plan, review every change and decide what stays.",
    iaPasos: {
      inicio: "I plan and split the work",
      codigo: "Code",
      pruebas: "Tests",
      revision: "Review",
      agente: "AI agent",
      fin: "I verify and decide what stays",
    },
    iaPrincipios: ["Give context", "Split the work", "Verify everything", "Protect what is live"],
    saberTitulo: "What I know",
    formacionTitulo: "Education",
    contactoTitulo: "Have a project in mind?",
    firma: "I read and answer every message myself.",
    contactoTexto:
      "Tell me what you need and we will talk it through. If you are hiring, open any repository: all the code is there.",
    abrirGmail: "Open in Gmail",
    usarApp: "Use my mail app",
    copiar: "Copy email",
    copiado: "Email copied",
    copiarError: "Could not copy. Select the address and copy it by hand.",
    pie: "Contraluz and Páramo are fictional businesses, made as portfolio pieces.",
    abreNueva: "(opens in a new tab)",
  },
};
