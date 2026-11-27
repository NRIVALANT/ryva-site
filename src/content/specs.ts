export interface Caracteristique {
  libelle: string;
  valeur: string;
}

/** Cadrage §4.10. Une caractéristique sans valeur connue n'est pas affichée. */
export const specs: Caracteristique[] = [
  { libelle: "Durée d'une séance", valeur: "10 minutes" },
  { libelle: "Température", valeur: "jusqu'à 60 °C, réglable" },
  { libelle: "Dimensions", valeur: "108 × 56 × 74 cm" },
  { libelle: "Alimentation", valeur: "10 A" },
  { libelle: "Construction", valeur: "cèdre rouge canadien" },
  { libelle: "Technologie de vibration", valeur: "Sonic Pulse Core" },
  { libelle: "Chauffage", valeur: "graphène, céramique et infrarouges" },
  { libelle: "Fréquences et intensité des vibrations", valeur: "réglables" },
  {
    libelle: "Garantie",
    // Jamais « garantie 1 an » seul : garantie commerciale du fabricant et garantie légale de conformité (CADRAGE §9).
    valeur: "Garantie commerciale du fabricant : 1 an, sans préjudice de la garantie légale de conformité.",
  },
];
