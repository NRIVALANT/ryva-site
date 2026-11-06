export interface Chiffre {
  /** Valeur complète, lue par les lecteurs d'écran et affichée si le compteur CSS n'est pas supporté. */
  valeur: string;
  libelle: string;
  /** Présent uniquement pour un chiffre seul : le compteur CSS anime `nombre`, puis affiche `suffixe`. */
  compteur?: {
    nombre: number;
    suffixe: string;
  };
}

/** Cadrage §4.2. */
export const stats: Chiffre[] = [
  {
    valeur: "10 min",
    libelle: "Durée d'une séance",
    compteur: { nombre: 10, suffixe: " min" },
  },
  {
    valeur: "60 °C",
    libelle: "Température maximale réglable",
    compteur: { nombre: 60, suffixe: " °C" },
  },
  { valeur: "108 × 56 × 74 cm", libelle: "Encombrement" },
  {
    valeur: "10 A",
    libelle: "Prise domestique standard",
    compteur: { nombre: 10, suffixe: " A" },
  },
];
