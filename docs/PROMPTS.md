# Prompts prêts à l'emploi — Sessions Claude Code, site vitrine RYVA

> Un bloc = une session Claude Code. Copie, colle, c'est tout.
> **Une branche et une PR par session.** Jamais deux sessions dans la même PR, jamais deux sessions en parallèle.
> Projet construit à partir de zéro, dans un dépôt dédié : `NRIVALANT/ryva-site`.
> Fichiers de référence : `CLAUDE.md`, `docs/PERIMETRE.md`, `docs/CADRAGE.md`, `docs/CHARTE.md`, `docs/tokens.json`.

## Vue d'ensemble

| Session | Contenu | Branche | Modèle | Effort | Pourquoi |
|---|---|---|---|---|---|
| 0 | Socle, CI, Lighthouse CI, garde-fou de production | `feat/00-socle` | Sonnet 5.5 | medium | Configuration mécanique, bien spécifiée |
| 1 | Contenu typé, jetons de la charte, header, hero | `feat/01-contenu-tokens` | Opus 5.5 | medium | Fixe l'identité visuelle de tout le site |
| 2 | Sections de la landing | `feat/02-landing` | Opus 5.5 | medium | Volume visuel important, qualité de composition |
| 3 | Formulaire de contact, Resend, anti-abus | `feat/03-contact` | Opus 5.5 | medium | Sécurité : échappement, anti-spam, secrets |
| 4 | SEO, Open Graph, pages légales, analytique | `feat/04-seo-legal` | Sonnet 5.5 | medium | Travail structuré, peu de décisions |
| 5 | Qualité, performance, accessibilité, mise en production | `feat/05-qualite` | Sonnet 5.5 | medium | Repasser en Opus si un problème de performance résiste |

Ne change pas le niveau d'effort en cours de session : tu casses le cache et tu paies plus cher.

---

## Étape 0 — Initialisation (à faire toi-même, pas en session Claude Code)

Le dépôt est neuf, donc c'est plus simple que pour le CRM : on génère Next.js d'abord, puis on dépose le kit dessus.

```bash
# 1. Créer sur GitHub un dépôt VIDE : NRIVALANT/ryva-site (sans README, sans .gitignore)
cd ~/Projets
git clone https://github.com/NRIVALANT/ryva-site.git
cd ryva-site

# 2. Next.js 16 + React 19 + Tailwind 4 (dernières versions, résolues automatiquement)
npx create-next-app@latest . \
  --ts --tailwind --eslint --app --src-dir --import-alias "@/*" \
  --use-npm --disable-git --no-agent-feedback --yes

# 3. Un seul fichier de règles : CLAUDE.md
rm -f AGENTS.md

# 4. Déposer le kit (CLAUDE.md, docs/, public/brand/, .gitattributes, .env.example)
#    Git Bash / WSL :
unzip -o ~/Downloads/ryva-site-kit.zip -d .
#    PowerShell :
#    Expand-Archive -Force $HOME\Downloads\ryva-site-kit.zip .

# 5. Autoriser le commit de .env.example (le .gitignore de Next ignore tous les .env*)
printf '\n!.env.example\n' >> .gitignore

# 6. Dépendances du projet
npm i zod react-hook-form @hookform/resolvers resend

# 7. shadcn/ui (mêmes réponses que sur le CRM). Aucun composant à ajouter maintenant.
npx shadcn@latest init

# 8. Vérifications
git status --short | grep -i env     # .env.example doit apparaître, aucun autre .env
npm run dev                          # doit démarrer sans erreur

# 9. Premier commit sur main
git add -A
git commit -m "chore: initialisation Next.js 16, Tailwind 4, shadcn et kit de cadrage"
git push -u origin main
```

> En PowerShell : `Remove-Item -Force AGENTS.md` au lieu de `rm -f`, et la continuation de ligne est `` ` `` et non `\`.

Puis :

1. **Vercel** : importer le dépôt `ryva-site`. Aucune variable n'est nécessaire avant la session 3.
2. **GitHub** : protéger la branche `main` (PR obligatoire, vérifications requises une fois la CI créée en session 0).
3. `.env.local` à la racine, jamais commité, quand la session 3 le demandera.

Variables du projet (noms seulement, valeurs hors dépôt) :

```
RESEND_API_KEY=            # secret, jamais NEXT_PUBLIC_
CONTACT_TO_EMAIL=          # où arrivent les demandes de démo
CONTACT_FROM_EMAIL=        # expéditeur, sur un domaine vérifié chez Resend
NEXT_PUBLIC_SITE_URL=      # URL publique, sans slash final
SITE_INDEXABLE=            # "true" uniquement au moment de la mise en ligne
```

> Sur Vercel, la production ne reçoit jamais les valeurs de dev, et inversement. Une clé de production dans un `.env` local est l'accident classique : Next.js charge `.env` dans tous les environnements.

---

## Session 0 — Socle, CI et garde-fou de production

```
Crée la branche feat/00-socle depuis main.

Lis CLAUDE.md, docs/PERIMETRE.md et docs/CADRAGE.md.

SESSION 0 — SOCLE, CI ET GARDE-FOU DE PRODUCTION

Avant d'écrire du code, propose-moi un plan détaillé et attends ma validation.

PÉRIMÈTRE
- Vérifier : TypeScript strict, alias @/*, scripts lint et build présents.
  Ajouter "typecheck": "tsc --noEmit".
- Arborescence : src/content/, src/components/layout/, src/components/sections/,
  src/components/ui/, src/lib/, scripts/. Garder uniquement ce qui sert.
- src/content/marqueurs.ts : deux aides.
  A_COMPLETER(description) renvoie "[À COMPLÉTER] description".
  A_VERIFIER(texte) renvoie "[À VÉRIFIER] texte" : pour un texte rédigé mais
  qui doit être validé (juridique, produit) avant publication.
- src/components/ui/visuel-provisoire.tsx : bloc neutre, clairement étiqueté
  « Visuel à fournir », qui reçoit ses proportions en props et réserve donc sa
  place sans décalage de mise en page.
- scripts/check-content.mjs, sans dépendance, qui parcourt src/ et
  public/provisoire/ :
  * cherche les chaînes "[À COMPLÉTER]" et "[À VÉRIFIER]", les usages de
    VisuelProvisoire (hors sa propre définition) et tout fichier présent dans
    public/provisoire/ ;
  * cherche, dans src/content/, les termes de la liste « interdite » de la
    règle 4 de CLAUDE.md (insensible à la casse et aux accents) ;
  * cherche, toujours dans src/content/, les termes de la liste « à signaler »
    et les affiche en avertissement sans jamais bloquer ;
  * affiche chaque occurrence avec fichier:ligne, puis un décompte ;
  * est strict (code de sortie 1 s'il trouve quoi que ce soit de bloquant)
    quand VERCEL_ENV vaut "production" ou quand il reçoit --strict ;
    hors production il informe et sort avec 0.
- package.json : "prebuild" qui lance ce script, et "check:prod" qui le lance
  avec --strict.
- Fichiers de config racine : vérifie que .env.example est bien suivi par git.
- Page d'accueil provisoire : remplace la page par défaut de Next.js par une
  page minimale (une h1, texte issu de src/content/). <html lang="fr">.
- Indexation : metadata robots en noindex par défaut, levé uniquement quand
  SITE_INDEXABLE vaut "true". Aucune indexation avant ma décision.
- .github/workflows/ci.yml, sur pull_request : npm ci, lint, typecheck, build.
- Lighthouse CI : lighthouserc.json et un job GitHub Actions utilisant
  @lhci/cli via npx (pas de dépendance ajoutée à package.json). Assertions en
  erreur : LCP < 2500 ms et CLS < 0,1. Les scores de performance,
  d'accessibilité, de bonnes pratiques et de SEO sont des avertissements pour
  l'instant : la session 5 les durcira.
- Ce qui doit être fait côté dashboard Vercel ou GitHub : liste-le-moi
  précisément, ne le suppose pas fait.

HORS PÉRIMÈTRE POUR CETTE SESSION
- Aucun composant de landing, aucun contenu éditorial, aucun jeton de design,
  aucun formulaire, aucune dépendance nouvelle.

CRITÈRE DE FIN
- npm run build passe en local.
- Démonstration du garde-fou : avec un fichier temporaire contenant
  "[À COMPLÉTER]", VERCEL_ENV=production npm run build échoue en nommant le
  fichier ; sans lui, il passe. Supprime ensuite le fichier temporaire.
- La CI et Lighthouse CI s'exécutent sur la PR.
- npm run lint et npm run typecheck passent.

En fin de session : liste ce que je dois configurer à la main (protection de
main avec les vérifications requises, etc.).
```

---

## Session 1 — Contenu typé, jetons de la charte, header, hero

```
Crée la branche feat/01-contenu-tokens depuis main.

Lis CLAUDE.md, docs/PERIMETRE.md, docs/CADRAGE.md, docs/CHARTE.md et
docs/tokens.json.

SESSION 1 — CONTENU TYPÉ, JETONS ET PREMIÈRE SECTION

C'est la session qui fixe l'identité visuelle du site. Elle s'arrête
volontairement après le hero : je valide les jetons sur une vraie section avant
que tu déroules le reste. Une correction de palette après huit sections se paie
huit fois.

Avant d'écrire du code, propose-moi un plan détaillé et attends ma validation.

PÉRIMÈTRE
1. Contenu typé dans src/content/ : site.ts, hero.ts, stats.ts,
   technologies.ts, steps.ts, benefits.ts, specs.ts, faq.ts, segments.ts,
   legal.ts, ui.ts.
   - Reprends les textes de docs/CADRAGE.md §4 mot pour mot. Rien d'inventé.
   - Toute donnée absente : A_COMPLETER. Tout texte qui doit être validé avant
     publication (mention de réserve des bénéfices, mention de garantie,
     « technologie brevetée ») : A_VERIFIER.
   - FAQ : reprends les questions du cadrage. Ne rédige une réponse que si le
     cadrage contient les données pour le faire sans extrapoler (la prise
     10 A, par exemple). Les contre-indications restent en A_COMPLETER.
   - ui.ts : libellés d'interface, messages d'erreur, aria-label.
   - Interfaces TypeScript explicites pour chaque fichier.
2. Jetons : déclare dans src/app/globals.css (bloc @theme) les jetons de
   docs/tokens.json, thème SOMBRE uniquement, pas de bascule clair/sombre,
   color-scheme: dark. Ne déclare que les jetons utilisés. Classes ou
   utilitaires de typographie pour affiche, titre-vitrine, devise, corps,
   légende, mono. Chiffres tabulaires pour les valeurs techniques.
3. Geist et Geist Mono via next/font, comme prévu par la charte.
4. src/lib/marque.ts : chemins, dimensions et fond d'usage de chaque logo de
   public/brand/ (ouvre les images pour choisir la bonne variante).
5. Layout : header sticky translucide avec le logotype, les ancres de
   navigation et le CTA permanent « Demander une démo » ; CTA fixe en bas
   d'écran sur mobile ; footer minimal. Le translucide ne doit jamais faire
   passer le texte sous 4,5:1 : prévoir un repli opaque.
6. Hero (§4.1) : visuel plein écran via VisuelProvisoire tant qu'aucune photo
   n'existe, overlay dégradé sombre en bas, sur-titre, titre, sous-titre, CTA
   principal et secondaire. Les boutons respectent les règles de contraste de
   CLAUDE.md règle 6.

HORS PÉRIMÈTRE POUR CETTE SESSION
- Toute section après le hero. Le formulaire. Le SEO. Toute animation autre que
  les transitions de survol et de focus.
- Si un jeton te manque, signale-le plutôt que d'inventer une couleur.

CRITÈRE DE FIN
- Hero et header corrects à 360, 768 et 1440 px, sans défilement horizontal.
  Si tu ne peux pas le vérifier visuellement, liste précisément ce que je dois
  contrôler sur la preview.
- Tableau des couples texte/fond réellement utilisés avec leur ratio de
  contraste calculé.
- Aucune chaîne éditoriale dans le JSX (vérifié par recherche).
- npm run build, lint et typecheck passent. CI verte.

En fin de session : liste les jetons déclarés, les logos utilisés, et ce que je
dois valider visuellement sur la preview Vercel avant de lancer la session 2.
```

---

## Session 2 — Sections de la landing

```
Crée la branche feat/02-landing depuis main.

Lis CLAUDE.md, docs/PERIMETRE.md et docs/CADRAGE.md.

SESSION 2 — SECTIONS DE LA LANDING

Les jetons ont été validés en session 1. Tu ne les modifies pas : si un besoin
apparaît, signale-le et attends ma décision.

Avant d'écrire du code, propose-moi un plan détaillé et attends ma validation.
Découpe ton travail en groupes de sections avec un commit par groupe.

PÉRIMÈTRE
Section 3 de docs/PERIMETRE.md, en consommant exclusivement src/content/ :
- §4.2 chiffres clés ; §4.3 technologies ; §4.4 comment ça fonctionne ;
  §4.5 les 4 étapes ; §4.6 bénéfices avec sa mention de réserve en pied de
  section ; §4.7 technologie détaillée ; §4.9 pour qui ; §4.10 caractéristiques
  techniques ; §4.11 FAQ.
- Chaque section est un <section aria-labelledby>, avec l'id d'ancre attendu
  par le header.
- Tableau des caractéristiques : un vrai <table>, valeurs en Geist Mono avec
  chiffres tabulaires, valeurs manquantes en A_COMPLETER.
- Timeline des 4 étapes : une liste ordonnée sémantique, numérotation 01 à 04.
- FAQ : accordéon shadcn (installe uniquement ce composant), accessible au
  clavier.
- Tous les visuels via VisuelProvisoire tant que les photos n'existent pas,
  avec des proportions fixes (aucun CLS).
- Animations : CSS uniquement (scroll-driven animations avec repli propre si
  non supportées, le contenu reste visible par défaut), prefers-reduced-motion
  respecté. L'animation de compteur des chiffres clés n'est faite que si elle
  est réalisable en CSS pur sans CLS ; sinon, valeurs statiques.

HORS PÉRIMÈTRE POUR CETTE SESSION
- §4.8 photobiomodulation : à décider, ne pas construire.
- Le formulaire §4.12 : session 3.
- Toute rédaction qui n'est pas dans le cadrage. Pas de témoignages, pas de
  logos clients, pas de chiffres inventés.
- Toute dépendance nouvelle sauf le composant shadcn accordéon.

CRITÈRE DE FIN
- Toutes les lignes de la section 3 de docs/PERIMETRE.md sont cochées, hors
  ligne « À DÉCIDER ».
- La page se lit de bout en bout à 360 px sans défilement horizontal.
- La preview passe Lighthouse CI sans erreur sur LCP et CLS.
- Aucune chaîne éditoriale dans le JSX, aucune valeur hexadécimale dans un
  composant (vérifiés par recherche).
- npm run build, lint et typecheck passent.

En fin de session : liste tout ce qui reste en A_COMPLETER, A_VERIFIER et
VisuelProvisoire, groupé par section, pour que je sache quoi fournir.
```

---

## Session 3 — Formulaire de contact

```
Crée la branche feat/03-contact depuis main.

Lis CLAUDE.md, docs/PERIMETRE.md et docs/CADRAGE.md (§4.12 et §9).

SESSION 3 — FORMULAIRE DE CONTACT

Avant d'écrire du code, propose-moi un plan détaillé et attends ma validation.

POINT À TRANCHER AVANT D'IMPLÉMENTER : LIMITATION DE DÉBIT
Un compteur en mémoire de processus ne protège de rien sur Vercel (chaque
exécution peut tomber sur une instance différente). Propose-moi les options
réalistes avec leurs conséquences : règle de pare-feu côté Vercel hors code,
stockage externe type Redis avec la dépendance que cela ajoute, protection
limitée au honeypot et à un délai minimal de remplissage signé, ou toute autre
option que tu juges pertinente. Indique le coût, la complexité et le niveau de
protection de chacune. N'en retiens aucune de ta propre initiative.

PÉRIMÈTRE
Section 4 de docs/PERIMETRE.md :
- Composant de formulaire unique, utilisé dans la section de conversion en bas
  de landing (§4.12) et sur la page /contact.
- Champs : nom, email, téléphone, type de structure (clinique, cabinet, salle
  de sport, centre de récupération, particulier, autre), nom de
  l'établissement, message libre, consentement RGPD explicite, case non
  pré-cochée, bloquante.
- Schéma Zod unique, partagé par react-hook-form et la Server Action. Tous les
  libellés et messages viennent de src/content/.
- Server Action : validation Zod côté serveur, honeypot, envoi par Resend, en
  texte brut ET en HTML. Le reply-to est l'email du visiteur. Tout contenu saisi
  est échappé avant insertion dans le HTML, et les retours à la ligne sont
  retirés de tout ce qui va dans un en-tête ou dans le sujet.
- États : chargement, succès, erreur de validation par champ, erreur d'envoi.
  Focus renvoyé vers le message d'erreur ou de succès, annoncé aux lecteurs
  d'écran.
- Si RESEND_API_KEY, CONTACT_TO_EMAIL ou CONTACT_FROM_EMAIL manque, l'action
  renvoie une erreur explicite. Jamais de faux succès.
- Aucune donnée personnelle dans les logs. Aucune donnée stockée par le site.
- Les CTA « Demander une démo » du header, du hero et du CTA mobile pointent
  vers ce formulaire.

HORS PÉRIMÈTRE POUR CETTE SESSION
- Email de confirmation au visiteur, base de données, CRM, captcha tiers :
  hors périmètre de la v1.
- Les pages légales : session 4.

CRITÈRE DE FIN
- Test réel de bout en bout avec ma clé Resend de développement : demande-moi
  de la placer dans .env.local, sans que tu l'ouvres ni la lises, et dis-moi
  comment tester sans domaine d'envoi vérifié.
- Soumission invalide : refusée côté serveur même si la validation client est
  contournée.
- Honeypot rempli : rejeté sans message qui révèle le piège.
- npm run build, lint et typecheck passent.

En fin de session : décris précisément la protection anti-abus retenue, ses
limites, et ce que je dois configurer côté Vercel et Resend (domaine vérifié,
SPF, DKIM, variables par environnement).
```

---

## Session 4 — SEO, pages légales, analytique

```
Crée la branche feat/04-seo-legal depuis main.

Lis CLAUDE.md, docs/PERIMETRE.md et docs/CADRAGE.md (§8 et §9).

SESSION 4 — SEO, PAGES LÉGALES ET ANALYTIQUE

Avant d'écrire du code, propose-moi un plan détaillé et attends ma validation.

PÉRIMÈTRE
Section 5 de docs/PERIMETRE.md :
- generateMetadata par page, titres et descriptions rédigés à la main. Une
  seule h1 par page.
- Image Open Graph 1200 × 630 : fond de marque sombre, logotype, devise sous sa
  forme de référence « RECOVER . PERFORM . REPEAT. ».
- Favicon et icône d'application dérivés de public/brand/ryva-icone.png.
- JSON-LD Organization et Product. Product sans prix, sans note et sans avis :
  uniquement ce que le contenu établit. Aucune donnée inventée.
- sitemap.ts et robots.ts. robots.ts et les metadata respectent SITE_INDEXABLE :
  tout est en noindex tant qu'il ne vaut pas "true".
- /mentions-legales et /confidentialite, alimentées par src/content/legal.ts.
  Structure complète ; toute donnée d'identité (éditeur, SIRET, directeur de
  publication, coordonnées) en A_COMPLETER. Pour l'hébergeur, ne remplis les
  informations que si tu peux les confirmer à la source, sinon A_VERIFIER.
- Politique de confidentialité couvrant le formulaire : finalité, base légale,
  durée de conservation, droits RGPD, responsable de traitement, sous-traitants
  (Vercel, Resend) et transferts éventuels hors UE. Rédige une proposition
  marquée A_VERIFIER : c'est un point de relecture juridique, pas une décision
  que tu prends.
- Mention de garantie complétée : garantie commerciale du fabricant et garantie
  légale de conformité distinguées (A_VERIFIER).
- Analytique sans cookie : demande-moi mon choix entre Vercel Web Analytics et
  Plausible avant d'ajouter la moindre dépendance. Aucun Google Analytics,
  aucun pixel, aucune vidéo YouTube intégrée.

HORS PÉRIMÈTRE POUR CETTE SESSION
- /cgu : à décider, ne pas créer.
- Tout bandeau de consentement : inutile avec une analytique sans cookie, et
  s'il apparaît nécessaire, signale-le au lieu de l'ajouter.

CRITÈRE DE FIN
- Chaque page a un titre, une description et une URL canonique.
- Le sitemap liste exactement les pages existantes.
- JSON-LD valide, ne contenant que des données présentes dans src/content/.
- npm run build, lint et typecheck passent.

En fin de session : liste tout ce qui reste en A_COMPLETER et A_VERIFIER dans
les pages légales, c'est la liste à transmettre pour la relecture juridique.
```

---

## Session 5 — Qualité et mise en production

```
Crée la branche feat/05-qualite depuis main.

Lis CLAUDE.md, docs/PERIMETRE.md et docs/CADRAGE.md (§8).

SESSION 5 — QUALITÉ ET MISE EN PRODUCTION

Avant d'écrire du code, propose-moi un plan détaillé et attends ma validation.

PÉRIMÈTRE
Section 6 de docs/PERIMETRE.md :
- Durcir Lighthouse CI : budgets LCP < 2,5 s et CLS < 0,1 conservés en erreur ;
  scores d'accessibilité, de bonnes pratiques et de SEO passés en erreur sous
  un seuil que tu me proposes ; performance en erreur sous un seuil que tu me
  proposes, en tenant compte du fait que les visuels sont encore provisoires.
- Images : formats AVIF/WebP, sizes corrects, dimensions explicites, priority
  sur le seul visuel du hero. Chargement différé de tout le reste.
- Polices : pas de FOUT, pas de décalage de mise en page.
- Accessibilité : passage complet au clavier, focus visible partout, contrastes
  vérifiés sur le rendu réel (y compris texte sur image avec overlay), alt
  réels, hiérarchie de titres, formulaire annoncé correctement.
- Responsive de 360 px à 1920 px sans défilement horizontal.
- prefers-reduced-motion : toutes les animations ont un repli.
- Corriger ce que ces vérifications révèlent, sans ajouter de fonctionnalité.
- Vérifier qu'aucun secret ni valeur de production ne subsiste dans le dépôt, et
  qu'aucune variable NEXT_PUBLIC_ ne contient de secret.
- Lancer npm run check:prod et me donner la liste exacte de ce qui bloque
  encore la mise en ligne.

HORS PÉRIMÈTRE POUR CETTE SESSION
- Toute nouvelle fonctionnalité, toute refonte visuelle.
- Tout contournement du garde-fou pour faire passer la production.

CRITÈRE DE FIN
- Lighthouse CI passe en vert sur la PR avec les seuils durcis.
- npm run build, lint et typecheck passent.
- Section 6 de docs/PERIMETRE.md cochée.

Termine par un rapport : ce qui est prêt, ce qui bloque la mise en ligne
(sorties de check:prod comprises), les étapes exactes de mise en production
(variables Vercel en portée Production, SITE_INDEXABLE=true, domaine, DNS,
domaine Resend vérifié) et les risques résiduels que tu identifies.
```

---

## Prompt de reprise, si une session est interrompue

```
Lis CLAUDE.md, docs/PERIMETRE.md et docs/CADRAGE.md.

Je reprends une session interrompue sur la branche courante.

Avant toute modification :
1. Exécute git status et git diff pour établir ce qui a déjà été fait.
2. Résume l'état réel : ce qui est terminé, ce qui est commencé mais
   incomplet, ce qui n'est pas entamé.
3. Vérifie que npm run build passe et signale toute régression.
4. Propose-moi la suite du plan et attends ma validation.

N'entame aucun travail appartenant à une autre session.
```

---

## Prompt de vérification, à lancer après chaque merge

```
Lis CLAUDE.md et docs/PERIMETRE.md.

Tâche de vérification seule : tu ne modifies aucun fichier.

1. Parcours docs/PERIMETRE.md et, pour chaque ligne cochée, vérifie qu'elle
   est réellement satisfaite dans le code. Signale les cases cochées à tort.
2. Recherche toute chaîne éditoriale en dur dans le JSX, hors src/content/.
3. Recherche toute valeur hexadécimale ou couleur en dur dans les composants,
   hors déclaration des jetons dans globals.css.
4. Recherche toute occurrence de [À COMPLÉTER], [À VÉRIFIER] et de
   VisuelProvisoire et liste-les par fichier : c'est ce qui reste à fournir.
5. Recherche dans src/content/ le vocabulaire interdit et le vocabulaire à
   signaler de la règle 4 de CLAUDE.md.
6. Recherche toute donnée qui ressemble à une invention : caractéristique
   technique, prix, coordonnée, référence client, témoignage, chiffre absent
   de docs/CADRAGE.md.
7. Recherche toute occurrence de RESEND_API_KEY dans un fichier suivi par git,
   et toute variable NEXT_PUBLIC_ contenant un secret.
8. Vérifie qu'aucune dépendance de package.json n'a été ajoutée sans être
   mentionnée dans docs/PROMPTS.md ou validée dans une PR.
9. Lance npm run check:prod et rapporte sa sortie.

Rends un rapport, sans rien corriger. Je déciderai des suites.
```
