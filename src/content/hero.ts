import { ancres, site, type LienNavigation } from "./site";

export interface HeroContent {
  surtitre: string;
  titre: string;
  sousTitre: string;
  ctaPrincipal: LienNavigation;
  ctaSecondaire: LienNavigation;
}

/** Cadrage §4.1. */
export const hero: HeroContent = {
  surtitre: "CABINE RYVA",
  titre: "La récupération par vibrations soniques et chaleur infrarouge",
  sousTitre:
    "Des séances de 10 minutes combinant vibrations soniques et chaleur infrarouge réglable jusqu'à 60 °C. Conçue pour les cliniques, les salles de sport et la récupération quotidienne.",
  ctaPrincipal: site.ctaDemo,
  ctaSecondaire: {
    libelle: "Découvrir la technologie",
    href: `#${ancres.technologies}`,
  },
};
