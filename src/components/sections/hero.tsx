import Image from "next/image";
import { hero } from "@/content/hero";
import { visuels } from "@/content/visuels";
import { LienBouton } from "@/components/ui/lien-bouton";

/**
 * Hero (CADRAGE §4.1) : texte et photo en deux colonnes sur grand écran, photo en premier sur mobile.
 * `mix-blend-lighten` fond le noir du studio dans le fond du site. Seule image préchargée du site.
 * Sur mobile, le CTA principal est déjà dans la barre fixe du bas : on ne le répète pas ici.
 */
export function Hero() {
  const photo = visuels.cabine;
  return (
    <section aria-labelledby="hero-titre" className="bg-fond">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-4 py-8 sm:px-6 md:py-16 lg:min-h-[calc(100svh-4.75rem)] lg:grid-cols-[5fr_6fr] lg:gap-12">
        <Image
          src={photo.src}
          width={photo.largeur}
          height={photo.hauteur}
          alt={photo.alt}
          preload
          sizes="(min-width: 80rem) 42rem, (min-width: 64rem) 52vw, 100vw"
          className="h-auto w-full mix-blend-lighten lg:order-last"
        />
        <div>
          <p className="texte-devise text-cedre-texte">{hero.surtitre}</p>
          <h1 id="hero-titre" className="mt-4 text-balance texte-affiche text-texte">
            {hero.titre}
          </h1>
          <p className="mt-6 max-w-2xl texte-sous-titre text-texte">{hero.sousTitre}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <LienBouton href={hero.ctaPrincipal.href} className="max-md:hidden">
              {hero.ctaPrincipal.libelle}
            </LienBouton>
            <LienBouton href={hero.ctaSecondaire.href} variante="secondaire">
              {hero.ctaSecondaire.libelle}
            </LienBouton>
          </div>
        </div>
      </div>
    </section>
  );
}
