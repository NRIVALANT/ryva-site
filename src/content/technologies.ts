import { visuels, type Visuel } from "./visuels";

export interface BlocTechnologie {
  accroche: string;
  titre: string;
  texte: string;
  visuel: Visuel;
}

export interface TechnologieContent {
  introduction: string;
  blocs: BlocTechnologie[];
}

/** Cadrage §4.3, §4.4 et §4.7 réunis en une section (session 6). Allégations attribuées. */
export const technologie: TechnologieContent = {
  introduction:
    "Selon la marque, les vibrations soniques agissent en profondeur sur les muscles tandis que la chaleur infrarouge accompagne la détente.",
  blocs: [
    {
      accroche: "SONIC PULSE CORE",
      titre: "Vibrations soniques",
      texte:
        "Une technologie de vibration brevetée, conçue pour stimuler les muscles à différentes fréquences. L'intensité et la fréquence se règlent selon la zone du corps et l'objectif de la séance.",
      visuel: visuels.assise,
    },
    {
      accroche: "GRAPHÈNE · CÉRAMIQUE · INFRAROUGES",
      titre: "Chaleur infrarouge",
      texte:
        "Une combinaison de graphène, de céramique et d'éléments chauffants infrarouges destinée à diffuser une chaleur enveloppante, réglable jusqu'à 60 °C.",
      visuel: visuels.chaleur,
    },
    {
      accroche: "CÈDRE ROUGE CANADIEN",
      titre: "Construction haut de gamme",
      texte:
        "Un bois présenté pour sa résistance et son aspect haut de gamme. Le format compact fonctionne sur une prise domestique de 10 A.",
      visuel: visuels.cedre,
    },
  ],
};
