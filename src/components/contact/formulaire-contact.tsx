"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
  type ReactNode,
} from "react";
import { useForm, type Resolver } from "react-hook-form";
import type { ContenuContact, NomChamp } from "@/content/contact";
import { envoyerDemande } from "@/lib/contact/action";
import { CHAMP_PIEGE, valeursInitiales } from "@/lib/contact/champs";
import type { DonneesContact } from "@/lib/contact/schema";

interface FormulaireContactProps {
  textes: ContenuContact;
  structures: readonly { valeur: string; libelle: string }[];
}

type Etat = { statut: "saisie" } | { statut: "succes" } | { statut: "erreur"; message: string };

const classeControle =
  "w-full min-h-11 rounded-md border border-texte-secondaire bg-fond px-3 py-2 texte-corps-vitrine text-texte aria-invalid:border-danger aria-invalid:border-2";

const sansAbonnement = () => () => {};

/**
 * Zod et le schéma partagé ne sont téléchargés qu'à la première interaction avec le formulaire :
 * il est en bas de la landing, et les charger d'emblée retardait le premier affichage.
 */
const chargerValidation = () =>
  Promise.all([import("@hookform/resolvers/zod"), import("@/lib/contact/schema")]);

const validerAvecSchema: Resolver<DonneesContact> = async (valeurs, contexte, options) => {
  const [{ zodResolver }, { schemaContact }] = await chargerValidation();
  return zodResolver(schemaContact)(valeurs, contexte, options);
};

/**
 * Formulaire de demande de démo (CADRAGE §4.12), utilisé en bas de la landing et sur /contact.
 * Validation dans le navigateur et sur le serveur avec le même schéma.
 */
export function FormulaireContact({ textes, structures }: FormulaireContactProps) {
  const [etat, setEtat] = useState<Etat>({ statut: "saisie" });
  const annonce = useRef<HTMLDivElement>(null);
  // Faux au rendu serveur, vrai une fois le JavaScript actif : le bouton reste inactif jusque-là.
  const pret = useSyncExternalStore(sansAbonnement, () => true, () => false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, submitCount },
  } = useForm<DonneesContact>({
    resolver: validerAvecSchema,
    defaultValues: valeursInitiales,
  });

  useEffect(() => {
    if (etat.statut !== "saisie") annonce.current?.focus();
  }, [etat]);

  const valider = handleSubmit(async (_donnees, evenement) => {
    const formulaire = evenement?.target as HTMLFormElement;
    setEtat({ statut: "saisie" });
    try {
      const resultat = await envoyerDemande(new FormData(formulaire));
      if (resultat.statut === "succes") setEtat({ statut: "succes" });
      else if (resultat.statut === "erreur-envoi") {
        setEtat({ statut: "erreur", message: resultat.message });
      } else {
        Object.entries(resultat.erreurs).forEach(([champ, message], i) =>
          setError(champ as NomChamp, { message }, { shouldFocus: i === 0 }),
        );
      }
    } catch {
      // Réseau coupé ou requête bloquée par le pare-feu (limitation de débit).
      setEtat({ statut: "erreur", message: textes.erreurEnvoi });
    }
  });

  // Si le module de validation ne se charge pas (réseau coupé), on l'annonce au lieu de rester muet.
  const envoyer = (evenement: FormEvent<HTMLFormElement>) =>
    valider(evenement).catch(() => setEtat({ statut: "erreur", message: textes.erreurEnvoi }));

  if (etat.statut === "succes") {
    return (
      <div
        ref={annonce}
        role="status"
        tabIndex={-1}
        className="rounded-lg border border-cedre-texte p-6 texte-sous-titre text-texte"
      >
        {textes.succes}
      </div>
    );
  }

  const attributs = (champ: NomChamp) => ({
    id: `contact-${champ}`,
    "aria-invalid": errors[champ] ? true : undefined,
    "aria-describedby": errors[champ] ? `contact-${champ}-erreur` : undefined,
  });

  const erreur = (champ: NomChamp) =>
    errors[champ] && (
      <p id={`contact-${champ}-erreur`} className="mt-2 texte-corps text-danger">
        {errors[champ]?.message}
      </p>
    );

  const champ = (nom: NomChamp, controle: ReactNode, facultatif = false, large = false) => (
    <div className={large ? "sm:col-span-2" : undefined}>
      <label htmlFor={`contact-${nom}`} className="mb-2 block texte-corps-vitrine font-medium text-texte">
        {textes.champs[nom]}
        {facultatif && (
          <span className="font-normal text-texte-secondaire"> ({textes.mentionFacultatif})</span>
        )}
      </label>
      {controle}
      {erreur(nom)}
    </div>
  );

  return (
    // method="post" : sans JavaScript, aucune donnée personnelle ne doit finir dans l'URL.
    <form
      method="post"
      noValidate
      onSubmit={envoyer}
      onFocus={() => void chargerValidation().catch(() => {})} className="grid gap-6 sm:grid-cols-2">
      {champ("nom", <input {...register("nom")} {...attributs("nom")} autoComplete="name" required className={classeControle} />)}
      {champ("email", <input {...register("email")} {...attributs("email")} type="email" autoComplete="email" required className={classeControle} />)}
      {champ(
        "telephone",
        <input {...register("telephone")} {...attributs("telephone")} type="tel" autoComplete="tel" className={classeControle} />,
        true,
      )}
      {champ(
        "typeStructure",
        <select {...register("typeStructure")} {...attributs("typeStructure")} required className={classeControle}>
          <option value="">{textes.choisirStructure}</option>
          {structures.map((s) => (
            <option key={s.valeur} value={s.valeur}>
              {s.libelle}
            </option>
          ))}
        </select>,
      )}
      {champ(
        "etablissement",
        <input {...register("etablissement")} {...attributs("etablissement")} autoComplete="organization" className={classeControle} />,
        true,
        true,
      )}
      {champ(
        "message",
        <textarea {...register("message")} {...attributs("message")} rows={5} className={classeControle} />,
        true,
        true,
      )}

      {/* Champ piège : hors écran, hors tabulation, ignoré des lecteurs d'écran. */}
      <div aria-hidden="true" className="absolute -left-[999rem]">
        <label htmlFor="contact-piege">{textes.libellePiege}</label>
        <input id="contact-piege" name={CHAMP_PIEGE} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="sm:col-span-2">
        <div className="flex items-start gap-3">
          <input
            {...register("consentement")}
            {...attributs("consentement")}
            type="checkbox"
            required
            className="mt-1 size-6 shrink-0 accent-action"
          />
          <div className="texte-corps-vitrine text-texte">
            <label htmlFor="contact-consentement">{textes.consentement.texte}</label>{" "}
            {/* Nouvel onglet : suivre le lien ne doit pas effacer la saisie en cours. */}
            <a
              href={textes.consentement.lien.href}
              target="_blank"
              rel="noopener"
              className="underline underline-offset-4 hover:text-action"
            >
              {textes.consentement.lien.libelle}
            </a>
          </div>
        </div>
        {erreur("consentement")}
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2">
        <p role="alert" className="texte-corps-vitrine text-danger empty:hidden">
          {submitCount > 0 && Object.keys(errors).length > 0 ? textes.corrigerErreurs : ""}
        </p>
        {etat.statut === "erreur" && (
          <div ref={annonce} role="alert" tabIndex={-1} className="rounded-lg border border-danger p-4 texte-corps-vitrine text-texte">
            {etat.message}
          </div>
        )}
        <button
          type="submit"
          disabled={!pret || isSubmitting}
          className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-action px-6 texte-corps-vitrine font-medium text-marque-noir transition-colors hover:bg-action-forte disabled:cursor-wait disabled:opacity-70 sm:w-auto sm:self-start"
        >
          {isSubmitting ? textes.envoiEnCours : textes.envoyer}
        </button>
        <noscript>
          <p className="texte-corps-vitrine text-texte">{textes.sansJavaScript}</p>
        </noscript>
      </div>
    </form>
  );
}
