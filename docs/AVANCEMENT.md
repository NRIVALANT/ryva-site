# Avancement — registre détaillé des sessions

Tenu à jour en fin de chaque session. Les décisions encore en vigueur sont résumées dans `CLAUDE.md`, section Avancement ; le détail des cases se lit dans `docs/PERIMETRE.md`. Les mentions « §4.x » renvoient au tableau de `docs/CADRAGE.md` §4 ; `PROMPTS.md` a depuis été supprimé (voir l'historique git).

### Session 0 — Socle (fusionnée dans `main`, PR #1)
- Livré : `.env.example` suivi par git, marqueurs `A_COMPLETER` / `A_VERIFIER`, `VisuelProvisoire`, `check-content.mjs` (prebuild + `check:prod`), `noindex` par défaut, CI GitHub Actions, Lighthouse CI.
- Choix actés :
  - Le garde-fou détecte aussi les **appels** `A_COMPLETER(` / `A_VERIFIER(` dans les sources : la chaîne littérale n'existe qu'à l'exécution.
  - `next.config.ts` garde la règle Turbopack `@tailwindcss/turbopack` (le projet n'a pas `@tailwindcss/postcss`). `cacheComponents` et `partialPrefetching` ont été retirés.
  - Le paquet `cn`, `button.tsx` et `src/lib/utils.ts` ont été supprimés. Un `cn` (`clsx` + `tailwind-merge`) reviendra avec le premier composant shadcn, sur accord.
- Toujours en attente, côté Nicolas : protection de `main`, vérification des previews Vercel.
- Pas de Chrome sur le poste : Lighthouse CI tourne sur GitHub. En local, `lighthouse` installé hors du projet sait piloter Edge.

### Session 1 — Contenu typé, jetons, header, hero (fusionnée dans `main`, PR #2)
Branche `feat/01-contenu-tokens`. Nicolas commite, pousse et ouvre la PR lui-même.
- Livré : les 11 fichiers de `src/content/`, jetons sombres dans `globals.css`, `src/lib/marque.ts`, header (menu mobile client), barre CTA mobile, footer, hero avec `VisuelProvisoire`, composant `LienBouton`.
- Jetons validés par Nicolas le 25 novembre 2026.
- Choix actés :
  - Règle 8 bis : tailles en rem, jamais en px. Titre du hero fluide de 2 rem à 3,5 rem.
  - Deux tailles de texte **provisoires** hors charte : `texte-corps-vitrine` (1 rem / 1,5 rem) et `texte-sous-titre` (1,125 rem / 1,75 rem), à ajouter à `docs/tokens.json` ou à remplacer.
  - Mention de réserve des bénéfices **reformulée** par rapport au cadrage §4.6 : le cadrage emploie un terme du vocabulaire interdit, même en négation. Elle reste en `A_VERIFIER`.
  - Bouton secondaire : bordure en `texte-secondaire` (8,5:1) et non `bordure-forte` (environ 1,7:1, sous les 3:1 exigés pour un composant).
  - CTA du header à partir de 768 px ; en dessous, la barre fixe du bas fait office de CTA permanent. Menu d'ancres sous 1024 px.
  - `ryva-icone.png` est en RGB sans alpha : coins blancs à traiter en session 4.
  - Les ancres (`#technologies`…, `#contact`) et les liens du footer (`/mentions-legales`, `/confidentialite`) pointent vers des pages ou sections créées plus tard (sessions 2 à 4).

### Session 2 — Sections de la landing (fusionnée dans `main`, PR #3)
- Direction visuelle **B (futuriste sombre)** choisie par Nicolas ; l'UX est un point prioritaire ; tout doit rester modulable.
- Livré : les 9 sections (§4.2 à §4.7, §4.9 à §4.11) dans `src/components/sections/`, composants partagés `Section`, `Carte`, `CtaSection` dans `src/components/ui/`, header en pastille flottante, ordre de la page dans `src/app/page.tsx`. Non construits : §4.8 (abandonné), §4.12 (fait en session 3).
- Les effets vivent tous dans `globals.css` (bloc EFFETS) : `revele`, `jauge`, `compteur`, `repere`, `accordeon`. CSS pur, contenu visible par défaut, désactivés si `prefers-reduced-motion` ou si le navigateur ne supporte pas `animation-timeline`.
- Choix actés :
  - FAQ en éléments `<details name="faq">` natifs, sans dépendance ni JavaScript (écart assumé avec le prompt, qui demandait l'accordéon shadcn). `clsx` et `tailwind-merge` ne sont donc toujours pas installés.
  - Compteur CSS (`@property`) sur les trois chiffres simples. Piège résolu : le `counter-reset` doit être sur l'élément animé, pas sur son pseudo-élément, sinon l'écran reste à 0.
  - Grands chiffres en style `affiche`. Un seul `VisuelProvisoire` ajouté (§4.3, trois blocs).
  - Sections numérotées par un compteur CSS (le numéro suit l'ordre de la page).
  - Les titres h2 sont dans `site.titres` ; les ancres dans `ancres` (`site.ts`).
- Contrôles automatiques ajoutés : `npm run check:qualite` (`scripts/check-qualite.mjs`, à lancer après le build, branché dans `ci.yml`) : couleurs en dur, `px`, une seule h1, titres sans saut, images avec alt, sections nommées, ancres existantes, noindex. L'ancre `#contact` est tolérée en avertissement jusqu'à la session 3 : **retirer `ANCRES_EN_ATTENTE` du script quand le formulaire existera.**
- Les runs des PR #1 à #3 n'ont jamais démarré (`startup_failure`, blocage côté compte GitHub, levé depuis : voir « Correctif CI »).
- LCP : mesuré à 109 ms sans bridage, 0,9 à 1,7 s avec le bridage DevTools de Lighthouse, mais la simulation de Lighthouse donne 2,4 à 2,6 s en local (Edge, Windows), même avec le hero seul. Leviers testés sans effet : polices en `display: optional`, `preload: false` sur Geist Mono, `inlineCss`. Gardé : `sizes` sur les logos.
- Lighthouse local (Edge via `lighthouse` installé hors du projet) : accessibilité 100, bonnes pratiques 100, SEO 63 (le `noindex` volontaire fait échouer « page explorable »).

### Session 3 — Formulaire de contact (fusionnée dans `main`, PR #4)
- Livré : `src/content/contact.ts`, `src/lib/contact/` (`champs`, `schema`, `email`, `traiter`, `action`), `src/components/contact/` (formulaire et section), page `/contact`, tests `npm test` (lanceur intégré à Node, aucune dépendance), branchés dans `ci.yml`.
- Anti-abus retenu (option A) : honeypot (`ne_pas_remplir`, erreur générique) **plus une règle de limitation de débit dans le pare-feu Vercel, à créer par Nicolas** : méthode POST sur `/` et `/contact`, fenêtre fixe de 10 minutes, 5 requêtes par IP. Elle n'est ni dans le dépôt ni testable en local. Tant qu'elle n'est pas créée, le formulaire n'a que le honeypot.
- Choix actés : champs HTML natifs (pas de shadcn) ; obligatoires : nom, email, type de structure, consentement ; `traiter.ts` est indépendant de Next et de Resend pour être testé ; Zod n'est chargé qu'à la première interaction avec le formulaire (`champs.ts` ne doit pas l'importer) ; lien de confidentialité en nouvel onglet ; erreurs en jeton `danger` ; liens du header et CTA en `/#…` ; barre CTA mobile masquée sur `/contact` (`data-sans-cta-mobile`).
- `CONTACT_TO_EMAIL` est l'adresse personnelle de Nicolas pour le moment, uniquement dans `.env.local` / Vercel, jamais dans le dépôt.
- **Envoi réel testé en local** (25 novembre 2026) : accepté par Resend, états « chargement » et « succès » vérifiés. `.env.local` ne contenait pas `CONTACT_FROM_EMAIL` : à ajouter (`onboarding@resend.dev` tant qu'aucun domaine n'est vérifié).
- Développement : `.env.local`. Clés de production : uniquement dans Vercel, portée Production (règle 10 inchangée).
- LCP simulé par Lighthouse en local sur `/` : 2,67 s (budget 2,5 s) ; 1,8 s avec bridage DevTools ; JS 160 Ko.
- `next` et `eslint-config-next` mis à jour en 16.4.6 (sécurité). Reste une alerte « moderate » sur `minimatch`, via `shadcn` (outil de développement), non traitée.
- Avertissement de build connu depuis la session 2 : `:target-current` non reconnu par le minifieur CSS (le repère de section active fonctionne).
- À vérifier avec le client avant mise en ligne : le plan Hobby de Vercel est réservé à un usage non commercial.
- Décisions du 25 novembre 2026 : jetons de la session 1 **validés** ; §4.8 (photobiomodulation) et page `/cgu` **abandonnés** ; règle de limitation de débit à créer plus tard dans Vercel (avant la mise en ligne).

### Correctif CI (branche `fix/ci`, PR à ouvrir par Nicolas)
La CI a démarré pour la première fois sur la PR #4, avec deux échecs.
- **Typecheck** (`Cannot find name 'LayoutProps'`) : ce type est généré par Next et le typecheck tourne avant le build. Le script est désormais `next typegen && tsc --noEmit`. Utiliser `npm run typecheck`, pas `tsc` seul sur un clone neuf.
- **LCP** (2622 ms pour un budget de 2500 ms) : le texte du hero est peint dès le premier affichage ; l'écart vient du modèle de simulation de Lighthouse, qui compte le JavaScript déjà téléchargé comme un préalable à ce texte. Choix validé par Nicolas : `throttlingMethod: "devtools"` dans `lighthouserc.json` (bridage réellement appliqué). Budget inchangé et toujours bloquant. Médianes locales sur `/` : 2666 ms en simulation, 1683 ms en bridage appliqué ; sans le formulaire, encore 2576 ms en simulation (le différer ne suffisait pas).
- Conséquence : PageSpeed Insights, qui simule en laboratoire, peut afficher un LCP supérieur à celui de la CI.
- **Échec Vercel sur `main`** : voulu. Le déploiement de `main` est la production, où `check-content.mjs` bloque (31 points au 25 novembre 2026). Les previews de PR passent. Le script n'est pas modifié.
- Décision de Nicolas : **`main` reste la branche de production**. Le déploiement Vercel de `main` continuera donc d'échouer jusqu'à ce que le contenu soit complet : c'est attendu, ne pas le traiter comme une panne.

### Session 4 — SEO et pages légales (branche `feat/04-seo-legal`, PR à ouvrir par Nicolas)
- Le correctif CI est fusionné (PR #5) : les deux jobs sont verts sur GitHub.
- Livré : `src/content/seo.ts`, `src/lib/metadonnees.ts` (titre, description, canonique, partage), `robots.ts`, `sitemap.ts`, image Open Graph et icônes générées par `next/og` (aucune dépendance), JSON-LD sur l'accueil, pages `/mentions-legales` et `/confidentialite`.
- Analytique : **Vercel Web Analytics** (`@vercel/analytics`, accord de Nicolas à condition que ce soit gratuit). Gratuit sur Hobby jusqu'à 50 000 événements par mois, sans surfacturation ; pas d'événements personnalisés sur ce plan. Sur Pro, les événements sont facturés (0,03 $ les 1 000, imputés sur le crédit mensuel). Le script n'est rendu que sur Vercel. **À activer par Nicolas** dans le tableau de bord (projet, onglet Analytics).
- Choix actés :
  - Export `metadata` statique par page (équivalent à `generateMetadata`, les pages n'ayant aucune donnée dynamique).
  - Description de l'accueil composée à partir du cadrage §4.1, en `A_VERIFIER`.
  - Sans domaine, l'URL vaut `localhost` hors production ; `check-content.mjs` bloque désormais la production si `NEXT_PUBLIC_SITE_URL` manque.
  - Non indexable : `robots.txt` interdit tout, en plus du `noindex`.
  - Coins blancs de `ryva-icone.png` masqués par un arrondi à la génération ; le fichier source n'est pas modifié. `favicon.ico` par défaut supprimé.
  - La garantie est détaillée dans les mentions légales (commerciale 1 an, légale de conformité 2 ans pour un consommateur), en `A_VERIFIER`.
  - `check:qualite` contrôle les quatre pages, plus titre, description, canonique, image de partage et JSON-LD.
- `check:prod` : 51 points bloquants (les nouveaux viennent des pages légales, de la description et de l'URL). Les 5 avertissements sont « soulager » et « traitement » au sens du traitement des données.
- LCP en bridage appliqué, en local : 1660 ms (médiane).
- Avant mise en ligne : remplacer l'adresse personnelle de réception par une adresse professionnelle (son fournisseur est un sous-traitant à déclarer).
- Consigne du 25 novembre 2026 : pour les sessions 4 et 5, Claude valide lui-même ses plans. Restent soumis à Nicolas : dépendances, données inconnues ; une PR par session.

### Session 5 — Qualité et mise en production (branche `feat/05-qualite`, PR à ouvrir par Nicolas)
- Sessions 4 (PR #6) et analytique (PR #7) fusionnées.
- Rapport et étapes de mise en ligne : `docs/MISE-EN-LIGNE.md`.
- Corrigé : focus caché sous la barre CTA mobile (`scroll-padding-bottom`) ; premier lien du menu actif en haut de page ; 404 par défaut en anglais (`not-found.tsx`, contrôlée par `check:qualite`) ; images en AVIF puis WebP ; logo du header chargé sans différé.
- Lighthouse CI durci : quatre pages ; performance ≥ 0,90, accessibilité, bonnes pratiques et SEO ≥ 0,95, en erreur ; LCP et CLS inchangés. `is-crawlable` est ignoré (le `noindex` est volontaire).
- Cases laissées décochées : Lighthouse CI (à cocher quand la CI de la PR est verte) ; contrastes sur rendu réel (pas encore de photo) ; variables Vercel de production.
- La refonte de mise en page évoquée (regroupement des sections, rythme, hero) n'est pas faite : à décider par Nicolas.

La consigne de validation autonome des plans ne valait que pour les sessions 4 et 5 : elle est close.

## Amendements du cadrage par rapport à la v1

| Point | v1 | v2 | Raison |
|---|---|---|---|
| Typographie (§5, §6) | Une grotesque pour les titres, une sans-serif pour le corps | **Geist** et **Geist Mono** | Charte RYVA, commune au CRM |
| Palette (§5) | Décrite à la main | Jetons de `docs/tokens.json`, thème sombre | Charte RYVA |
| Étape 03 (§4.5) | « La thérapie » | « La chaleur et les vibrations » | Vocabulaire du soin proscrit par §9 |
| Bénéfices (§4.6) | « thérapie par vibration » | « la vibration » | Idem |
| SONIC PULSE CORE (§4.7) | « brevetée » affirmé | « brevetée » à vérifier | Affirmation produit non confirmée |
| Formulaire (§4.12) | Section ou modale | Section en bas de landing **et** page `/contact`, même composant | Pas de modale : plus simple, plus accessible |
| Limitation de débit (§6) | « rate limiting » | Doit fonctionner sur serverless, option à choisir en session 3 | Un compteur en mémoire ne protège de rien sur Vercel |
| Indexation (§8) | Non précisée | `noindex` tant que `SITE_INDEXABLE` ≠ `"true"` | Rien en ligne avant que le contenu soit prêt |
| Découpage (§11) | 8 heures de développement | 6 sessions, voir `docs/PROMPTS.md` | Même méthode que le CRM |
| Garde-fou (§12) | Absent | `scripts/check-content.mjs` bloque la production tant qu'il reste un marqueur | Rien ne part en ligne par accident |
