# 🎵 Guide d'utilisation Netlify CMS

Bienvenue ! Vous pouvez maintenant modifier facilement tout le contenu de votre page de concert via une interface graphique.

## 🚀 Démarrage rapide

### Option 1 : Test en local (recommandé pour débuter)

1. **Installer le serveur local Netlify CMS**
   ```bash
   npx netlify-cms-proxy-server
   ```

2. **Dans un autre terminal, démarrer un serveur web local**
   ```bash
   npx http-server
   ```
   Ou avec Python :
   ```bash
   python -m http.server 8080
   ```

3. **Ouvrir l'interface admin**
   Allez sur : `http://localhost:8080/admin/`

4. **Modifier le contenu**
   - Tous les champs sont éditables
   - Cliquez sur "Publish" pour sauvegarder
   - Rechargez votre page principale pour voir les changements

---

### Option 2 : Déploiement sur Netlify (pour production)

#### Étape 1 : Créer un repository Git

```bash
git init
git add .
git commit -m "Initial commit - Concert page with CMS"
```

#### Étape 2 : Pousser sur GitHub

1. Créez un nouveau repository sur [GitHub](https://github.com/new)
2. Suivez les instructions pour pousser votre code :
   ```bash
   git remote add origin https://github.com/VOTRE-USERNAME/VOTRE-REPO.git
   git branch -M main
   git push -u origin main
   ```

#### Étape 3 : Déployer sur Netlify

1. Allez sur [Netlify](https://www.netlify.com)
2. Cliquez sur "Add new site" > "Import an existing project"
3. Connectez votre repository GitHub
4. Cliquez sur "Deploy site"

#### Étape 4 : Activer Netlify Identity

1. Dans votre dashboard Netlify, allez dans "Site settings" > "Identity"
2. Cliquez sur "Enable Identity"
3. Dans "Registration preferences", sélectionnez "Invite only" (sécurité)
4. Dans "Services" > "Git Gateway", cliquez sur "Enable Git Gateway"

#### Étape 5 : Créer votre compte admin

1. Allez dans l'onglet "Identity"
2. Cliquez sur "Invite users"
3. Entrez votre email
4. Vérifiez votre email et créez votre mot de passe

#### Étape 6 : Accéder à l'admin

Allez sur : `https://votre-site.netlify.app/admin/`

---

## 📝 Que pouvez-vous modifier ?

### ✅ Section Hero (Bannière principale)
- Titre principal
- Sous-titre
- Date et heure d'affichage
- Image de fond (optionnel)

### ✅ Section À propos
- Titre de la section
- Description de l'événement

### ✅ Section Artiste
- Nom du groupe/artiste
- Photo principale (upload possible)
- Légende de la photo
- Biographie complète
- Statistiques (années d'expérience, concerts, fans)

### ✅ Galerie Photos
- Ajouter/supprimer des photos
- Modifier l'ordre
- Upload direct d'images
- Textes alternatifs

### ✅ Vidéos
- Ajouter/supprimer des vidéos YouTube
- Légendes personnalisées
- Support de plusieurs vidéos

### ✅ Réservation
- Nombre de places disponibles
- Type d'entrée (gratuite ou payante)
- Description de l'ambiance

### ✅ Informations Pratiques
- **Date et heure** : ouverture, début, fin
- **Programme** : planning de la soirée
- **Restauration** : services proposés
- **À savoir** : informations importantes

### ✅ Lieu
- Adresse complète
- Carte Google Maps (embed)
- Informations transport (métro, bus, vélib)

### ✅ Contact
- Email de contact
- Note de bas de page

---

## 🖼️ Comment uploader vos propres photos ?

### Dans l'interface CMS :

1. Cliquez sur un champ "Image"
2. Cliquez sur "Choose an image"
3. Deux options :
   - **Upload** : Glissez-déposez vos photos
   - **URL** : Collez l'URL d'une image en ligne

Vos images uploadées seront stockées dans `images/uploads/`

---

## 🎥 Comment ajouter vos vidéos YouTube ?

1. Allez sur votre vidéo YouTube
2. Cliquez sur "Partager" > "Intégrer"
3. Copiez l'URL qui ressemble à : `https://www.youtube.com/embed/VOTRE_VIDEO_ID`
4. Collez-la dans le champ "URL YouTube (embed)" du CMS

**Format attendu :** `https://www.youtube.com/embed/VIDEO_ID`

---

## 🗺️ Comment changer la carte Google Maps ?

1. Allez sur [Google Maps](https://www.google.com/maps)
2. Recherchez votre adresse
3. Cliquez sur "Partager" > "Intégrer une carte"
4. Copiez l'URL du `src` de l'iframe
5. Collez-la dans le champ "Google Maps Embed URL"

**Exemple d'URL :**
```
https://www.google.com/maps/embed?pb=!1m18!1m12!1m3...
```

---

## 💾 Workflow de modification

1. **Connexion** : Allez sur `/admin/`
2. **Modification** : Cliquez sur "Configuration du Concert"
3. **Édition** : Modifiez les champs souhaités
4. **Prévisualisation** : Vérifiez vos changements
5. **Publication** : Cliquez sur "Publish" en haut à droite
6. **Vérification** : Rechargez votre page principale

---

## 🔄 Réutiliser pour un autre concert

### Méthode simple (sauvegarde manuelle) :

1. Téléchargez le fichier `content/concert.json`
2. Renommez-le (ex: `concert-fevrier-2025.json`)
3. Modifiez le contenu via le CMS pour le nouveau concert
4. Gardez l'ancien fichier en backup

### Méthode avancée (créer des templates) :

Si vous organisez régulièrement des concerts, vous pouvez :

1. Créer plusieurs fichiers de configuration
2. Modifier `admin/config.yml` pour gérer plusieurs concerts
3. Utiliser une liste de concerts au lieu d'un seul

---

## ⚡ Conseils & astuces

### Pour de meilleures performances :

- **Optimisez vos images** avant de les uploader (max 1-2 Mo)
- Utilisez des formats modernes (WebP, JPEG optimisé)
- Outils gratuits : [TinyPNG](https://tinypng.com/), [Squoosh](https://squoosh.app/)

### Pour la sécurité :

- N'invitez que les personnes de confiance dans Netlify Identity
- Changez régulièrement votre mot de passe
- Activez l'authentification à deux facteurs sur Netlify

### Pour le SEO :

- Remplissez les textes alternatifs des images
- Utilisez des descriptions détaillées
- Mettez à jour régulièrement le contenu

---

## 🆘 Dépannage

### L'interface admin ne se charge pas

1. Vérifiez que vous êtes sur `/admin/` (avec le slash final)
2. Videz le cache du navigateur (Ctrl+Shift+R)
3. Vérifiez la console du navigateur (F12) pour les erreurs

### Les changements ne s'affichent pas

1. Vérifiez que vous avez cliqué sur "Publish"
2. Rechargez la page avec Ctrl+F5 (bypass cache)
3. Vérifiez que `cms-loader.js` est bien chargé (F12 > Network)

### Les images ne s'affichent pas

1. Vérifiez que le dossier `images/uploads/` existe
2. Vérifiez les permissions du dossier
3. Utilisez des URLs absolues si problème

### En mode local, le CMS ne fonctionne pas

1. Vérifiez que `netlify-cms-proxy-server` tourne
2. Vérifiez que votre serveur web est démarré
3. Le fichier `admin/config.yml` doit avoir `local_backend: true`

---

## 📚 Ressources supplémentaires

- [Documentation Netlify CMS](https://www.netlifycms.org/docs/)
- [Guide vidéo YouTube](https://www.youtube.com/results?search_query=netlify+cms+tutorial)
- [Communauté Netlify](https://answers.netlify.com/)

---

## 🎉 C'est tout !

Vous êtes maintenant prêt à gérer facilement le contenu de tous vos concerts !

**Questions ?** Consultez la section Dépannage ou la documentation officielle.

**Bon concert !** 🎵🎸🎤
