# Charte RYVA

La référence visuelle commune à tous les produits RYVA : le site vitrine, le CRM interne, et les outils à venir.

Elle est construite à partir des sources réelles de la marque — la planche de logotype et les rendus produit — et non d'une interprétation. Les valeurs de couleur du cèdre et de l'infrarouge sont échantillonnées sur le rendu de la cabine ; le noir et l'argent sont échantillonnés sur la planche de logotype.

---

## Le principe : deux couches

C'est la règle qui évite de reposer la question à chaque nouveau produit.

**La couche marque** ne change jamais, d'un produit à l'autre : le logotype, le noir, l'argent, la devise, le ton. C'est elle qui fait qu'on reconnaît RYVA.

**La couche interface** change selon l'outil : les fonds, les neutres, la densité, les couleurs d'état. Un site vitrine qu'on parcourt deux minutes et un CRM qu'on fixe huit heures n'ont pas les mêmes besoins, et c'est normal qu'ils ne se ressemblent pas pixel pour pixel.

« Même charte » veut donc dire **même couche marque**, pas même palette. Le site vitrine est à dominante marque : fond sombre, cèdre, infrarouge, grandes images. Le CRM est à dominante interface : fond clair, neutres, densité élevée, le pétrole pour les actions. Les deux portent le même logotype et le même infrarouge, et cela suffit à les relier.

Les deux thèmes de cette charte, `clair` et `sombre`, portent cette distinction : un même jeton y prend la valeur qui convient au contexte.

---

## Le logotype

Le logotype RYVA se compose de deux éléments : le **vol** — trois traits superposés en dégradé argent — et le **mot RYVA**, dessiné en capitales géométriques larges. La devise **RECOVER . PERFORM . REPEAT.** l'accompagne dans les déclinaisons longues.

Les déclinaisons disponibles sont dans le groupe d'assets *Logotypes* : version empilée avec devise, version horizontale avec devise, version horizontale seule, et l'icône d'application (le vol seul, en réserve sur carré noir à angles arrondis).

### Règles

- Le mot RYVA est un **dessin**, pas du texte. Ne jamais le retaper dans une police : utiliser le fichier.
- Le vol seul suffit comme marque d'application, de favicon et d'avatar. Sous 24 px, n'utiliser que le vol.
- Réserve minimale autour du logotype : la hauteur du mot RYVA sur chaque côté.
- Sur fond sombre, le vol conserve son dégradé argent et le mot passe en blanc. Sur fond clair, le mot passe en noir.
- Ne jamais colorer le vol ni le mot en infrarouge, en cèdre ou en pétrole. Le logotype est achromatique, c'est son identité.
- Ne pas déformer, incliner, ajouter d'ombre portée ni de contour.

### Deux points à régler à la source

Deux défauts figurent sur la planche actuelle et se propageront partout s'ils ne sont pas corrigés dans le fichier d'origine :

1. La déclinaison horizontale en bas à droite porte **« PERFORN »** au lieu de « PERFORM ».
2. La ponctuation de la devise varie d'une déclinaison à l'autre : `RECOVER . PERFORM . REPEAT.`, `RECOVER PERFORM - REPEAT`, `RECOVER PERFORN REPEAT.`. **La forme de référence est `RECOVER . PERFORM . REPEAT.`**

### Ce qui manque encore

Les fichiers disponibles sont des images matricielles. Il manque :

- une version **vectorielle** (SVG) du vol et du mot, indispensable pour l'interface, l'impression et les grandes tailles ;
- une version **monochrome aplatie** du vol, sans dégradé, pour les petites tailles et les fonds complexes ;
- le nom de la **police du mot RYVA**, à récupérer auprès de la personne qui a dessiné la planche, pour les titres des supports de marque.

Tant que le SVG n'existe pas, les interfaces affichent un emplacement neutre plutôt qu'une approximation du logotype.

---

## Les couleurs

### Marque — achromatique

La marque est en noir, blanc et argent. Aucune couleur n'en fait partie. C'est contre-intuitif pour un produit dont l'argument est la chaleur infrarouge, mais c'est ce que dit la planche de logotype, et c'est ce qui donne au vol sa qualité métallique.

`marque-noir` · `marque-blanc` · `marque-argent` et ses deux bornes de dégradé.

Le dégradé du vol va de `marque-argent-fonce` à `marque-argent-clair` en passant par `marque-argent`. Il ne s'utilise que sur le logotype, jamais comme fond ni comme décor.

### Produit — les deux accents de la cabine

Ce sont les seules couleurs de la charte, et elles viennent toutes les deux de l'objet.

**Le cèdre** (`cedre`, `cedre-clair`) est le bois de la cabine. Il porte la chaleur et le haut de gamme. Il sert en aplats, en fonds, en photographie. Attention : sur fond clair il ne passe pas en texte (3,09:1) — c'est `cedre-texte` qu'il faut employer dans ce cas.

**L'infrarouge** (`infrarouge`, `infrarouge-clair`, `infrarouge-fort`) est la lueur des panneaux chauffants. Dans le rendu produit elle est d'un rouge pur saturé ; cette valeur brute n'est jamais utilisée en interface, elle est illisible et agressive à l'écran. Le jeton `infrarouge` en est la transposition désaturée.

L'infrarouge est **la couleur de reconnaissance de la marque dans les interfaces**. Il s'emploie avec parcimonie : la marque dans la navigation, les repères, l'élément actif, un compteur à ne pas manquer. Il ne devient jamais la couleur d'action d'une application dense — les boutons primaires du CRM sont en pétrole.

### Interface

`fond`, `surface`, `surface-elevee`, `texte`, `texte-secondaire`, `bordure`, `bordure-forte`, `encre` et `action` prennent une valeur par thème. En `clair` ils composent l'interface du CRM ; en `sombre` ceux du site vitrine et des supports de marque.

`action` vaut **pétrole** en clair et **infrarouge éclairci** en sombre. Ce n'est pas une incohérence : dans une application dense le pétrole repose l'œil et laisse l'infrarouge signaler ce qui compte, tandis que sur un fond sombre de marque c'est l'infrarouge qui porte l'action.

### États

`succes`, `attention`, `danger`, `info`, `neutre` et leurs fonds associés. Chacun a une valeur par thème et chacun passe 4,5:1 sur son fond dans les deux thèmes.

---

## Contrastes

Tous les couples texte-sur-fond de cette charte ont été calculés. Les trois pièges à connaître :

| Couple | Ratio | Règle |
|---|---|---|
| Blanc sur `infrarouge` | 4,04:1 | **Interdit.** Utiliser `infrarouge-fort` (5,48:1) |
| `infrarouge` en texte sur fond clair | 3,74:1 | **Interdit.** Réservé aux aplats et aux pastilles |
| `cedre` en texte sur fond clair | 3,09:1 | **Interdit.** Utiliser `cedre-texte` (5,75:1) |

Partout ailleurs, les couples prévus passent, et souvent largement : le texte principal est à 15:1 en clair et 17:1 en sombre.

Règle générale : les couleurs qui doivent être distinguées diffèrent aussi par la clarté, pas seulement par la teinte. C'est pourquoi les statuts du CRM combinent une couleur et un fond, et ne reposent jamais sur la seule teinte.

---

## Typographie

**Geist** pour l'interface, **Geist Mono** pour les identifiants, les références et les valeurs techniques. Geist est déjà la police du CRM, elle est neutre, dessinée pour l'écran, et ses chiffres tabulaires sont indispensables dans des tableaux de montants et de dates.

La police du mot RYVA est différente — plus large, plus géométrique — et c'est voulu : une police de marque n'a pas à être la police d'interface. Elle n'est pas encore identifiée (voir plus haut).

Les six styles de texte de la charte sont calibrés pour une interface dense : titre de page 20/28, titre de section 16/24, corps 14/20, tableau 13/18, légende 12/16, mono 12/16. Les montants, les pourcentages et les dates s'affichent toujours en chiffres tabulaires.

---

## Espacement, rayons, densité

Échelle de 4 px, celle de Tailwind, inchangée. Rayons : 4 px pour les badges, 6 px pour les champs et les boutons, 8 px pour les cartes et les tableaux, 10 px pour les boîtes de dialogue.

Densité d'application : contrôles de 32 px, lignes de tableau de 40 px, en-tête de 52 px, navigation de 232 px, marges de page de 24 px et 16 px sur portable.

Une réserve sur cette densité : **32 px est en dessous de la cible tactile de 44 px**. Sur poste de travail c'est le bon choix, au doigt c'est juste. Les interfaces qui doivent fonctionner sur portable augmentent la hauteur des contrôles à ce format plutôt que de conserver 32 px partout.

---

## Ce que cette charte ne dit pas

Elle ne fixe ni la grille de page, ni les composants, ni les animations. Chaque produit les décide. Elle fixe ce qui doit être commun — et rien de plus, pour ne pas devenir un carcan que personne ne respecte au troisième projet.
