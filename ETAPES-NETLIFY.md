# 🚀 Configuration Netlify - À faire MAINTENANT

## ✅ Base de données locale : FAIT ✓

Votre base de données Neon est créée et fonctionnelle en local !

---

## 📋 Étapes restantes pour mettre en ligne

### 1️⃣ Configurer la variable d'environnement DATABASE_URL sur Netlify

1. **Allez sur votre dashboard Netlify**
   - URL : https://app.netlify.com
   - Connectez-vous avec votre compte

2. **Sélectionnez votre site `concert-chaussettes`**

3. **Accédez aux variables d'environnement**
   - Cliquez sur **Site settings** (dans le menu)
   - Dans le menu de gauche, cliquez sur **Environment variables**

4. **Ajoutez la variable DATABASE_URL**
   - Cliquez sur **Add a variable** (ou **Add variable**)
   - Dans le formulaire qui s'ouvre :
     - **Key** : `DATABASE_URL`
     - **Value** : Copiez-collez cette URL exacte :
       ```
       postgresql://neondb_owner:npg_CF2USqIbzgh0@ep-morning-truth-ag6bb1d5-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require
       ```
     - **Scopes** : Sélectionnez **"All scopes"** ou cochez toutes les cases
   - Cliquez sur **Create variable** ou **Save**

---

### 2️⃣ Redéployer le site

**IMPORTANT** : Après avoir ajouté la variable, vous DEVEZ redéployer !

1. **Dans votre dashboard Netlify, allez dans l'onglet "Deploys"**

2. **Déclenchez un nouveau déploiement**
   - Cliquez sur le bouton **Trigger deploy** (en haut à droite)
   - Sélectionnez **Deploy site**

3. **Attendez la fin du déploiement**
   - Le statut passe de "Building" → "Published"
   - Cela prend environ 1-2 minutes
   - Vous verrez un badge vert "Published" quand c'est terminé

---

### 3️⃣ Tester le système

Une fois le déploiement terminé :

1. **Testez une inscription**
   - Allez sur votre site : `https://votre-site.netlify.app`
   - Remplissez le formulaire d'inscription
   - Cliquez sur "S'inscrire"
   - Vous devriez voir : "Inscription confirmée pour [nom] (X personne(s)) !"

2. **Vérifiez dans l'admin**
   - Allez sur : `https://votre-site.netlify.app/admin-inscrits.html`
   - Vous devriez voir l'inscription apparaître dans le tableau
   - Les stats doivent s'afficher correctement

3. **Testez la persistance**
   - Fermez le navigateur
   - Rouvrez et retournez sur `/admin-inscrits.html`
   - Les inscriptions sont toujours là ! ✅

---

## 🔍 Vérification des Functions Netlify (optionnel)

Pour vérifier que les functions sont bien déployées :

1. Dans Netlify, allez dans l'onglet **Functions**
2. Vous devriez voir 3 functions :
   - `create-registration`
   - `get-registrations`
   - `delete-all-registrations`
3. Chacune devrait avoir le statut "Active"

---

## ❓ Dépannage

### Erreur "Function not found"

✅ **Vérifiez que** :
1. Vous avez bien redéployé après avoir ajouté `DATABASE_URL`
2. Les fichiers dans `netlify/functions/` sont bien poussés sur GitHub
3. Le `netlify.toml` est présent à la racine

### Erreur "Database connection failed"

✅ **Vérifiez que** :
1. La variable `DATABASE_URL` est bien configurée dans Netlify
2. L'URL est exactement celle fournie (sans espaces)
3. Vous avez bien redéployé après l'ajout de la variable

### Les inscriptions ne s'affichent pas

✅ **Ouvrez la console du navigateur** (F12) :
1. Allez sur l'onglet "Console"
2. Cherchez les erreurs en rouge
3. Si vous voyez "Failed to fetch", vérifiez que les functions sont actives

### Tester directement l'API

Allez sur cette URL dans votre navigateur :
```
https://votre-site.netlify.app/api/get-registrations
```

Vous devriez voir :
```json
{
  "success": true,
  "registrations": []
}
```

---

## ✅ Checklist finale

- [ ] Variable `DATABASE_URL` ajoutée dans Netlify
- [ ] Site redéployé
- [ ] Déploiement terminé avec succès (badge vert "Published")
- [ ] Test d'inscription effectué
- [ ] Inscription visible dans `/admin-inscrits.html`
- [ ] Persistance vérifiée (données toujours là après refresh)

---

## 🎉 Une fois terminé

Votre système sera :
- ✅ 100% fonctionnel en production
- ✅ Persistant et sécurisé
- ✅ Prêt pour votre concert !

**Durée estimée** : 5 minutes maximum

Bon déploiement ! 🚀
