export interface QuestionFaq {
  question: string;
  reponse: string;
}

/**
 * Cadrage §4.11. Chaque réponse reprend docs/SOURCE-PRODUIT.md ou une indication de Nicolas, sans extrapolation.
 * Les contre-indications ne sont jamais rédigées par le développement : elles viennent du fabricant.
 */
export const faq: QuestionFaq[] = [
  {
    question: "Combien de temps dure une séance ?",
    reponse: "Une séance classique dure environ 10 minutes.",
  },
  {
    question: "Jusqu'à quelle température la cabine chauffe-t-elle ?",
    reponse: "La température est réglable jusqu'à 60 °C.",
  },
  {
    question: "Peut-on adapter la séance ?",
    reponse:
      "Oui. L'intensité des vibrations, leur fréquence et la température se règlent grâce aux commandes situées à l'extérieur.",
  },
  {
    question: "Quelle installation électrique faut-il prévoir ?",
    reponse:
      "La cabine fonctionne sur une prise domestique de 10 A, ce qui facilite l'installation dans une maison, une clinique ou un espace professionnel.",
  },
  {
    question: "Quelle place faut-il prévoir ?",
    reponse: "La cabine mesure 108 × 56 × 74 cm.",
  },
  {
    question: "À quelle fréquence l'utiliser ?",
    reponse: "Le fabricant recommande une utilisation régulière.",
  },
  {
    question: "Quel est le prix ?",
    reponse: "Le prix est communiqué sur devis.",
  },
  {
    question: "Quelles sont les conditions de livraison, d'installation et de service après-vente ?",
    reponse: "Elles vous sont précisées une fois votre demande engagée.",
  },
  {
    question: "Quelle est la garantie ?",
    reponse:
      "Garantie commerciale du fabricant : 1 an, sans préjudice de la garantie légale de conformité.",
  },
];
