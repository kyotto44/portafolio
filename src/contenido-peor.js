// Datos de peor caso, solo para desarrollo: http://localhost:5182/?datos=peor
// Sirven para probar que el mapa y los andenes aguantan proyectos que todavía no existen:
// nombres largos, una línea con muchas estaciones, un proyecto sin enlaces y otro sin captura.
// Nunca se usan en el build.
import { proyectos as reales } from "./contenido.js";

const largo = {
  id: "contraluz",
  nombre: {
    es: "Sistema de información de talento humano de la Gobernación de Boyacá",
    en: "Human resources information system for the Boyacá regional government",
  },
  linea: "web",
  estado: "en-linea",
  url: "https://contraluz-bogota.netlify.app",
  repo: "https://github.com/kyotto44/contraluz",
  stack: "Vite · JavaScript · Netlify Functions · Supabase · PostgreSQL · Playwright",
  resumen: {
    es: "Plataforma para que las secretarías de la gobernación registren vacaciones, permisos, incapacidades, licencias de maternidad y paternidad, comisiones de servicio y retiros, con reportes mensuales automáticos para la oficina de talento humano.",
    en: "A platform where every department of the regional government records leave, permits, sick leave, maternity and paternity leave, official trips and retirements, with automatic monthly reports for the human resources office.",
  },
  datos: {
    es: ["Interoperabilidad con el Sistema de Información y Gestión del Empleo Público (SIGEP II)", "1.284 servidores públicos", "1 prueba"],
    en: ["Interoperability with the national public employment information system (SIGEP II)", "1,284 public servants", "1 test"],
  },
};

const corto = { ...reales[1], id: "paramo", nombre: "Jo" };
const sinEnlaces = { ...reales[2], id: "templvm", url: undefined, repo: undefined, estado: "solo-codigo" };
const sinCaptura = { ...reales[3], id: "no-existe", nombre: "Sin captura todavía" };

const relleno = ["matchpoint", "tactica", "pitlane", "templvm", "paramo"].map((id, i) => ({
  ...reales.find((p) => p.id === id),
  id: `${id}-extra-${i}`,
  nombre: { es: `Proyecto número ${i + 7} con nombre mediano`, en: `Project number ${i + 7} with a medium name` },
}));

export const proyectosPeor = [largo, corto, sinEnlaces, sinCaptura, ...relleno, ...reales.filter((p) => p.linea === "escritorio")];
export const correoPeor = "bartholomew.fitzgerald@northwind-industries-holdings.example.com";
