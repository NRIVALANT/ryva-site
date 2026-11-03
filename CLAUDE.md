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

## Ce que tu fais en début de session

1. Lis ce fichier, `docs/PERIMETRE.md` et la section du cadrage concernée.
2. Propose un plan détaillé et **attends ma validation** avant d'écrire du code.
3. Signale tout écart entre ce que je demande et ces règles, plutôt que de trancher seul.

## Ce que tu fais en fin de session

1. `npm run lint`, `npm run build` et `npx tsc --noEmit` passent.
2. Coche dans `docs/PERIMETRE.md` les lignes réellement livrées, et uniquement celles-là.
3. Liste ce qui reste en `A_COMPLETER` ou `VisuelProvisoire` après ton passage.
4. Signale tout écart pris par rapport au cadrage, avec sa raison.
