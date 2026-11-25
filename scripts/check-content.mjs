#!/usr/bin/env node
// Garde-fou de contenu (CLAUDE.md, règle 5). Sans dépendance.
//
// Bloquant en production (VERCEL_ENV=production) ou avec --strict :
//   - marqueurs [À COMPLÉTER] / [À VÉRIFIER] dans src/
//   - usages de VisuelProvisoire (hors sa définition)
//   - fichiers dans public/provisoire/
//   - termes interdits dans src/content/
//   - NEXT_PUBLIC_SITE_URL absente (URL canoniques, sitemap)
// Hors production : informe, sort avec 0.
// Les termes « à signaler » sont toujours de simples avertissements.

import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const racine = fileURLToPath(new URL("..", import.meta.url));
const strict =
  process.env.VERCEL_ENV === "production" || process.argv.includes("--strict");

const EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".css", ".md", ".mdx", ".json"]);

// Fichiers qui définissent les marqueurs : exclus de la recherche correspondante.
const DEFINITION_MARQUEURS = "src/content/marqueurs.ts";
const DEFINITION_VISUEL = "src/components/ui/visuel-provisoire.tsx";

// Normalisation : minuscules, sans accents.
const normaliser = (texte) =>
  texte.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

// Les motifs s'appliquent au texte normalisé.
const INTERDITS = [
  { nom: "guérir / guérison", re: /\bgueri\w*/g },
  { nom: "soigner", re: /\bsoigne(?:r|nt|ons|z|s)?\b/g },
  { nom: "traiter une pathologie", re: /\btrait(?:er|e|ent|ons|ez)\s+(?:une|des|la|les)\s+pathologies?\b/g },
  { nom: "traitement médical", re: /\btraitements?\s+medica(?:l|ux)\b/g },
  { nom: "cliniquement prouvé", re: /\bcliniquement\s+prouve\w*/g },
  { nom: "médicalement prouvé", re: /\bmedicalement\s+prouve\w*/g },
  { nom: "perte de poids garantie", re: /\bperte\s+de\s+poids\s+garantie?s?\b/g },
  { nom: "amincissant", re: /\bamincissan\w*/g },
  { nom: "minceur", re: /\bminceur\b/g },
];

const A_SIGNALER = [
  { nom: "thérapie / thérapeutique", re: /\btherap\w*/g },
  // « traitement médical » est déjà bloquant : on ne le compte pas deux fois.
  { nom: "traitement", re: /\btraitements?\b(?!\s+medica)/g },
  { nom: "soulager", re: /\bsoulag\w*/g },
  { nom: "patient", re: /\bpatient(?:e|es|s)?\b/g },
];

function lister(dossier) {
  if (!existsSync(dossier)) return [];
  const fichiers = [];
  for (const entree of readdirSync(dossier, { withFileTypes: true })) {
    const chemin = join(dossier, entree.name);
    if (entree.isDirectory()) fichiers.push(...lister(chemin));
    else fichiers.push(chemin);
  }
  return fichiers;
}

const rel = (chemin) => relative(racine, chemin).split(sep).join("/");
const extension = (nom) => nom.slice(nom.lastIndexOf("."));

const bloquants = [];
const avertissements = [];

function chercher(lignes, fichier, re, libelle, cible) {
  lignes.forEach((ligne, i) => {
    const motif = new RegExp(re.source, re.flags);
    if (motif.test(normaliser(ligne))) cible.push(`${fichier}:${i + 1}  ${libelle}`);
  });
}

// --- src/ : marqueurs et VisuelProvisoire
for (const chemin of lister(join(racine, "src"))) {
  if (!EXTENSIONS.has(extension(chemin))) continue;
  const fichier = rel(chemin);
  const lignes = readFileSync(chemin, "utf8").split(/\r?\n/);

  if (fichier !== DEFINITION_MARQUEURS) {
    for (const marqueur of ["[À COMPLÉTER]", "[À VÉRIFIER]"]) {
      lignes.forEach((ligne, i) => {
        if (ligne.includes(marqueur)) bloquants.push(`${fichier}:${i + 1}  marqueur ${marqueur}`);
      });
    }
    // Les marqueurs écrits dans les sources passent par les aides : la chaîne
    // littérale n'existe qu'à l'exécution, il faut donc détecter les appels.
    lignes.forEach((ligne, i) => {
      const appel = ligne.match(/\bA_(COMPLETER|VERIFIER)\s*\(/);
      if (appel) bloquants.push(`${fichier}:${i + 1}  appel de A_${appel[1]}()`);
    });
  }

  if (fichier !== DEFINITION_VISUEL) {
    lignes.forEach((ligne, i) => {
      if (ligne.includes("VisuelProvisoire")) {
        bloquants.push(`${fichier}:${i + 1}  usage de VisuelProvisoire`);
      }
    });
  }

  // --- src/content/ : vocabulaire
  if (fichier.startsWith("src/content/")) {
    for (const { nom, re } of INTERDITS) {
      chercher(lignes, fichier, re, `terme interdit « ${nom} »`, bloquants);
    }
    for (const { nom, re } of A_SIGNALER) {
      chercher(lignes, fichier, re, `à signaler pour relecture « ${nom} »`, avertissements);
    }
  }
}

// --- public/provisoire/
const dossierProvisoire = join(racine, "public", "provisoire");
if (existsSync(dossierProvisoire) && statSync(dossierProvisoire).isDirectory()) {
  for (const chemin of lister(dossierProvisoire)) {
    bloquants.push(`${rel(chemin)}  fichier provisoire`);
  }
}

// --- URL publique : sans elle, canoniques et sitemap pointeraient vers localhost.
if (!process.env.NEXT_PUBLIC_SITE_URL) {
  bloquants.push("NEXT_PUBLIC_SITE_URL  non définie dans l'environnement du build");
}

// --- Sortie
if (bloquants.length > 0) {
  console.log(strict ? "\nBLOQUANT :" : "\nÀ traiter avant la production :");
  for (const l of bloquants) console.log(`  ${l}`);
}
if (avertissements.length > 0) {
  console.log("\nAvertissements (ne bloquent jamais) :");
  for (const l of avertissements) console.log(`  ${l}`);
}

console.log(
  `\ncheck-content : ${bloquants.length} point(s) bloquant(s) en production, ` +
    `${avertissements.length} avertissement(s). Mode : ${strict ? "strict" : "informatif"}.`,
);

if (strict && bloquants.length > 0) {
  console.error("check-content : échec. On complète le contenu, on ne contourne pas le script.");
  process.exit(1);
}
