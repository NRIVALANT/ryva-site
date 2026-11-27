# Cadrage — Site vitrine Cabine RYVA

> Document de cadrage v2, amendé le 30 octobre 2026. Il fixe l'objectif, les cibles, l'arborescence et la conformité. Les textes publiés vivent dans `src/content/`.
> Les parties marquées **[À DÉCIDER]** attendent un arbitrage. Les parties marquées **[À COMPLÉTER]** attendent une donnée à fournir.
> En cas de conflit avec `CLAUDE.md`, c'est `CLAUDE.md` qui fait foi.

## 1. Objectif et périmètre

**Objectif business** : générer des demandes de démo / devis auprès d'établissements professionnels, et installer la crédibilité du produit auprès des sportifs.

**Périmètre v1** : site vitrine statique, une landing principale en long scroll + pages annexes légales + un formulaire de contact qualifié. Pas de e-commerce, pas de compte utilisateur, pas de back-office.

**Hors périmètre v1** (à noter pour ne pas dériver) : paiement en ligne, configurateur, espace revendeur, blog, multilingue.

**Langue** : français uniquement. L'arborescence reste compatible i18n (chaînes centralisées dans `src/content/`) pour ne pas bloquer un ajout EN ultérieur.

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
/cgu                   abandonnée (25 novembre 2026)
```

Navigation : header sticky translucide avec ancres vers les sections + un CTA permanent « Demander une démo ». Sur mobile, CTA fixe en bas d'écran.

---

## 4. Structure de la landing, section par section

Les textes de cette section vivent désormais dans `src/content/`. Les numéros sont conservés : le code y renvoie.

| § | Section | Contenu |
|---|---|---|
| 4.1 | Hero | `hero.ts` |
| 4.2 | Chiffres clés | `stats.ts` |
| 4.3 | Les technologies | `technologies.ts` |
| 4.4 | Comment ça fonctionne | réuni à 4.3 (session 6) |
| 4.5 | Les 4 étapes | `steps.ts` |
| 4.6 | Bénéfices et mention de réserve | `benefits.ts` |
| 4.7 | Technologie détaillée | réunie à 4.3 (session 6) |
| 4.8 | Encart photobiomodulation | abandonné, non construit |
| 4.9 | Pour qui | `segments.ts` |
| 4.10 | Caractéristiques techniques | `specs.ts` |
| 4.11 | FAQ | `faq.ts` |
| 4.12 | Conversion et formulaire (aussi sur `/contact`) | `contact.ts` |
| 4.13 | Footer | `site.ts`, `legal.ts` |

---

## 8. SEO, performance, accessibilité

Voir `CLAUDE.md` (règles 8, 9 et « Règles complémentaires ») et `docs/PERIMETRE.md` §5 et §6 (titres et descriptions rédigés à la main). §5 à §7, §11 et §12 ont été retirés : ils répétaient ces fichiers.

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

