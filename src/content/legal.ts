import { A_COMPLETER } from "./marqueurs";

export interface LienLegal {
  libelle: string;
  href: string;
}

export interface LegalContent {
  liens: LienLegal[];
  /** Identité de l'éditeur : tout est à fournir (mentions légales, session 4). */
  editeur: {
    raisonSociale: string;
    siret: string;
    directeurPublication: string;
    adresse: string;
  };
  /** Rappel des contre-indications (footer, CADRAGE §4.13) : à fournir par le fabricant. */
  rappelContreIndications: string;
  /** Mention « dispositif médical » ou non : à confirmer avec le fabricant. */
  dispositifMedical: string;
}

export const legal: LegalContent = {
  liens: [
    { libelle: "Mentions légales", href: "/mentions-legales" },
    { libelle: "Politique de confidentialité", href: "/confidentialite" },
  ],
  editeur: {
    raisonSociale: A_COMPLETER("raison sociale de l'éditeur"),
    siret: A_COMPLETER("numéro SIRET"),
    directeurPublication: A_COMPLETER("directeur de la publication"),
    adresse: A_COMPLETER("adresse de l'éditeur"),
  },
  rappelContreIndications: A_COMPLETER(
    "rappel des contre-indications, à fournir par le fabricant",
  ),
  dispositifMedical: A_COMPLETER(
    "mention « dispositif médical » ou non, à confirmer avec le fabricant",
  ),
};
