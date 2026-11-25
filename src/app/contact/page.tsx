import { FormulaireContact } from "@/components/contact/formulaire-contact";
import { contact, typesStructure } from "@/content/contact";
import { pages } from "@/content/seo";
import { ancres } from "@/content/site";
import { metadonnees } from "@/lib/metadonnees";

export const metadata = metadonnees(pages.contact);

/** Page /contact : le même formulaire que la section de la landing. Pas de barre CTA mobile ici. */
export default function PageContact() {
  return (
    <div id={ancres.contact} data-sans-cta-mobile className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-20">
      <h1 className="mb-10 texte-titre-vitrine text-balance text-texte">{contact.titre}</h1>
      <FormulaireContact textes={contact} structures={typesStructure} />
    </div>
  );
}
