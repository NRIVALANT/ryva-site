import { A_VERIFIER } from "./marqueurs";

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
      titre: "Soulagement des douleurs",
      texte:
        "La marque présente la vibration comme pouvant diminuer la perception de la douleur pendant et après la séance, notamment chez les sportifs confrontés aux courbatures ou à certaines douleurs liées à l'effort.",
    },
    {
      titre: "Réduction du stress et de l'anxiété",
      texte:
        "L'association des vibrations et des infrarouges est présentée comme favorisant la détente, contribuant à réduire le stress, améliorer l'humeur et favoriser une meilleure qualité de sommeil.",
    },
    {
      titre: "Digestion et gestion du poids",
      texte:
        "La marque associe l'amélioration de la circulation, la relaxation et la stimulation du système lymphatique à un possible soutien de la digestion et des efforts de gestion du poids.",
    },
  ],
  // Reformulée par rapport au cadrage §4.6 : celui-ci emploie un verbe du vocabulaire interdit (CLAUDE.md,
  // règle 4), même en négation. Formulation à faire valider par un juriste.
  reserve: A_VERIFIER(
    "Les éléments présentés ci-dessus reprennent les allégations du fabricant et ne constituent pas un avis médical. La cabine RYVA n'est pas destinée à se substituer à un avis ou à un suivi médical.",
  ),
};
