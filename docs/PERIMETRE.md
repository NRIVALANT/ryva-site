# Périmètre — Site vitrine RYVA

Une case = une chose vérifiable. On ne coche que ce qui est réellement livré et testé.
`S0` à `S5` renvoient aux sessions de `docs/PROMPTS.md`. Les lignes marquées **[À DÉCIDER]** ne sont **pas** construites tant que Nicolas n'a pas tranché.

---

## 1. Socle et garde-fous (S0)

- [ ] Projet Next.js 16, TypeScript strict, Tailwind 4, déployé sur Vercel
- [x] `.gitattributes` imposant LF
- [x] `.env.example` avec les quatre variables, sans valeurs
- [x] Arborescence `src/content/`, `src/components/{layout,sections,ui}/`, `src/lib/`, `scripts/`
- [x] Aides `A_COMPLETER()` et `A_VERIFIER()`, composant `VisuelProvisoire`
- [x] Site en `noindex` tant que `SITE_INDEXABLE` ne vaut pas `"true"`
- [x] `scripts/check-content.mjs` branché en `prebuild`, bloquant en production, non bloquant ailleurs
- [x] `npm run check:prod` (version stricte, lançable à la main)
- [ ] GitHub Actions sur les PR : lint, typecheck, build
- [ ] Lighthouse CI avec budgets LCP < 2,5 s et CLS < 0,1, exécuté sur les PR
- [ ] Preview deploy automatique sur chaque PR (Vercel)

## 2. Contenu typé et identité (S1)

- [x] `src/content/` : `site.ts`, `hero.ts`, `stats.ts`, `technologies.ts`, `steps.ts`, `benefits.ts`, `specs.ts`, `faq.ts`, `segments.ts`, `legal.ts`, `ui.ts`
- [x] Chaque donnée du cadrage est reprise fidèlement ; chaque donnée manquante est en `A_COMPLETER`
- [x] Jetons de la charte (thème sombre) déclarés dans `globals.css`, uniquement ceux utilisés
- [x] Geist et Geist Mono chargées via `next/font`
- [x] Logotype (`ryva-logotype-blanc.png`) intégré au header
- [x] Header sticky translucide avec ancres et CTA permanent « Demander une démo »
- [x] CTA fixe en bas d'écran sur mobile
- [x] Footer minimal (liens légaux, rappel de réserve)
- [x] Section Hero (4.1) complète
- [ ] **Validation par Nicolas des jetons sur cette première section**

## 3. Sections de la landing (S2)

- [ ] 4.2 Bandeau de chiffres clés
- [ ] 4.3 Les technologies (3 blocs)
- [ ] 4.4 Comment ça fonctionne (triptyque)
- [ ] 4.5 Les 4 étapes (timeline verticale, révélation au scroll)
- [ ] 4.6 Bénéfices, avec leur mention de réserve en pied de section
- [ ] 4.7 Technologie détaillée (6 blocs)
- [ ] 4.9 Pour qui (4 cartes)
- [ ] 4.10 Caractéristiques techniques (tableau, valeurs manquantes en `A_COMPLETER`)
- [ ] 4.11 FAQ en accordéon (questions du cadrage ; réponses non fournies en `A_COMPLETER`)
- [ ] Animations CSS discrètes, `prefers-reduced-motion` respecté
- [ ] Rien dans cette session ne dégrade LCP ni CLS
- [ ] **[À DÉCIDER]** 4.8 Encart photobiomodulation : non construit tant que la fonction n'est pas confirmée sur le produit

## 4. Contact (S3)

- [ ] 4.12 Section de conversion en bas de landing
- [ ] Page `/contact` réutilisant le même composant de formulaire
- [ ] Champs : nom, email, téléphone, type de structure, établissement, message, consentement
- [ ] Schéma Zod partagé client / serveur
- [ ] Server Action : validation, envoi Resend, `reply-to` = email du visiteur
- [ ] Honeypot
- [ ] Limitation de débit effective sur serverless (option validée par Nicolas)
- [ ] Contenu saisi échappé dans l'email
- [ ] Consentement RGPD non pré-coché, bloquant
- [ ] États : chargement, succès, erreur de validation, erreur d'envoi
- [ ] Aucun faux succès si une variable d'environnement manque
- [ ] Les CTA « Demander une démo » du site pointent vers ce formulaire

## 5. SEO et pages légales (S4)

- [ ] `generateMetadata` par page, titres et descriptions rédigés à la main
- [ ] Image Open Graph 1200 × 630
- [ ] Favicon et icône d'application depuis `ryva-icone.png`
- [ ] JSON-LD `Organization` et `Product` (sans prix ni avis inventés)
- [ ] `sitemap.ts` et `robots.ts`
- [ ] `/mentions-legales` : structure complète, champs d'identité en `A_COMPLETER`
- [ ] `/confidentialite` : finalité, base légale, durée de conservation, droits RGPD, responsable de traitement
- [ ] Analytique sans cookie, aucun bandeau de consentement nécessaire
- [ ] **[À DÉCIDER]** `/cgu` : non construite, utile seulement si un service est fourni en ligne

## 6. Qualité et mise en production (S5)

- [ ] Lighthouse CI : performance, accessibilité, bonnes pratiques et SEO validés, budgets LCP et CLS tenus
- [ ] Navigation clavier complète, focus visible partout
- [ ] Contrastes AA vérifiés sur le rendu réel, y compris texte sur photo
- [ ] `alt` réels sur toutes les images porteuses de sens
- [ ] Responsive vérifié de 360 px à 1920 px, sans défilement horizontal
- [ ] Passage `prefers-reduced-motion`
- [x] `npm run check:prod` : liste exacte de ce qui bloque encore la mise en ligne
- [ ] Variables d'environnement de production en portée Production sur Vercel
- [ ] Rapport final : ce qui est prêt, ce qui bloque, risques résiduels

---

## Assets et contenu — hors code, bloquants pour la mise en ligne

Ces éléments ne s'implémentent pas : ils se fournissent. Tant qu'ils manquent, le site reste en preview.

### Assets

- [ ] Photos HD de la cabine **sans gravure ni marque tierce visible** (les photos actuelles portent la gravure « didi doctor » : à ne pas publier telles quelles)
- [ ] Photos d'ambiance (clinique, salle de sport)
- [ ] Vidéo de hero, 10–15 s, muette, en boucle (recommandée)
- [ ] Logotype vectoriel (SVG) et version monochrome aplatie du vol
- [ ] Coquille typographique « PERFORN » corrigée dans le fichier source du logotype

### Contenu

- [ ] Positionnement : fabricant ou distributeur ? marque propre ou revendue ? (conditionne les mentions légales et les obligations produit)
- [ ] Prix affiché ou « sur devis »
- [ ] Contre-indications fournies par le fabricant
- [ ] Données techniques : poids, puissance, niveau sonore, plage de fréquences, poids utilisateur maximal
- [ ] Vérification de la mention « technologie brevetée » (4.7)
- [ ] Réponses de la FAQ
- [ ] Conditions de livraison, installation, SAV
- [ ] Coordonnées : email pro, téléphone, adresse
- [ ] Preuve sociale réelle, ou aucune (jamais fabriquée)
- [ ] Mention « dispositif médical » ou non : à confirmer avec le fabricant

### Administratif et infrastructure

- [ ] Nom de domaine acheté et DNS accessibles
- [ ] Email professionnel avec SPF / DKIM
- [ ] Domaine d'envoi vérifié chez Resend
- [ ] Limitation de débit configurée (selon l'option retenue en S3)
- [ ] Branche `main` protégée
- [ ] Relecture juridique des textes
