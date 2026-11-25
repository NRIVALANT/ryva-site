// Permet à Node d'exécuter les sources TypeScript du projet dans les tests, sans dépendance :
// les imports sans extension (« ./schema ») sont résolus vers le fichier .ts correspondant.
import { register } from "node:module";

const crochets = `
export async function resolve(specifier, context, suivant) {
  if (specifier.startsWith(".") && !/\\.[cm]?[jt]sx?$/.test(specifier)) {
    try {
      return await suivant(specifier + ".ts", context);
    } catch {}
  }
  return suivant(specifier, context);
}
`;

register(`data:text/javascript,${encodeURIComponent(crochets)}`);
