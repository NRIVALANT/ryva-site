import { site } from "@/content/site";
import { LienBouton } from "./lien-bouton";

/** Rappel du CTA principal en fin de section : un seul bouton, aucun texte ajouté. */
export function CtaSection() {
  return (
    <div className="mt-12 flex justify-center md:mt-16">
      <LienBouton href={site.ctaDemo.href}>{site.ctaDemo.libelle}</LienBouton>
    </div>
  );
}
