import Image from "next/image";
import { CtaSection } from "@/components/ui/cta-section";
import { Section } from "@/components/ui/section";
import { ancres, site } from "@/content/site";
import { technologie } from "@/content/technologies";

/** Cadrage §4.3, §4.4 et §4.7 : une photo et un texte par technologie, en alternance. */
export function Technologies() {
  return (
    <Section id={ancres.technologies} titre={site.titres.technologies}>
      <p className="revele -mt-4 mb-12 max-w-3xl texte-sous-titre text-texte md:-mt-8 md:mb-20">
        {technologie.introduction}
      </p>
      <ul className="flex flex-col gap-16 md:gap-24">
        {technologie.blocs.map((bloc) => (
          <li key={bloc.titre} className="revele group/bloc grid items-center gap-6 md:grid-cols-2 md:gap-12">
            <Image
              src={bloc.visuel.src}
              width={bloc.visuel.largeur}
              height={bloc.visuel.hauteur}
              alt={bloc.visuel.alt}
              sizes="(min-width: 80rem) 36rem, (min-width: 48rem) 45vw, 100vw"
              className="aspect-4/3 w-full rounded-lg border border-bordure object-cover md:group-even/bloc:order-last"
            />
            <div className="flex flex-col gap-4">
              <p className="font-mono texte-devise text-cedre-texte">{bloc.accroche}</p>
              <h3 className="texte-titre-vitrine text-balance text-texte">{bloc.titre}</h3>
              <p className="max-w-xl texte-corps-vitrine text-texte-secondaire">{bloc.texte}</p>
            </div>
          </li>
        ))}
      </ul>
      <CtaSection />
    </Section>
  );
}
