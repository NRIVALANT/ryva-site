import Link from "next/link";
import type { ReactNode } from "react";

type Variante = "primaire" | "secondaire";

interface LienBoutonProps {
  href: string;
  variante?: Variante;
  className?: string;
  children: ReactNode;
}

// Primaire : action avec texte marque-noir (6,52:1 ; survol action-forte 4,72:1). Jamais de texte blanc sur l'infrarouge.
const variantes: Record<Variante, string> = {
  primaire: "bg-action text-marque-noir hover:bg-action-forte",
  secondaire:
    "border border-texte-secondaire text-texte hover:bg-surface",
};

/** Lien présenté comme un bouton. Hauteur 2,75 rem : cible tactile minimale de la charte. */
export function LienBouton({
  href,
  variante = "primaire",
  className = "",
  children,
}: LienBoutonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center justify-center rounded-md px-6 texte-corps-vitrine font-medium transition-colors ${variantes[variante]} ${className}`}
    >
      {children}
    </Link>
  );
}
