import type { Metadata } from "next";
import { LienBouton } from "@/components/ui/lien-bouton";
import { site } from "@/content/site";
import { ui } from "@/content/ui";

export const metadata: Metadata = {
  title: `${ui.pageIntrouvable.titre} | ${site.nom}`,
};

/** Page 404 en français : celle de Next par défaut est en anglais. Next la marque déjà en noindex. */
export default function PageIntrouvable() {
  const { titre, texte, retour } = ui.pageIntrouvable;
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-start gap-6 px-4 py-20 sm:px-6">
      <h1 className="texte-titre-vitrine text-balance text-texte">{titre}</h1>
      <p className="texte-corps-vitrine text-texte-secondaire">{texte}</p>
      <LienBouton href="/">{retour}</LienBouton>
    </div>
  );
}
