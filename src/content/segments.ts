export interface Segment {
  titre: string;
  angle: string;
}

/** Cadrage §4.9 : quatre cartes, chacune avec son angle. */
export const segments: Segment[] = [
  {
    titre: "Cliniques et cabinets",
    angle: "Rotation courte, encombrement maîtrisé, hygiène",
  },
  {
    titre: "Salles de sport",
    angle: "Service différenciant, séance de 10 min entre deux créneaux",
  },
  {
    titre: "Sportifs",
    angle: "Récupération après l'effort, usage régulier",
  },
  {
    titre: "Domicile",
    angle: "Usage quotidien selon les recommandations du fabricant",
  },
];
