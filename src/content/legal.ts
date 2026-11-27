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
}

export const legal: LegalContent = {
  liens: [
    { libelle: "Mentions légales", href: "/mentions-legales" },
    { libelle: "Politique de confidentialité", href: "/confidentialite" },
  ],
};

/**
 * Textes validés par Nicolas, non relus par un juriste ; identité de l'éditeur, téléphone de l'hébergeur, durée de conservation
 * et messagerie de réception non publiés (décision de Nicolas, 27 novembre 2026).
 * Hébergeur et sous-traitants : relevés sur vercel.com/legal et resend.com/legal le 25 novembre 2026.
 */
export const pagesLegales: Record<"mentionsLegales" | "confidentialite", PageLegale> = {
  mentionsLegales: {
    titre: "Mentions légales",
    rubriques: [
      {
        titre: "Éditeur du site",
        donnees: [
          { libelle: "Adresse email", valeur: site.coordonnees.email },
          { libelle: "Téléphone", valeur: site.coordonnees.telephone },
        ],
      },
      {
        titre: "Hébergeur",
        donnees: [
          { libelle: "Société", valeur: "Vercel Inc." },
          {
            libelle: "Adresse",
            valeur: "440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis",
          },
          { libelle: "Contact", valeur: "privacy@vercel.com" },
        ],
      },
      {
        titre: "Garanties",
        paragraphes: [
          "La garantie commerciale du fabricant est de 1 an. Elle s'ajoute, sans la remplacer ni la réduire, à la garantie légale de conformité, de 2 ans pour un consommateur.",
        ],
      },
      {
        titre: "Propriété intellectuelle",
        paragraphes: [
          "Les textes, images et logotypes de ce site sont protégés. Toute reproduction sans autorisation écrite de l'éditeur est interdite.",
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
          {
            libelle: "Contact pour les données personnelles",
            valeur: site.coordonnees.email,
          },
        ],
      },
      {
        titre: "Données collectées",
        paragraphes: [
          "Le formulaire de contact recueille votre nom, votre adresse email et votre type de structure, ainsi que, si vous les indiquez, votre téléphone, le nom de votre établissement et votre message. Le site ne les enregistre pas : elles sont transmises par email à l'éditeur.",
          "L'hébergeur traite par ailleurs des données techniques de connexion, dont l'adresse IP, pour afficher et protéger le site.",
        ],
      },
      {
        titre: "Finalité et base légale",
        paragraphes: [
          "Les données du formulaire servent uniquement à répondre à votre demande. Le traitement repose sur votre consentement, que vous pouvez retirer à tout moment.",
        ],
      },
      {
        titre: "Destinataires et sous-traitants",
        donnees: [
          { libelle: "Destinataire", valeur: "L'éditeur du site." },
          { libelle: "Hébergement du site", valeur: "Vercel Inc., États-Unis" },
          { libelle: "Envoi des emails", valeur: "Resend (Plus Five Five, Inc.), États-Unis" },
        ],
      },
      {
        titre: "Transferts hors de l'Union européenne",
        paragraphes: [
          "Vercel et Resend traitent des données aux États-Unis. Leurs conditions prévoient les clauses contractuelles types de la Commission européenne ; les deux sociétés déclarent aussi adhérer au cadre de protection des données UE-États-Unis.",
        ],
      },
      {
        titre: "Vos droits",
        paragraphes: [
          "Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité, et vous pouvez définir des directives sur le sort de vos données après votre décès. Adressez votre demande au contact indiqué ci-dessus. Vous pouvez aussi saisir la CNIL.",
        ],
      },
      {
        titre: "Cookies",
        paragraphes: [
          "Ce site ne dépose pas de cookie. Sa fréquentation est mesurée avec Vercel Web Analytics, sans cookie, sous forme de statistiques (pages vues, provenance, type d'appareil, pays).",
        ],
      },
    ],
  },
};
