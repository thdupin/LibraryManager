# 🌐Gestionnaire d'une bibliothèque en ligne 📚

## 📝 Contexte
Ce projet consiste à développer une application web de gestion de livres en utilisant Node.js, Express, MongoDB et EJS. L'application permet de gérer facilement les livres et leurs catégories, tout en offrant des fonctionnalités intuitives pour les utilisateurs.

## 🖥️ Interface Utilisateur (UI)

Voici quelques captures d'écran de l'application en action :

![Gestion des livres](assets/screenshots/book_page.png)
![Détails d'un livre](assets/screenshots/book_details.png)
![Gestion des catégories](assets/screenshots/categories_page.png)
![Détails d'une catégorie](assets/screenshots/categories_details.png)

## ✨ Fonctionnalités principales
* **Gestion des livres** : Ajouter, modifier, supprimer et consulter des livres.
* **Catégories** : Associer des livres à des catégories et les gérer individuellement.
* **Filtrage par catégorie** : Afficher uniquement les livres appartenant à une catégorie spécifique.
* **Statistiques** : Afficher en temps réel le nombre de livres associés à chaque catégorie, et si ils sont disponibles ou non.

## 🛠️ Technologies utilisées
![Node.js](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![EJS](https://img.shields.io/badge/ejs-%23B4CA65.svg?style=for-the-badge&logo=ejs&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)

## 🚀 Objectifs pédagogiques
* Apprentissage et mise en œuvre des concepts fondamentaux de Node.js et Express.
* Manipulation des données avec MongoDB.
* Création d'une interface utilisateur dynamique avec EJS.
* Structuration et organisation d'un projet web complet.

## ⚙️ Prérequis
Avant de démarrer, assurez-vous d'avoir :
* **Node.js** installé sur votre machine ([Télécharger Node.js](https://nodejs.org/fr))
* **MongoDB** configuré localement ou via un service cloud ([MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database))
* **npm** ou **yarn** pour gérer les dépendances

## 🧰 Documentations utiles
* [Documentation Node.js](https://nodejs.org/fr/learn/getting-started/introduction-to-nodejs)
* [Documentation Express.js](https://expressjs.com/)
* [Documentation MongoDB](https://www.mongodb.com/docs/)
* [Documentation EJS](https://ejs.co/)
* [Documentation Tailwind CSS](https://v2.tailwindcss.com/docs)

## 📜 Installation

### 1. Clonez le repository

Tout d'abord, clonez le repository depuis GitHub :

```bash
git clone https://github.com/thdupin/LibraryManager.git
cd LibraryManager
```

### 2. Créez votre fichier `.env`

Une fois vos configurations rentrées dans le .env.example, copiez le fichier `.env.example` pour créer votre propre fichier `.env` :

```bash
cp .env.example .env
```

### 3. Installez les dépendances

Une fois le projet cloné, vous devez installer les dépendances via npm ou yarn :

npm :
```bash
npm i
```

yarn :
```bash
yarn
```

### 4. Créez et configurez la base de données MongoDB Atlas

Dans ce projet, j'ai utilisé la solution cloud via *MongoDB Atlas* pour configurer ma base de données

#### 1. Connectez-vous ou créez un compte sur MongoDB Atlas

#### 2. Créez un cluster et déployez-le

https://www.mongodb.com/docs/atlas/tutorial/create-new-cluster/

#### 3. Créez un nouvel utilisateur pour avoir les accès

1. Sur le menu de gauche, rendez-vous sur `SECURITY > Database Access`
2. Choisissez la méthode d'authentification que vous souhaitez (personnellement, j'ai laissé l'option *Password*, qui est l'option par défaut)
3. Mettez les privilèges sur `Read and write to any database`
4. Copiez votre mot de passe si vous avez choisi l'option *Password* (vous en aurez besoin plus tard)
5. Cliquez sur `Add user`
6. Vous devriez voir apparaître votre utilisateur sur l'interface

#### 4. Sécurisez l'accès à votre base de données

> [!WARNING]
> Vous pouvez ignorer cette étape si votre adresse courante est déjà dans la liste, mais vous pouvez aussi ajouter n'importe quelle autre adresse IP que vous souhaitez autoriser à avoir accès à votre base de données.

1. Sur le menu de gauche, rendez-vous sur `SECURITY > Network Access`
2. S'il n'y a aucune adresse IP dans la liste, cliquez sur `Add IP Address`
3. Et là, cliquez sur `Add current IP Address` pour l'ajouter dans le champ *Access List Entry*
4. Cliquez sur `Confirm`
5. Vous devriez voir apparaître votre adresse IP sur l'interface

#### 5. Créez la base de données et les collections "books" et "categories"

1. Sur le menu de gauche, rendez-vous sur `DATABASE > Clusters`
2. Cliquez sur `Browse Collections`
3. Puis, cliquez sur `Create Database`
4. Entrez le nom de la base de données (personnellement, je l'ai appelé libraryManager)
5. Entrez le nom de la première collection : *books*
6. Cliquez sur `Create` (pas besoin de sélectionner quelque chose pour *Additional Preferences*)
7. Répétez cette opération et entrez le nom de la deuxième collection : *categories*
8. Vous devriez voir apparaître vos 2 collections dans votre base de données

### 6. Lancez le serveur

Une fois la base de données créée et configurée, vous devez lancer le serveur :

npm :
```bash
npm start
```

yarn:
```bash
yarn start
```

### 6. Accédez à l'application

Vous pouvez maintenant ouvrir votre navigateur et accéder à l'application via l'URL suivante :

```bash
http://127.0.0.1:<port>
```

> [!WARNING]
> Remplacez *port* par ce que vous avez configuré dans le `.env` (3000 par défaut)

## 🏗️ Structure du projet
```
library-manager/                 
├── app/ 
│   ├── controllers/
│   │   ├── book.js
│   │   └── category.js
│   ├── models/
│   │   ├── book.js
│   │   └── category.js
│   ├── routes/
│   │   ├── books.js
│   │   └── categories.js
│   └── views/
│       ├── books/
│       │   ├── _form.ejs
│       │   ├── edit.ejs 
│       │   ├── index.ejs 
│       │   ├── new.ejs
│       │   └── single.ejs      
│       ├── categories/
│       │   ├── _form.ejs
│       │   ├── edit.ejs 
│       │   ├── index.ejs 
│       │   ├── new.ejs
│       │   └── single.ejs   
│       ├── partials/
│       │   └── head.ejs
│       └── errors.ejs              
├── node_modules/           # Ignoré par Git (spécifié dans .gitignore)
├── public/
│   └── css/
│       └── tailwind.css
├── .env                    # Ignoré par Git (spécifié dans .gitignore)
├── .env.example
├── .gitignore 
├── package.json
├── package-lock.json
├── postcss.config.json
├── README.md
├── server.js
├── tailwind.config.js
└── tailwind.css
```

## 🧑‍💻 Auteurs

* **Théo DUPIN** - *Développeur principal* - https://github.com/thdupin

## 🤝 Contribuer

Si vous souhaitez contribuer à ce projet, vous pouvez soumettre une pull request. Assurez-vous que toutes les modifications respectent les directives de codage avant de soumettre.

### 1. Forkez le projet depuis GitHub

* Allez sur la page du repository sur GitHub (https://github.com/thdupin/KontactHub.git)
* Cliquez sur le bouton Fork en haut à droite pour créer une copie du projet dans votre compte GitHub

### 2. Clonez votre fork localement

```bash
git clone https://github.com/votre-utilisateur/LibraryManager.git
cd LibraryManager
```

### 3. Créez une nouvelle branche pour votre fonctionnalité

```bash
git checkout -b feature-nouvelle-fonctionnalité
```

### 4. Apportez vos modifications dans le code

### 5. Committez vos modifications

```bash
git commit -am "Ajout d'une nouvelle fonctionnalité"
```

### 6. Poussez votre branche sur votre fork

```bash
git push origin feature-nouvelle-fonctionnalité
```

### 7. Ouvrez une pull request

* Allez sur la page de votre fork sur GitHub.
* Cliquez sur le bouton Compare & pull request.
* Ajoutez une description claire et détaillée de vos modifications, puis soumettez la pull request.

Une fois la pull request créée, elle pourra être examinée et fusionnée par les mainteneurs du projet. 🎉

# Merci d'utiliser LibraryManager! 🚀