# Portafolio de Santiago Angarita

Publicado en **https://santiago-angarita.netlify.app** (inglés en `/en/`).

Sitio personal en español (`/`) e inglés (`/en/`). Muestra mis proyectos como un mapa de transporte: la línea **Web** (azul) lleva a los sitios publicados y la línea **Escritorio** (negra) a las apps en Java con pruebas. Al elegir una estación se ilumina el tramo de la línea y abajo se abre su andén con la captura, los datos y los enlaces.

## Cómo correrlo

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera dist/
npm run preview  # sirve dist/
```

Para publicar un cambio (la carpeta ya está enlazada al proyecto `santiago-angarita` de Netlify):

```bash
npm run build && netlify deploy --prod --dir dist --no-build
```

## Cómo está hecho

- **Vite, HTML, CSS y JavaScript sin frameworks.** El HTML de cada idioma se arma en el build desde `src/contenido.js` con `src/plantilla.js`, así que la página llega completa y funciona sin JavaScript: cada estación es un enlace a su andén.
- **Un solo lugar para el texto:** `src/contenido.js`. Ahí están los proyectos, los servicios, lo que sé hacer y todos los textos de la interfaz en los dos idiomas. Para agregar un proyecto basta con añadirlo a la lista; el mapa reparte las columnas solo.
- **Capturas:** las de los sitios se tomaron de las páginas publicadas y las de las apps salen de las tarjetas del perfil de GitHub. Los originales están en `fuentes/capturas/`; `npm run capturas` los convierte en WebP de 720 y 1280 px dentro de `public/capturas/`. Si un proyecto todavía no tiene captura, el andén muestra una placa con su nombre.
- **Tipografía:** Overpass (variable) y Overpass Mono, autoalojadas con Fontsource.
- **Íconos:** Phosphor, incrustados como SVG en el build.
- **Seguridad:** `netlify.toml` define una CSP estricta (solo recursos del propio sitio), HTTPS y demás cabeceras. No hay scripts ni atributos `style` en línea: la CSP los bloquea. Por eso las posiciones del mapa se escriben como `data-col`, `data-n`, etc., y `principal.css` las convierte en variables (alcanza para 12 estaciones por línea).
- **Accesibilidad:** contraste AA en modo claro y oscuro, todo se usa con teclado, la estación elegida se marca con `aria-current` y se anuncia al lector de pantalla, y con «reducir movimiento» las líneas no se dibujan ni se desplazan.

## Probar casos difíciles

En desarrollo, `http://localhost:5173/?datos=peor` arma la página con datos de peor caso (`src/contenido-peor.js`): nombres muy largos, nueve estaciones en una línea, un proyecto sin enlaces, otro sin captura y un correo larguísimo. Un selector abajo cambia entre los datos reales y los de peor caso. Nada de esto llega al build.

## Honestidad

Contraluz y Páramo son negocios ficticios, hechos como piezas de portafolio, y el sitio lo dice. Las cifras (pruebas, Lighthouse, peso de imágenes) salen de los README y `CAMBIOS.md` de cada proyecto.
