import { A_VERIFIER } from "./marqueurs";

export interface Technologie {
  titre: string;
  texte: string;
}

export interface PointFonctionnement {
  titre: string;
  texte: string;
}

export interface TechnologieDetaillee {
  accroche: string;
  titre: string;
  contenu: string;
}

/** Cadrage §4.3 : les trois technologies. */
export const technologies: Technologie[] = [
  {
    titre: "Vibrations soniques",
    texte:
      "Une technologie de vibration conçue pour stimuler les muscles et les cellules à différentes fréquences, permettant d'adapter la séance à différentes zones du corps.",
  },
  {
    titre: "Chaleur infrarouge",
    texte:
      "Une combinaison de graphène, de céramique et d'éléments chauffants infrarouges destinée à produire une chaleur profonde au niveau des muscles et des tissus.",
  },
  {
    titre: "Modulation des fréquences",
    texte:
      "Les fréquences de vibration peuvent être ajustées afin de cibler différentes zones du corps et différents objectifs de séance.",
  },
];

/** Cadrage §4.4 : le triptyque « Comment ça fonctionne ». */
export const fonctionnement: PointFonctionnement[] = [
  {
    titre: "Une action combinée",
    texte:
      "Les vibrations soniques sont présentées comme pénétrant profondément dans les tissus musculaires tandis que la chaleur infrarouge favorise la circulation et accompagne les processus de récupération.",
  },
  {
    titre: "Une fréquence adaptée",
    texte:
      "L'intensité et les fréquences peuvent être réglées selon la zone du corps et l'objectif de la séance.",
  },
  {
    titre: "Des séances rapides",
    texte: "Le système est conçu autour de séances courtes d'environ 10 minutes.",
  },
];

/** Cadrage §4.7 : technologie détaillée, six blocs. */
export const technologieDetaillee: TechnologieDetaillee[] = [
  {
    accroche: "SONIC PULSE CORE",
    // « brevetée » n'est publiable qu'une fois le brevet confirmé.
    titre: `Technologie de vibration ${A_VERIFIER("brevetée")}`,
    contenu:
      "Technologie de vibration sonique conçue pour stimuler les muscles et les cellules à différentes fréquences afin de permettre une action ciblée.",
  },
  {
    accroche: "GRAPHÈNE · CÉRAMIQUE · INFRAROUGES",
    titre: "Technologie de chaleur infrarouge",
    contenu:
      "Combinaison de graphène, de céramique et d'éléments chauffants infrarouges destinée à diffuser une chaleur profonde vers les muscles et les tissus.",
  },
  {
    accroche: "CÈDRE ROUGE CANADIEN",
    titre: "Construction haut de gamme",
    contenu:
      "Un bois présenté pour sa résistance, ses propriétés antimicrobiennes naturelles et son aspect haut de gamme.",
  },
  {
    accroche: "JUSQU'À 60 °C",
    titre: "Température réglable",
    contenu:
      "La température peut être réglée jusqu'à 60 °C afin de personnaliser la séance.",
  },
  {
    accroche: "10 A",
    titre: "Alimentation électrique standard",
    contenu:
      "Fonctionne sur une prise domestique de 10 A, ce qui facilite l'installation en maison, clinique ou espace professionnel.",
  },
  {
    accroche: "108 × 56 × 74 cm",
    titre: "Format compact",
    contenu:
      "Conçue pour s'installer dans différents environnements : domicile, clinique, salle de sport ou espace professionnel de récupération.",
  },
];
