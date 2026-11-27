# CLAUDE.md — Site vitrine Cabine RYVA

Ce fichier fait foi. Lis-le en entier au début de chaque session.

## Le projet

Site vitrine statique de la **cabine RYVA** (récupération par vibrations soniques et chaleur infrarouge), en **français uniquement**. Une landing en long scroll, un formulaire de contact qualifié, des pages légales. Rien d'autre.

Critère de succès : le nombre de demandes de démo qualifiées. Tout ce qui ne sert pas ce chiffre est secondaire.

Documents de référence, par ordre d'autorité :

1. `CLAUDE.md` — règles (ce fichier)
2. `docs/PERIMETRE.md` — ce qui est à construire, en cases à cocher
3. `docs/CADRAGE.md` — contenu éditorial, structure des sections, contraintes juridiques
4. `docs/CHARTE.md` et `docs/tokens.json` — charte graphique RYVA (jetons de couleur, typo, espacement)
5. `docs/PROMPTS.md` — découpage en sessions

## Stack

Next.js 16 (App Router, `src/`), TypeScript strict, Tailwind CSS 4, shadcn/ui, Zod, react-hook-form, Resend, Vercel.

- Tailwind 4 n'a **pas** de `tailwind.config` : les jetons se déclarent dans `src/app/globals.css` via `@theme`.
- Toutes les pages sont **rendues statiquement**. Seul le formulaire de contact exécute du code serveur (une Server Action).
- Composants serveur par défaut. `"use client"` uniquement quand c'est indispensable (formulaire, accordéon, header interactif).
- shadcn : n'installer que les composants effectivement utilisés, au moment où on s'en sert.
- **Aucune dépendance nouvelle sans mon accord explicite.** Pas de bibliothèque d'animation, pas de lib de carrousel, pas de lib d'icônes supplémentaire : propose, attends, puis installe.

## Règles absolues

### 1. Construire uniquement ce qui est dans `docs/PERIMETRE.md`
Une idée hors périmètre se signale, elle ne s'implémente pas. Liste permanente de ce qui est **hors périmètre** : e-commerce et paiement en ligne, compte utilisateur, back-office, CMS, blog, configurateur, espace revendeur, multilingue, chat en direct, popups, newsletter, pixels publicitaires, Google Analytics, vidéo YouTube intégrée.

### 2. Aucune chaîne éditoriale dans le JSX
Tout texte visible vient de `src/content/` (fichiers TypeScript typés), y compris les libellés de formulaire, les messages d'erreur et les `aria-label`. Un composant reçoit des données, il ne contient pas de prose. C'est ce qui permet de modifier un texte sans toucher au JSX et de brancher un CMS ou une seconde langue plus tard.

### 3. Ne jamais inventer
C'est la règle la plus importante de ce projet. Une donnée absente du cadrage n'est **pas** à deviner, à « compléter de façon plausible » ni à reprendre d'un site concurrent.

Sont concernés, sans exhaustivité : caractéristiques techniques (poids, puissance, niveau sonore, plage de fréquences), prix, délais de livraison, coordonnées, identité juridique (SIRET, éditeur), contre-indications, références clients, témoignages, logos de partenaires, chiffres de fréquentation, certifications, brevets, noms de laboratoires ou d'études.

Quand une donnée manque : utilise l'aide `A_COMPLETER("description de ce qui manque")` de `src/content/marqueurs.ts`, qui produit le texte `[À COMPLÉTER] description de ce qui manque`. Quand un texte est rédigé mais doit être validé avant publication (mention juridique, allégation, affirmation produit) : `A_VERIFIER("texte")`, qui produit `[À VÉRIFIER] texte`. Pour un visuel manquant, utilise le composant `VisuelProvisoire`. Ces trois marqueurs sont détectés par le garde-fou de production (voir ci-dessous).

**Les contre-indications sont critiques pour la santé** : ne les rédige jamais toi-même, même à titre provisoire, même en reprenant une liste « typique ». Elles restent en `A_COMPLETER` jusqu'à ce que le fabricant les fournisse.

### 4. Allégations de santé : règles de rédaction
Le site présente un produit de bien-être dont les bénéfices touchent à des revendications encadrées. Sur **tout** le site :

- Toute allégation est **attribuée** à la marque : « la marque présente… », « est présenté comme… », « selon le fabricant… ». Jamais énoncée comme un fait établi.
- Jamais de promesse de résultat. Conditionnel ou formulation attribuée, systématiquement.
- Vocabulaire interdit : *guérir, guérison, soigner, traiter une pathologie, traitement médical, cliniquement prouvé, médicalement prouvé, perte de poids garantie, amincissant, minceur*. Vocabulaire à éviter et à signaler pour relecture : *thérapie, thérapeutique, traitement, soulager, patient*.
- Aucune image ni formulation de type avant/après, surtout liée au poids.
- Le bloc « Bénéfices » porte obligatoirement sa mention de réserve (voir `docs/CADRAGE.md` §4.6).
- La mention de garantie distingue **garantie commerciale du fabricant** et **garantie légale de conformité** : jamais « garantie 1 an » seul.

Ces règles ne remplacent pas une relecture par un juriste, nécessaire avant mise en ligne.

### 5. Garde-fou de production
`scripts/check-content.mjs` s'exécute avant chaque build (`prebuild`). Il échoue si, en production (`VERCEL_ENV=production`) ou avec `npm run check:prod`, il trouve :

- la chaîne `[À COMPLÉTER]` ou `[À VÉRIFIER]` dans `src/` ou `src/content/` ;
- un usage du composant `VisuelProvisoire` ;
- un fichier dans `public/provisoire/` ;
- un terme de la liste « interdit » de la règle 4.

Hors production (preview, local, CI), il affiche le décompte et **ne bloque pas**. Ne jamais contourner ni affaiblir ce script pour « faire passer » un build : on complète le contenu.

### 6. Charte graphique : les jetons, rien que les jetons
Le site applique la charte RYVA (`docs/CHARTE.md`, `docs/tokens.json`), dans son **thème sombre**. C'est la couche « marque » : fond sombre, cèdre, infrarouge, grandes images.

- Aucune valeur hexadécimale dans un composant : tout passe par les variables déclarées dans `globals.css` depuis `docs/tokens.json`. Ne déclarer que les jetons réellement utilisés.
- Typographie : **Geist** (interface et titres) et **Geist Mono** (valeurs techniques, tableau des spécifications), via `next/font`. Deux familles, pas une de plus.
- **Contrastes interdits** : texte blanc sur `infrarouge` (4,04:1) ; `infrarouge` en texte sur fond clair. Sur fond sombre, le bouton primaire est en `action` (`#E8774E`) avec un texte `marque-noir` (6,52:1) ; son survol utilise `action-forte` (`#D4572A`, texte noir 4,72:1). `infrarouge-fort` (`#B4461D`) est le seul orange qui accepte du texte blanc (5,48:1).
- Le **cèdre** et l'**infrarouge** servent de repères, avec parcimonie. Pas de dégradé orange décoratif, pas de « lueur » sur tout.
- Toute image sous du texte reçoit un overlay sombre garantissant 4,5:1.

### 7. Logotype
- Les fichiers sont dans `public/brand/`. Le mot RYVA est un **dessin** : ne jamais le retaper dans une police, ne jamais le recolorer en cèdre, infrarouge ou autre couleur. Le logotype est achromatique.
- Sur le site (fond sombre), utiliser `ryva-logotype-blanc.png` (vol argent + mot blanc). `ryva-logotype.png` (mot noir) est réservé aux fonds clairs.
- `ryva-vol.png` seul sous 24 px de haut ; `ryva-icone.png` pour le favicon et l'icône d'application.
- Il n'existe pas encore de version SVG. En attendant, utiliser ces PNG via `next/image` avec `width`/`height` explicites. Ne pas tenter de redessiner ou de vectoriser le logotype.
- Mentionner « RYVA » en texte courant dans les contenus est évidemment permis ; la règle vise le logotype.
- Ne pas reproduire de gravure, de marque ou de nom tiers visible sur une photo (voir `docs/PERIMETRE.md`, section Assets).

### 8. Performance
Budgets : **LCP < 2,5 s, CLS < 0,1**, appliqués par Lighthouse CI dès la première PR.

- `priority` sur **le seul** visuel du hero. `next/image` partout ailleurs, avec `sizes`, AVIF/WebP, dimensions explicites.
- Animations : CSS en priorité (scroll-driven animations, transitions). Respecter `prefers-reduced-motion`. Aucune animation ne doit retarder le LCP ni déplacer la mise en page.
- Pas de JavaScript client pour ce que CSS sait faire.
- Pas de vidéo en lecture automatique avec son. Une vidéo de hero éventuelle est muette, en boucle, avec une image de remplacement (`poster`) et ne se charge pas sur connexion économe.

### 8 bis. Responsive et unités
Le site est responsive de 360 px à 1920 px, mobile d'abord. Les tailles s'expriment en **`rem`** (ou en `em`, `%`, `vw`/`svh`, `clamp()`), jamais en `px` pour les tailles de texte, les espacements, les hauteurs de contrôle et les largeurs de mise en page. Les valeurs en pixels de `docs/tokens.json` sont converties en `rem` (px ÷ 16) quand on les déclare dans `globals.css`.

- Les titres de vitrine sont **fluides** (`clamp()` entre la taille mobile et la taille bureau de la charte), pas un saut brutal à un point de rupture.
- Seule exception tolérée : les filets de 1 px (bordures, séparateurs).
- Les points de rupture sont ceux de Tailwind (déjà en `rem`). Aucune largeur fixe en pixels, aucun défilement horizontal.
- Toute fonctionnalité est vérifiée et utilisable sur mobile, pas seulement sur bureau.

### 9. Accessibilité
Contrastes AA vérifiés, navigation clavier complète, focus toujours visible, `alt` réels et descriptifs sur toute image porteuse de sens (`alt=""` sur le décoratif), une seule `h1` par page, hiérarchie de titres sans saut, formulaire avec libellés associés et erreurs annoncées.

### 10. Secrets et environnement
- Aucun secret dans le dépôt, jamais. Les noms de variables vivent dans `.env.example` (sans valeurs).
- `RESEND_API_KEY` n'est **jamais** préfixée `NEXT_PUBLIC_`. Elle n'est lue que dans la Server Action.
- Ne **jamais lire, afficher ni modifier** `.env`, `.env.local` ou tout fichier `.env*` autre que `.env.example`.
- Variables du projet : `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `NEXT_PUBLIC_SITE_URL`, `SITE_INDEXABLE`.
- En dev local : `.env.local`. En production : uniquement dans Vercel, portée Production. Next.js charge `.env` dans tous les environnements : ne jamais y mettre une valeur de production.
- `SITE_INDEXABLE` vaut `"true"` uniquement en production, le jour de la mise en ligne. Tant qu'elle ne le vaut pas, tout le site est en `noindex`.
- Pas de faux succès : si une variable requise manque, la Server Action renvoie une erreur explicite, elle ne simule pas l'envoi.

### 11. Formulaire de contact
Server Action + validation Zod (schéma partagé avec le formulaire client) + Resend. Honeypot, et limitation de débit qui **fonctionne réellement sur du serverless** (un compteur en mémoire de processus ne protège de rien : propose les options et attends mon choix). Consentement RGPD explicite, case non pré-cochée. Aucune donnée n'est stockée par le site : le message est envoyé par email puis oublié. Tout contenu saisi par le visiteur est échappé avant insertion dans l'email.

### 12. Git
- **Une branche et une PR par session.** Jamais deux sessions dans la même PR. Toujours partir de `main` à jour.
- Convention : `feat/NN-nom`. Commits atomiques, messages en français, préfixe conventionnel (`feat:`, `fix:`, `chore:`, `docs:`).
- `.gitattributes` impose des fins de ligne LF. Ne jamais commiter de bruit de fins de ligne.
- Ne jamais supprimer de fichiers verrou `.git/*.lock` : le signaler.
- **Jamais de ligne `Co-Authored-By`** (ni autre attribution) dans un message de commit ou une description de PR. Nicolas commite, pousse et ouvre les PR lui-même (voir aussi la section Avancement).

## Ce que tu fais en début de session

1. Lis ce fichier, `docs/PERIMETRE.md` et la section du cadrage concernée.
2. Propose un plan détaillé et **attends ma validation** avant d'écrire du code.
3. Signale tout écart entre ce que je demande et ces règles, plutôt que de trancher seul.

## Ce que tu fais en fin de session

1. `npm run lint`, `npm run build` et `npx tsc --noEmit` passent.
2. Coche dans `docs/PERIMETRE.md` les lignes réellement livrées, et uniquement celles-là.
3. Liste ce qui reste en `A_COMPLETER` ou `VisuelProvisoire` après ton passage.
4. Signale tout écart pris par rapport au cadrage, avec sa raison.

## Avancement

Registre tenu à jour en fin de chaque session. Le détail des cases se lit dans `docs/PERIMETRE.md`.

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
