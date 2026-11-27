export interface Benefice {
  titre: string;
  texte: string;
}

export interface BeneficesContent {
  liste: Benefice[];
  /** Mention de réserve obligatoire, affichée en pied de section et rappelée dans le footer. */
  reserve: string;
}

/**
 * Cadrage §4.6. Allégations attribuées à la marque, au conditionnel, jamais énoncées comme un fait établi.
 */
export const benefits: BeneficesContent = {
  liste: [
    {
      titre: "Confort après l'effort",
      texte:
        "La marque présente la vibration comme pouvant apporter une sensation de confort pendant et après la séance, notamment chez les sportifs après l'effort.",
    },
    {
      titre: "Détente et sommeil",
      texte:
        "L'association des vibrations et des infrarouges est présentée comme favorisant la détente, la bonne humeur et la qualité du sommeil.",
    },
    {
      titre: "Relaxation et bien-être",
      texte:
        "La marque associe la chaleur, les vibrations et la relaxation à un possible soutien du bien-être au quotidien.",
    },
  ],
  // Reformulée par rapport au cadrage §4.6 : celui-ci emploie un verbe du vocabulaire interdit (CLAUDE.md,
  // règle 4), même en négation. Validée par Nicolas, non relue par un juriste.
  reserve: "Les éléments présentés ci-dessus reprennent les allégations du fabricant et ne constituent pas un avis médical. La cabine RYVA n'est pas destinée à se substituer à un avis ou à un suivi médical.",
};
