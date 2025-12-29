// === DATABASE API MANAGEMENT ===
class RegistrationManager {
    constructor() {
        this.maxGuests = 35; // Valeur par défaut, sera mise à jour depuis le CMS
        this.registrations = [];
        this.init();
    }

    async init() {
        // Charger la configuration depuis le CMS
        await this.loadMaxPlacesFromCMS();
        await this.loadRegistrations();
        this.setupEventListeners();
        this.updateUI();
    }

    async loadMaxPlacesFromCMS() {
        try {
            const response = await fetch('content/concert.json');
            if (response.ok) {
                const data = await response.json();
                if (data.registration && data.registration.max_places) {
                    this.maxGuests = data.registration.max_places;
                }
            }
        } catch (error) {
            console.log('Utilisation de la valeur par défaut pour max_places');
        }
    }

    // Load and display registrations from database
    async loadRegistrations() {
        try {
            const response = await fetch('/api/get-registrations');
            if (response.ok) {
                const data = await response.json();
                this.registrations = data.registrations;
            } else {
                console.error('Failed to load registrations');
                this.registrations = [];
            }
        } catch (error) {
            console.error('Error loading registrations:', error);
            this.registrations = [];
        }
    }

    // Calculate total number of guests
    getTotalGuests() {
        return this.registrations.reduce((total, reg) => total + parseInt(reg.guests), 0);
    }

    // Get available places
    getAvailablePlaces() {
        return this.maxGuests - this.getTotalGuests();
    }

    // Check if email already exists
    emailExists(email) {
        return this.registrations.some(reg => reg.email.toLowerCase() === email.toLowerCase());
    }

    // Add new registration
    async addRegistration(data) {
        const totalGuests = this.getTotalGuests();
        const requestedGuests = parseInt(data.guests);

        // Check if there's enough space
        if (totalGuests + requestedGuests > this.maxGuests) {
            return {
                success: false,
                message: `Désolé, il ne reste que ${this.getAvailablePlaces()} place(s) disponible(s).`
            };
        }

        // Check if email already registered
        if (this.emailExists(data.email)) {
            return {
                success: false,
                message: 'Cet email est déjà inscrit au concert.'
            };
        }

        // Add registration via API
        try {
            const response = await fetch('/api/create-registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                await this.loadRegistrations();
                this.updateUI();
                return {
                    success: true,
                    message: `Inscription confirmée pour ${data.name} (${data.guests} personne${data.guests > 1 ? 's' : ''}) !`
                };
            } else {
                return {
                    success: false,
                    message: 'Erreur lors de l\'inscription. Veuillez réessayer.'
                };
            }
        } catch (error) {
            console.error('Error creating registration:', error);
            return {
                success: false,
                message: 'Erreur de connexion. Veuillez réessayer.'
            };
        }
    }


    // Update UI with current data
    updateUI() {
        const totalGuests = this.getTotalGuests();
        const availablePlaces = this.getAvailablePlaces();

        // Update places info
        const placesInfo = document.getElementById('places-info');
        if (placesInfo) {
            if (availablePlaces > 0) {
                placesInfo.innerHTML = `${availablePlaces}/${this.maxGuests} places disponibles`;
                placesInfo.style.color = availablePlaces < 5 ? '#dc3545' : 'inherit';
            } else {
                placesInfo.innerHTML = `0/${this.maxGuests} - Complet`;
                placesInfo.style.color = '#dc3545';
            }
        }

    }

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Setup event listeners
    setupEventListeners() {
        // Registration form
        const registrationForm = document.getElementById('registrationForm');
        if (registrationForm) {
            registrationForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleRegistration(e.target);
            });
        }

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // Handle registration form submission
    async handleRegistration(form) {
        const formData = new FormData(form);
        const data = {
            name: formData.get('name').trim(),
            email: formData.get('email').trim(),
            phone: formData.get('phone').trim(),
            guests: formData.get('guests'),
            message: formData.get('message').trim()
        };

        // Validation
        if (!data.name || !data.email || !data.phone) {
            this.showMessage(form, 'Veuillez remplir tous les champs obligatoires.', 'error');
            return;
        }

        if (!this.isValidEmail(data.email)) {
            this.showMessage(form, 'Veuillez entrer une adresse email valide.', 'error');
            return;
        }

        // Attempt registration
        const result = await this.addRegistration(data);
        this.showMessage(form, result.message, result.success ? 'success' : 'error');

        if (result.success) {
            form.reset();
        }
    }

    // Validate email format
    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Show message to user
    showMessage(form, message, type) {
        // Remove existing messages
        const existingMessages = form.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;

        // Insert at the beginning of the form
        form.insertBefore(messageDiv, form.firstChild);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            setTimeout(() => messageDiv.remove(), 500);
        }, 5000);
    }
}

// === SCROLL ANIMATIONS ===
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupScrollIndicator();
        this.setupParallax();
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, options);

        // Observe sections
        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            observer.observe(section);
        });
    }

    setupScrollIndicator() {
        const indicator = document.querySelector('.scroll-indicator');
        if (indicator) {
            indicator.addEventListener('click', () => {
                document.querySelector('.about').scrollIntoView({ behavior: 'smooth' });
            });
        }
    }

    setupParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero && scrolled < window.innerHeight) {
                hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
            }
        });
    }
}

// === IMAGE LIGHTBOX ===
class ImageLightbox {
    constructor() {
        this.init();
    }

    init() {
        this.createLightbox();
        this.setupGalleryListeners();
    }

    createLightbox() {
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.style.cssText = `
            display: none;
            position: fixed;
            z-index: 9999;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            align-items: center;
            justify-content: center;
            cursor: pointer;
        `;

        const img = document.createElement('img');
        img.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 10px;
        `;

        lightbox.appendChild(img);
        document.body.appendChild(lightbox);

        lightbox.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
    }

    setupGalleryListeners() {
        document.querySelectorAll('.gallery-item img').forEach(img => {
            img.addEventListener('click', (e) => {
                const lightbox = document.getElementById('lightbox');
                const lightboxImg = lightbox.querySelector('img');
                lightboxImg.src = e.target.src;
                lightbox.style.display = 'flex';
            });
        });
    }
}

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
    // Initialize registration manager
    const registrationManager = new RegistrationManager();

    // Initialize scroll animations
    const scrollAnimations = new ScrollAnimations();

    // Initialize image lightbox
    const imageLightbox = new ImageLightbox();

    // Log initialization
    console.log('Concert Landing Page initialized successfully');
    console.log(`Total registrations: ${registrationManager.registrations.length}`);
    console.log(`Available places: ${registrationManager.getAvailablePlaces()}`);
});

// === UTILITY FUNCTIONS ===

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});
