# Mise en ligne — rapport de fin de session 5 (27 novembre 2026)

## Prêt

- Landing, page `/contact`, `/mentions-legales`, `/confidentialite`, page 404 en français.
- Formulaire : validation serveur, honeypot, échappement, aucun faux succès (8 tests).
- SEO : titres, descriptions, canoniques, image de partage, icônes, JSON-LD, sitemap, robots.
- Mesure d'audience sans cookie (à activer dans Vercel).
- Aucun débordement horizontal de 360 à 1920 px sur les quatre pages.
- Aucune violation axe à 390 et 1280 px ; navigation au clavier, menu, FAQ et formulaire vérifiés.
- Animations coupées en mouvement réduit.
- Lighthouse local (Edge, bridage appliqué) : performance 98-99, accessibilité, bonnes pratiques et SEO 100, LCP 1,55 à 1,64 s, CLS 0.
- Aucun secret ni fichier `.env` (hors `.env.example`) dans le dépôt.

## Ce qui bloque la mise en ligne

`npm run check:prod` fait foi (51 points au 27 novembre 2026).

| À fournir | Où |
|---|---|
| Photos de la cabine sans marque tierce visible | hero, section technologies |
| Réponses de la FAQ, dont les contre-indications (fabricant uniquement) | `faq.ts` |
| Poids, puissance, niveau sonore, plage de fréquences, poids utilisateur maximal | `specs.ts` |
| Email professionnel, téléphone, adresse | `site.ts` |
| Raison sociale, forme et capital, SIRET, adresse, directeur de la publication | `legal.ts` |
| Rappel des contre-indications, mention « dispositif médical » ou non | `legal.ts` |
| Contact données personnelles, durée de conservation, messagerie de réception, téléphone de l'hébergeur | `legal.ts` |
| Relecture juridique de tous les textes `A_VERIFIER` | contenu |
| Vérification de la mention « brevetée » | `technologies.ts` |
| Nom de domaine (`NEXT_PUBLIC_SITE_URL`) | Vercel |

Le logotype vectoriel et la coquille « PERFORN » du fichier source sont aussi à demander ; ils ne bloquent pas le build.

## Étapes de mise en production, dans l'ordre

1. Compléter le contenu et les visuels jusqu'à ce que `npm run check:prod` ne signale plus que `NEXT_PUBLIC_SITE_URL`.
2. Acheter le domaine, créer l'email professionnel (SPF, DKIM).
3. Vérifier le domaine d'envoi chez Resend. Sans cela, le formulaire ne peut pas écrire à une autre adresse que celle du compte Resend.
4. Vercel : confirmer le plan (Hobby est réservé à un usage non commercial, à vérifier dans les conditions).
5. Vercel, variables en portée **Production** : `RESEND_API_KEY`, `CONTACT_TO_EMAIL` (adresse professionnelle), `CONTACT_FROM_EMAIL`, `NEXT_PUBLIC_SITE_URL` (sans slash final), `SITE_INDEXABLE=true` (en dernier).
6. Vercel : rattacher le domaine, poser les DNS.
7. Pare-feu Vercel : règle de limitation de débit (POST sur `/` et `/contact`, fenêtre fixe de 10 minutes, 5 requêtes par IP).
8. Vercel : onglet Analytics, **Enable**.
9. Redéployer `main`, puis vérifier en ligne : envoi réel du formulaire, `/robots.txt`, `/sitemap.xml`, aperçu de partage, mesure d'audience.
10. GitHub : protéger `main` (nécessite un plan qui l'autorise sur dépôt privé).

## Risques résiduels

- **Design non validé avec de vraies images** : contraste du texte sur photo, LCP et cadrage du hero sont à revérifier quand la photo arrive.
- **Limitation de débit** : tant que la règle du pare-feu n'existe pas, seul le honeypot protège le formulaire.
- **Allégations de santé** : la formulation attribuée ne remplace pas un juriste.
- **LCP** : la CI mesure en bridage appliqué ; PageSpeed Insights, en simulation, peut afficher plus.
- **Dépendances** : `npm audit` signale des alertes modérées (`minimatch` notamment), dont certaines liées à `shadcn`. Aucune haute ni critique. Ne pas lancer `npm audit fix --force` sans revue.
- **Non testé** : lecteur d'écran réel, téléphone réel, Safari et Firefox.
- Sur bureau, la zone « Message » n'est que partiellement visible quand on y arrive au clavier dans une fenêtre basse (conforme AA, perfectible).

## Pistes de design (hors périmètre, à décider)

Relevées sur la preview : sections au rythme uniforme, informations répétées entre chiffres clés, technologies et caractéristiques, page longue sur mobile, contenus calés à gauche sur grand écran, deux boutons « Demander une démo » visibles ensemble sur le premier écran mobile.
