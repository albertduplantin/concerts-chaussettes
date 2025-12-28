# 🚀 Démarrage Rapide - Netlify CMS

## ⚡ Méthode Ultra Simple (Windows)

1. **Double-cliquez sur `start-cms.bat`**
2. Attendez que les deux serveurs démarrent
3. L'interface admin s'ouvrira automatiquement dans votre navigateur
4. **URL de l'admin** : http://localhost:8080/admin/

---

## 📝 Méthode Manuelle

### 1. Démarrer le serveur CMS

Ouvrez un terminal et exécutez :
```bash
npx netlify-cms-proxy-server
```

**Laissez ce terminal ouvert !**

### 2. Démarrer le serveur web

Ouvrez un **nouveau** terminal et exécutez :
```bash
npx http-server -p 8080
```

**Laissez ce terminal ouvert aussi !**

### 3. Accéder à l'interface

Ouvrez votre navigateur et allez sur :
- **Page principale** : http://localhost:8080
- **Interface admin** : http://localhost:8080/admin/

---

## 🎨 Comment modifier le contenu ?

1. Allez sur http://localhost:8080/admin/
2. Cliquez sur "Configuration du Concert"
3. Modifiez les champs que vous voulez
4. Cliquez sur "Publish" en haut à droite
5. Rechargez votre page principale pour voir les changements

---

## 📸 Comment uploader des photos ?

1. Dans l'admin, cliquez sur un champ "Image"
2. Cliquez sur "Choose an image" ou glissez-déposez vos photos
3. Vos images seront stockées dans `images/uploads/`

---

## 🎥 Comment ajouter des vidéos YouTube ?

1. Sur YouTube, cliquez sur "Partager" > "Intégrer"
2. Copiez l'URL qui ressemble à `https://www.youtube.com/embed/VIDEO_ID`
3. Collez-la dans le champ vidéo du CMS

---

## 🌐 Déployer en ligne (GRATUIT)

### Option recommandée : Netlify

1. Créez un compte sur [Netlify.com](https://www.netlify.com)
2. Glissez-déposez le dossier du projet sur Netlify
3. Votre site est en ligne ! 🎉

**Pour plus de détails, consultez [GUIDE-CMS.md](GUIDE-CMS.md)**

---

## ❓ Problèmes courants

### L'admin ne charge pas ?

✅ Vérifiez que les deux serveurs sont démarrés
✅ Videz le cache du navigateur (Ctrl+Shift+R)
✅ Vérifiez l'URL : http://localhost:8080/admin/ (avec le slash final)

### Les changements ne s'affichent pas ?

✅ Cliquez bien sur "Publish" dans l'admin
✅ Rechargez la page principale avec Ctrl+F5
✅ Vérifiez que le fichier `content/concert.json` a été modifié

---

## 📚 Documentation complète

Pour des instructions détaillées, consultez :
- **[GUIDE-CMS.md](GUIDE-CMS.md)** - Guide complet d'utilisation
- **[README.md](README.md)** - Documentation du projet

---

**Besoin d'aide ?** Consultez le guide complet ou la documentation officielle de [Netlify CMS](https://www.netlifycms.org/docs/).

**Bon concert !** 🎵
