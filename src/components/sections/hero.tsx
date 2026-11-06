import { hero } from "@/content/hero";
import { LienBouton } from "@/components/ui/lien-bouton";
import { VisuelProvisoire } from "@/components/ui/visuel-provisoire";

/**
 * Hero (CADRAGE §4.1). Le visuel plein écran est un VisuelProvisoire tant qu'aucune photo n'existe ;
 * quand elle existera, c'est le seul visuel du site à recevoir `priority`.
 * L'overlay reste à plus de 70 % derrière le texte : 4,5:1 exige 61 % sur une photo blanche (pire cas).
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-titre"
      className="relative isolate flex min-h-[calc(100svh-4rem)] items-end overflow-hidden"
    >
      <VisuelProvisoire remplir className="-z-20" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-fond from-35% via-fond/85 via-75% to-fond/30"
      />
      <div className="mx-auto w-full max-w-7xl px-4 pb-24 pt-32 sm:px-6 md:pb-16">
        <p className="texte-devise text-cedre-texte">{hero.surtitre}</p>
        <h1
          id="hero-titre"
          className="mt-4 max-w-4xl text-balance texte-affiche text-texte"
        >
          {hero.titre}
        </h1>
        <p className="mt-6 max-w-2xl texte-sous-titre text-texte">
          {hero.sousTitre}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <LienBouton href={hero.ctaPrincipal.href}>
            {hero.ctaPrincipal.libelle}
          </LienBouton>
          <LienBouton href={hero.ctaSecondaire.href} variante="secondaire">
            {hero.ctaSecondaire.libelle}
          </LienBouton>
        </div>
      </div>
    </section>
  );
}
