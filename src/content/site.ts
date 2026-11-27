/** Identifiants d'ancre des sections de la landing (utilisés par le header, le hero et les sections). */
export const ancres = {
  chiffres: "chiffres",
  technologies: "technologies",
  etapes: "etapes",
  benefices: "benefices",
  pourQui: "pour-qui",
  caracteristiques: "caracteristiques",
  faq: "faq",
  contact: "contact",
} as const;

export interface LienNavigation {
  libelle: string;
  href: string;
}

/** Titres (h2) des sections de la landing : intitulés du cadrage §4. */
export interface TitresSections {
  chiffres: string;
  technologies: string;
  etapes: string;
  benefices: string;
  pourQui: string;
  caracteristiques: string;
  faq: string;
}

export interface SiteContent {
  langue: string;
  nom: string;
  titres: TitresSections;
  /** Contenu principal : cible du lien d'évitement. */
  idContenu: string;
  /** Ancres du header, dans l'ordre d'affichage. En « /#… » pour fonctionner depuis toutes les pages. */
  navigation: LienNavigation[];
  /** CTA permanent : header, hero, barre mobile. */
  ctaDemo: LienNavigation;
  /** Coordonnées de contact (footer, mentions légales). */
  coordonnees: {
    email: string;
    telephone: string;
  };
}

export const site: SiteContent = {
  langue: "fr",
  nom: "RYVA",
  titres: {
    chiffres: "Chiffres clés",
    technologies: "Les technologies",
    etapes: "Comment ça fonctionne",
    benefices: "Bénéfices mis en avant",
    pourQui: "Pour qui",
    caracteristiques: "Caractéristiques techniques",
    faq: "FAQ",
  },
  idContenu: "contenu",
  navigation: [
    { libelle: "Technologies", href: `/#${ancres.technologies}` },
    { libelle: "Fonctionnement", href: `/#${ancres.etapes}` },
    { libelle: "Bénéfices", href: `/#${ancres.benefices}` },
    { libelle: "Pour qui", href: `/#${ancres.pourQui}` },
    { libelle: "Caractéristiques", href: `/#${ancres.caracteristiques}` },
    { libelle: "FAQ", href: `/#${ancres.faq}` },
  ],
  ctaDemo: { libelle: "Demander une démo", href: `/#${ancres.contact}` },
  // Contact provisoire (collègue de Nicolas), à remplacer par le contact professionnel.
  coordonnees: {
    email: "lucasloisel44@icloud.com",
    telephone: "06 84 18 12 91",
  },
};
