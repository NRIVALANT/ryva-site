export interface Etape {
  numero: string;
  titre: string;
  texte: string;
}

/** Cadrage §4.5 : les quatre étapes. */
export const steps: Etape[] = [
  {
    numero: "01",
    titre: "Installez-vous",
    texte:
      "Entrez dans la cabine et prenez place. Son format demi-corps laisse la tête à l'extérieur de la zone chauffée.",
  },
  {
    numero: "02",
    titre: "Réglez votre séance",
    texte:
      "Ajustez l'intensité des vibrations, leur fréquence et la température, jusqu'à 60 °C, grâce aux commandes situées à l'extérieur.",
  },
  {
    numero: "03",
    titre: "La chaleur et les vibrations",
    texte:
      "Les vibrations soniques sont conçues pour stimuler les muscles à différentes fréquences tandis que les éléments chauffants au graphène, à la céramique et aux infrarouges produisent une chaleur profonde.",
  },
  {
    numero: "04",
    titre: "La séance",
    texte:
      "Une séance classique dure environ 10 minutes. Le fabricant recommande une utilisation régulière, notamment pour les sportifs, les personnes souhaitant préserver leur mobilité et le bien-être général.",
  },
];
