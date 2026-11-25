import { z } from "zod";
import { contact, typesStructure, type NomChamp } from "../../content/contact";

/** Schéma unique, partagé par le formulaire (navigateur) et la Server Action (serveur). */

const e = contact.erreurs;
const valeursStructure = typesStructure.map((t) => t.valeur);

export const schemaContact = z.object({
  nom: z.string().trim().min(1, e.nomRequis).max(100, e.tropLong),
  email: z
    .string()
    .trim()
    .min(1, e.emailRequis)
    .max(254, e.tropLong)
    .regex(z.regexes.email, e.emailInvalide),
  telephone: z
    .string()
    .trim()
    .max(30, e.tropLong)
    .regex(/^[0-9+().\s-]*$/, e.telephoneInvalide),
  typeStructure: z
    .string()
    .refine((v) => (valeursStructure as string[]).includes(v), e.structureRequise),
  etablissement: z.string().trim().max(150, e.tropLong),
  message: z.string().trim().max(3000, e.tropLong),
  consentement: z.boolean().refine((v) => v === true, e.consentementRequis),
});

export type DonneesContact = z.infer<typeof schemaContact>;

export type ErreursContact = Partial<Record<NomChamp, string>>;

export function donneesDepuisFormData(formData: FormData): DonneesContact {
  const texte = (nom: string) => {
    const v = formData.get(nom);
    return typeof v === "string" ? v : "";
  };
  return {
    nom: texte("nom"),
    email: texte("email"),
    telephone: texte("telephone"),
    typeStructure: texte("typeStructure"),
    etablissement: texte("etablissement"),
    message: texte("message"),
    consentement: formData.get("consentement") === "on",
  };
}

/** Première erreur de chaque champ. */
export function erreursParChamp(erreur: z.ZodError): ErreursContact {
  const erreurs: ErreursContact = {};
  for (const probleme of erreur.issues) {
    const champ = probleme.path[0] as NomChamp;
    erreurs[champ] ??= probleme.message;
  }
  return erreurs;
}
