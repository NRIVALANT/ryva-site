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

/** Ordre des sections = ordre du cadrage §4. Le formulaire (§4.12) arrive en session 3. */
export default function Home() {
  return (
    <>
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
    </>
  );
}
