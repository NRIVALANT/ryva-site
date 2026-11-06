import { Carte } from "@/components/ui/carte";
import { Section } from "@/components/ui/section";
import { segments } from "@/content/segments";
import { ancres, site } from "@/content/site";

/** Cadrage §4.9 : quatre cartes segmentées, chacune avec son angle. */
export function PourQui() {
  return (
    <Section id={ancres.pourQui} titre={site.titres.pourQui} fond="surface">
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {segments.map((segment) => (
          <li key={segment.titre} className="revele">
            <Carte className="h-full">
              <h3 className="texte-sous-titre font-semibold text-texte">{segment.titre}</h3>
              <p className="mt-4 texte-corps-vitrine text-texte-secondaire">{segment.angle}</p>
            </Carte>
          </li>
        ))}
      </ul>
    </Section>
  );
}
