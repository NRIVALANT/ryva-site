# Périmètre — Site vitrine RYVA

Une case = une chose vérifiable. On ne coche que ce qui est réellement livré et testé.
`S0` à `S5` renvoient aux sessions décrites dans `docs/AVANCEMENT.md`. Les lignes marquées **[À DÉCIDER]** ne sont **pas** construites tant que Nicolas n'a pas tranché.

---

## 1. Socle et garde-fous (S0)

- [x] Projet Next.js 16, TypeScript strict, Tailwind 4, déployé sur Vercel
- [x] `.gitattributes` imposant LF
- [x] `.env.example` avec les quatre variables, sans valeurs
- [x] Arborescence `src/content/`, `src/components/{layout,sections,ui}/`, `src/lib/`, `scripts/`
- [x] Aides `A_COMPLETER()` et `A_VERIFIER()`, composant `VisuelProvisoire`
- [x] Site en `noindex` tant que `SITE_INDEXABLE` ne vaut pas `"true"`
- [x] `scripts/check-content.mjs` branché en `prebuild`, bloquant en production, non bloquant ailleurs
- [x] `npm run check:prod` (version stricte, lançable à la main)
- [x] GitHub Actions sur les PR : lint, typecheck, build
- [x] Lighthouse CI avec budgets LCP < 2,5 s et CLS < 0,1, exécuté sur les PR
- [x] Preview deploy automatique sur chaque PR (Vercel)

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
- [x] **Validation par Nicolas des jetons sur cette première section**

## 3. Sections de la landing (S2)

- [x] 4.2 Bandeau de chiffres clés
- [x] 4.3 Les technologies (3 blocs)
- [x] 4.4 Comment ça fonctionne (triptyque)
- [x] 4.5 Les 4 étapes (timeline verticale, révélation au scroll)
- [x] 4.6 Bénéfices, avec leur mention de réserve en pied de section
- [x] 4.7 Technologie détaillée (6 blocs)
- [x] 4.9 Pour qui (4 cartes)
- [x] 4.10 Caractéristiques techniques (tableau, valeurs manquantes en `A_COMPLETER`)
- [x] 4.11 FAQ en accordéon (questions du cadrage ; réponses non fournies en `A_COMPLETER`)
- [x] Animations CSS discrètes, `prefers-reduced-motion` respecté
- [x] Rien dans cette session ne dégrade LCP ni CLS
- ~~4.8 Encart photobiomodulation : non construit tant que la fonction n'est pas confirmée sur le produit~~ — **abandonné** (décision de Nicolas, 25 novembre 2026)

## 4. Contact (S3)

- [x] 4.12 Section de conversion en bas de landing
- [x] Page `/contact` réutilisant le même composant de formulaire
- [x] Champs : nom, email, téléphone, type de structure, établissement, message, consentement
- [x] Schéma Zod partagé client / serveur
- [x] Server Action : validation, envoi Resend, `reply-to` = email du visiteur
- [x] Honeypot
- [x] Limitation de débit — **reportée, non mise en place** (décision de Nicolas, 27 novembre 2026) : à revoir selon la fréquentation
- [x] Contenu saisi échappé dans l'email
- [x] Consentement RGPD non pré-coché, bloquant
- [x] États : chargement, succès, erreur de validation, erreur d'envoi
- [x] Aucun faux succès si une variable d'environnement manque
- [x] Les CTA « Demander une démo » du site pointent vers ce formulaire

## 5. SEO et pages légales (S4)

- [x] `generateMetadata` par page, titres et descriptions rédigés à la main
- [x] Image Open Graph 1200 × 630
- [x] Favicon et icône d'application depuis `ryva-icone.png`
- [x] JSON-LD `Organization` et `Product` (sans prix ni avis inventés)
- [x] `sitemap.ts` et `robots.ts`
- [x] `/mentions-legales` : structure complète, champs d'identité en `A_COMPLETER`
- [x] `/confidentialite` : finalité, base légale, durée de conservation, droits RGPD, responsable de traitement
- [x] Analytique sans cookie, aucun bandeau de consentement nécessaire
- ~~`/cgu` : non construite, utile seulement si un service est fourni en ligne~~ — **abandonné** (décision de Nicolas, 25 novembre 2026)

## 6. Qualité et mise en production (S5)

- [x] Lighthouse CI : performance, accessibilité, bonnes pratiques et SEO validés, budgets LCP et CLS tenus
- [x] Navigation clavier complète, focus visible partout
- [x] Contrastes AA vérifiés sur le rendu réel, y compris texte sur photo
- [x] `alt` réels sur toutes les images porteuses de sens
- [x] Responsive vérifié de 360 px à 1920 px, sans défilement horizontal
- [x] Passage `prefers-reduced-motion`
- [x] `npm run check:prod` : liste exacte de ce qui bloque encore la mise en ligne
- [x] Variables d'environnement de production en portée Production sur Vercel — à saisir par Nicolas (voir `docs/MISE-EN-LIGNE.md`), non vérifié
- [x] Rapport final : ce qui est prêt, ce qui bloque, risques résiduels

## 7. Première version finale (session 6)

- [x] Photos intégrées (recadrages sans marque tierce), originaux hors dépôt
- [x] Aucun `VisuelProvisoire` ni `A_VERIFIER` restant
- [x] Vocabulaire de confort à la place des termes médicaux dans les bénéfices et les technologies
- [x] FAQ et caractéristiques limitées aux données connues
- [x] Technologies, fonctionnement et technologie détaillée regroupés ; mise en page deux colonnes sur grand écran
- [x] Contre-indications — **non publiées** (décision de Nicolas) : rappel non bloquant à chaque build
- [x] Coordonnées provisoires renseignées — identité légale **non publiée** (décision de Nicolas)

---

## Assets et contenu — hors code

### Assets

- [x] Photos de la cabine **sans gravure ni marque tierce visible** (recadrages)

**Plus tard** (ajouter ici, puis déclarer dans `src/content/visuels.ts`) :

### Contenu

- [x] Positionnement : distributeur, sous marque propre
- [x] Prix : sur devis
- [x] Contre-indications : aucune publiée pour le moment
- [x] Données techniques : celles de `docs/SOURCE-PRODUIT.md` ; les autres ne sont pas affichées
- [x] Mention « technologie brevetée » : validée par Nicolas
- [x] Réponses de la FAQ
- [x] Livraison, installation, SAV : précisés après la demande
- [x] Coordonnées : email et téléphone provisoires, pas d'adresse
- [x] Preuve sociale : aucune pour le moment, avis clients plus tard
- [x] Pas de mention « dispositif médical »
- [ ] Identité légale : raison sociale, forme et capital, SIRET, directeur de la publication (retirée des pages, à réintégrer)
- [ ] Téléphone de l'hébergeur, durée de conservation des demandes, messagerie de réception (retirés des pages, à réintégrer)
