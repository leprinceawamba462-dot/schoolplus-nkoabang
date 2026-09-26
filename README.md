# SchoolPlus Nkoabang — version mise à jour

Cette version conserve le design vert fourni par l'utilisateur et ajoute une plateforme scolaire fonctionnelle.

## Fonctions
- Connexion élève, enseignant, administrateur et parent de démonstration
- Cours par classe
- Exercices avec correction automatique
- 20 exercices de démonstration pour la 3e (10 mathématiques + 10 français)
- Chronomètre par exercice
- Résultats et temps réalisés
- Aide pédagogique IA avec solution locale si aucune clé API n'est configurée
- Liste des utilisateurs pour les espaces de gestion
- API pour ajouter des cours

## Lancer
```bash
npm install
npm start
```
Puis ouvrir `http://localhost:3000`.

## Comptes de démonstration
- élève : `eleve` / `1234`
- professeur : `prof` / `1234`
- administrateur : `admin` / `1234`
- parent : `parent` / `1234`

Les mots de passe sont volontairement simples uniquement pour la démonstration. Pour une mise en production, utiliser un hachage, une vraie authentification et une base de données persistante.
