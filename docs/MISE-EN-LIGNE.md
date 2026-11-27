# Mise en ligne — rapport de fin de session 6 (27 novembre 2026)

## Prêt : première version finale

- Landing avec photos de la cabine, page `/contact`, `/mentions-legales`, `/confidentialite`, page 404 en français.
- Formulaire : validation serveur, honeypot, échappement, aucun faux succès (8 tests).
- SEO : titres, descriptions, canoniques, image de partage, icônes, JSON-LD, sitemap, robots.
- Mesure d'audience sans cookie (à activer dans Vercel).
- Aucun débordement horizontal de 360 à 1920 px ; aucune violation axe à 390 et 1280 px ; clavier, menu, FAQ et formulaire vérifiés.
- Lighthouse local (Edge, bridage appliqué) : performance 97-99, accessibilité, bonnes pratiques et SEO 100, LCP 1,52 à 1,73 s, CLS 0.

## Ce qui bloque la mise en production

`npm run check:prod` fait foi.

| À fournir | Où |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Vercel |

## Décisions de Nicolas (27 novembre 2026)

- Contre-indications non publiées pour le moment : rappel non bloquant au build.
- Limitation de débit et avis clients : plus tard. Relecture juridique : pas prévue.
- Contact provisoire (collègue), aucune adresse postale.
- Poids, puissance, niveau sonore, fréquences, entretien : non affichés.

## Étapes de mise en production, dans l'ordre

1. Réintégrer les mentions légales retirées dès qu'elles sont connues (voir Risques résiduels).
2. Resend : vérifier le domaine d'envoi (DNS fournis par Resend). Sans cela, le formulaire ne peut écrire qu'à l'adresse du compte Resend.
3. Vercel : rattacher le domaine ; vérifier que le plan autorise un usage commercial (Hobby est réservé à un usage non commercial, à confirmer dans les conditions).
4. Vercel, Settings → Environment Variables, portée **Production** : `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `NEXT_PUBLIC_SITE_URL` (sans slash final), `SITE_INDEXABLE` = `true`.
5. Vercel : onglet Analytics, **Enable**.
6. Redéployer `main`, puis vérifier en ligne : envoi réel du formulaire, `/robots.txt`, `/sitemap.xml`, aperçu de partage.

## Risques résiduels

- **Mentions légales incomplètes** (retirées à la demande de Nicolas) : ni raison sociale, forme, capital, SIRET, directeur de la publication, téléphone de l'hébergeur ; ni durée de conservation ni messagerie de réception dans la politique de confidentialité. Ces informations sont en principe obligatoires (LCEN, RGPD).
- **Dépôt GitHub public** : les photos originales, gravure tierce comprise, restent dans l'historique (commit `fc9d226`) même après leur retrait. Passer le dépôt en privé, ou réécrire l'historique.
- **Contre-indications absentes** : risque pour les utilisateurs et pour votre responsabilité.
- **Limitation de débit absente** : seul le honeypot protège le formulaire ; un abus peut épuiser le quota Resend.
- **Textes non relus par un juriste** ; mentions légales sans adresse d'éditeur, en principe obligatoire.
- **Marque tierce « didi doctor »** gravée sur la cabine : relation à clarifier ; en tant que distributeur, vérifier le marquage CE et la notice en français.
- **Brevet** : garder la preuve du brevet annoncé.
- **LCP** : la CI mesure en bridage appliqué ; PageSpeed Insights, en simulation, peut afficher plus.
- **Dépendances** : `npm audit` signale des alertes modérées, dont certaines liées à `shadcn`. Ne pas lancer `npm audit fix --force` sans revue.
- **Non testé** : lecteur d'écran réel, téléphone réel, Safari et Firefox.
- Sur bureau, la zone « Message » n'est que partiellement visible quand on y arrive au clavier dans une fenêtre basse (conforme AA, perfectible).
