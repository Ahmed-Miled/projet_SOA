# ProjetSOA - Système de Gestion des Personnes

Application complète de gestion des personnes développée avec une architecture orientée services (SOA), composée d'un backend REST en Java EE et d'un frontend moderne en React avec Bootstrap.

---

## 📋 Description du Projet

Ce projet démontre une architecture **client-serveur** utilisant des **services web RESTful**. Il permet de gérer une base de données de personnes avec les opérations CRUD complètes (Créer, Lire, Modifier, Supprimer) ainsi qu'une fonctionnalité de recherche.

### Fonctionnalités Principales

#### Backend (Serveur)
- ✅ **API REST** complète pour la gestion des personnes
- ✅ **Persistance des données** avec JPA/Hibernate
- ✅ **Base de données MySQL**
- ✅ **Support CORS** pour les applications clientes
- ✅ **Endpoints RESTful** standards

#### Frontend (Client React)
- ✅ **Liste des personnes** - Affichage sous forme de cartes élégantes
- ✅ **Ajouter une personne** - Formulaire avec validation complète
- ✅ **Modifier une personne** - Édition avec pré-remplissage automatique
- ✅ **Supprimer une personne** - Suppression avec confirmation
- ✅ **Rechercher** - Par ID ou par nom
- ✅ **Interface responsive** - Adaptée à tous les écrans
- ✅ **Messages de feedback** - Succès et erreurs

---

## 🛠️ Technologies Utilisées

### Backend (serveur/)

| Technologie | Version | Utilisation |
|-------------|---------|-------------|
| **Java** | 8+ | Langage de programmation |
| **JAX-RS (Jersey)** | 2.35 | Framework REST API |
| **JPA (Hibernate)** | 5.2.6 | ORM - Mapping objet-relationnel |
| **MySQL** | 5.x+ | Base de données relationnelle |
| **Maven** | 3.x | Gestionnaire de dépendances |
| **Apache Tomcat** | 9+ | Serveur d'applications |
| **Jackson** | 2.12.2 | Sérialisation/Désérialisation JSON |

**Architecture Backend:**
```
Client HTTP → Jersey (JAX-RS) → PersonService → JPA/Hibernate → MySQL
```

### Frontend (client-react/)

| Technologie | Version | Utilisation |
|-------------|---------|-------------|
| **React** | 18.2.0 | Bibliothèque UI |
| **Bootstrap** | 5.3.0 | Framework CSS |
| **React Bootstrap** | 2.9.0 | Composants Bootstrap pour React |
| **Axios** | 1.6.0 | Client HTTP pour API REST |
| **Bootstrap Icons** | 1.11.0 | Icônes |
| **Node.js** | 14+ | Environnement d'exécution JavaScript |
| **npm** | 6+ | Gestionnaire de packages |

**Architecture Frontend:**
```
React Components → Axios → REST API → Backend
```

---

## 📁 Structure du Projet

```
projetSOA/
│
├── serveur/                          # Backend Java EE
│   ├── src/
│   │   ├── com/poly/
│   │   │   ├── Person.java                # Entité JPA
│   │   │   ├── PersonService.java         # Logique métier
│   │   │   ├── ApplicationConfig.java     # Configuration JAX-RS
│   │   │   └── api/
│   │   │       ├── PersonResource.java    # Endpoints REST
│   │   │       └── CorsFilter.java        # Filtre CORS
│   │   └── META-INF/
│   │       └── persistence.xml            # Configuration JPA
│   ├── WebContent/
│   │   └── WEB-INF/
│   │       └── web.xml                    # Configuration Servlet
│   └── pom.xml                            # Dépendances Maven
│
├── client-react/                     # Frontend React
│   ├── public/
│   │   └── index.html                     # Page HTML principale
│   ├── src/
│   │   ├── App.js                         # Composant principal
│   │   ├── index.js                       # Point d'entrée
│   │   ├── index.css                      # Styles personnalisés
│   │   ├── PersonService.js               # Service API
│   │   ├── PersonList.js                  # Affichage liste
│   │   ├── PersonForm.js                  # Formulaire ajout/modification
│   │   └── SearchBar.js                   # Barre de recherche
│   ├── package.json                       # Dépendances npm
│   └── .gitignore                         # Fichiers à ignorer
│
├── .gitignore                        # Git ignore racine
└── README.md                         # Ce fichier
```

---

## 🚀 Instructions pour Exécuter le Projet

### Prérequis

Avant de commencer, assurez-vous d'avoir installé:

- ✅ **JDK 8 ou supérieur** - [Télécharger](https://www.oracle.com/java/technologies/downloads/)
- ✅ **Apache Tomcat 9+** - [Télécharger](https://tomcat.apache.org/download-90.cgi)
- ✅ **MySQL Server 5.x+** - [Télécharger](https://dev.mysql.com/downloads/mysql/)
- ✅ **Eclipse IDE for Enterprise Java** - [Télécharger](https://www.eclipse.org/downloads/)
- ✅ **Node.js 14+ et npm** - [Télécharger](https://nodejs.org/)

---

## 📦 Installation et Démarrage

### Étape 1: Configuration de la Base de Données

#### 1.1 Démarrer MySQL

Assurez-vous que MySQL Server est démarré.

#### 1.2 Créer la Base de Données

Ouvrez MySQL Workbench ou la ligne de commande MySQL et exécutez:

```sql
CREATE DATABASE myDB;
```

#### 1.3 Vérifier les Identifiants

Par défaut, le projet utilise:
- **Utilisateur**: `root`
- **Mot de passe**: `root`
- **Base de données**: `myDB`
- **Port**: `3306`

Si vos identifiants sont différents, modifiez le fichier:
`serveur/src/META-INF/persistence.xml`

```xml
<property name="javax.persistence.jdbc.user" value="votre_user" />
<property name="javax.persistence.jdbc.password" value="votre_password" />
```

---

### Étape 2: Démarrage du Backend (Serveur)

#### 2.1 Importer le Projet dans Eclipse

#### 2.2 Configurer Tomcat dans Eclipse


#### 2.3 Déployer et Démarrer le Serveur


#### 2.4 Vérifier que le Serveur Fonctionne


```
http://localhost:8080/serveur/api/persons
```
**Le backend est maintenant opérationnel!**

---

### Étape 3: Démarrage du Frontend (Client React)

#### 3.1 Naviguer vers le Dossier Client

Ouvrez **Command Prompt** (cmd) ou **PowerShell**:

```bash
cd \projetSOA\client-react
```

#### 3.2 Installer les Dépendances

**Première fois uniquement:**

```bash
npm install
```

Cette commande installe toutes les dépendances nécessaires (React, Bootstrap, Axios, etc.).
Cela peut prendre quelques minutes.

#### 3.3 Démarrer l'Application React

```bash
npm start
```

L'application React démarre et s'ouvre automatiquement dans votre navigateur à l'adresse:

```
http://localhost:3000
```

**Le frontend est maintenant opérationnel!**

---

##Utilisation de l'Application

### Interface Utilisateur

Une fois les deux serveurs démarrés (backend sur port 8080 et frontend sur port 3000):

#### 1. **Page d'Accueil**
- Affiche toutes les personnes sous forme de cartes
- Chaque carte montre: Nom, Âge, ID
- Boutons d'action: Modifier, Supprimer

#### 2. **Ajouter une Personne**
- Cliquez sur le bouton **"Ajouter une personne"**
- Remplissez le formulaire:
  - **Nom**: 2-50 caractères
  - **Âge**: 1-150 ans
- Cliquez **"Ajouter"**
- La personne apparaît immédiatement dans la liste

#### 3. **Modifier une Personne**
- Cliquez sur le bouton **"Modifier"** d'une carte
- Le formulaire se pré-remplit avec les données actuelles
- Modifiez les champs souhaités
- Cliquez **"Mettre à jour"**

#### 4. **Supprimer une Personne**
- Cliquez sur le bouton **"Supprimer"** d'une carte
- Une confirmation apparaît
- Confirmez pour supprimer définitivement

#### 5. **Rechercher**
- Utilisez la barre de recherche en haut
- Choisissez le type: **Par ID** ou **Par Nom**
- Entrez la valeur recherchée
- Cliquez **"Rechercher"**
- Cliquez sur **"Voir tout"** pour revenir à la liste complète

---

##  API REST - Endpoints Disponibles

### Base URL
```
http://localhost:8080/serveur/api
```

### Endpoints

| Méthode | Endpoint | Description | Body (JSON) |
|---------|----------|-------------|-------------|
| **GET** | `/persons` | Liste toutes les personnes | - |
| **GET** | `/persons/{id}` | Récupère une personne par ID | - |
| **POST** | `/persons` | Crée une nouvelle personne | `{"name":"...", "age":...}` |
| **PUT** | `/persons/{id}` | Modifie une personne | `{"name":"...", "age":...}` |
| **DELETE** | `/persons/{id}` | Supprime une personne | - |

---

## 🎓 Compétences Démontrées

### Backend
- ✅ Développement d'API REST avec JAX-RS
- ✅ Persistance de données avec JPA/Hibernate
- ✅ Architecture en couches (Resource → Service → DAO)
- ✅ Gestion des transactions
- ✅ Configuration CORS pour applications clientes

### Frontend
- ✅ Développement avec React (Hooks)
- ✅ Consommation d'API REST avec Axios
- ✅ Validation de formulaires
- ✅ Gestion d'état avec useState et useEffect
- ✅ Design responsive avec Bootstrap
- ✅ UX moderne avec feedback utilisateur

### Général
- ✅ Architecture SOA (Service Oriented Architecture)
- ✅ Communication client-serveur via HTTP/REST
- ✅ Format de données JSON
- ✅ Opérations CRUD complètes
- ✅ Gestion des erreurs
- ✅ Documentation technique


---