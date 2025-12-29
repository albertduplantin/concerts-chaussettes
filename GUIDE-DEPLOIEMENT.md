# 🚀 Guide de Déploiement - Netlify avec CMS

Votre projet est prêt à être déployé avec un CMS fonctionnel ! Suivez ces étapes.

## ✅ Étape 1 : Git initialisé (FAIT ✓)

Votre projet Git est prêt avec le premier commit créé.

---

## 📤 Étape 2 : Créer un repository GitHub

1. **Allez sur GitHub**
   - Connectez-vous sur https://github.com
   - Créez un compte si vous n'en avez pas (gratuit)

2. **Créer un nouveau repository**
   - Cliquez sur le bouton "+" en haut à droite
   - Sélectionnez "New repository"

3. **Configurez le repository**
   - **Nom** : `concert-chaussettes` (ou un autre nom de votre choix)
   - **Description** : "Landing page for private concerts with CMS"
   - **Visibilité** : Public (gratuit) ou Private (si vous avez un compte payant)
   - ⚠️ **NE COCHEZ PAS** "Add a README file"
   - ⚠️ **NE COCHEZ PAS** "Add .gitignore"
   - Cliquez sur "Create repository"

4. **Copiez l'URL du repository**
   - GitHub affichera une page avec des commandes
   - Copiez l'URL qui ressemble à : `https://github.com/VOTRE-USERNAME/concert-chaussettes.git`

---

## 🔗 Étape 3 : Connecter votre projet à GitHub

Une fois que vous avez créé le repository sur GitHub et copié l'URL, revenez me voir avec l'URL.

Je vais exécuter ces commandes pour vous :

```bash
git remote add origin https://github.com/VOTRE-USERNAME/concert-chaussettes.git
git push -u origin main
```

**⚠️ IMPORTANT :** Remplacez `VOTRE-USERNAME` par votre nom d'utilisateur GitHub.

---

## 🌐 Étape 4 : Déployer sur Netlify

1. **Allez sur Netlify**
   - Connectez-vous sur https://app.netlify.com
   - Utilisez le même compte que précédemment

2. **Importer depuis GitHub**
   - Cliquez sur "Add new site" > "Import an existing project"
   - Sélectionnez "Deploy with GitHub"
   - Autorisez Netlify à accéder à GitHub (si demandé)
   - Sélectionnez le repository `concert-chaussettes`

3. **Configuration du déploiement**
   - **Branch to deploy** : `main`
   - **Build command** : laissez vide
   - **Publish directory** : `.` (un point)
   - Cliquez sur "Deploy site"

4. **Attendez le déploiement**
   - Netlify va déployer votre site (30 secondes)
   - Votre site sera disponible sur une URL comme : `https://random-name-12345.netlify.app`

---

## 🔐 Étape 5 : Activer le CMS (Netlify Identity)

1. **Dans votre dashboard Netlify**
   - Allez dans l'onglet "Site settings"
   - Dans le menu de gauche, cliquez sur "Identity"

2. **Activer Identity**
   - Cliquez sur "Enable Identity"
   - Attendez quelques secondes

3. **Configurer les préférences d'inscription**
   - Cliquez sur "Settings and usage" (dans la section Identity)
   - Dans "Registration preferences", sélectionnez **"Invite only"** (pour la sécurité)
   - Sauvegardez

4. **Activer Git Gateway**
   - Dans le menu Identity, allez dans "Services"
   - Trouvez "Git Gateway" et cliquez sur "Enable Git Gateway"
   - Confirmez

---

## 👤 Étape 6 : Créer votre compte admin

1. **Inviter un utilisateur (vous-même)**
   - Toujours dans la section "Identity"
   - Cliquez sur "Invite users"
   - Entrez votre email
   - Cliquez sur "Send"

2. **Vérifiez votre email**
   - Vous recevrez un email d'invitation
   - Cliquez sur le lien "Accept the invite"
   - Créez votre mot de passe
   - Vous êtes maintenant administrateur !

---

## 🎨 Étape 7 : Utiliser le CMS en ligne

1. **Accédez à l'interface admin**
   - Allez sur : `https://votre-site.netlify.app/admin/`
   - Connectez-vous avec votre email et mot de passe

2. **Modifiez le contenu**
   - Tous les champs sont éditables comme en local
   - Uploadez vos photos
   - Ajoutez vos vidéos YouTube
   - Modifiez les textes

3. **Publiez**
   - Cliquez sur "Publish"
   - Netlify CMS va créer un commit Git automatiquement
   - Netlify va redéployer le site avec les nouvelles données
   - Vos modifications seront en ligne en 30 secondes ! 🎉

---

## 🎯 Workflow de mise à jour

Maintenant que tout est configuré, voici comment vous travaillerez :

### Pour modifier le contenu :

1. Allez sur `https://votre-site.netlify.app/admin/`
2. Connectez-vous
3. Modifiez ce que vous voulez
4. Cliquez sur "Publish"
5. Attendez 30 secondes → Vos modifications sont en ligne !

### Pour un nouveau concert :

1. Sauvegardez l'ancien contenu (téléchargez `concert.json` via le CMS)
2. Modifiez tout le contenu pour le nouveau concert
3. Publiez
4. Voilà ! Votre page est mise à jour pour le nouveau concert

---

## 🔧 Paramètres avancés (optionnel)

### Personnaliser l'URL du site

1. Dans Netlify, allez dans "Site settings" > "Site details"
2. Cliquez sur "Change site name"
3. Choisissez un nom (ex: `mon-concert-prive`)
4. Votre URL devient : `https://mon-concert-prive.netlify.app`

### Ajouter un domaine personnalisé

1. Achetez un domaine (ex: `mon-concert.com`)
2. Dans Netlify, allez dans "Domain settings"
3. Cliquez sur "Add custom domain"
4. Suivez les instructions pour configurer le DNS

---

## ❓ Dépannage

### Le CMS ne charge pas

✅ Vérifiez que Git Gateway est activé
✅ Vérifiez que vous êtes bien connecté
✅ Videz le cache du navigateur (Ctrl+Shift+R)

### Les modifications ne s'affichent pas

✅ Attendez 30 secondes après la publication
✅ Rechargez la page avec Ctrl+F5
✅ Vérifiez dans l'onglet "Deploys" de Netlify que le déploiement est terminé

### Erreur lors de la publication

✅ Vérifiez votre connexion Internet
✅ Vérifiez que Git Gateway est bien activé
✅ Reconnectez-vous au CMS

---

## 📊 Résumé des URLs

- **Site public** : `https://votre-site.netlify.app`
- **Interface admin** : `https://votre-site.netlify.app/admin/`
- **Dashboard Netlify** : https://app.netlify.com
- **Repository GitHub** : `https://github.com/VOTRE-USERNAME/concert-chaussettes`

---

## ✅ Checklist finale

- [ ] Repository GitHub créé
- [ ] Code poussé sur GitHub
- [ ] Site déployé sur Netlify
- [ ] Netlify Identity activé
- [ ] Git Gateway activé
- [ ] Compte admin créé
- [ ] Connexion au CMS réussie
- [ ] Premier test de modification effectué

---

**🎉 Félicitations !** Votre site est maintenant en ligne avec un CMS fonctionnel !

**Besoin d'aide ?** Consultez le [GUIDE-CMS.md](GUIDE-CMS.md) ou la documentation Netlify.

**Bon concert !** 🎵🎸🎤
