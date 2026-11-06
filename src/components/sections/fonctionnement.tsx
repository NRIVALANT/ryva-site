import { Section } from "@/components/ui/section";
import { ancres, site } from "@/content/site";
import { fonctionnement } from "@/content/technologies";

/** Cadrage §4.4 : triptyque « Comment ça fonctionne ». */
export function Fonctionnement() {
  return (
    <Section id={ancres.fonctionnement} titre={site.titres.fonctionnement} fond="surface">
      <ul className="grid gap-10 md:grid-cols-3 md:gap-8">
        {fonctionnement.map((point) => (
          <li key={point.titre} className="revele border-t border-bordure pt-6">
            <h3 className="texte-sous-titre font-semibold text-texte">{point.titre}</h3>
            <p className="mt-4 texte-corps-vitrine text-texte-secondaire">{point.texte}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
