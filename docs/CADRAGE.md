# Cadrage — Site vitrine Cabine RYVA

> Document de cadrage v2, amendé le 30 octobre 2026. Il alimente `src/content/` et fixe la structure des sections.
> Les parties marquées **[À DÉCIDER]** attendent un arbitrage. Les parties marquées **[À COMPLÉTER]** attendent une donnée à fournir.
> En cas de conflit avec `CLAUDE.md`, c'est `CLAUDE.md` qui fait foi.

## Amendements par rapport à la v1

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

---

## 1. Objectif et périmètre

**Objectif business** : générer des demandes de démo / devis auprès d'établissements professionnels, et installer la crédibilité du produit auprès des sportifs.

**Périmètre v1** : site vitrine statique, une landing principale en long scroll + pages annexes légales + un formulaire de contact qualifié. Pas de e-commerce, pas de compte utilisateur, pas de back-office.

**Hors périmètre v1** (à noter pour ne pas dériver) : paiement en ligne, configurateur, espace revendeur, blog, multilingue.

**Langue** : français uniquement. L'arborescence reste compatible i18n (voir §6) pour ne pas bloquer un ajout EN ultérieur.

**Critère de succès** : nombre de demandes de démo qualifiées par mois. Tout ce qui ne sert pas ce chiffre est secondaire.

---

## 2. Cibles et messages

### Cible primaire — Établissements professionnels
Cliniques, cabinets de kinésithérapie, salles de sport, centres de récupération.

Ce qu'ils cherchent : rentabilité par séance, encombrement réel, contraintes d'installation, hygiène entre deux clients, SAV et garantie, sérieux du fabricant.

Ton : sobre, technique, factuel. Pas de superlatifs.

Arguments à mettre en avant :
- Séance de 10 minutes → rotation élevée, plusieurs clients par heure
- Prise domestique 10 A → pas de travaux électriques
- 108 × 56 × 74 cm → tient dans un espace contraint
- Cèdre rouge canadien → durabilité, propriétés antimicrobiennes naturelles, aspect haut de gamme
- Format demi-corps, tête à l'extérieur → confort et acceptabilité client

### Cible secondaire — Sportifs et performance
Athlètes, coachs, préparateurs physiques, pratiquants réguliers.

Ce qu'ils cherchent : récupération après l'effort, gestion des courbatures, protocole d'usage, préservation de la mobilité.

Ton : concret, orienté protocole et régularité.

### Cible tertiaire — Domicile
À traiter comme une mention, pas comme un axe principal en v1. Le produit est présenté comme utilisable à domicile conformément aux recommandations du fabricant.

---

## 3. Arborescence

```
/                      Landing principale (long scroll, toutes les sections)
/contact               Formulaire de demande de démo / devis (même composant que la section 4.12)
/mentions-legales      Obligatoire
/confidentialite       Politique de confidentialité (RGPD)
/cgu                   [À DÉCIDER] utile seulement si un service est fourni en ligne
```

Navigation : header sticky translucide avec ancres vers les sections + un CTA permanent « Demander une démo ». Sur mobile, CTA fixe en bas d'écran.

---

## 4. Structure de la landing, section par section

### 4.1 — Hero
Visuel plein écran de la cabine (photo ou vidéo courte en boucle). Overlay dégradé sombre en bas pour la lisibilité du texte.

- Sur-titre : `CABINE RYVA`
- Titre : `La récupération par vibrations soniques et chaleur infrarouge`
- Sous-titre : `Des séances de 10 minutes combinant vibrations soniques et chaleur infrarouge réglable jusqu'à 60 °C. Conçue pour les cliniques, les salles de sport et la récupération quotidienne.`
- CTA principal : `Demander une démo`
- CTA secondaire : `Découvrir la technologie` (ancre)

### 4.2 — Bandeau chiffres clés
Quatre chiffres en ligne, sur fond contrasté. Animation de compteur au scroll, discrète, uniquement si réalisable sans JavaScript et sans décalage de mise en page.

| Valeur | Libellé |
|---|---|
| 10 min | Durée d'une séance |
| 60 °C | Température maximale réglable |
| 108 × 56 × 74 cm | Encombrement |
| 10 A | Prise domestique standard |

### 4.3 — Les technologies
Trois blocs, chacun avec un visuel.

**Vibrations soniques**
Une technologie de vibration conçue pour stimuler les muscles et les cellules à différentes fréquences, permettant d'adapter la séance à différentes zones du corps.

**Chaleur infrarouge**
Une combinaison de graphène, de céramique et d'éléments chauffants infrarouges destinée à produire une chaleur profonde au niveau des muscles et des tissus.

**Modulation des fréquences**
Les fréquences de vibration peuvent être ajustées afin de cibler différentes zones du corps et différents objectifs de séance.

### 4.4 — Comment ça fonctionne
Trois points courts, en triptyque :
- **Une action combinée** — Les vibrations soniques sont présentées comme pénétrant profondément dans les tissus musculaires tandis que la chaleur infrarouge favorise la circulation et accompagne les processus de récupération.
- **Une fréquence adaptée** — L'intensité et les fréquences peuvent être réglées selon la zone du corps et l'objectif de la séance.
- **Des séances rapides** — Le système est conçu autour de séances courtes d'environ 10 minutes.

### 4.5 — Les 4 étapes
Timeline verticale avec révélation au scroll, numérotation 01 à 04.

**01 — Installez-vous**
Entrez dans la cabine et prenez place. Son format demi-corps laisse la tête à l'extérieur de la zone chauffée.

**02 — Réglez votre séance**
Ajustez l'intensité des vibrations, leur fréquence et la température, jusqu'à 60 °C, grâce aux commandes situées à l'extérieur.

**03 — La chaleur et les vibrations**
Les vibrations soniques sont conçues pour stimuler les muscles et les cellules à différentes fréquences tandis que les éléments chauffants au graphène, à la céramique et aux infrarouges produisent une chaleur profonde.

**04 — La séance**
Une séance classique dure environ 10 minutes. Le fabricant recommande une utilisation régulière, notamment pour les sportifs, les personnes souhaitant préserver leur mobilité et le bien-être général.

### 4.6 — Bénéfices mis en avant
⚠️ **Section à risque juridique — voir §9.** Formulations à conserver au conditionnel et attribuées à la marque, jamais présentées comme un fait établi.

- **Soulagement des douleurs** — La marque présente la vibration comme pouvant diminuer la perception de la douleur pendant et après la séance, notamment chez les sportifs confrontés aux courbatures ou à certaines douleurs liées à l'effort.
- **Réduction du stress et de l'anxiété** — L'association des vibrations et des infrarouges est présentée comme favorisant la détente, contribuant à réduire le stress, améliorer l'humeur et favoriser une meilleure qualité de sommeil.
- **Digestion et gestion du poids** — La marque associe l'amélioration de la circulation, la relaxation et la stimulation du système lymphatique à un possible soutien de la digestion et des efforts de gestion du poids.

Ajouter en pied de section une mention du type : *« Les éléments présentés ci-dessus reprennent les allégations du fabricant et ne constituent pas un avis médical. La cabine RYVA n'est pas destinée à diagnostiquer, traiter ou guérir une pathologie. »* — formulation **à faire valider** (`A_VERIFIER`).

### 4.7 — Technologie détaillée
Six blocs en grille, chacun avec un chiffre ou un mot-clé en gros.

| Accroche | Titre | Contenu |
|---|---|---|
| SONIC PULSE CORE | Technologie de vibration **[À VÉRIFIER : « brevetée »]** | Technologie de vibration sonique conçue pour stimuler les muscles et les cellules à différentes fréquences afin de permettre une action ciblée. |
| GRAPHÈNE · CÉRAMIQUE · INFRAROUGES | Technologie de chaleur infrarouge | Combinaison de graphène, de céramique et d'éléments chauffants infrarouges destinée à diffuser une chaleur profonde vers les muscles et les tissus. |
| CÈDRE ROUGE CANADIEN | Construction haut de gamme | Un bois présenté pour sa résistance, ses propriétés antimicrobiennes naturelles et son aspect haut de gamme. |
| JUSQU'À 60 °C | Température réglable | La température peut être réglée jusqu'à 60 °C afin de personnaliser la séance. |
| 10 A | Alimentation électrique standard | Fonctionne sur une prise domestique de 10 A, ce qui facilite l'installation en maison, clinique ou espace professionnel. |
| 108 × 56 × 74 cm | Format compact | Conçue pour s'installer dans différents environnements : domicile, clinique, salle de sport ou espace professionnel de récupération. |

Le titre « Technologie de vibration brevetée » n'est publiable qu'une fois le brevet confirmé. D'ici là, le mot « brevetée » est porté par `A_VERIFIER`.

### 4.8 — Encart photobiomodulation
Bloc pédagogique court, visuellement distinct. La photobiomodulation est présentée comme une technologie utilisant la lumière pour accompagner certains processus naturels de l'organisme en fournissant une énergie utilisable par les cellules.

**[À DÉCIDER]** — Cet encart décrit un principe général ; vérifier qu'il correspond bien à une fonction réellement présente dans la cabine. Si ce n'est pas le cas, le retirer : c'est le genre d'approximation qui fragilise l'ensemble du discours. **Non construit tant que non tranché.**

### 4.9 — Pour qui
Quatre cartes segmentées, chacune avec un angle spécifique :
- **Cliniques et cabinets** — rotation courte, encombrement maîtrisé, hygiène
- **Salles de sport** — service différenciant, séance de 10 min entre deux créneaux
- **Sportifs** — récupération après l'effort, usage régulier
- **Domicile** — usage quotidien selon les recommandations du fabricant

### 4.10 — Caractéristiques techniques
Tableau complet, dense, sobre.

- Durée d'une séance : 10 minutes
- Température : jusqu'à 60 °C, réglable
- Dimensions : 108 × 56 × 74 cm
- Alimentation : 10 A
- Construction : cèdre rouge canadien
- Technologie de vibration : Sonic Pulse Core
- Chauffage : graphène, céramique et infrarouges
- Fréquences et intensité des vibrations : réglables
- Garantie : 1 an *(voir §9 — mention de la garantie légale à ajouter)*
- **[À COMPLÉTER]** Poids
- **[À COMPLÉTER]** Puissance en watts / consommation
- **[À COMPLÉTER]** Niveau sonore
- **[À COMPLÉTER]** Plage de fréquences (Hz)
- **[À COMPLÉTER]** Poids utilisateur maximal

### 4.11 — FAQ
Accordéon. Questions à rédiger, orientées objections réelles :
- Quelles sont les contre-indications ? **(obligatoire, voir §9 — réponse à fournir par le fabricant, jamais rédigée par défaut)**
- Quelle installation électrique faut-il prévoir ?
- Comment entretenir le cèdre et nettoyer entre deux utilisateurs ?
- Quelle est la consommation électrique par séance ?
- Combien pèse la cabine, et quel accès faut-il pour la livrer ?
- À quelle fréquence l'utiliser ?
- En quoi cela diffère-t-il d'un sauna infrarouge ou d'une plateforme vibrante ?
- Quels sont les délais de livraison et le SAV ?

### 4.12 — CTA final + formulaire
Section de conversion. Champs du formulaire, pensés pour qualifier :
- Nom, email, téléphone
- Type de structure (clinique / cabinet / salle de sport / centre de récup / particulier / autre)
- Nom de l'établissement
- Message libre
- Case de consentement RGPD explicite, non pré-cochée

Le même composant sert la page `/contact`.

### 4.13 — Footer
Coordonnées, mentions légales, politique de confidentialité, rappel des contre-indications, mention « ne constitue pas un dispositif médical » si tel est le cas (**à confirmer avec le fabricant**).

---

## 5. Direction artistique

**Intention** : chaleureux, haut de gamme, précis. Le cèdre et l'infrarouge donnent la palette naturellement.

La référence est la **charte RYVA** (`docs/CHARTE.md`, `docs/tokens.json`), appliquée dans son **thème sombre**, qui est la couche « marque » :

- **Couleurs** : fond sombre `fond` / `surface`, texte `texte` et `texte-secondaire`, accents `cedre`, `cedre-clair` et `infrarouge`. Éviter le bleu clinique. Le bouton primaire est en `action` (infrarouge éclairci) avec texte noir.
- **Typographie** : Geist pour les titres et le corps, Geist Mono pour les valeurs techniques. Styles `affiche`, `titre-vitrine`, `devise`.
- **Photo** : la photographie porte tout le site. Grandes images, respiration généreuse, peu d'éléments décoratifs.
- **Mouvement** : révélations au scroll discrètes, transitions courtes. Respecter `prefers-reduced-motion`. Aucune animation qui retarde le LCP.

---

## 6. Stack et conventions

- **Next.js** (App Router), rendu statique sur toutes les pages
- **TypeScript** strict
- **Tailwind CSS 4** + jetons déclarés dans `globals.css` via `@theme`
- **shadcn/ui** pour accordéon, formulaire — à installer à la demande, pas en bloc
- **Animations** : scroll-driven animations CSS en priorité ; une librairie JS seulement si un besoin le justifie, et après validation
- **Formulaire** : Server Action + validation Zod + envoi via Resend, honeypot + limitation de débit effective sur serverless
- **Analytique** : Vercel Web Analytics ou Plausible (sans cookie → pas de bandeau de consentement), à choisir en session 4

### Organisation du contenu
Tout le contenu éditorial vit dans `src/content/`, en fichiers TypeScript typés, strictement séparé des composants :

```
src/content/
  marqueurs.ts      A_COMPLETER(), A_VERIFIER()
  site.ts
  hero.ts
  stats.ts
  technologies.ts
  steps.ts
  benefits.ts
  specs.ts
  faq.ts
  segments.ts
  legal.ts
  ui.ts
```

Objectif : pouvoir modifier un texte sans toucher au JSX, et brancher un CMS plus tard sans réécrire les composants. Pas de CMS en v1 — ce serait de la dette pour un site FR-only maintenu par une seule personne.

### Arborescence i18n-ready
Ne pas introduire `/fr/` maintenant, mais garder les chaînes centralisées dans `src/content/` : c'est ce qui rend l'ajout d'une langue peu coûteux le jour venu.

---

## 7. CI/CD et déploiement

- Repo GitHub `ryva-site`, branche `main` protégée
- Vercel connecté au repo : preview deploy automatique sur chaque PR, production sur `main`
- GitHub Actions sur les PR : `lint`, `typecheck`, `build`
- Lighthouse CI avec budget de performance (LCP < 2,5 s, CLS < 0,1) — c'est le garde-fou contre les grosses images et les animations
- Garde-fou de contenu : le build de production échoue tant qu'il reste un marqueur `[À COMPLÉTER]`, `[À VÉRIFIER]`, un `VisuelProvisoire` ou un terme interdit
- Variables d'environnement : clé Resend, adresses d'envoi et de réception, URL du site, `SITE_INDEXABLE` — en secrets Vercel, jamais dans le repo
- Domaine personnalisé + DNS à configurer tôt (voir §11)

---

## 8. SEO, performance, accessibilité

- `generateMetadata` par page, titres et descriptions rédigés à la main
- Image Open Graph dédiée (1200 × 630)
- JSON-LD `Product` et `Organization`, sans prix, note ni avis tant qu'ils n'existent pas
- `sitemap.ts` et `robots.ts`
- Tout le site en `noindex` tant que `SITE_INDEXABLE` ne vaut pas `"true"`
- `next/image` avec AVIF/WebP, `priority` sur le visuel du hero uniquement
- `next/font` pour éviter tout FOUT
- Contrastes AA vérifiés (attention au texte blanc sur photo : overlay obligatoire)
- Navigation clavier complète, focus visible, `alt` réels sur toutes les images
- Test réel sur mobile, pas seulement en devtools

---

## 9. Conformité et juridique

> ⚠️ Section à traiter en premier, pas en dernier. Aucun des points ci-dessous n'est un détail cosmétique.
> Ces éléments sont des points de vigilance identifiés, pas un avis juridique : une validation par un professionnel est nécessaire avant mise en ligne.

**Allégations de santé.** Les bénéfices annoncés (douleur, stress, digestion, gestion du poids) touchent à des revendications encadrées. Revendiquer une finalité thérapeutique peut faire relever le produit du règlement UE 2017/745 sur les dispositifs médicaux. Les allégations minceur et santé font par ailleurs l'objet de contrôles DGCCRF. Règles à appliquer sur tout le site :
- Toujours attribuer l'allégation au fabricant (« la marque présente… », « est présenté comme… »)
- Ne jamais promettre un résultat, ne jamais employer le vocabulaire du soin (guérir, traiter, soigner, thérapie)
- Aucune image ou témoignage de type avant/après sur la perte de poids
- Faire relire l'ensemble des textes par un juriste avant publication

**Garantie.** La fiche annonce 1 an. En UE, la garantie légale de conformité est de 2 ans pour un consommateur. Afficher « garantie 1 an » sans mentionner la garantie légale expose à une qualification de pratique commerciale trompeuse. Préciser la distinction entre garantie commerciale du fabricant et garantie légale.

**Contre-indications.** À obtenir du fabricant et à publier. Leur absence est un risque, et leur présence est un signal de sérieux vis-à-vis des professionnels de santé. Elles ne sont jamais rédigées à titre provisoire par le développement.

**Conformité produit.** Vérifier le marquage CE, la conformité électrique et l'existence d'une notice en français. Si tu es distributeur et non fabricant, tes obligations diffèrent — à clarifier.

**Marque et photos.** Les photos actuelles de la cabine portent la gravure d'une marque tierce (« didi doctor »). Elles ne doivent pas être publiées telles quelles, tant que la relation entre RYVA et cette marque (fabricant, distributeur, marque blanche) n'est pas clarifiée.

**Mentions obligatoires.** Mentions légales (éditeur, hébergeur, SIRET, directeur de publication), politique de confidentialité couvrant le formulaire de contact (finalité, base légale, durée de conservation, droits RGPD, contact DPO ou responsable, sous-traitants et transferts hors UE).

**Cookies.** Avec une analytique sans cookie, aucun bandeau de consentement n'est nécessaire. Cela suppose de ne pas ajouter Google Analytics, un pixel Meta ou une vidéo YouTube non modifiée par la suite — chacun de ces ajouts réintroduit l'obligation de consentement.

---

## 10. Ce qui reste à produire

La liste de référence est la dernière section de `docs/PERIMETRE.md`. Elle reprend :

- **Assets** : photos HD sans marque tierce, photos d'ambiance, vidéo de hero, logotype vectoriel, correction de « PERFORN ».
- **Contenu** : positionnement fabricant ou distributeur, prix ou « sur devis », contre-indications, données techniques, FAQ, livraison et SAV, coordonnées, preuve sociale réelle.
- **Administratif** : domaine, email professionnel avec SPF/DKIM, domaine d'envoi Resend, relecture juridique.

---

## 11. Découpage

Voir `docs/PROMPTS.md` : étape 0 d'initialisation, puis six sessions Claude Code (0 à 5), une branche et une PR chacune.

Le code n'est pas le chemin critique. Les dépassements viendront des assets manquants et des allers-retours sur le rendu visuel. Si le temps manque, sacrifier dans cet ordre : encart photobiomodulation, animations de compteur, section segments.

---

## 12. Notes pour le développement avec Claude Code

- Le contenu de la §4 est placé dans `src/content/` **avant** tout composant de section. Les sections se construisent ensuite à partir de données typées.
- Les jetons de design sont validés sur une première section (hero) avant de dérouler les suivantes — sinon les corrections se paient huit fois.
- Une PR par session, pour bénéficier des previews Vercel.
- Aucun texte en dur dans le JSX : toute chaîne éditoriale vient de `src/content/`.
- Le budget Lighthouse est fixé dès la première PR, pas à la fin.
- Une donnée manquante n'est jamais inventée : elle est marquée, et le garde-fou empêche sa publication.
