/**
 * Logos de public/brand/. Le mot RYVA est un dessin : jamais retapé, jamais recoloré.
 * Dimensions = dimensions réelles des fichiers (pour next/image, sans décalage de mise en page).
 */
export type FondUsage = "sombre" | "clair";

export interface Logo {
  src: string;
  largeur: number;
  hauteur: number;
  /** Fond sur lequel ce fichier est lisible. */
  fond: FondUsage;
  /** Précision d'usage. */
  usage: string;
}

export const logos = {
  /** Vol argent + mot blanc, transparent : le logotype du site (fond sombre). */
  logotypeBlanc: {
    src: "/brand/ryva-logotype-blanc.png",
    largeur: 950,
    hauteur: 186,
    fond: "sombre",
    usage: "Header et footer du site. Hauteur minimale : 2 rem.",
  },
  /** Mot noir : réservé aux fonds clairs, donc inutilisé sur le site sombre. */
  logotype: {
    src: "/brand/ryva-logotype.png",
    largeur: 950,
    hauteur: 186,
    fond: "clair",
    usage: "Fonds clairs uniquement.",
  },
  /** Le vol seul, pour les très petites tailles. */
  vol: {
    src: "/brand/ryva-vol.png",
    largeur: 363,
    hauteur: 216,
    fond: "sombre",
    usage: "Seul, sous 1,5 rem de haut.",
  },
  /** Carré noir à angles arrondis. Fichier RGB sans canal alpha : les coins sont blancs. */
  icone: {
    src: "/brand/ryva-icone.png",
    largeur: 471,
    hauteur: 435,
    fond: "sombre",
    usage: "Favicon et icône d'application (session 4).",
  },
} as const satisfies Record<string, Logo>;
