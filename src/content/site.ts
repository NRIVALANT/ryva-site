import { A_COMPLETER } from "./marqueurs";

export interface SiteContent {
  langue: string;
  nom: string;
  titre: string;
  description: string;
  titrePageAccueil: string;
}

export const site: SiteContent = {
  langue: "fr",
  nom: "RYVA",
  titre: "RYVA",
  description: A_COMPLETER("description du site (balise meta)"),
  titrePageAccueil: A_COMPLETER("titre de la page d'accueil"),
};
