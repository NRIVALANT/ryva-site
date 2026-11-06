import Image from "next/image";
import Link from "next/link";
import { benefits } from "@/content/benefits";
import { legal } from "@/content/legal";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import { logos } from "@/lib/marque";

/** Footer minimal : logotype, coordonnées, liens légaux et rappels (CADRAGE §4.13). */
export function Footer() {
  const logo = logos.logotypeBlanc;
  return (
    <footer className="border-t border-bordure bg-surface">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <Image
            src={logo.src}
            width={logo.largeur}
            height={logo.hauteur}
            alt={site.nom}
            className="h-8 w-auto self-start"
          />
          <address className="flex flex-col gap-1 not-italic texte-corps text-texte-secondaire">
            <span>{site.coordonnees.email}</span>
            <span>{site.coordonnees.telephone}</span>
            <span>{site.coordonnees.adresse}</span>
          </address>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="texte-corps font-semibold text-texte">
            {ui.footer.titreRappels}
          </h2>
          <ul className="flex flex-col gap-2 texte-corps text-texte-secondaire">
            <li>{legal.rappelContreIndications}</li>
            <li>{legal.dispositifMedical}</li>
            <li>{benefits.reserve}</li>
          </ul>
        </div>

        <nav
          aria-label={ui.footer.ariaLiensLegaux}
          className="border-t border-bordure pt-6 md:col-span-2"
        >
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legal.liens.map((lien) => (
              <li key={lien.href}>
                <Link
                  href={lien.href}
                  className="inline-flex min-h-11 items-center texte-corps text-texte underline underline-offset-4 hover:text-action"
                >
                  {lien.libelle}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
