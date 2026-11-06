import { Carte } from "@/components/ui/carte";
import { Section } from "@/components/ui/section";
import { VisuelProvisoire } from "@/components/ui/visuel-provisoire";
import { ancres, site } from "@/content/site";
import { technologies } from "@/content/technologies";

/** Cadrage §4.3 : trois blocs, chacun avec un visuel. */
export function Technologies() {
  return (
    <Section id={ancres.technologies} titre={site.titres.technologies}>
      <ul className="grid gap-6 md:grid-cols-3">
        {technologies.map((tech) => (
          <li key={tech.titre} className="revele">
            <Carte className="flex h-full flex-col gap-6">
              <VisuelProvisoire largeur={4} hauteur={3} className="rounded-md" />
              <h3 className="texte-sous-titre font-semibold text-texte">{tech.titre}</h3>
              <p className="texte-corps-vitrine text-texte-secondaire">{tech.texte}</p>
            </Carte>
          </li>
        ))}
      </ul>
    </Section>
  );
}
