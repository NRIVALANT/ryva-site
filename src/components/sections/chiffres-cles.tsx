import type { CSSProperties } from "react";
import { Section } from "@/components/ui/section";
import { ancres, site } from "@/content/site";
import { stats } from "@/content/stats";

/** Cadrage §4.2. Compteur en CSS pur (voir l'utilitaire `compteur`) ; valeur complète pour les lecteurs d'écran. */
export function ChiffresCles() {
  return (
    <Section id={ancres.chiffres} titre={site.titres.chiffres} fond="surface" titreMasque>
      <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.6fr_1fr]">
        {stats.map((chiffre) => (
          <li key={chiffre.libelle} className="revele flex flex-col gap-3">
            <span className="sr-only">{chiffre.valeur}</span>
            {chiffre.compteur ? (
              <span aria-hidden="true" className="font-mono texte-affiche text-texte">
                <span
                  className="compteur"
                  style={
                    {
                      "--cible": chiffre.compteur.nombre,
                      "--chiffres": String(chiffre.compteur.nombre).length,
                    } as CSSProperties
                  }
                />
                {chiffre.compteur.suffixe}
              </span>
            ) : (
              <span
                aria-hidden="true"
                className="font-mono texte-titre-vitrine text-balance text-texte"
              >
                {chiffre.valeur}
              </span>
            )}
            <span className="texte-corps text-texte-secondaire">{chiffre.libelle}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
