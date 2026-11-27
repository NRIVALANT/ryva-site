/**
 * Photos publiées : recadrages sans marque tierce des originaux (CLAUDE.md, règle 7).
 * Les originaux vivent dans photos-source/, hors dépôt. Dimensions = dimensions réelles des fichiers.
 */
export interface Visuel {
  src: string;
  largeur: number;
  hauteur: number;
  alt: string;
}

export const visuels = {
  cabine: {
    src: "/images/cabine-profil.jpg",
    largeur: 1800,
    hauteur: 1337,
    alt: "La cabine en bois vue de profil, porte ouverte sur l'assise intérieure",
  },
  assise: {
    src: "/images/assise.jpg",
    largeur: 900,
    hauteur: 675,
    alt: "L'assise ajourée de la cabine vue du dessus",
  },
  chaleur: {
    src: "/images/chaleur-infrarouge.jpg",
    largeur: 900,
    hauteur: 999,
    alt: "Panneaux chauffants allumés sous l'assise, lueur rouge entre des lattes de bois",
  },
  cedre: {
    src: "/images/cedre.jpg",
    largeur: 900,
    hauteur: 675,
    alt: "Détail du bois de la porte, de sa barre et de sa fermeture",
  },
  devise: {
    src: "/images/devise.jpg",
    largeur: 1050,
    hauteur: 400,
    alt: "Recover . Perform . Repeat.",
  },
} as const satisfies Record<string, Visuel>;
