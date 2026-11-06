import { A_COMPLETER } from "./marqueurs";

export interface QuestionFaq {
  question: string;
  reponse: string;
}

/**
 * Cadrage §4.11. Une réponse n'est rédigée que si le cadrage fournit la donnée sans extrapolation.
 * Les contre-indications ne sont jamais rédigées par le développement : elles viennent du fabricant.
 */
export const faq: QuestionFaq[] = [
  {
    question: "Quelles sont les contre-indications ?",
    reponse: A_COMPLETER(
      "contre-indications, à fournir par le fabricant (jamais rédigées par défaut)",
    ),
  },
  {
    question: "Quelle installation électrique faut-il prévoir ?",
    reponse:
      "Fonctionne sur une prise domestique de 10 A, ce qui facilite l'installation en maison, clinique ou espace professionnel.",
  },
  {
    question:
      "Comment entretenir le cèdre et nettoyer entre deux utilisateurs ?",
    reponse: A_COMPLETER("consignes d'entretien et de nettoyage"),
  },
  {
    question: "Quelle est la consommation électrique par séance ?",
    reponse: A_COMPLETER("consommation électrique par séance"),
  },
  {
    question:
      "Combien pèse la cabine, et quel accès faut-il pour la livrer ?",
    reponse: A_COMPLETER("poids de la cabine et conditions d'accès à la livraison"),
  },
  {
    question: "À quelle fréquence l'utiliser ?",
    reponse: A_COMPLETER("fréquence d'utilisation recommandée par le fabricant"),
  },
  {
    question:
      "En quoi cela diffère-t-il d'un sauna infrarouge ou d'une plateforme vibrante ?",
    reponse: A_COMPLETER("éléments de comparaison validés par le fabricant"),
  },
  {
    question: "Quels sont les délais de livraison et le SAV ?",
    reponse: A_COMPLETER("délais de livraison et conditions du SAV"),
  },
];
