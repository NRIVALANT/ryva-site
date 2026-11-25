import { A_VERIFIER } from "./marqueurs";

/** Types de structure (CADRAGE §4.12). La valeur est envoyée, le libellé est affiché. */
export const typesStructure = [
  { valeur: "clinique", libelle: "Clinique" },
  { valeur: "cabinet", libelle: "Cabinet" },
  { valeur: "salle-de-sport", libelle: "Salle de sport" },
  { valeur: "centre-de-recuperation", libelle: "Centre de récupération" },
  { valeur: "particulier", libelle: "Particulier" },
  { valeur: "autre", libelle: "Autre" },
] as const;

export type ValeurStructure = (typeof typesStructure)[number]["valeur"];

export type NomChamp =
  | "nom"
  | "email"
  | "telephone"
  | "typeStructure"
  | "etablissement"
  | "message"
  | "consentement";

export interface ContenuContact {
  /** Titre de la section et de la page /contact. */
  titre: string;
  metaTitre: string;
  champs: Record<NomChamp, string>;
  mentionFacultatif: string;
  choisirStructure: string;
  consentement: {
    texte: string;
    lien: { libelle: string; href: string };
  };
  /** Champ piège, jamais visible : son libellé ne doit pas trahir son rôle. */
  libellePiege: string;
  envoyer: string;
  envoiEnCours: string;
  succes: string;
  erreurEnvoi: string;
  erreurConfiguration: string;
  corrigerErreurs: string;
  sansJavaScript: string;
  erreurs: {
    nomRequis: string;
    emailRequis: string;
    emailInvalide: string;
    telephoneInvalide: string;
    structureRequise: string;
    consentementRequis: string;
    tropLong: string;
  };
  email: {
    sujet: string;
    titre: string;
    nonRenseigne: string;
  };
}

export const contact: ContenuContact = {
  titre: "Demander une démo",
  metaTitre: "Demander une démo",
  champs: {
    nom: "Nom",
    email: "Adresse email",
    telephone: "Téléphone",
    typeStructure: "Type de structure",
    etablissement: "Nom de l'établissement",
    message: "Message",
    consentement: "Consentement",
  },
  mentionFacultatif: "facultatif",
  choisirStructure: "Choisissez…",
  consentement: {
    // Texte RGPD à valider par un juriste avant publication.
    texte: A_VERIFIER(
      "J'accepte que les informations saisies soient utilisées pour répondre à ma demande.",
    ),
    lien: { libelle: "Politique de confidentialité", href: "/confidentialite" },
  },
  libellePiege: "Ne pas remplir",
  envoyer: "Envoyer la demande",
  envoiEnCours: "Envoi en cours…",
  succes: "Votre demande a bien été envoyée.",
  erreurEnvoi:
    "L'envoi n'a pas abouti. Réessayez dans quelques minutes.",
  erreurConfiguration:
    "Le formulaire n'est pas disponible pour le moment : votre demande n'a pas été envoyée.",
  corrigerErreurs: "Corrigez les champs signalés.",
  sansJavaScript: "Ce formulaire nécessite JavaScript.",
  erreurs: {
    nomRequis: "Indiquez votre nom.",
    emailRequis: "Indiquez votre adresse email.",
    emailInvalide: "Cette adresse email n'est pas valide.",
    telephoneInvalide: "Ce numéro contient des caractères non autorisés.",
    structureRequise: "Choisissez un type de structure.",
    consentementRequis: "Votre accord est nécessaire pour envoyer la demande.",
    tropLong: "Ce texte est trop long.",
  },
  email: {
    sujet: "Demande de démo",
    titre: "Nouvelle demande de démo",
    nonRenseigne: "non renseigné",
  },
};
