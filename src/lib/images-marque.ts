import { readFile } from "node:fs/promises";
import { join } from "node:path";
import tokens from "../../docs/tokens.json";

/** Couleur d'un jeton du thème sombre : pour les images générées, qui n'ont pas accès au CSS. */
export function jeton(nom: string): string {
  const trouve = tokens.color.tokens.find((t) => t.name === nom);
  if (!trouve) throw new Error(`Jeton inconnu : ${nom}`);
  return trouve.value.sombre;
}

/** Fichier de public/brand/ en data URL, tel quel : le logotype n'est ni redessiné ni recoloré. */
export async function imageMarque(src: string): Promise<string> {
  const contenu = await readFile(join(process.cwd(), "public", src));
  return `data:image/png;base64,${contenu.toString("base64")}`;
}
