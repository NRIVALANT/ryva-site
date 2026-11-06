import { ChevronDown } from "lucide-react";
import { CtaSection } from "@/components/ui/cta-section";
import { Section } from "@/components/ui/section";
import { faq } from "@/content/faq";
import { ancres, site } from "@/content/site";

/**
 * Cadrage §4.11 : accordéon en éléments <details> natifs, sans JavaScript : clavier, lecteurs d'écran
 * et recherche dans la page fonctionnent. L'attribut name n'en laisse qu'un ouvert à la fois.
 */
export function Faq() {
  return (
    <Section id={ancres.faq} titre={site.titres.faq} fond="surface">
      <div className="revele max-w-3xl border-b border-bordure">
        {faq.map((entree) => (
          <details key={entree.question} name="faq" className="accordeon group border-t border-bordure">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-5 texte-corps-vitrine font-medium text-texte marker:content-none hover:text-action [&::-webkit-details-marker]:hidden">
              {entree.question}
              <ChevronDown
                aria-hidden="true"
                className="size-5 shrink-0 transition-transform group-open:rotate-180"
              />
            </summary>
            <p className="pb-6 texte-corps-vitrine text-texte-secondaire">{entree.reponse}</p>
          </details>
        ))}
      </div>
      <CtaSection />
    </Section>
  );
}
