import { hero } from "@/content/hero";
import { nomProduit } from "@/content/seo";
import { site } from "@/content/site";
import { logos } from "@/lib/marque";
import { urlSite } from "@/lib/url";

/**
 * JSON-LD Organization et Product : uniquement ce que le contenu établit.
 * Ni prix, ni note, ni avis, ni coordonnées tant qu'ils n'existent pas.
 */
export function DonneesStructurees() {
  const url = urlSite();
  const organisation = `${url}/#organisation`;
  const donnees = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organisation,
        name: site.nom,
        url: `${url}/`,
        logo: `${url}${logos.icone.src}`,
      },
      {
        "@type": "Product",
        name: nomProduit,
        description: hero.sousTitre,
        url: `${url}/`,
        brand: { "@id": organisation },
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      // « < » échappé : le contenu ne peut pas refermer la balise script.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees).replace(/</g, "\\u003c") }}
    />
  );
}
