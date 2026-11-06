import { CtaSection } from "@/components/ui/cta-section";
import { Section } from "@/components/ui/section";
import { ancres, site } from "@/content/site";
import { steps } from "@/content/steps";

/**
 * Cadrage §4.5 : liste ordonnée sémantique, numérotation 01 à 04.
 * Le trait vertical (utilitaire `jauge`) se remplit pendant le défilement ; plein par défaut.
 */
export function Etapes() {
  return (
    <Section id={ancres.etapes} titre={site.titres.etapes}>
      <ol className="jauge flex flex-col gap-12 [--jauge-decalage:1.75rem] md:gap-16 md:[--jauge-decalage:2.5rem]">
        {steps.map((etape) => (
          <li
            key={etape.numero}
            className="revele grid grid-cols-[3.5rem_1fr] gap-x-4 md:grid-cols-[5rem_1fr] md:gap-x-8"
          >
            <span className="relative flex justify-center self-start bg-fond py-1 font-mono texte-titre-vitrine text-cedre-texte">
              {etape.numero}
            </span>
            <div className="max-w-2xl">
              <h3 className="texte-sous-titre font-semibold text-texte">{etape.titre}</h3>
              <p className="mt-3 texte-corps-vitrine text-texte-secondaire">{etape.texte}</p>
            </div>
          </li>
        ))}
      </ol>
      <CtaSection />
    </Section>
  );
}
