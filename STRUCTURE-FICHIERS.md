# 📁 Structure du Projet

## Arborescence des fichiers

```
concert-chaussettes/
│
├── 📄 index.html              # Page principale du site
├── 🎨 styles.css              # Styles CSS
├── ⚙️ script.js               # Script de gestion des inscriptions
├── 🔄 cms-loader.js           # Script qui charge le contenu depuis le CMS
│
├── 📂 admin/                  # Interface d'administration CMS
│   ├── index.html             # Page d'accès au CMS
│   └── config.yml             # Configuration Netlify CMS
│
├── 📂 content/                # Contenu éditable
│   └── concert.json           # Données du concert (éditable via CMS)
│
├── 📂 images/                 # Dossier des images
│   └── uploads/               # Images uploadées via le CMS
│
├── 📂 Documentation
│   ├── 📖 README.md           # Documentation principale
│   ├── 🚀 DEMARRAGE-RAPIDE.md # Guide de démarrage rapide
│   ├── 📚 GUIDE-CMS.md        # Guide complet du CMS
│   └── 📁 STRUCTURE-FICHIERS.md # Ce fichier
│
├── 🔧 package.json            # Configuration npm
├── 🦇 start-cms.bat           # Script de démarrage Windows
└── 🚫 .gitignore              # Fichiers à ignorer par Git
```

---

## 📋 Rôle de chaque fichier

### Fichiers Principaux

| Fichier | Description | Modifiable ? |
|---------|-------------|--------------|
| **index.html** | Page web principale affichée aux visiteurs | ⚠️ Seulement si vous savez ce que vous faites |
| **styles.css** | Styles et design de la page | ⚠️ Pour changer les couleurs/design |
| **script.js** | Gestion des inscriptions au concert | ❌ Ne pas modifier sauf besoin avancé |
| **cms-loader.js** | Charge le contenu depuis le CMS | ❌ Ne pas modifier |

### Dossier Admin (CMS)

| Fichier | Description | Modifiable ? |
|---------|-------------|--------------|
| **admin/index.html** | Point d'entrée de l'interface CMS | ❌ Ne pas modifier |
| **admin/config.yml** | Configuration des champs éditables | ✅ Pour ajouter de nouveaux champs |

### Contenu

| Fichier | Description | Modifiable ? |
|---------|-------------|--------------|
| **content/concert.json** | Toutes les données du concert | ✅ Via le CMS ou manuellement |

### Images

| Dossier | Description | Usage |
|---------|-------------|-------|
| **images/uploads/** | Photos uploadées via le CMS | Vos photos personnelles |

---

## 🎯 Quel fichier modifier ?

### Pour changer le contenu (textes, photos, vidéos)

**✅ Méthode recommandée :** Utilisez le CMS
- Allez sur `/admin/`
- Modifiez via l'interface graphique

**✅ Méthode alternative :** Éditez `content/concert.json`
- Ouvrez le fichier avec un éditeur de texte
- Modifiez les valeurs (attention à la syntaxe JSON)

### Pour changer les couleurs/design

**Éditez `styles.css`**
- Lignes 9-16 : Variables de couleurs
```css
--color-primary: #D4AF37;    /* Or/Gold */
--color-secondary: #1a1a1a;  /* Noir */
--color-accent: #8B4513;     /* Brun */
```

### Pour ajouter de nouveaux champs dans le CMS

**Éditez `admin/config.yml`**
- Ajoutez de nouveaux champs dans la configuration
- Suivez le format YAML existant

### Pour changer la limite de places

**Option 1 :** Via le CMS
- Section "Réservation" > "Nombre de places disponibles"

**Option 2 :** Éditez `content/concert.json`
```json
"registration": {
  "max_places": 30  ← Changez ce nombre
}
```

---

## 🔍 Fichiers à ne JAMAIS modifier (sauf si vous savez ce que vous faites)

❌ **script.js** - Logique des inscriptions
❌ **cms-loader.js** - Chargement du contenu CMS
❌ **admin/index.html** - Interface CMS

---

## 💾 Sauvegarde avant modification

Si vous prévoyez d'organiser plusieurs concerts, sauvegardez vos données :

```bash
# Copiez le fichier de contenu
cp content/concert.json content/concert-backup-2025-02-15.json
```

Ou faites une copie du dossier complet avant chaque nouveau concert.

---

## 📦 Fichiers nécessaires pour le déploiement

Pour mettre votre site en ligne, ces fichiers sont **obligatoires** :

✅ index.html
✅ styles.css
✅ script.js
✅ cms-loader.js
✅ admin/ (dossier complet)
✅ content/ (dossier complet)
✅ images/ (si vous avez des images locales)

Fichiers **optionnels** :
- README.md, GUIDE-CMS.md, etc. (documentation)
- package.json (utile pour npm)
- .gitignore (utile pour Git)

---

## 🌐 Taille du projet

- **Taille minimale** (sans images) : ~50 Ko
- **Avec quelques images** : 1-5 Mo
- **Avec beaucoup d'images haute qualité** : 10-50 Mo

**💡 Astuce :** Optimisez vos images avant de les uploader pour réduire la taille et améliorer les performances.

---

**Questions ?** Consultez le [GUIDE-CMS.md](GUIDE-CMS.md) pour plus d'informations.
