export interface Chiffre {
  valeur: string;
  libelle: string;
}

/** Cadrage §4.2. */
export const stats: Chiffre[] = [
  { valeur: "10 min", libelle: "Durée d'une séance" },
  { valeur: "60 °C", libelle: "Température maximale réglable" },
  { valeur: "108 × 56 × 74 cm", libelle: "Encombrement" },
  { valeur: "10 A", libelle: "Prise domestique standard" },
];
