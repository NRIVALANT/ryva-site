import { CtaSection } from "@/components/ui/cta-section";
import { Section } from "@/components/ui/section";
import { ancres, site } from "@/content/site";
import { specs } from "@/content/specs";
import { ui } from "@/content/ui";

/**
 * Cadrage §4.10 : un vrai tableau. Libellé en en-tête de ligne, valeur en Geist Mono
 * (chiffres tabulaires). Deux colonnes seulement : il tient à 360 px sans défilement horizontal.
 */
export function Caracteristiques() {
  return (
    <Section id={ancres.caracteristiques} titre={site.titres.caracteristiques}>
      <table className="revele w-full max-w-4xl border-collapse text-left">
        <caption className="sr-only">{site.titres.caracteristiques}</caption>
        <thead className="sr-only">
          <tr>
            <th scope="col">{ui.tableau.colonneLibelle}</th>
            <th scope="col">{ui.tableau.colonneValeur}</th>
          </tr>
        </thead>
        <tbody>
          {specs.map((ligne) => (
            <tr key={ligne.libelle} className="border-t border-bordure">
              <th
                scope="row"
                className="w-1/2 py-4 pr-4 align-top texte-corps font-normal text-texte-secondaire sm:w-2/5"
              >
                {ligne.libelle}
              </th>
              <td className="py-4 align-top font-mono texte-corps-vitrine tabular-nums text-texte">
                {ligne.valeur}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <CtaSection />
    </Section>
  );
}
