import { contact, typesStructure } from "../../content/contact";
import type { DonneesContact } from "./schema";

/** Échappe tout contenu saisi avant insertion dans le HTML de l'email. */
export function echapperHtml(texte: string): string {
  return texte
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Retire retours à la ligne et caractères de contrôle : obligatoire pour le sujet et les en-têtes. */
export function surUneLigne(texte: string): string {
  return texte.replace(/[\u0000-\u001f\u007f\u2028\u2029]+/g, " ").trim();
}

export interface EmailDemande {
  subject: string;
  text: string;
  html: string;
  replyTo: string;
}

export function construireEmail(d: DonneesContact): EmailDemande {
  const structure =
    typesStructure.find((t) => t.valeur === d.typeStructure)?.libelle ?? d.typeStructure;
  const vide = contact.email.nonRenseigne;

  const lignes: [string, string][] = [
    [contact.champs.nom, d.nom],
    [contact.champs.email, d.email],
    [contact.champs.telephone, d.telephone || vide],
    [contact.champs.typeStructure, structure],
    [contact.champs.etablissement, d.etablissement || vide],
    [contact.champs.message, d.message || vide],
  ];

  const text = [
    contact.email.titre,
    "",
    ...lignes.map(([libelle, valeur]) => `${libelle} : ${valeur}`),
  ].join("\n");

  const html = [
    `<h1>${echapperHtml(contact.email.titre)}</h1>`,
    ...lignes.map(
      ([libelle, valeur]) =>
        `<p><strong>${echapperHtml(libelle)} :</strong><br>${echapperHtml(valeur).replace(/\r?\n/g, "<br>")}</p>`,
    ),
  ].join("\n");

  return {
    subject: surUneLigne(`${contact.email.sujet} : ${d.nom} (${structure})`),
    text,
    html,
    replyTo: surUneLigne(d.email),
  };
}
