import { ui } from "@/content/ui";

interface VisuelProvisoireProps {
  /** Largeur du visuel attendu, en unités relatives (ex. 16). */
  largeur: number;
  /** Hauteur du visuel attendu, en unités relatives (ex. 9). */
  hauteur: number;
  className?: string;
}

/**
 * Emplacement réservé tant que la photo n'existe pas.
 * Les proportions fixes réservent la place : aucun décalage de mise en page.
 * Détecté par scripts/check-content.mjs : bloque le build de production.
 */
export function VisuelProvisoire({
  largeur,
  hauteur,
  className = "",
}: VisuelProvisoireProps) {
  return (
    <div
      role="img"
      aria-label={ui.visuelProvisoire.libelle}
      style={{ aspectRatio: `${largeur} / ${hauteur}` }}
      className={`flex w-full items-center justify-center border border-dashed border-current/30 bg-current/5 text-sm opacity-80 ${className}`}
    >
      {ui.visuelProvisoire.libelle}
    </div>
  );
}
