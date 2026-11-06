import { Carte } from "@/components/ui/carte";
import { Section } from "@/components/ui/section";
import { ancres, site } from "@/content/site";
import { technologieDetaillee } from "@/content/technologies";

/** Cadrage §4.7 : six blocs en grille, chacun avec un chiffre ou un mot-clé en gros. */
export function TechnologieDetaillee() {
  return (
    <Section id={ancres.technologieDetail} titre={site.titres.technologieDetail}>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {technologieDetaillee.map((bloc) => (
          <li key={bloc.accroche} className="revele">
            <Carte className="flex h-full flex-col gap-4">
              <p className="font-mono texte-titre-vitrine text-balance break-words text-cedre-texte">
                {bloc.accroche}
              </p>
              <h3 className="texte-corps-vitrine font-semibold text-texte">{bloc.titre}</h3>
              <p className="texte-corps-vitrine text-texte-secondaire">{bloc.contenu}</p>
            </Carte>
          </li>
        ))}
      </ul>
    </Section>
  );
}
