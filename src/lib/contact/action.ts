"use server";

import { Resend } from "resend";
import { traiterDemande, type ResultatContact } from "./traiter";

/**
 * Seul code serveur du site. RESEND_API_KEY n'est lue qu'ici.
 * La limitation de débit est faite en amont par une règle du pare-feu Vercel (voir CLAUDE.md, Avancement).
 */
export async function envoyerDemande(formData: FormData): Promise<ResultatContact> {
  return traiterDemande(
    formData,
    {
      RESEND_API_KEY: process.env.RESEND_API_KEY,
      CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
      CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
    },
    async (message, cle) => {
      const { error } = await new Resend(cle).emails.send(message);
      // Le nom de l'erreur seulement : son message peut contenir des adresses.
      return error ? { ok: false, erreur: error.name } : { ok: true };
    },
  );
}
