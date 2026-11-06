#!/usr/bin/env node
// Contrôles de qualité automatiques (CLAUDE.md, règles 2, 6, 8 bis et 9). Sans dépendance.
// À lancer APRÈS `next build` : il lit le HTML statique généré dans .next/server/app/.
// Toute erreur fait échouer le script (code 1) : la CI s'en sert comme garde-fou.
//
// Source : pas de couleur en dur ni de pixels dans les composants.
// HTML généré de la page d'accueil : langue, une seule h1, titres sans saut, images avec alt,
// sections nommées, ancres internes existantes, robots cohérent avec SITE_INDEXABLE.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const racine = fileURLToPath(new URL("..", import.meta.url));
const erreurs = [];
const avertissements = [];

// Ancres connues pour pointer vers une section pas encore construite.
// À retirer quand la section existe (session 3 : formulaire de contact, id « contact »).
const ANCRES_EN_ATTENTE = ["contact"];

const rel = (p) => relative(racine, p).split(sep).join("/");

function lister(dossier) {
  if (!existsSync(dossier)) return [];
  return readdirSync(dossier, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? lister(join(dossier, e.name)) : [join(dossier, e.name)],
  );
}

// ---------- 1. Source : composants et pages
const fichiersUi = [...lister(join(racine, "src", "components")), ...lister(join(racine, "src", "app"))].filter(
  (f) => f.endsWith(".tsx"),
);
for (const fichier of fichiersUi) {
  readFileSync(fichier, "utf8")
    .split(/\r?\n/)
    .forEach((ligne, i) => {
      if (/^\s*(\/\/|\*|\/\*)/.test(ligne)) return; // commentaires
      if (/#[0-9a-fA-F]{3,8}\b/.test(ligne) && !/href=|`#\$\{/.test(ligne)) {
        erreurs.push(`${rel(fichier)}:${i + 1}  couleur en dur (règle 6 : passer par les jetons)`);
      }
      if (/\b\d+(\.\d+)?px\b/.test(ligne)) {
        erreurs.push(`${rel(fichier)}:${i + 1}  valeur en px (règle 8 bis : utiliser rem)`);
      }
    });
}

// ---------- 2. HTML généré
const html = join(racine, ".next", "server", "app", "index.html");
if (!existsSync(html)) {
  erreurs.push("`.next/server/app/index.html` introuvable : lancer `npm run build` avant ce script.");
} else {
  const page = readFileSync(html, "utf8");

  if (!/<html[^>]*\blang="fr"/.test(page)) erreurs.push("accueil : <html lang=\"fr\"> absent");

  const titres = [...page.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  const nbH1 = titres.filter((n) => n === 1).length;
  if (nbH1 !== 1) erreurs.push(`accueil : ${nbH1} h1 au lieu d'une seule`);
  titres.forEach((n, i) => {
    if (i > 0 && n > titres[i - 1] + 1) {
      erreurs.push(`accueil : saut de titre h${titres[i - 1]} → h${n} (hiérarchie sans saut exigée)`);
    }
  });

  for (const img of page.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt=/.test(img[0])) erreurs.push(`accueil : image sans attribut alt : ${img[0].slice(0, 80)}`);
  }

  const ids = new Set([...page.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));

  for (const m of page.matchAll(/<section\b[^>]*aria-labelledby="([^"]+)"/g)) {
    if (!ids.has(m[1])) erreurs.push(`accueil : aria-labelledby="${m[1]}" ne pointe vers aucun id`);
  }
  if (!/<main\b/.test(page)) erreurs.push("accueil : balise <main> absente");

  const ancres = new Set([...page.matchAll(/\bhref="#([^"]+)"/g)].map((m) => m[1]));
  for (const ancre of ancres) {
    if (ids.has(ancre)) continue;
    if (ANCRES_EN_ATTENTE.includes(ancre)) {
      avertissements.push(`ancre #${ancre} : section pas encore construite (attendue)`);
    } else {
      erreurs.push(`accueil : le lien #${ancre} ne pointe vers aucune section`);
    }
  }

  const robots = (page.match(/<meta name="robots" content="([^"]+)"/) ?? [])[1];
  const attendu = process.env.SITE_INDEXABLE === "true" ? "index, follow" : "noindex, nofollow";
  if (robots !== attendu) erreurs.push(`accueil : meta robots « ${robots} », attendu « ${attendu} »`);
}

// ---------- Sortie
for (const a of avertissements) console.log(`avertissement  ${a}`);
for (const e of erreurs) console.error(`ERREUR  ${e}`);
console.log(
  `\ncheck-qualite : ${erreurs.length} erreur(s), ${avertissements.length} avertissement(s), ` +
    `${fichiersUi.length} fichiers de composants contrôlés.`,
);
if (erreurs.length > 0) process.exit(1);
