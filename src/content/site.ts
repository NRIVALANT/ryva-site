import { A_COMPLETER } from "./marqueurs";

/** Identifiants d'ancre des sections de la landing (utilisés par le header, le hero et les sections). */
export const ancres = {
  chiffres: "chiffres",
  technologies: "technologies",
  fonctionnement: "fonctionnement",
  etapes: "etapes",
  benefices: "benefices",
  technologieDetail: "technologie",
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
  fonctionnement: string;
  etapes: string;
  benefices: string;
  technologieDetail: string;
  pourQui: string;
  caracteristiques: string;
  faq: string;
}

export interface SiteContent {
  langue: string;
  nom: string;
  titre: string;
  description: string;
  titres: TitresSections;
  /** Contenu principal : cible du lien d'évitement. */
  idContenu: string;
  /** Ancres du header, dans l'ordre d'affichage (libellés courts des titres du cadrage §4). */
  navigation: LienNavigation[];
  /** CTA permanent : header, hero, barre mobile. */
  ctaDemo: LienNavigation;
  /** Coordonnées de contact (footer, mentions légales). */
  coordonnees: {
    email: string;
    telephone: string;
    adresse: string;
  };
}

export const site: SiteContent = {
  langue: "fr",
  nom: "RYVA",
  titre: "RYVA",
  description: A_COMPLETER("description du site (balise meta)"),
  titres: {
    chiffres: "Chiffres clés",
    technologies: "Les technologies",
    fonctionnement: "Comment ça fonctionne",
    etapes: "Les 4 étapes",
    benefices: "Bénéfices mis en avant",
    technologieDetail: "Technologie détaillée",
    pourQui: "Pour qui",
    caracteristiques: "Caractéristiques techniques",
    faq: "FAQ",
  },
  idContenu: "contenu",
  navigation: [
    { libelle: "Technologies", href: `#${ancres.technologies}` },
    { libelle: "Fonctionnement", href: `#${ancres.fonctionnement}` },
    { libelle: "Bénéfices", href: `#${ancres.benefices}` },
    { libelle: "Pour qui", href: `#${ancres.pourQui}` },
    { libelle: "Caractéristiques", href: `#${ancres.caracteristiques}` },
    { libelle: "FAQ", href: `#${ancres.faq}` },
  ],
  ctaDemo: { libelle: "Demander une démo", href: `#${ancres.contact}` },
  coordonnees: {
    email: A_COMPLETER("adresse email professionnelle"),
    telephone: A_COMPLETER("numéro de téléphone"),
    adresse: A_COMPLETER("adresse postale"),
  },
};
