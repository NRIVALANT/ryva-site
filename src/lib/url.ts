/**
 * URL publique du site, sans slash final. Tant qu'aucun domaine n'existe, localhost sert hors production ;
 * le garde-fou (scripts/check-content.mjs) bloque la production si NEXT_PUBLIC_SITE_URL manque.
 */
export function urlSite(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, "");
}
