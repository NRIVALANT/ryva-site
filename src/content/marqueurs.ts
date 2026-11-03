/**
 * Marqueurs de contenu manquant ou à valider.
 * Détectés par scripts/check-content.mjs : ils bloquent le build de production.
 */

/** Donnée absente du cadrage : à fournir. */
export const A_COMPLETER = (description: string): string =>
  `[À COMPLÉTER] ${description}`;

/** Texte rédigé mais à faire valider avant publication (juridique, produit). */
export const A_VERIFIER = (texte: string): string => `[À VÉRIFIER] ${texte}`;
