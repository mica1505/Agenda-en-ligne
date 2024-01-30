UP AGENDA est une application d'agenda en ligne qui vous permet de gérer votre emploi du temps personnel ou professionnel.
Cette application est conçue par les étudiants en deuxième année de licence Informatique et applications à l'Université Paris Cité.

L'équipe de développement est composée de :

    - Camelia Mazouz
    - Sepanta Farzollahi
    - Mayane Cohen
    - Amayas Matmar


Manuel d'installation


Prérequis

    - Node.js (version 18.16.0 LTS ou supérieure)
    - NPM (version 6 ou supérieure)
    - SVN (version 1.9 ou supérieure)

Instructions

    1. Clonez ce dépôt SVN sur votre ordinateur :
       svn checkout https://forge.ens.math-info.univ-paris5.fr/svn/2022-l2t1/trunk up-agenda
       
    2. Allez dans le répertoire du projet :
       cd up-agenda

    3. Installez les dépendances :
       npm install

    4. Lancez l'application UP Agenda :
       npm run start

    5. Rendez-vous sur http://localhost:3000 pour accéder à l'application.


Manuel d'utilisation


Inscription

    1. Rendez-vous sur http://localhost:3000.

    2. Cliquez sur le bouton "Inscription" en haut à droite de la page d'accueil.

    3. Inscrivez-vous en précisant votre nom, prénom, date de naissance, adresse mail,
       identifiant et mots de passe (contenant au moins de 8 caractères).

Connexion

    1. Cliquez sur le bouton "Connexion" en haut à droite de la page d'accueil.

    2. Connectez-vous avec votre adresse mail et votre mot de passe.

Ajouter une tâche (événement)

    1. Cliquez sur le bouton "Ajouter un événement".

    2. Remplissez le formulaire avec les informations de l'événement (nom, date (début et fin), heure (début et fin), lieu, description).
       Vous pouvez activer un rappel par mail 24h avant pour un événement important.

    3. Cliquez sur le bouton "Ajouter".

Modifier une tâche (événement)

    1. Cliquez sur l'onglet "Toutes les tâches".

    2. Cliquez sur le bouton de modification pour la tâche que vous souhaitez modifier dans la liste des tâches.

    3. Cliquez sur le bouton "Modifier".

    4. Modifiez les informations de la tâche dans le formulaire.

    5. Cliquez sur le bouton "Modifier".

Supprimer une tâche (événement)

    1. Cliquez sur l'onglet "Toutes les tâches".

    2. Cliquez sur le bouton de suppression pour la tâche que vous souhaitez modifier dans la liste des tâches.

To-do list

    1. Cliquez sur l'onglet "To-do list".

    2. Entrez le nom de la tâche souhaitée et cliquez sur le bouton "+" ou appuyez sur la touche entrée pour enregistrer votre tâche.

    3. Cochez la case pour la tâche effectuée pour la checker.

Horaires libres

    1. Cliquez sur l'onglet "Horaires libres".

    2. Saisissez la date de début, la date de fin, l'heure de début et l'heure de fin.

    3. Cliquez sur le bouton "Envoyer" pour les enregistrer.

    4. Vous pouvez apercevoir vos horaires libres saisies sur la même page avec la possibilité de les supprimer
       en appuyant sur le bouton de suppression.

Prise de rendez-vous

    1. Cliquez sur l'onglet "Autres utilisateurs".

    2. Entrez le nom d'utilisateur da la personne concernée dans la barre de recherche et appuyez sur la touche entrée.

Modification des données utilisateurs

    1. Cliquez sur l'onglet "Paramétres".

    2. Cliquez sur l'onglet "Paramètres du compte" sur la nouvelle page.

    3. Modifiez les données souhaitées dans le formulaire.

    4. Cliquez sur le bouton "Enregistrer les modification" pour modifier les données.

Déconnexion

    1. Cliquez sur l'onglet "Déconnexion".

Suppression de compte

    1. Cliquez sur l'onglet "Paramétres".

    2. Cliquez sur l'onglet "Paramètres du compte" sur la nouvelle page.

    3. Cliquez sur le bouton "Suppression de compte".

    4. Confirmez la suppression de votre compte.