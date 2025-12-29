# 🗄️ Guide de Configuration - Base de Données Neon

Votre système d'inscription utilise maintenant une base de données PostgreSQL persistante avec Neon et Drizzle ORM.

## ✅ Étape 1 : Créer un compte Neon

1. **Allez sur Neon**
   - Visitez https://neon.tech
   - Cliquez sur "Sign Up"
   - Connectez-vous avec GitHub (recommandé) ou votre email

2. **Créer un nouveau projet**
   - Cliquez sur "Create Project"
   - **Nom du projet** : `concert-chaussettes` (ou votre choix)
   - **Région** : Europe (West) - `aws-eu-west-1` (pour la France)
   - **PostgreSQL version** : Laissez la version par défaut
   - Cliquez sur "Create Project"

3. **Récupérer l'URL de connexion**
   - Une fois le projet créé, Neon affiche l'URL de connexion
   - Elle ressemble à : `postgresql://username:password@ep-xyz.eu-west-1.aws.neon.tech/neondb?sslmode=require`
   - **IMPORTANT** : Copiez cette URL, vous en aurez besoin !

---

## 📦 Étape 2 : Installer les dépendances

Dans votre terminal, dans le dossier du projet :

```bash
npm install
```

Cela installera :
- `@neondatabase/serverless` - Driver Neon pour PostgreSQL
- `drizzle-orm` - ORM pour gérer la base de données
- `drizzle-kit` - Outil pour les migrations

---

## 🔧 Étape 3 : Configurer les variables d'environnement localement

1. **Créer un fichier `.env`** à la racine du projet :

```env
DATABASE_URL=votre-url-de-connexion-neon-ici
```

2. **Remplacez** `votre-url-de-connexion-neon-ici` par l'URL copiée à l'étape 1

**Exemple** :
```env
DATABASE_URL=postgresql://myuser:mypassword@ep-cool-darkness-123456.eu-west-1.aws.neon.tech/neondb?sslmode=require
```

---

## 🚀 Étape 4 : Créer la table dans la base de données

Exécutez ces commandes dans votre terminal :

```bash
# Générer le fichier de migration SQL
npm run db:generate

# Appliquer les migrations (créer la table)
npm run db:push
```

**✅ Résultat attendu** :
- Un message confirmant que la table `registrations` a été créée
- Votre base de données est prête !

---

## 🌐 Étape 5 : Configurer Netlify avec la variable DATABASE_URL

1. **Aller sur votre dashboard Netlify**
   - Connectez-vous sur https://app.netlify.com
   - Sélectionnez votre site `concert-chaussettes`

2. **Ajouter la variable d'environnement**
   - Allez dans **Site settings** > **Environment variables**
   - Cliquez sur **Add a variable**
   - **Key** : `DATABASE_URL`
   - **Value** : Collez l'URL de connexion Neon (la même que dans votre fichier `.env`)
   - **Scopes** : Cochez "Same value for all deploy contexts"
   - Cliquez sur **Create variable**

3. **Redéployer le site**
   - Allez dans l'onglet **Deploys**
   - Cliquez sur **Trigger deploy** > **Deploy site**
   - Attendez que le déploiement soit terminé (environ 1-2 minutes)

---

## 🎯 Étape 6 : Tester le système

1. **Accédez à votre site** : `https://votre-site.netlify.app`

2. **Faites une inscription test**
   - Remplissez le formulaire d'inscription
   - Cliquez sur "S'inscrire"
   - Vous devriez voir un message de confirmation

3. **Vérifiez dans l'admin**
   - Allez sur `https://votre-site.netlify.app/admin-inscrits.html`
   - Vous devriez voir l'inscription apparaître
   - Les données sont maintenant persistantes ! 🎉

---

## 🔍 Vérifier les données dans Neon (optionnel)

1. **Retournez sur votre dashboard Neon**
   - https://console.neon.tech

2. **Ouvrir le SQL Editor**
   - Dans votre projet, cliquez sur "SQL Editor"
   - Tapez cette requête :
   ```sql
   SELECT * FROM registrations;
   ```
   - Cliquez sur "Run"
   - Vous verrez toutes les inscriptions !

---

## 📊 Structure de la base de données

La table `registrations` contient :

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | Serial (auto-increment) | Identifiant unique |
| `name` | Varchar(255) | Nom de la personne |
| `email` | Varchar(255) | Email |
| `phone` | Varchar(20) | Téléphone |
| `guests` | Integer | Nombre de personnes |
| `message` | Text | Message optionnel |
| `registered_at` | Timestamp | Date/heure d'inscription |

---

## 🔐 Sécurité

### ⚠️ Important :

1. **Ne committez JAMAIS votre fichier `.env`** sur GitHub
   - Le fichier `.gitignore` est configuré pour l'exclure automatiquement

2. **Gardez votre URL de connexion secrète**
   - Ne la partagez jamais publiquement
   - Ne la mettez pas dans le code source

3. **Variables d'environnement sécurisées**
   - Sur Netlify, les variables d'environnement sont chiffrées
   - Elles ne sont jamais exposées côté client

---

## 🛠️ Opérations courantes

### Voir toutes les inscriptions

Via Neon SQL Editor :
```sql
SELECT * FROM registrations ORDER BY registered_at DESC;
```

### Compter le nombre d'inscriptions

```sql
SELECT COUNT(*) as total FROM registrations;
```

### Calculer le nombre total de personnes

```sql
SELECT SUM(guests) as total_guests FROM registrations;
```

### Supprimer une inscription spécifique

```sql
DELETE FROM registrations WHERE email = 'exemple@email.com';
```

### Vider toutes les inscriptions (ATTENTION !)

```sql
TRUNCATE TABLE registrations RESTART IDENTITY;
```

---

## 🔄 Workflow pour un nouveau concert

Quand vous organisez un nouveau concert :

1. **Option 1 : Garder l'historique**
   - Ne faites rien, les anciennes inscriptions restent dans la base
   - Elles seront toujours visibles dans l'admin

2. **Option 2 : Effacer les anciennes inscriptions**
   - Utilisez le bouton "Effacer toutes les données" dans l'admin
   - Ou exécutez `TRUNCATE` dans le SQL Editor de Neon

3. **Mettre à jour le contenu**
   - Modifiez les infos du concert via le CMS (`/admin`)
   - Les nouvelles inscriptions s'ajouteront automatiquement

---

## ❓ Dépannage

### Erreur : "Database connection failed"

✅ **Vérifiez que** :
1. La variable `DATABASE_URL` est bien configurée dans Netlify
2. L'URL de connexion est correcte (copiée depuis Neon)
3. Votre projet Neon n'est pas en pause (vérifiez sur console.neon.tech)

### Erreur : "Table doesn't exist"

✅ **Solution** :
1. Vérifiez que vous avez bien exécuté `npm run db:push`
2. Vérifiez dans Neon SQL Editor que la table existe : `\dt`

### Les inscriptions ne s'affichent pas

✅ **Vérifiez** :
1. Ouvrez la console du navigateur (F12) pour voir les erreurs
2. Vérifiez que les fonctions Netlify sont bien déployées
3. Testez l'API directement : `https://votre-site.netlify.app/api/get-registrations`

### Le site est lent

✅ **Normal** :
- Neon peut mettre 1-2 secondes à "réveiller" une base de données inactive (plan gratuit)
- Après la première requête, les suivantes seront rapides

---

## 💰 Plan gratuit Neon

Le plan gratuit de Neon inclut :
- ✅ 0.5 GB de stockage (largement suffisant pour des milliers d'inscriptions)
- ✅ Sauvegardes automatiques
- ✅ Branches de base de données
- ✅ Pas de limite de requêtes

**Estimation** : Vous pouvez stocker environ **50,000 inscriptions** sur le plan gratuit !

---

## 🎉 Félicitations !

Votre système d'inscription est maintenant :
- ✅ **Persistant** - Les données ne se perdent jamais
- ✅ **Synchronisé** - Accessible depuis tous les navigateurs
- ✅ **Sécurisé** - Base de données professionnelle PostgreSQL
- ✅ **Scalable** - Peut gérer des milliers d'inscriptions

**Besoin d'aide ?** Consultez la documentation :
- Neon : https://neon.tech/docs
- Drizzle ORM : https://orm.drizzle.team/docs
- Netlify Functions : https://docs.netlify.com/functions/overview/
