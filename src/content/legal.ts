import { A_COMPLETER, A_VERIFIER } from "./marqueurs";
import { site } from "./site";

export interface LienLegal {
  libelle: string;
  href: string;
}

export interface RubriqueLegale {
  titre: string;
  paragraphes?: string[];
  donnees?: { libelle: string; valeur: string }[];
}

export interface PageLegale {
  titre: string;
  rubriques: RubriqueLegale[];
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

const { editeur } = legal;

/**
 * Textes PROPOSÉS pour relecture juridique (A_VERIFIER) ; identité et durées à fournir (A_COMPLETER).
 * Hébergeur et sous-traitants : relevés sur vercel.com/legal et resend.com/legal le 25 novembre 2026.
 */
export const pagesLegales: Record<"mentionsLegales" | "confidentialite", PageLegale> = {
  mentionsLegales: {
    titre: "Mentions légales",
    rubriques: [
      {
        titre: "Éditeur du site",
        donnees: [
          { libelle: "Raison sociale", valeur: editeur.raisonSociale },
          { libelle: "Forme juridique et capital", valeur: A_COMPLETER("forme juridique et capital social") },
          { libelle: "SIRET", valeur: editeur.siret },
          { libelle: "Adresse", valeur: editeur.adresse },
          { libelle: "Adresse email", valeur: site.coordonnees.email },
          { libelle: "Téléphone", valeur: site.coordonnees.telephone },
          { libelle: "Directeur de la publication", valeur: editeur.directeurPublication },
        ],
      },
      {
        titre: "Hébergeur",
        donnees: [
          { libelle: "Société", valeur: A_VERIFIER("Vercel Inc.") },
          {
            libelle: "Adresse",
            valeur: A_VERIFIER("440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis"),
          },
          { libelle: "Contact", valeur: A_VERIFIER("privacy@vercel.com") },
          { libelle: "Téléphone", valeur: A_COMPLETER("numéro de téléphone de l'hébergeur") },
        ],
      },
      {
        titre: "Garanties",
        paragraphes: [
          A_VERIFIER(
            "La garantie commerciale du fabricant est de 1 an. Elle s'ajoute, sans la remplacer ni la réduire, à la garantie légale de conformité, de 2 ans pour un consommateur.",
          ),
        ],
      },
      {
        titre: "Propriété intellectuelle",
        paragraphes: [
          A_VERIFIER(
            "Les textes, images et logotypes de ce site sont protégés. Toute reproduction sans autorisation écrite de l'éditeur est interdite.",
          ),
        ],
      },
    ],
  },
  confidentialite: {
    titre: "Politique de confidentialité",
    rubriques: [
      {
        titre: "Responsable du traitement",
        donnees: [
          { libelle: "Raison sociale", valeur: editeur.raisonSociale },
          { libelle: "Adresse", valeur: editeur.adresse },
          {
            libelle: "Contact pour les données personnelles",
            valeur: A_COMPLETER("email du responsable de traitement ou du DPO"),
          },
        ],
      },
      {
        titre: "Données collectées",
        paragraphes: [
          A_VERIFIER(
            "Le formulaire de contact recueille votre nom, votre adresse email et votre type de structure, ainsi que, si vous les indiquez, votre téléphone, le nom de votre établissement et votre message. Le site ne les enregistre pas : elles sont transmises par email à l'éditeur.",
          ),
          A_VERIFIER(
            "L'hébergeur traite par ailleurs des données techniques de connexion, dont l'adresse IP, pour afficher et protéger le site.",
          ),
        ],
      },
      {
        titre: "Finalité et base légale",
        paragraphes: [
          A_VERIFIER(
            "Les données du formulaire servent uniquement à répondre à votre demande. Le traitement repose sur votre consentement, que vous pouvez retirer à tout moment.",
          ),
        ],
      },
      {
        titre: "Durée de conservation",
        paragraphes: [A_COMPLETER("durée de conservation des demandes reçues par email")],
      },
      {
        titre: "Destinataires et sous-traitants",
        donnees: [
          { libelle: "Destinataire", valeur: A_VERIFIER("L'éditeur du site.") },
          { libelle: "Hébergement du site", valeur: A_VERIFIER("Vercel Inc., États-Unis") },
          { libelle: "Envoi des emails", valeur: A_VERIFIER("Resend (Plus Five Five, Inc.), États-Unis") },
          {
            libelle: "Messagerie de réception",
            valeur: A_COMPLETER("fournisseur de la messagerie qui reçoit les demandes"),
          },
        ],
      },
      {
        titre: "Transferts hors de l'Union européenne",
        paragraphes: [
          A_VERIFIER(
            "Vercel et Resend traitent des données aux États-Unis. Leurs conditions prévoient les clauses contractuelles types de la Commission européenne ; les deux sociétés déclarent aussi adhérer au cadre de protection des données UE-États-Unis.",
          ),
        ],
      },
      {
        titre: "Vos droits",
        paragraphes: [
          A_VERIFIER(
            "Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité, et vous pouvez définir des directives sur le sort de vos données après votre décès. Adressez votre demande au contact indiqué ci-dessus. Vous pouvez aussi saisir la CNIL.",
          ),
        ],
      },
      {
        titre: "Cookies",
        paragraphes: [
          A_VERIFIER(
            "Ce site ne dépose pas de cookie. Sa fréquentation est mesurée avec Vercel Web Analytics, sans cookie, sous forme de statistiques (pages vues, provenance, type d'appareil, pays).",
          ),
        ],
      },
    ],
  },
};
