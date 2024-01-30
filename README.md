<span style="color:#5E81F4;">UP AGENDA</span> est une application d'agenda en ligne qui vous permet de gérer votre emploi du temps personnel ou professionnel. Cette application est conçue par les étudiants en deuxième année de licence Informatique et applications à l'Université Paris Cité.

L'équipe de développement est composée de :

- <span style="color:#5E81F4;">Camelia Mazouz</span>
- <span style="color:#5E81F4;">Sepanta Farzollahi</span>
- <span style="color:#5E81F4;">Mayane Cohen</span>
- <span style="color:#5E81F4;">Amayas Matmar</span>

![](https://placehold.co/15x15/5E81F4/5E81F4.png)` Manuel d'installation`

<span style="color:red;">Prérequis</span>

- <span style="color:green;">Node.js</span> (version 18.16.0 LTS ou supérieure)
- <span style="color:green;">NPM</span> (version 6 ou supérieure)
- <span style="color:green;">SVN</span> (version 1.9 ou supérieure)

<span style="color:deeppink;">Instructions</span>

1. Clonez ce dépôt <span style="color:#5E81F4;">SVN</span> sur votre ordinateur :

    <kbd>svn checkout https://forge.ens.math-info.univ-paris5.fr/svn/2022-l2t1/trunk up-agenda</kbd>
2. Allez dans le répertoire du projet :

    <kbd>cd up-agenda</kbd>
3. Installez les dépendances :

    <kbd>npm install
</kbd>
4. Lancez l'application <span style="color:#5E81F4;">UP Agenda</span> :

    <kbd>npm run start
</kbd>
5. Rendez-vous sur http://localhost:3000 pour accéder à l'application.

![](https://placehold.co/15x15/5E81F4/5E81F4.png)` Manuel d'utilisation`

<span style="color:aqua;">Inscription</span>

1. Rendez-vous sur http://localhost:3000.

2. Cliquez sur le bouton <span style="color:#5E81F4;">"Inscription"</span> en haut à droite de la page d'accueil.

2. Inscrivez-vous en précisant votre nom, prénom, date de naissance, adresse mail, identifiant et mots de passe (contenant au moins de 8 caractères).

<span style="color:greenyellow;">Connexion</span>

1. Cliquez sur le bouton <span style="color:#5E81F4;">"Connexion"</span> en haut à droite de la page d'accueil.

2. Connectez-vous avec votre adresse mail et votre mot de passe.

<span style="color:magenta;">Ajouter une tâche (événement)</span>

1. Cliquez sur le bouton <span style="color:#5E81F4;">"Ajouter un événement"</span>.

2. Remplissez le formulaire avec les informations de l'événement (nom, date (début et fin), heure (début et fin), lieu, description). Vous pouvez activer un rappel par mail 24h avant pour un événement important. 

3. Cliquez sur le bouton <span style="color:#5E81F4;">"Ajouter"</span>.

<span style="color:orange;">Modifier une tâche (événement)</span>

1. Cliquez sur l'onglet <span style="color:#5E81F4;">"Toutes les tâches"</span>.

2. Cliquez sur le bouton de modification pour la tâche que vous souhaitez modifier dans la liste des tâches.

3. Cliquez sur le bouton <span style="color:#5E81F4;">"Modifier"</span>.

4. Modifiez les informations de la tâche dans le formulaire.

5. Cliquez sur le bouton <span style="color:#5E81F4;">"Modifier"</span>.

<span style="color:crimson;">Supprimer une tâche (événement)</span>

1. Cliquez sur l'onglet <span style="color:#5E81F4;">"Toutes les tâches"</span>.

2. Cliquez sur le bouton de suppression pour la tâche que vous souhaitez modifier dans la liste des tâches.

<span style="color:yellow;">To-do list</span>

1. Cliquez sur l'onglet <span style="color:#5E81F4;">"To-do list"</span>.

2. Entrez le nom de la tâche souhaitée et cliquez sur le bouton <span style="color:#5E81F4;">"+"</span> ou appuyez sur la touche <span style="color:#5E81F4;">entrée</span> pour enregistrer votre tâche. 

3. Cochez la case pour la tâche effectuée pour la checker.

<span style="color:skyblue;">Horaires libres</span>

1. Cliquez sur l'onglet <span style="color:#5E81F4;">"Horaires libres"</span>.

2. Saisissez la date de début, la date de fin, l'heure de début et l'heure de fin.

3. Cliquez sur le bouton <span style="color:#5E81F4;">"Envoyer"</span> pour les enregistrer.

3. Vous pouvez apercevoir vos horaires libres saisies sur la même page avec la possibilité de les supprimer en appuyant sur le bouton de suppression.

<span style="color:orangered;">Prise de rendez-vous</span>

1. Cliquez sur l'onglet <span style="color:#5E81F4;">"Autres utilisateurs"</span>.

2. Entrez le nom d'utilisateur da la personne concernée dans la barre de recherche et appuyez sur la touche <span style="color:#5E81F4;">entrée</span>.

3. Choisissez un crénau en cas de disponibilité de l'autre utilisatuer.

<span style="color:navy;">Modification des données utilisateurs</span>

1. Cliquez sur l'onglet <span style="color:#5E81F4;">"Paramétres"</span>.

2. Cliquez sur l'onglet <span style="color:#5E81F4;">"Paramètres du compte"</span> sur la nouvelle page.

3. Modifiez les données souhaitées dans le formulaire.

4. Cliquez sur le bouton <span style="color:#5E81F4;">"Enregistrer les modification"</span> pour modifier les données.

<span style="color:cadetblue;">Déconnexion</span>

1. Cliquez sur l'onglet <span style="color:#5E81F4;">"Déconnexion"</span>.

<span style="color:tomato;">Suppression de compte</span>

1. Cliquez sur l'onglet <span style="color:#5E81F4;">"Paramétres"</span>.

2. Cliquez sur l'onglet <span style="color:#5E81F4;">"Paramètres du compte"</span> sur la nouvelle page.

3. Cliquez sur le bouton <span style="color:#5E81F4;">"Suppression de compte"</span>.

4. Confirmez la suppression de votre compte.