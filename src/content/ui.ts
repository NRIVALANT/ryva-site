/** Libellés d'interface et textes d'accessibilité. Les messages du formulaire arrivent en session 3. */
export interface UiContent {
  visuelProvisoire: {
    libelle: string;
  };
  evitement: string;
  header: {
    ariaAccueil: string;
    ariaNavigation: string;
    menu: {
      ouvrir: string;
      fermer: string;
      libelle: string;
    };
  };
  mobile: {
    ariaCta: string;
  };
  footer: {
    ariaLiensLegaux: string;
    titreRappels: string;
  };
  tableau: {
    colonneLibelle: string;
    colonneValeur: string;
  };
  pageIntrouvable: {
    titre: string;
    texte: string;
    retour: string;
  };
}

export const ui: UiContent = {
  visuelProvisoire: {
    libelle: "Visuel à fournir",
  },
  evitement: "Aller au contenu principal",
  header: {
    ariaAccueil: "RYVA, retour à l'accueil",
    ariaNavigation: "Navigation principale",
    menu: {
      ouvrir: "Ouvrir le menu",
      fermer: "Fermer le menu",
      libelle: "Menu",
    },
  },
  mobile: {
    ariaCta: "Demande de démonstration",
  },
  footer: {
    ariaLiensLegaux: "Informations légales",
    titreRappels: "À savoir",
  },
  tableau: {
    colonneLibelle: "Caractéristique",
    colonneValeur: "Valeur",
  },
  pageIntrouvable: {
    titre: "Page introuvable",
    texte: "L'adresse demandée n'existe pas ou n'existe plus.",
    retour: "Retour à l'accueil",
  },
};
