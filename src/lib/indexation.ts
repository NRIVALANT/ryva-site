/**
 * Le site est en noindex tant que SITE_INDEXABLE ne vaut pas exactement "true".
 * Valeur à poser uniquement en production, le jour de la mise en ligne.
 */
export function estIndexable(): boolean {
  return process.env.SITE_INDEXABLE === "true";
}
