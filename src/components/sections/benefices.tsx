import { Carte } from "@/components/ui/carte";
import { Section } from "@/components/ui/section";
import { benefits } from "@/content/benefits";
import { ancres, site } from "@/content/site";

/**
 * Cadrage §4.6, section à risque juridique : allégations attribuées à la marque,
 * mention de réserve obligatoire et lisible en pied de section (jamais en petit gris).
 */
export function Benefices() {
  return (
    <Section id={ancres.benefices} titre={site.titres.benefices} fond="surface">
      <ul className="grid gap-6 md:grid-cols-3">
        {benefits.liste.map((benefice) => (
          <li key={benefice.titre} className="revele">
            <Carte className="h-full">
              <h3 className="texte-sous-titre font-semibold text-texte">{benefice.titre}</h3>
              <p className="mt-4 texte-corps-vitrine text-texte-secondaire">{benefice.texte}</p>
            </Carte>
          </li>
        ))}
      </ul>
      <p className="mt-10 max-w-3xl border-l-2 border-cedre-texte pl-4 texte-corps-vitrine text-texte">
        {benefits.reserve}
      </p>
    </Section>
  );
}
