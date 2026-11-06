import { A_COMPLETER, A_VERIFIER } from "./marqueurs";

export interface Caracteristique {
  libelle: string;
  valeur: string;
}

/** Cadrage §4.10. Les valeurs absentes du cadrage restent en A_COMPLETER. */
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
    valeur: A_VERIFIER(
      "Garantie commerciale du fabricant : 1 an, sans préjudice de la garantie légale de conformité.",
    ),
  },
  { libelle: "Poids", valeur: A_COMPLETER("poids de la cabine") },
  {
    libelle: "Puissance",
    valeur: A_COMPLETER("puissance en watts et consommation"),
  },
  { libelle: "Niveau sonore", valeur: A_COMPLETER("niveau sonore") },
  {
    libelle: "Plage de fréquences",
    valeur: A_COMPLETER("plage de fréquences (Hz)"),
  },
  {
    libelle: "Poids utilisateur maximal",
    valeur: A_COMPLETER("poids utilisateur maximal"),
  },
];
