import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import { logos } from "@/lib/marque";
import { LienBouton } from "@/components/ui/lien-bouton";
import { MenuMobile } from "./menu-mobile";

/**
 * Header sticky. Opaque par défaut ; translucide uniquement si le navigateur sait flouter l'arrière-plan,
 * ce qui garantit le contraste du texte (texte sur fond : 17:1, et au pire plus de 10:1 à 85 % sur blanc).
 * Le CTA du header apparaît dès 768 px ; en dessous, la barre fixe du bas fait office de CTA permanent.
 */
export function Header() {
  const logo = logos.logotypeBlanc;
  return (
    <header className="sticky top-0 z-40 border-b border-bordure bg-fond supports-[backdrop-filter]:bg-fond/85 supports-[backdrop-filter]:backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="inline-flex min-h-11 shrink-0 items-center">
          <Image
            src={logo.src}
            width={logo.largeur}
            height={logo.hauteur}
            alt={ui.header.ariaAccueil}
            className="h-8 w-auto"
          />
        </Link>

        <nav aria-label={ui.header.ariaNavigation} className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {site.navigation.map((lien) => (
              <li key={lien.href}>
                <a
                  href={lien.href}
                  className="inline-flex min-h-11 items-center texte-corps text-texte transition-colors hover:text-action"
                >
                  {lien.libelle}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <MenuMobile
            liens={site.navigation}
            libelle={ui.header.menu.libelle}
            ariaOuvrir={ui.header.menu.ouvrir}
            ariaFermer={ui.header.menu.fermer}
            ariaNavigation={ui.header.ariaNavigation}
          />
          <div className="hidden md:block">
            <LienBouton href={site.ctaDemo.href}>{site.ctaDemo.libelle}</LienBouton>
          </div>
        </div>
      </div>
    </header>
  );
}
