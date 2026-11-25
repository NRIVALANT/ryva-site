#!/usr/bin/env node
// Contrôles de qualité automatiques (CLAUDE.md, règles 2, 6, 8 bis et 9). Sans dépendance.
// À lancer APRÈS `next build` : il lit le HTML statique généré dans .next/server/app/.
// Toute erreur fait échouer le script (code 1) : la CI s'en sert comme garde-fou.
//
// Source : pas de couleur en dur ni de pixels dans les composants.
// HTML généré de chaque page : langue, une seule h1, titres sans saut, images avec alt, champs avec
// libellé, sections nommées, ancres internes existantes, robots cohérent avec SITE_INDEXABLE.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const racine = fileURLToPath(new URL("..", import.meta.url));
const erreurs = [];

// Pages générées à contrôler : à compléter quand une page est ajoutée (session 4 : pages légales).
const PAGES = { "/": "index.html", "/contact": "contact.html" };

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
const contenus = {};
for (const [route, nom] of Object.entries(PAGES)) {
  const chemin = join(racine, ".next", "server", "app", nom);
  if (existsSync(chemin)) contenus[route] = readFileSync(chemin, "utf8");
  else erreurs.push(`${route} : ${nom} introuvable (lancer « npm run build » avant ce script)`);
}
const idsDe = (page) => new Set([...page.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
const idsAccueil = idsDe(contenus["/"] ?? "");

for (const [route, page] of Object.entries(contenus)) {
  const signaler = (message) => erreurs.push(`${route} : ${message}`);
  const ids = idsDe(page);

  if (!/<html[^>]*\blang="fr"/.test(page)) signaler('<html lang="fr"> absent');
  if (!/<main\b/.test(page)) signaler("balise <main> absente");

  const titres = [...page.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  const nbH1 = titres.filter((n) => n === 1).length;
  if (nbH1 !== 1) signaler(`${nbH1} h1 au lieu d'une seule`);
  titres.forEach((n, i) => {
    if (i > 0 && n > titres[i - 1] + 1) signaler(`saut de titre h${titres[i - 1]} → h${n}`);
  });

  for (const img of page.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt=/.test(img[0])) signaler(`image sans attribut alt : ${img[0].slice(0, 80)}`);
  }
  for (const m of page.matchAll(/<section\b[^>]*aria-labelledby="([^"]+)"/g)) {
    if (!ids.has(m[1])) signaler(`aria-labelledby="${m[1]}" ne pointe vers aucun id`);
  }

  // Chaque champ de formulaire a un libellé associé.
  for (const m of page.matchAll(/<(?:input|select|textarea)\b[^>]*>/g)) {
    if (/type="hidden"/.test(m[0])) continue;
    const id = (m[0].match(/\bid="([^"]+)"/) ?? [])[1];
    if (!id || !page.includes(`for="${id}"`)) signaler(`champ sans libellé associé : ${m[0].slice(0, 80)}`);
  }

  // Ancres : « #x » vise la page courante, « /#x » la page d'accueil.
  for (const m of page.matchAll(/\bhref="(\/?)#([^"]+)"/g)) {
    const cibles = m[1] ? idsAccueil : ids;
    if (!cibles.has(m[2])) signaler(`le lien ${m[1]}#${m[2]} ne pointe vers rien`);
  }

  const robots = (page.match(/<meta name="robots" content="([^"]+)"/) ?? [])[1];
  const attendu = process.env.SITE_INDEXABLE === "true" ? "index, follow" : "noindex, nofollow";
  if (robots !== attendu) signaler(`meta robots « ${robots} », attendu « ${attendu} »`);
}

// ---------- Sortie
for (const e of erreurs) console.error(`ERREUR  ${e}`);
console.log(
  `\ncheck-qualite : ${erreurs.length} erreur(s), ${Object.keys(contenus).length} pages et ` +
    `${fichiersUi.length} fichiers de composants contrôlés.`,
);
if (erreurs.length > 0) process.exit(1);
