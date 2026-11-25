import { contact } from "../../content/contact";
import { construireEmail, type EmailDemande } from "./email";
import { CHAMP_PIEGE } from "./champs";
import {
  donneesDepuisFormData,
  erreursParChamp,
  schemaContact,
  type ErreursContact,
} from "./schema";

export type ResultatContact =
  | { statut: "succes" }
  | { statut: "erreur-validation"; erreurs: ErreursContact }
  | { statut: "erreur-envoi"; message: string };

export interface Configuration {
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
}

export type Envoyeur = (
  message: EmailDemande & { from: string; to: string },
  cle: string,
) => Promise<{ ok: boolean; erreur?: string }>;

const VARIABLES = ["RESEND_API_KEY", "CONTACT_TO_EMAIL", "CONTACT_FROM_EMAIL"] as const;

const echecGenerique: ResultatContact = {
  statut: "erreur-envoi",
  message: contact.erreurEnvoi,
};

/**
 * Traitement d'une demande, indépendant de Next et de Resend pour être testable.
 * Les journaux ne contiennent jamais de donnée personnelle.
 */
export async function traiterDemande(
  formData: FormData,
  config: Configuration,
  envoyer: Envoyeur,
  journal: (message: string) => void = console.error,
): Promise<ResultatContact> {
  // 1. Champ piège rempli : erreur banale, qui ne révèle rien.
  const piege = formData.get(CHAMP_PIEGE);
  if (typeof piege === "string" && piege !== "") return echecGenerique;

  // 2. Validation serveur, même si celle du navigateur a été contournée.
  const analyse = schemaContact.safeParse(donneesDepuisFormData(formData));
  if (!analyse.success) {
    return { statut: "erreur-validation", erreurs: erreursParChamp(analyse.error) };
  }

  // 3. Configuration : jamais de faux succès.
  const manquantes = VARIABLES.filter((nom) => !config[nom]);
  if (manquantes.length > 0) {
    journal(`contact : variables manquantes (${manquantes.join(", ")})`);
    return { statut: "erreur-envoi", message: contact.erreurConfiguration };
  }

  // 4. Envoi.
  try {
    const reponse = await envoyer(
      {
        ...construireEmail(analyse.data),
        from: config.CONTACT_FROM_EMAIL!,
        to: config.CONTACT_TO_EMAIL!,
      },
      config.RESEND_API_KEY!,
    );
    if (!reponse.ok) {
      journal(`contact : envoi refusé (${reponse.erreur ?? "raison inconnue"})`);
      return echecGenerique;
    }
  } catch (erreur) {
    journal(`contact : envoi impossible (${erreur instanceof Error ? erreur.name : "erreur"})`);
    return echecGenerique;
  }

  return { statut: "succes" };
}
