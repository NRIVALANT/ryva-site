import type { PageLegale as Contenu } from "@/content/legal";

/** Gabarit commun des pages légales : une h1, une h2 par rubrique. */
export function PageLegale({ titre, rubriques }: Contenu) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 break-words sm:px-6 md:py-20">
      <h1 className="mb-10 texte-titre-vitrine text-balance text-texte">{titre}</h1>
      <div className="flex flex-col gap-10">
        {rubriques.map((rubrique) => (
          <section key={rubrique.titre} className="flex flex-col gap-4">
            <h2 className="texte-sous-titre font-semibold text-texte">{rubrique.titre}</h2>
            {rubrique.paragraphes?.map((texte) => (
              <p key={texte} className="texte-corps-vitrine text-texte">
                {texte}
              </p>
            ))}
            {rubrique.donnees && (
              <dl className="flex flex-col gap-3 texte-corps-vitrine">
                {rubrique.donnees.map(({ libelle, valeur }) => (
                  <div key={libelle}>
                    <dt className="text-texte-secondaire">{libelle}</dt>
                    <dd className="text-texte">{valeur}</dd>
                  </div>
                ))}
              </dl>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
