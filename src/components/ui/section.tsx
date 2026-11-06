import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  titre: string;
  /** Fond de la section ; les cartes s'adaptent automatiquement pour rester distinctes. */
  fond?: "fond" | "surface";
  /** Titre lu par les lecteurs d'écran mais non affiché (ex. bandeau de chiffres). */
  titreMasque?: boolean;
  children: ReactNode;
}

/**
 * Enveloppe commune des sections de la landing : ancre, titre h2, rythme vertical, fond alterné.
 * Pour changer l'espacement ou l'habillage de toutes les sections, c'est ici.
 */
export function Section({
  id,
  titre,
  fond = "fond",
  titreMasque = false,
  children,
}: SectionProps) {
  const idTitre = `${id}-titre`;
  return (
    <section
      id={id}
      aria-labelledby={idTitre}
      data-fond={fond}
      className={`group/section border-t border-bordure py-16 md:py-24 ${
        fond === "surface" ? "bg-surface" : "bg-fond"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {titreMasque ? (
          <h2 id={idTitre} className="sr-only">
            {titre}
          </h2>
        ) : (
          <header className="revele mb-10 flex max-w-3xl flex-col gap-4 md:mb-14">
            <p aria-hidden="true" className="repere" />
            <h2 id={idTitre} className="texte-titre-vitrine text-balance text-texte">
              {titre}
            </h2>
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
