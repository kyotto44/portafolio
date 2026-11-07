// Convierte las capturas de fuentes/capturas/ en WebP a dos anchos para el sitio.
// Las de los sitios se tomaron con Edge sin interfaz a 1440 × 900 desde las páginas
// publicadas; las de las apps salen de las tarjetas del README de kyotto44.
// Uso: npm run capturas
import { mkdir, readdir } from "node:fs/promises";
import { join, parse } from "node:path";
import sharp from "sharp";

const origen = join(import.meta.dirname, "..", "fuentes", "capturas");
const destino = join(import.meta.dirname, "..", "public", "capturas");
const anchos = [720, 1280];

await mkdir(destino, { recursive: true });

for (const archivo of await readdir(origen)) {
  const { name, ext } = parse(archivo);
  if (![".png", ".webp", ".jpg"].includes(ext)) continue;
  // "sanrafa-1" pasa a "sanrafa": el número solo distinguía la imagen dentro del SVG.
  const nombre = name.replace(/-\d+$/, "");
  const imagen = sharp(join(origen, archivo));
  const { width } = await imagen.metadata();

  for (const ancho of anchos) {
    // Nunca se agranda una imagen: si la fuente es más pequeña, se usa su ancho real.
    const final = Math.min(ancho, width);
    await imagen
      .clone()
      .resize({ width: final, height: Math.round((final * 10) / 16), fit: "cover", position: "top" })
      .webp({ quality: 78, effort: 6 })
      .toFile(join(destino, `${nombre}-${ancho}.webp`));
  }
  console.log(`${archivo} → ${nombre}-{${anchos.join(",")}}.webp`);
}
