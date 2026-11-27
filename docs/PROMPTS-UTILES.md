# Prompts utiles

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
   technique, prix, coordonnée, référence client, témoignage, chiffre de
   src/content/ absent de docs/SOURCE-PRODUIT.md.
7. Recherche toute occurrence de RESEND_API_KEY dans un fichier suivi par git,
   et toute variable NEXT_PUBLIC_ contenant un secret.
8. Vérifie qu'aucune dépendance de package.json n'a été ajoutée sans être
   validée selon CLAUDE.md (section Stack) ou notée dans docs/AVANCEMENT.md.
9. Lance npm run check:prod et rapporte sa sortie.

Rends un rapport, sans rien corriger. Je déciderai des suites.
```
