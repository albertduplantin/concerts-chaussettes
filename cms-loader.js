// Script pour charger le contenu depuis Netlify CMS
class CMSLoader {
    constructor() {
        this.contentPath = 'content/concert.json';
        this.data = null;
    }

    async loadContent() {
        try {
            const response = await fetch(this.contentPath);
            if (!response.ok) {
                throw new Error('Erreur de chargement du contenu');
            }
            this.data = await response.json();
            this.updatePage();
        } catch (error) {
            console.error('Erreur lors du chargement du contenu CMS:', error);
            // Si le fichier n'existe pas, la page garde son contenu par défaut
        }
    }

    updatePage() {
        if (!this.data) return;

        // Mise à jour Hero Section
        this.updateHero();

        // Mise à jour About Section
        this.updateAbout();

        // Mise à jour Artist Section
        this.updateArtist();

        // Mise à jour Gallery
        this.updateGallery();

        // Mise à jour Videos
        this.updateVideos();

        // Mise à jour Registration
        this.updateRegistration();

        // Mise à jour Practical Info
        this.updatePracticalInfo();

        // Mise à jour Venue
        this.updateVenue();

        // Mise à jour Contact
        this.updateContact();
    }

    updateHero() {
        const { hero } = this.data;

        // Titre et sous-titre
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const dateText = document.querySelector('.date-text');

        if (heroTitle) heroTitle.textContent = hero.title;
        if (heroSubtitle) heroSubtitle.textContent = hero.subtitle;
        if (dateText) dateText.textContent = hero.date_display;

        // Image de fond (si fournie)
        if (hero.background_image) {
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                heroSection.style.backgroundImage = `url(${hero.background_image})`;
            }
        }
    }

    updateAbout() {
        const { about } = this.data;

        const aboutTitle = document.querySelector('.about .section-title');
        const aboutText = document.querySelector('.about-text');

        if (aboutTitle) aboutTitle.textContent = about.title;
        if (aboutText) aboutText.textContent = about.description;
    }

    updateArtist() {
        const { artist } = this.data;

        // Photo et nom
        const artistPhoto = document.getElementById('artist-main-photo');
        const photoCredit = document.querySelector('.photo-credit');
        const artistName = document.querySelector('.artist-name');
        const artistBio = document.getElementById('artist-bio-text');

        if (artistPhoto) artistPhoto.src = artist.photo;
        if (photoCredit) photoCredit.textContent = artist.photo_caption;
        if (artistName) artistName.textContent = artist.name;
        if (artistBio) artistBio.textContent = artist.bio;

        // Stats
        const stats = document.querySelectorAll('.artist-stats .stat');
        if (stats.length >= 3 && artist.stats) {
            stats[0].querySelector('.stat-number').textContent = artist.stats.experience;
            stats[1].querySelector('.stat-number').textContent = artist.stats.concerts;
            stats[2].querySelector('.stat-number').textContent = artist.stats.fans;
        }
    }

    updateGallery() {
        const { gallery } = this.data;
        const galleryGrid = document.getElementById('photo-gallery');

        if (!galleryGrid || !gallery) return;

        galleryGrid.innerHTML = '';
        gallery.forEach(photo => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                <img src="${photo.image}" alt="${photo.alt}">
            `;
            galleryGrid.appendChild(galleryItem);
        });
    }

    updateVideos() {
        const { videos } = this.data;
        const videoSection = document.getElementById('video-section');

        if (!videoSection || !videos) return;

        videoSection.innerHTML = '';
        videos.forEach(video => {
            const videoItem = document.createElement('div');
            videoItem.className = 'video-item';
            videoItem.innerHTML = `
                <iframe width="560" height="315" src="${video.url}"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen>
                </iframe>
                <p class="video-caption">${video.caption}</p>
            `;
            videoSection.appendChild(videoItem);
        });
    }

    updateRegistration() {
        const { registration } = this.data;

        const placesInfo = document.getElementById('places-info');

        if (placesInfo) {
            placesInfo.textContent = `${registration.max_places} places disponibles`;
        }

        // Mettre à jour le prix
        const priceCard = document.getElementById('price-card');
        if (priceCard && registration.price !== undefined) {
            const priceTitle = priceCard.querySelector('h4');
            const priceText = priceCard.querySelector('p');

            if (registration.price === 0) {
                priceTitle.textContent = 'Entrée Gratuite';
                priceText.textContent = 'Inscription obligatoire';
            } else {
                priceTitle.textContent = `Entrée ${registration.price}€`;
                priceText.textContent = 'Inscription obligatoire';
            }
        }

        // Mettre à jour le max dans le script de gestion
        if (window.concertManager) {
            window.concertManager.maxGuests = registration.max_places;
        }
    }

    updatePracticalInfo() {
        const { datetime, program, catering, good_to_know } = this.data;

        // Date et heure
        const infoBlocks = document.querySelectorAll('.info-block');
        if (infoBlocks.length >= 1 && datetime) {
            const dateBlock = infoBlocks[0];
            dateBlock.innerHTML = `
                <h3>📅 Date & Heure</h3>
                <p><strong>${datetime.full_date}</strong></p>
                <p>Portes: ${datetime.doors}</p>
                <p>Concert: ${datetime.start}</p>
                <p>Fin prévue: ${datetime.end}</p>
            `;
        }

        // Programme
        if (infoBlocks.length >= 2 && program) {
            const programBlock = infoBlocks[1];
            let programHTML = '<h3>🎭 Programme</h3>';
            program.forEach(item => {
                programHTML += `<p>${item.time} - ${item.description}</p>`;
            });
            programBlock.innerHTML = programHTML;
        }

        // Restauration
        if (infoBlocks.length >= 3 && catering) {
            const cateringBlock = infoBlocks[2];
            let cateringHTML = '<h3>🍷 Restauration</h3>';
            catering.forEach(item => {
                cateringHTML += `<p>${item.item}</p>`;
            });
            cateringBlock.innerHTML = cateringHTML;
        }

        // À savoir
        if (infoBlocks.length >= 4 && good_to_know) {
            const infoBlock = infoBlocks[3];
            let infoHTML = '<h3>ℹ️ À savoir</h3>';
            good_to_know.forEach(item => {
                infoHTML += `<p>${item.info}</p>`;
            });
            infoBlock.innerHTML = infoHTML;
        }
    }

    updateVenue() {
        const { venue } = this.data;

        // Adresse
        const address = document.getElementById('venue-address');
        if (address) {
            address.innerHTML = `<strong>Adresse:</strong> ${venue.address}`;
        }

        // Carte Google Maps
        const map = document.querySelector('#map iframe');
        if (map) {
            map.src = venue.map_embed;
        }

        // Transport
        const transportInfo = document.querySelector('.transport-info');
        if (transportInfo && venue.transport) {
            let transportHTML = '<h4>🚇 Accès</h4>';
            venue.transport.forEach(item => {
                transportHTML += `<p><strong>${item.type}:</strong> ${item.details}</p>`;
            });
            transportInfo.innerHTML = transportHTML;
        }
    }

    // Fonction pour obfusquer l'email contre les robots
    obfuscateEmail(email) {
        // Encode l'email en Base64 puis inverse pour masquer
        const encoded = btoa(email).split('').reverse().join('');
        return encoded;
    }

    // Fonction pour déobfusquer et afficher l'email
    displayEmail(encoded) {
        const email = atob(encoded.split('').reverse().join(''));
        return email;
    }

    // Fonction pour formater le téléphone (masqué)
    obfuscatePhone(phone) {
        if (!phone) return '';
        // Encode le téléphone
        return btoa(phone).split('').reverse().join('');
    }

    displayPhone(encoded) {
        if (!encoded) return '';
        return atob(encoded.split('').reverse().join(''));
    }

    updateContact() {
        const { contact } = this.data;

        const footer = document.querySelector('.footer .container');
        if (footer) {
            // Obfusquer l'email
            const emailEncoded = this.obfuscateEmail(contact.email);
            const phoneEncoded = contact.phone ? this.obfuscatePhone(contact.phone) : '';

            let contactHTML = '<p>Pour toute question, contactez-nous ';

            // Ajouter l'email avec obfuscation
            contactHTML += `par <span class="contact-email" data-contact="${emailEncoded}">email</span>`;

            // Ajouter le téléphone si présent
            if (contact.phone) {
                contactHTML += ` ou par <span class="contact-phone" data-contact="${phoneEncoded}">téléphone</span>`;
            }

            contactHTML += '</p>';
            contactHTML += `<p class="footer-note">${contact.footer_note}</p>`;
            contactHTML += '<p class="copyright">&copy; 2025 Concert Privé. Tous droits réservés.</p>';

            footer.innerHTML = contactHTML;

            // Ajouter les événements pour désobfusquer au clic
            const emailSpan = footer.querySelector('.contact-email');
            if (emailSpan) {
                emailSpan.style.cursor = 'pointer';
                emailSpan.style.textDecoration = 'underline';
                emailSpan.style.color = 'var(--color-primary)';

                emailSpan.addEventListener('click', () => {
                    const email = this.displayEmail(emailEncoded);
                    emailSpan.innerHTML = `<a href="mailto:${email}">${email}</a>`;
                });
            }

            const phoneSpan = footer.querySelector('.contact-phone');
            if (phoneSpan) {
                phoneSpan.style.cursor = 'pointer';
                phoneSpan.style.textDecoration = 'underline';
                phoneSpan.style.color = 'var(--color-primary)';

                phoneSpan.addEventListener('click', () => {
                    const phone = this.displayPhone(phoneEncoded);
                    phoneSpan.innerHTML = `<a href="tel:${phone}">${phone}</a>`;
                });
            }
        }
    }
}

// Charger le contenu au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    const loader = new CMSLoader();
    loader.loadContent();
});
