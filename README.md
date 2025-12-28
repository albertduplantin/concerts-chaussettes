# Landing Page - Concert Privé

Une landing page élégante et moderne pour organiser un concert privé avec système d'inscription intégré.

## ✨ NOUVEAU : Interface Admin Netlify CMS

**Modifiez facilement tout le contenu sans toucher au code !**

- 🎨 **Interface graphique** pour modifier textes, photos et vidéos
- 📸 **Upload d'images** par glisser-déposer
- 🎥 **Gestion des vidéos** YouTube intégrée
- 💾 **Sauvegarde automatique** des modifications
- 🔄 **Réutilisable** pour plusieurs concerts

**👉 [Voir le guide de démarrage rapide](DEMARRAGE-RAPIDE.md)**

## Fonctionnalités

- **Design luxueux et festif** avec animations fluides
- **Système d'inscription/désinscription** complet avec stockage local
- **Gestion automatique des places** (limite configurable)
- **Section artiste** avec bio, photos et vidéos
- **Google Maps** intégré pour l'emplacement
- **Informations pratiques** détaillées
- **Galerie photos** interactive avec lightbox
- **Responsive design** adapté à tous les appareils
- **✨ Interface admin CMS** pour modifier le contenu facilement
- **100% gratuit** - aucun backend requis

## Technologies utilisées

- HTML5
- CSS3 (avec animations et gradients)
- JavaScript Vanilla (aucune dépendance)
- **Netlify CMS** pour la gestion de contenu
- LocalStorage pour la persistance des données
- Google Fonts (Playfair Display & Montserrat)
- Google Maps Embed API

## Installation & Démarrage

### 🚀 Démarrage Rapide avec CMS

**Windows :**
```bash
# Double-cliquez sur start-cms.bat
# OU en ligne de commande :
start-cms.bat
```

**Mac/Linux :**
```bash
# Terminal 1 - Serveur CMS
npx netlify-cms-proxy-server

# Terminal 2 - Serveur Web
npx http-server -p 8080
```

Puis ouvrez : http://localhost:8080/admin/

**📖 [Guide complet de démarrage](DEMARRAGE-RAPIDE.md)**

### 📄 Utilisation Simple (sans CMS)

1. Téléchargez tous les fichiers du projet
2. Ouvrez `index.html` dans votre navigateur
3. C'est tout ! Aucune installation requise.

## Personnalisation

### 🎨 Méthode Recommandée : Utiliser le CMS

**Plus besoin de toucher au code !** Utilisez l'interface admin Netlify CMS :

1. Lancez l'interface admin (voir section Installation ci-dessus)
2. Allez sur http://localhost:8080/admin/
3. Modifiez tous les contenus via l'interface graphique :
   - ✏️ Textes (titres, descriptions, biographie...)
   - 📸 Photos (upload direct ou URL)
   - 🎥 Vidéos YouTube
   - 📅 Dates et horaires
   - 📍 Lieu et carte Google Maps
   - ✉️ Contact et informations pratiques
4. Cliquez sur "Publish" pour sauvegarder
5. Rechargez la page principale pour voir les changements

**📖 [Guide complet d'utilisation du CMS](GUIDE-CMS.md)**

### 📝 Méthode Alternative : Modifier manuellement

Si vous préférez modifier directement le code :

**Option 1 : Modifier le fichier JSON** (plus simple)
- Éditez `content/concert.json` avec tous les contenus de la page

**Option 2 : Modifier le HTML** (méthode classique)
- Ouvrez `index.html` et modifiez directement le code
- **Date et heure** : ligne 18
- **Nom du groupe** : ligne 48
- **Biographie** : ligne 49-52
- **Adresse** : ligne 234

### Ajouter vos vidéos

Lignes 99-110 : remplacez les URLs YouTube par vos vidéos :
```html
<iframe src="https://www.youtube.com/embed/VOTRE_VIDEO_ID"></iframe>
```

### Modifier Google Maps

Ligne 184 : remplacez l'URL de l'iframe par votre propre localisation :

1. Allez sur [Google Maps](https://www.google.com/maps)
2. Cherchez votre adresse
3. Cliquez sur "Partager" puis "Intégrer une carte"
4. Copiez le code iframe et remplacez-le dans le HTML

### Ajuster le nombre de places

Dans `script.js`, ligne 4 :
```javascript
this.maxGuests = 30; // Changez ce nombre
```

### Modifier les couleurs

Dans `styles.css`, lignes 9-16, ajustez les variables CSS :
```css
--color-primary: #D4AF37;    /* Or/Gold */
--color-secondary: #1a1a1a;  /* Noir */
--color-accent: #8B4513;     /* Brun */
```

## Hébergement gratuit

Plusieurs options pour héberger votre site gratuitement :

### Option 1 : GitHub Pages (Recommandé)

1. Créez un compte sur [GitHub](https://github.com)
2. Créez un nouveau repository
3. Uploadez vos fichiers (index.html, styles.css, script.js)
4. Allez dans Settings > Pages
5. Sélectionnez la branche "main" et cliquez sur Save
6. Votre site sera disponible à : `https://votre-username.github.io/nom-du-repo`

**Tutoriel détaillé** : [Guide GitHub Pages](https://pages.github.com/)

### Option 2 : Netlify

1. Créez un compte sur [Netlify](https://www.netlify.com)
2. Glissez-déposez votre dossier de projet
3. Votre site est en ligne en quelques secondes !
4. URL fournie automatiquement (personnalisable)

**Avantages** : Déploiement ultra-rapide, HTTPS automatique, domaine personnalisé gratuit

### Option 3 : Vercel

1. Créez un compte sur [Vercel](https://vercel.com)
2. Importez votre projet depuis GitHub ou uploadez les fichiers
3. Déploiement automatique à chaque modification

**Avantages** : Performances excellentes, analytics intégrés

### Option 4 : Cloudflare Pages

1. Créez un compte sur [Cloudflare Pages](https://pages.cloudflare.com)
2. Connectez votre repository GitHub
3. Configuration automatique

**Avantages** : CDN mondial ultra-rapide, sécurité renforcée

### Option 5 : Render

1. Créez un compte sur [Render](https://render.com)
2. Créez un nouveau "Static Site"
3. Connectez votre repository ou uploadez les fichiers

**Avantages** : Facile à utiliser, SSL gratuit

## Configuration du domaine personnalisé (optionnel)

Tous ces services permettent d'ajouter un domaine personnalisé gratuitement (vous devez acheter le domaine) :

- GitHub Pages : Settings > Pages > Custom domain
- Netlify : Site settings > Domain management
- Vercel : Project settings > Domains
- Cloudflare Pages : Custom domains
- Render : Settings > Custom Domain

**Domaines gratuits** : Vous pouvez obtenir un domaine .me gratuit pendant 1 an via [GitHub Student Pack](https://education.github.com/pack)

## Structure des données

Les inscriptions sont stockées dans le LocalStorage du navigateur :

```javascript
{
  id: 1234567890,
  name: "Jean Dupont",
  email: "jean@example.com",
  guests: 2,
  message: "Hâte d'être là !",
  registeredAt: "2025-01-15T10:30:00.000Z"
}
```

## Sécurité et vie privée

- Les données sont stockées localement dans le navigateur
- Aucune donnée n'est envoyée à un serveur
- Protection contre les injections XSS
- Validation des emails
- Limitation du nombre de places

## Limitations

- **Stockage local** : Les données sont liées au navigateur. Si vous changez d'appareil, vous ne verrez pas les mêmes inscriptions.
- **Pas de notifications email** : Pour ajouter des emails de confirmation, vous devrez utiliser un service comme [EmailJS](https://www.emailjs.com/) (gratuit jusqu'à 200 emails/mois)
- **Synchronisation** : Pour synchroniser les inscriptions entre plusieurs appareils, vous devrez ajouter un backend (Firebase, Supabase, etc.)

## Améliorations possibles (avec services gratuits)

### Ajouter des emails de confirmation

Utilisez [EmailJS](https://www.emailjs.com/) (gratuit) :

1. Créez un compte sur EmailJS
2. Configurez votre service email
3. Ajoutez le script EmailJS dans `index.html`
4. Modifiez `script.js` pour envoyer un email à chaque inscription

### Synchroniser les données

Utilisez [Firebase](https://firebase.google.com/) (gratuit) :

1. Créez un projet Firebase
2. Activez Firestore Database
3. Remplacez LocalStorage par Firestore dans `script.js`
4. Les inscriptions seront synchronisées en temps réel

### Ajouter un formulaire de contact

Utilisez [Formspree](https://formspree.io/) (gratuit jusqu'à 50 soumissions/mois)

## Support des navigateurs

- Chrome (dernière version)
- Firefox (dernière version)
- Safari (dernière version)
- Edge (dernière version)
- Mobile : iOS Safari, Chrome Android

## Aide et support

Pour toute question :
- Consultez la documentation dans le code source
- Les commentaires dans `script.js` expliquent chaque fonction

## Licence

Ce projet est libre de droits. Vous pouvez l'utiliser, le modifier et le distribuer librement.

## Crédits

- Photos : [Unsplash](https://unsplash.com)
- Fonts : [Google Fonts](https://fonts.google.com)
- Icons : Emojis Unicode

---

**Bon concert !** 🎵🎸🎤
