// Sans Zod : importé par le formulaire dès l'affichage, le schéma n'arrivant qu'à la première saisie.

/** Nom du champ piège : volontairement neutre pour que le remplissage automatique l'ignore. */
export const CHAMP_PIEGE = "ne_pas_remplir";

export const valeursInitiales = {
  nom: "",
  email: "",
  telephone: "",
  typeStructure: "",
  etablissement: "",
  message: "",
  consentement: false,
};
