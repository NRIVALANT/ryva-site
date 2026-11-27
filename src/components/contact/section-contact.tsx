import { Section } from "@/components/ui/section";
import { contact, typesStructure } from "@/content/contact";
import { ancres } from "@/content/site";
import { FormulaireContact } from "./formulaire-contact";

/** Cadrage §4.12 : section de conversion en bas de la landing. Aucune animation sur le formulaire. */
export function SectionContact() {
  return (
    <Section id={ancres.contact} titre={contact.titre} colonnes>
      <div className="max-w-3xl">
        <FormulaireContact textes={contact} structures={typesStructure} />
      </div>
    </Section>
  );
}
