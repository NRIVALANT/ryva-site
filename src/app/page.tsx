import { SectionContact } from "@/components/contact/section-contact";
import { Benefices } from "@/components/sections/benefices";
import { Caracteristiques } from "@/components/sections/caracteristiques";
import { ChiffresCles } from "@/components/sections/chiffres-cles";
import { Etapes } from "@/components/sections/etapes";
import { Faq } from "@/components/sections/faq";
import { Fonctionnement } from "@/components/sections/fonctionnement";
import { Hero } from "@/components/sections/hero";
import { PourQui } from "@/components/sections/pour-qui";
import { TechnologieDetaillee } from "@/components/sections/technologie-detaillee";
import { Technologies } from "@/components/sections/technologies";
import { DonneesStructurees } from "@/components/seo/donnees-structurees";
import { pages } from "@/content/seo";
import { metadonnees } from "@/lib/metadonnees";

export const metadata = metadonnees(pages.accueil);

/** Ordre des sections = ordre du cadrage §4. La conversion (§4.12) clôt la page. */
export default function Home() {
  return (
    <>
      <DonneesStructurees />
      <Hero />
      <ChiffresCles />
      <Technologies />
      <Fonctionnement />
      <Etapes />
      <Benefices />
      <TechnologieDetaillee />
      <PourQui />
      <Caracteristiques />
      <Faq />
      <SectionContact />
    </>
  );
}
