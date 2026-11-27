export interface PageSeo {
  chemin: "/" | "/contact" | "/mentions-legales" | "/confidentialite";
  titre: string;
  description: string;
}

/** Titres et descriptions rédigés à la main, un jeu par page (CADRAGE §8). */
export const pages = {
  accueil: {
    chemin: "/",
    titre: "Cabine RYVA | Vibrations soniques et chaleur infrarouge",
    // Composée à partir des seuls textes du cadrage §4.1 : validée par Nicolas.
    description: "Des séances de 10 minutes combinant vibrations soniques et chaleur infrarouge réglable jusqu'à 60 °C. Pour les cliniques et les salles de sport.",
  },
  contact: {
    chemin: "/contact",
    titre: "Demander une démo | RYVA",
    description: "Formulaire de demande de démonstration de la cabine RYVA.",
  },
  mentionsLegales: {
    chemin: "/mentions-legales",
    titre: "Mentions légales | RYVA",
    description: "Éditeur, hébergeur et informations légales du site de la cabine RYVA.",
  },
  confidentialite: {
    chemin: "/confidentialite",
    titre: "Politique de confidentialité | RYVA",
    description: "Traitement des données saisies dans le formulaire de contact du site RYVA.",
  },
} as const satisfies Record<string, PageSeo>;

/** Image de partage (Open Graph). La devise est sous sa forme de référence (CHARTE). */
export const partage = {
  devise: "RECOVER . PERFORM . REPEAT.",
  alt: "Logotype RYVA et devise « RECOVER . PERFORM . REPEAT. » sur fond sombre",
  locale: "fr_FR",
};

/** Nom du produit dans les données structurées. */
export const nomProduit = "Cabine RYVA";
