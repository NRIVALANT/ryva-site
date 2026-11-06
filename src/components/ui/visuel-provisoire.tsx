import { ui } from "@/content/ui";

interface ProportionsProps {
  /** Largeur du visuel attendu, en unités relatives (ex. 16). */
  largeur: number;
  /** Hauteur du visuel attendu, en unités relatives (ex. 9). */
  hauteur: number;
  remplir?: never;
}

interface RemplirProps {
  /** Remplit son parent (positionné) : le parent réserve la place. */
  remplir: true;
  largeur?: never;
  hauteur?: never;
}

type VisuelProvisoireProps = (ProportionsProps | RemplirProps) & {
  className?: string;
};

/**
 * Emplacement réservé tant que la photo n'existe pas.
 * Soit des proportions fixes (aspect-ratio), soit le remplissage d'un parent de taille fixe :
 * dans les deux cas la place est réservée, sans décalage de mise en page.
 * Détecté par scripts/check-content.mjs : bloque le build de production.
 */
export function VisuelProvisoire({
  largeur,
  hauteur,
  remplir,
  className = "",
}: VisuelProvisoireProps) {
  return (
    <div
      role="img"
      aria-label={ui.visuelProvisoire.libelle}
      style={remplir ? undefined : { aspectRatio: `${largeur} / ${hauteur}` }}
      className={`flex items-center justify-center border border-dashed border-texte-secondaire bg-surface texte-corps text-texte-secondaire ${
        remplir ? "absolute inset-0" : "w-full"
      } ${className}`}
    >
      {ui.visuelProvisoire.libelle}
    </div>
  );
}
